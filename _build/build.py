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


SEO_TITLES = {
    "en": ("Suonable — Split any song into separate instrument tracks",
           "Upload a recording of your own and get seven tracks: drums, bass, guitar, piano, other, "
           "vocals and backing vocals. Mute the voice to rehearse, isolate your part, follow the chords "
           "it finds for you. Free open beta for web, Mac and Windows."),
    "it": ("Suonable — Separa una canzone in tracce per strumento",
           "Carichi una tua registrazione e torna in sette tracce: batteria, basso, chitarra, piano, "
           "altro, voce e cori. Togli la voce per provare, isola la tua parte, segui gli accordi che "
           "trova da solo. Beta aperta e gratuita per web, Mac e Windows."),
    "es": ("Suonable — Separa una canción en pistas por instrumento",
           "Subes una grabación tuya y vuelve en siete pistas: batería, bajo, guitarra, piano, otros, "
           "voz y coros. Quita la voz para ensayar, aísla tu parte, sigue los acordes que detecta solo. "
           "Beta abierta y gratuita para web, Mac y Windows."),
}


def faq_data():
    return json.loads((BUILD / "faq.json").read_text(encoding="utf-8"))


def faq_section(lang):
    """The questions people actually type into a search box, answered."""
    data = faq_data()
    eyebrow, heading = data["headings"][lang]
    items = []
    for question, answer in data["faq"][lang]:
        items.append(
            '        <div data-reveal="1" class="accordion" style="border-top: 1px solid #E8E8E4; padding: 26px 0 30px;">\n'
            '          <h3 class="accordion-trigger" role="button" tabindex="0" aria-expanded="false" '
            'style="margin: 0 0 10px; font-size: var(--t-h3, 19px); font-weight: 800; letter-spacing: -0.025em; '
            'display: flex; align-items: baseline; justify-content: space-between; gap: 10px;">'
            '%s<span class="accordion-caret">▾</span></h3>\n'
            '          <p class="accordion-panel" style="margin: 0; font-size: var(--t-body, 15px); '
            'line-height: 1.65; color: #4A4A52;">%s</p>\n'
            '        </div>' % (html.escape(question, quote=False), html.escape(answer, quote=False)))
    return ('  <section id="faq" style="max-width: var(--page, 1160px); margin: 0 auto; '
            'padding-bottom: var(--space-section, clamp(112px, 19vh, 248px));">\n'
            '    <div style="font-family: \'JetBrains Mono\', monospace; font-size: var(--t-eyebrow, 11px); '
            'font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #1055AD; '
            'padding-bottom: 22px;">%s</div>\n'
            '    <h2 data-reveal="1" style="margin: 0 0 32px; font-size: clamp(30px, 4.4vw, 60px); '
            'font-weight: 800; letter-spacing: -0.045em; line-height: 1.05; max-width: 22ch;">%s</h2>\n'
            '    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); '
            'gap: 0 clamp(32px, 4vw, 72px);">\n%s\n    </div>\n  </section>'
            % (html.escape(eyebrow, quote=False), html.escape(heading, quote=False), "\n".join(items)))


def structured_data(lang, path):
    """Who we are, what the product is, and the questions — for search engines."""
    url = SITE + path
    title, description = SEO_TITLES[lang]
    graph = [
        {"@type": "Organization", "@id": SITE + "/#organization", "name": "Suonable",
         "url": SITE, "legalName": "Viacolectiva S.R.L.", "taxID": "20606672081",
         "logo": SITE + "/suonable-mark.png",
         "address": {"@type": "PostalAddress", "streetAddress": "Av. San Luis 2754, San Borja",
                     "addressLocality": "Lima", "addressCountry": "PE"},
         "contactPoint": {"@type": "ContactPoint", "email": "hello@suonable.com",
                          "contactType": "customer support"}},
        {"@type": "WebSite", "@id": url + "#website", "url": url, "name": "Suonable",
         "inLanguage": lang, "description": description,
         "publisher": {"@id": SITE + "/#organization"}},
        {"@type": "SoftwareApplication", "@id": SITE + "/#app", "name": "Suonable",
         "url": "https://app.suonable.com/", "applicationCategory": "MultimediaApplication",
         "applicationSubCategory": "Music practice", "operatingSystem": "Web, macOS, Windows",
         "inLanguage": ["en", "it", "es"], "description": description,
         "publisher": {"@id": SITE + "/#organization"},
         "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"}},
        {"@type": "FAQPage", "@id": url + "#faq", "inLanguage": lang,
         "mainEntity": [{"@type": "Question", "name": q,
                         "acceptedAnswer": {"@type": "Answer", "text": a}}
                        for q, a in faq_data()["faq"][lang]]},
    ]
    payload = json.dumps({"@context": "https://schema.org", "@graph": graph},
                         ensure_ascii=False, indent=None, separators=(",", ":"))
    return '<script type="application/ld+json">%s</script>' % payload


def build_page(template, lang, path, dictionary):
    page = template
    page = page.replace(
        "<!-- Source template for the three language pages. Edit this, then run: python3 _build/build.py -->",
        "<!-- Generated by _build/build.py from _build/template.html. Edit those, not this file. -->", 1)
    page = page.replace('<meta name="robots" content="noindex">\n', "", 1)
    page = re.sub(r'<html lang="[^"]*">', f'<html lang="{lang}">', page, count=1)
    page = page.replace("<!-- @alternates -->", alternates(path), 1)
    page = page.replace('href="/" data-home', f'href="{path}"')
    page = page.replace('href="/legal/" data-legal', f'href="{path}legal/"')
    page = re.sub(r'(<a class="lang-btn" [^>]*data-lang="%s")' % lang.upper(),
                  r'\1 aria-current="page"', page)

    untranslated, missing = set(), set()
    if lang != DEFAULT:
        head_end = page.index("</head>")
        page = translate_head(page[:head_end], lang, dictionary, missing) + page[head_end:]
        page = translate_body(page, lang, dictionary, untranslated)

    title, description = SEO_TITLES[lang]
    page = re.sub(r"<title>.*?</title>", "<title>%s</title>" % html.escape(title), page, count=1, flags=re.S)
    page = re.sub(r'(<meta name="description" content=")[^"]*(">)',
                  lambda m: m.group(1) + html.escape(description, quote=True) + m.group(2), page, count=1)
    page = re.sub(r'(<meta property="og:title" content=")[^"]*(">)',
                  lambda m: m.group(1) + html.escape(title, quote=True) + m.group(2), page, count=1)
    page = page.replace("<!-- @faq -->", faq_section(lang), 1)
    page = page.replace("<!-- @jsonld -->", structured_data(lang, path), 1)
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
    for marker in ("<!-- @alternates -->", 'data-home', 'data-legal', "<!-- @faq -->",
                   "<!-- @jsonld -->", '<meta name="robots" content="noindex">'):
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

    import legal_pages
    legal_pages.build()


if __name__ == "__main__":
    main()
