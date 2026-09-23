#!/usr/bin/env python3
"""Copy the legal documents out of the app into _build/legal.json.

    python3 _build/fetch_legal.py && python3 _build/build.py

The app carries privacy, terms and copyright in its own bundle, in three languages,
and fills the operator's details at runtime. This reads them from the deployed app so
the website can publish the same text instead of a second copy that drifts. Re-run it
after changing the documents in the app.
"""
import json
import os
import re
import urllib.request

APP = "https://app.suonable.com/"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "legal.json")
DOCS = ("privacy", "terms", "copyright")
# the privacy title tells us which language a block is in
LANG_MARKS = (("en", "Privacy Policy"), ("it", "Informativa"), ("es", "Política"))


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "suonable-site-build"})
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8")


def balanced(s, i):
    """The object literal starting at i, respecting strings."""
    depth, j, instr, q = 0, i, False, ""
    while j < len(s):
        c = s[j]
        if instr:
            if c == "\\":
                j += 2
                continue
            if c == q:
                instr = False
        elif c in "`\"'":
            instr, q = True, c
        elif c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return s[i:j + 1]
        j += 1
    raise SystemExit("unbalanced object at %d" % i)


def read_literal(s, i):
    """The template literal starting at s[i] == '`', and where it ends."""
    buf, j = [], i + 1
    while j < len(s):
        c = s[j]
        if c == "\\":
            buf.append(s[j + 1])
            j += 2
            continue
        if c == "`":
            return "".join(buf), j + 1
        buf.append(c)
        j += 1
    raise SystemExit("unterminated string at %d" % i)


def evaluate(expr, values):
    """A paragraph is text spliced with the operator's details: `a `+Y.nombre+`b`."""
    out, i = [], 0
    while i < len(expr):
        c = expr[i]
        if c == "`":
            text, i = read_literal(expr, i)
            out.append(text)
        elif c in " +\n":
            i += 1
        else:
            name = re.match(r"[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*", expr[i:]).group(0)
            if name not in values:
                raise SystemExit("the app splices %r into the text and this script does not know it" % name)
            out.append(values[name])
            i += len(name)
    return "".join(out)


def read_array(s, i, values):
    """The array of paragraphs starting at s[i] == '[', each one evaluated."""
    items, cur, j = [], [], i + 1
    while j < len(s):
        c = s[j]
        if c == "`":
            text, j = read_literal(s, j)
            cur.append("`%s`" % text.replace("`", "\\`"))
            continue
        if c == ",":
            items.append("".join(cur))
            cur, j = [], j + 1
            continue
        if c == "]":
            if "".join(cur).strip():
                items.append("".join(cur))
            return [evaluate(x, values) for x in items], j + 1
        cur.append(c)
        j += 1
    raise SystemExit("unterminated array at %d" % i)


def parse_doc(body, values):
    title = re.search(r"title:`([^`]*)`", body).group(1)
    intro = evaluate(body[body.index("intro:") + len("intro:"):body.index("sections:")].rstrip().rstrip(","), values)
    sections, rest = [], body[body.index("sections:["):]
    for m in re.finditer(r"\{h:", rest):
        heading, after = read_literal(rest, rest.index("`", m.end()))
        paragraphs, _ = read_array(rest, rest.index("p:[", after) + len("p:"), values)
        sections.append({"h": heading, "p": paragraphs})
    return {"title": title, "intro": intro, "sections": sections}


def main():
    shell = get(APP)
    bundle = re.search(r'src="(/assets/index-[^"]+\.js)"', shell).group(1)
    src = get(APP.rstrip("/") + bundle)

    operator = re.search(r"\{nombre:`([^`]*)`,direccion:`([^`]*)`,pais:`([^`]*)`,"
                         r"idFiscal:`([^`]*)`,idEtiqueta:`([^`]*)`,contacto:`([^`]*)`,abuso:`([^`]*)`\}", src)
    version = re.search(r"var ya=`([^`]*)`,ba=`([^`]*)`", src)
    country = re.search(r"\{en:`([^`]*)`,it:`([^`]*)`,es:`([^`]*)`\}", src)
    if not operator or not version:
        raise SystemExit("the app's operator or version fields moved; update this script")

    data = {
        "source": APP,
        "version": version.group(1),
        "updated": version.group(2),
        "operator": dict(zip(("name", "address", "country", "taxId", "taxLabel", "contact", "abuse"),
                             operator.groups())),
        "country": dict(zip(("en", "it", "es"), country.groups())) if country else {},
        "langs": {},
    }
    op = re.search(r"(\w+)=\{nombre:", src).group(1)
    countries = re.search(r"(\w+)=\{en:`[^`]*`,it:`[^`]*`,es:`[^`]*`\}", src).group(1)
    summary = re.search(r"(\w+)=\[%s\.nombre," % op, src).group(1)
    contact = re.search(r"(\w+)=%s\.contacto" % op, src).group(1)
    abuse = re.search(r"(\w+)=%s\.abuso" % op, src).group(1)
    o = data["operator"]
    values = {
        summary: ", ".join([o["name"], o["address"], o["country"], o["taxLabel"] + " " + o["taxId"]]),
        contact: o["contact"], abuse: o["abuse"],
        op + ".nombre": o["name"], op + ".direccion": o["address"], op + ".pais": o["country"],
        op + ".idFiscal": o["taxId"], op + ".idEtiqueta": o["taxLabel"],
        op + ".contacto": o["contact"], op + ".abuso": o["abuse"],
    }
    for code, name in data["country"].items():
        values["%s.%s" % (countries, code)] = name

    for m in re.finditer(r"\{privacy:\{title:", src):
        blob = balanced(src, m.start())
        parts = re.split(r"(?:\{|,)(privacy|terms|copyright)\s*:\s*\{", blob)
        docs = {}
        for k in range(1, len(parts), 2):
            docs[parts[k]] = parse_doc(parts[k + 1], values)
        title = docs["privacy"]["title"]
        lang = next((code for code, mark in LANG_MARKS if mark in title), None)
        if not lang:
            raise SystemExit("unknown language for %r" % title)
        data["langs"][lang] = docs

    missing = [l for l in ("en", "it", "es") if l not in data["langs"]] + \
              [d for l in data["langs"].values() for d in DOCS if d not in l]
    if missing:
        raise SystemExit("missing from the bundle: %s" % ", ".join(missing))

    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")
    for lang, docs in data["langs"].items():
        print(lang, " ".join("%s(%d secciones)" % (d, len(docs[d]["sections"])) for d in DOCS))
    print("operador:", data["operator"]["name"], "· versión", data["version"], data["updated"])


if __name__ == "__main__":
    main()
