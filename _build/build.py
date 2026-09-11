#!/usr/bin/env python3
"""Build the three language versions of the site.

    python3 _build/build.py

Reads _build/template.html (English) and _build/i18n.json, and writes
index.html (en), it/index.html (it), es/index.html (es) and sitemap.xml.

Body text is translated with the same rule the old client-side i18n.js used,
so the pages read exactly as before: a text node is replaced when its trimmed
text matches a dictionary key; anything inside translate="no" is left alone.
The <title> and the description/social metas are looked up the same way.
"""
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BUILD = ROOT / "_build"
SITE = "https://suonable.com"

LANGS = [  # (code, url path, output file)
    ("en", "/", "index.html"),
    ("it", "/it/", "it/index.html"),
    ("es", "/es/", "es/index.html"),
]
DEFAULT = "en"

VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link",
        "meta", "param", "source", "track", "wbr"}
RAW_TEXT = {"script", "style"}
SKIP_PARENTS = {"script", "style", "template", "canvas"}

TAG = re.compile(r"""<(/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^'">])*?)(/?)>""", re.S)


def load_dict():
    groups = json.loads((BUILD / "i18n.json").read_text(encoding="utf-8"))
    flat = {}
    for entries in groups.values():
        for key, tr in entries.items():
            if key in flat:
                sys.exit(f"duplicate dictionary key: {key!r}")
            flat[key] = tr
    return flat


def translate_body(src, lang, dictionary, untranslated):
    """Replace body text nodes, mirroring i18n.js applyLang()."""
    out, pos, n = [], 0, len(src)
    stack = []            # open elements: (tag, inside translate="no")
    in_body = False

    def next_markup(start):
        """Index of the next comment or tag at/after start (a stray '<' is text)."""
        i = src.find("<", start)
        while i != -1 and not (src.startswith("<!--", i) or TAG.match(src, i)):
            i = src.find("<", i + 1)
        return n if i == -1 else i

    while pos < n:
        lt = next_markup(pos)
        text = src[pos:lt]            # one DOM text node
        if text and in_body:
            text = translate_text(text, stack, lang, dictionary, untranslated)
        out.append(text)
        if lt == n:
            break
        if src.startswith("<!--", lt):
            end = src.find("-->", lt)
            end = n if end == -1 else end + 3
            out.append(src[lt:end])
            pos = end
            continue

        m = TAG.match(src, lt)
        out.append(m.group(0))
        pos = m.end()
        closing, name, attrs, selfclose = m.group(1), m.group(2).lower(), m.group(3), m.group(4)

        if closing:
            if name == "body":
                in_body = False
            for i in range(len(stack) - 1, -1, -1):   # pop to the matching open tag
                if stack[i][0] == name:
                    del stack[i:]
                    break
            continue
        if name == "body":
            in_body = True
        if name in RAW_TEXT:                          # copy script/style content untouched
            close = re.compile(r"</%s\s*>" % name, re.I).search(src, pos)
            end = n if close is None else close.start()
            out.append(src[pos:end])
            pos = end
            continue
        if name in VOID or selfclose:
            continue
        no = bool(re.search(r'\btranslate\s*=\s*"no"', attrs)) or (stack[-1][1] if stack else False)
        stack.append((name, no))

    return "".join(out)


def translate_text(raw, stack, lang, dictionary, untranslated):
    decoded = html.unescape(raw)
    key = decoded.strip()
    if not key:
        return raw
    if stack and (stack[-1][0] in SKIP_PARENTS or stack[-1][1]):
        return raw
    hit = dictionary.get(key, {}).get(lang)
    if not hit:
        if re.search(r"[A-Za-z]{2}", key):
            untranslated.add(key)
        return raw
    return html.escape(decoded.replace(key, hit, 1), quote=False)


def translate_head(src, lang, dictionary, missing):
    def look(text):
        hit = dictionary.get(html.unescape(text), {}).get(lang)
        if not hit:
            missing.add(html.unescape(text))
            return text
        return html.escape(hit, quote=True)

    src = re.sub(r"(<title>)(.*?)(</title>)",
                 lambda m: m.group(1) + look(m.group(2)) + m.group(3), src, count=1, flags=re.S)
    meta = (r'(<meta (?:name|property)="(?:description|og:title|og:description|'
            r'twitter:title|twitter:description)" content=")([^"]*)(")')
    return re.sub(meta, lambda m: m.group(1) + look(m.group(2)) + m.group(3), src)


def alternates(path):
    lines = [f'<link rel="canonical" href="{SITE}{path}">']
    for code, p, _ in LANGS:
        lines.append(f'<link rel="alternate" hreflang="{code}" href="{SITE}{p}">')
    default = next(p for c, p, _ in LANGS if c == DEFAULT)
    lines.append(f'<link rel="alternate" hreflang="x-default" href="{SITE}{default}">')
    lines.append(f'<meta property="og:url" content="{SITE}{path}">')
    return "\n".join(lines)


def build_page(template, lang, path, dictionary):
    page = template
    page = page.replace(
        "<!-- Source template for the three language pages. Edit this, then run: python3 _build/build.py -->",
        "<!-- Generated by _build/build.py from _build/template.html. Edit those, not this file. -->", 1)
    page = page.replace('<meta name="robots" content="noindex">\n', "", 1)
    page = re.sub(r'<html lang="[^"]*">', f'<html lang="{lang}">', page, count=1)
    page = page.replace("<!-- @alternates -->", alternates(path), 1)
    page = page.replace('href="/" data-home', f'href="{path}"')
    page = re.sub(r'(<a class="lang-btn" [^>]*data-lang="%s")' % lang.upper(),
                  r'\1 aria-current="page"', page)

    untranslated, missing = set(), set()
    if lang != DEFAULT:
        head_end = page.index("</head>")
        page = translate_head(page[:head_end], lang, dictionary, missing) + page[head_end:]
        page = translate_body(page, lang, dictionary, untranslated)
    return page, untranslated, missing


def sitemap():
    urls = []
    default = next(p for c, p, _ in LANGS if c == DEFAULT)
    for _, path, _ in LANGS:
        alts = [f'    <xhtml:link rel="alternate" hreflang="{c}" href="{SITE}{p}"/>' for c, p, _ in LANGS]
        alts.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{SITE}{default}"/>')
        urls.append(f"  <url>\n    <loc>{SITE}{path}</loc>\n" + "\n".join(alts) + "\n  </url>")
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
            '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + "\n".join(urls) + "\n</urlset>\n")


def main():
    template = (BUILD / "template.html").read_text(encoding="utf-8")
    for marker in ("<!-- @alternates -->", 'data-home', '<meta name="robots" content="noindex">'):
        if marker not in template:
            sys.exit(f"template is missing {marker!r}")
    dictionary = load_dict()

    for lang, path, out in LANGS:
        page, untranslated, missing = build_page(template, lang, path, dictionary)
        dest = ROOT / out
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(page, encoding="utf-8")
        note = ""
        if lang != DEFAULT:
            note = f"  ({len(untranslated)} text nodes kept in English)"
        print(f"wrote {out}{note}")
        for text in sorted(missing):
            print(f"  WARNING [{lang}] head text has no translation: {text!r}")
        if "-v" in sys.argv:
            for text in sorted(untranslated):
                print(f"    [{lang}] {text!r}")

    (ROOT / "sitemap.xml").write_text(sitemap(), encoding="utf-8")
    print("wrote sitemap.xml")


if __name__ == "__main__":
    main()
