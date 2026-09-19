#!/usr/bin/env python3
"""Draw the chord shapes block (piano keyboards and guitar diagrams) into the template.

    python3 _build/chord_shapes.py && python3 _build/build.py

Rewrites what sits between the "chord shapes" markers inside <section id="chords">
in _build/template.html. The shapes follow the chord strip above them the way the
app does: SEQ is the same run of chords as the chips in that strip and WINDOWS are
the same slices of the 16s loop as their ch1..ch7 animations, so the chord playing
and the three coming next change on the beat with it. Change either and both stay
in step. Colours follow the app's dark mode, because the section is dark.
"""
import os

PC = {"C": 0, "C#": 1, "D": 2, "D#": 3, "E": 4, "F": 5, "F#": 6,
      "G": 7, "G#": 8, "A": 9, "A#": 10, "B": 11}
WHITE = [0, 2, 4, 5, 7, 9, 11]
BLACK_AFTER = {0: 1, 1: 3, 3: 6, 4: 8, 5: 10}   # white key index in the octave -> black key semitone

KEY, KEY_EDGE, KEY_BLACK, KEY_ON = "#F4F7FA", "#0C0F14", "#0C0F14", "#6098DB"
FRET, DOT, FRET_NUM = "#C6D2E0", "#F4F7FA", "#8A97A8"
MONO = "font-family: 'JetBrains Mono', monospace;"
START, END = "<!-- chord shapes: python3 _build/chord_shapes.py -->", "<!-- /chord shapes -->"

# name, the notes the app prints, and the guitar shape (first fret drawn, barre, dots, muted strings)
CHORDS = {
    "gs": ("G#", "G# C D#", dict(base=4, barre=(4, 0, 5), dots=[(1, 6), (2, 6), (3, 5)], muted=[])),
    "ds": ("D#", "D# G A#", dict(base=6, barre=(6, 1, 5), dots=[(2, 8), (3, 8), (4, 8)], muted=[0])),
    "as": ("A#", "A# D F", dict(base=1, barre=(1, 1, 5), dots=[(2, 3), (3, 3), (4, 3)], muted=[0])),
    "cm": ("Cm", "C D# G", dict(base=3, barre=(3, 1, 5), dots=[(2, 5), (3, 5), (4, 4)], muted=[0])),
}
SEQ = ["gs", "ds", "as", "cm", "gs", "ds", "as"]          # the chips in the strip above, in order
WINDOWS = [(0, 13.7), (13.7, 30), (30, 41.2), (41.2, 62.5),
           (62.5, 71.2), (71.2, 87.5), (87.5, 100)]       # their slices of the 16s loop
SLOTS = 4                                                 # the chord playing, then three coming
BIG = {"piano": None, "guitar": 150}                      # the chord playing is drawn larger
SMALL = {"piano": None, "guitar": 92}
FADE = 0.35                                               # % of the loop spent swapping shapes


def voicing(notes):
    """Semitone positions for the chord, stacked upwards from the root."""
    out, prev = [], None
    for n in notes:
        s = PC[n]
        while prev is not None and s <= prev:
            s += 12
        out.append(s)
        prev = s
    return out


def piano_symbol(key, notes, octaves=2, w=10.0, h=40.0):
    on = set(voicing(notes.split()))
    bw, bh = 6.0, 24.0
    parts = ['<symbol id="pk-%s" viewBox="0 0 %g %g">' % (key, octaves * 7 * w, h)]
    for o in range(octaves):
        for i, semi in enumerate(WHITE):
            fill = KEY_ON if (o * 12 + semi) in on else KEY
            parts.append('<rect x="%g" y="0.5" width="%g" height="%g" rx="1.6" fill="%s" stroke="%s" stroke-width="1"/>'
                         % ((o * 7 + i) * w + 0.5, w - 1, h - 1, fill, KEY_EDGE))
    for o in range(octaves):                               # black keys sit on top of the white ones
        for i, semi in BLACK_AFTER.items():
            fill = KEY_ON if (o * 12 + semi) in on else KEY_BLACK
            parts.append('<rect x="%g" y="0.5" width="%g" height="%g" rx="1.4" fill="%s"/>'
                         % ((o * 7 + i + 1) * w - bw / 2, bw, bh, fill))
    return "".join(parts) + "</symbol>"


def guitar_symbol(key, base, barre, dots, muted):
    L, TOP, SX, FY, FRETS = 15.0, 18.0, 11.0, 15.0, 5
    W, H = L + 5 * SX + 10, TOP + FRETS * FY + 4
    p = ['<symbol id="gd-%s" viewBox="0 0 %g %g">' % (key, W, H)]
    for s in range(6):
        p.append('<line x1="%g" y1="%g" x2="%g" y2="%g" stroke="%s" stroke-width="1"/>'
                 % (L + s * SX, TOP, L + s * SX, TOP + FRETS * FY, FRET))
    for f in range(FRETS + 1):
        p.append('<line x1="%g" y1="%g" x2="%g" y2="%g" stroke="%s" stroke-width="1"/>'
                 % (L, TOP + f * FY, L + 5 * SX, TOP + f * FY, FRET))
    if base == 1:
        p.append('<rect x="%g" y="%g" width="%g" height="3.2" rx="1.2" fill="%s"/>' % (L - 0.5, TOP - 3.2, 5 * SX + 1, FRET))
    else:
        p.append('<text x="%g" y="%g" font-family="\'JetBrains Mono\', monospace" font-size="9" font-weight="700" '
                 'fill="%s" text-anchor="end">%d</text>' % (L - 5, TOP + FY * 0.75, FRET_NUM, base))
    for s in muted:
        x, y = L + s * SX, TOP - 5.5
        p.append('<path d="M%g %g l5 5 M%g %g l-5 5" stroke="%s" stroke-width="1.2" stroke-linecap="round" fill="none"/>'
                 % (x - 2.5, y - 2.5, x + 2.5, y - 2.5, FRET))
    if barre:
        f, s1, s2 = barre
        y = TOP + (f - base + 0.5) * FY
        p.append('<rect x="%g" y="%g" width="%g" height="6.4" rx="3.2" fill="%s"/>'
                 % (L + s1 * SX - 3.2, y - 3.2, (s2 - s1) * SX + 6.4, DOT))
    for s, f in dots:
        p.append('<circle cx="%g" cy="%g" r="3.6" fill="%s"/>' % (L + s * SX, TOP + (f - base + 0.5) * FY, DOT))
    return "".join(p) + "</symbol>"


def windows_for(slot, key):
    """The slices of the loop where this chord sits in this slot."""
    out = []
    for i, (a, b) in enumerate(WINDOWS):
        if SEQ[(i + slot) % len(SEQ)] == key:
            out.append((a, b))
    return out


def keyframes(slot, key, wins):
    """Hold the shape visible through its slices and swap quickly in between."""
    stops = []
    if not any(a == 0 for a, _ in wins):
        stops.append((0, 0))
    for a, b in wins:
        if a > 0:
            stops.append((round(a - FADE, 2), 0))
        stops.append((a, 1))
        stops.append((b if b < 100 else 100, 1))
        if b < 100:
            stops.append((round(b + FADE, 2), 0))
    if not any(b == 100 for _, b in wins):
        stops.append((100, 0))
    stops.sort()
    body = " ".join("%g%% { opacity: %d; }" % (p, v) for p, v in stops)
    return "@keyframes shape-%d-%s { %s }" % (slot, key, body)


def shape(slot, key, inst, width):
    """One chord on one instrument in one slot: its name, its notes and its drawing."""
    name, notes, _ = CHORDS[key]
    wins = windows_for(slot, key)
    rest = " shape-rest" if any(b == 100 for _, b in wins) else ""    # what shows when motion is off
    sym = ("pk-" if inst == "piano" else "gd-") + key
    view = "0 0 140 40" if inst == "piano" else "0 0 80 97"
    size = ' width="%d"' % width if width else ""
    return ('<div class="shape%s" style="animation-name: shape-%d-%s;">'
            '<div class="shape-name">%s</div><div class="shape-notes">%s</div>'
            '<svg class="shape-art" viewBox="%s"%s aria-hidden="true" focusable="false">'
            '<use href="#%s" xlink:href="#%s"/></svg></div>'
            % (rest, slot, key, name, notes, view, size, sym, sym))


def stack(slot, sizes):
    """Both instruments for one slot; the one not chosen keeps running out of sight."""
    sets = []
    for inst in ("piano", "guitar"):
        shapes = "".join(shape(slot, key, inst, sizes[inst]) for key in CHORDS)
        sets.append('<div class="shape-set shape-set-%s">%s</div>' % (inst, shapes))
    return '<div class="shape-stack" translate="no">%s</div>' % "".join(sets)


def panel():
    pills = ('<div class="shape-pills" role="group" aria-label="Instrument">'
             '<button type="button" class="shape-pill shape-pill-on" data-shape-instrument="piano" aria-pressed="true">Piano</button>'
             '<button type="button" class="shape-pill" data-shape-instrument="guitar" aria-pressed="false">Guitar</button>'
             '</div>')
    nexts = "".join('<div class="shape-next">%s</div>' % stack(s, SMALL) for s in range(1, SLOTS))
    return ('    <div class="shapes-panel" data-instrument="piano">\n'
            '      %s\n'
            '      <div class="shapes-body">\n'
            '        <div class="shape-playing">\n'
            '          <div class="shape-label">PLAYING</div>\n'
            '          %s\n'
            '        </div>\n'
            '        <div>\n'
            '          <div class="shape-label">UP NEXT</div>\n'
            '          <div class="shapes-next">%s</div>\n'
            '        </div>\n'
            '      </div>\n'
            '    </div>' % (pills, stack(0, BIG), nexts))


CSS = """<style>
/* The shapes follow the chord strip above: same 16s loop, same slices (_build/chord_shapes.py). */
.shapes-panel { border-top: 1px solid #2A333F; margin-top: 22px; padding-top: 20px; }
.shape-pills { display: inline-flex; align-items: center; gap: 4px; background: #1C232C; border-radius: 99px; padding: 3px; margin-bottom: 16px; }
.shape-pill { border: none; border-radius: 99px; padding: 6px 16px; font: inherit; font-size: 12.5px; font-weight: 600; color: #8A97A8; background: transparent; cursor: pointer; }
.shape-pill:hover { color: #C6D2E0; }
.shape-pill-on, .shape-pill-on:hover { background: #2A333F; color: #6098DB; font-weight: 700; }
.shapes-body { display: grid; grid-template-columns: minmax(200px, 420px) 1fr; gap: clamp(12px, 1.4vw, 20px); align-items: start; }
.shape-playing { border: 1px solid #2E4C77; border-radius: 12px; background: #17243A; padding: 14px 14px 16px; }
.shapes-next { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.shape-next { border: 1px solid #2A333F; border-radius: 10px; padding: 10px 8px 12px; }
.shape-label { %(mono)s font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em; color: #8A97A8; text-align: center; padding-bottom: 8px; }
.shape-stack { position: relative; }
.shape-set { display: grid; }
.shape-set > .shape { grid-area: 1 / 1; opacity: 0; animation-duration: 16s; animation-timing-function: linear; animation-iteration-count: infinite; }
.shape-set > .shape-rest { opacity: 1; }          /* the frame left showing when animation is off */
/* the instrument you are not looking at keeps running, out of flow, so switching stays in step */
[data-instrument="piano"] .shape-set-guitar, [data-instrument="guitar"] .shape-set-piano { position: absolute; top: 0; left: 0; right: 0; visibility: hidden; }
.shape-name { font-size: 14px; font-weight: 800; letter-spacing: -0.02em; color: #F4F7FA; text-align: center; }
.shape-playing .shape-name { font-size: clamp(22px, 2.2vw, 30px); color: #6098DB; letter-spacing: -0.03em; }
.shape-notes { %(mono)s font-size: 10px; letter-spacing: 0.06em; color: #8A97A8; text-align: center; padding-bottom: 10px; }
.shape-playing .shape-notes { font-size: 11.5px; color: #8FB6E8; padding-bottom: 14px; }
.shape-art { display: block; width: 100%%; height: auto; margin: 0 auto; }
.shape-playing .shape-art { max-width: 380px; }
.shape-next .shape-art { max-width: 210px; }
.shape-playing .shape-set-guitar .shape-art { max-width: 150px; }
.shape-next .shape-set-guitar .shape-art { max-width: 92px; }
@media (max-width: 759px) {
  /* on a phone the row is too narrow to split, and two shapes stay readable where three would not */
  .shapes-body { grid-template-columns: 1fr; }
  .shapes-next { grid-template-columns: repeat(2, 1fr); }
  .shapes-next > :nth-child(3) { display: none; }
}
%(keyframes)s
</style>"""

CSS = CSS % {
    "mono": MONO,
    "keyframes": "\n".join(keyframes(s, k, windows_for(s, k)) for s in range(SLOTS) for k in CHORDS),
}

defs = "".join(piano_symbol(k, CHORDS[k][1]) for k in CHORDS) + \
       "".join(guitar_symbol(k, **CHORDS[k][2]) for k in CHORDS)
sprite = ('<svg width="0" height="0" style="position: absolute" aria-hidden="true" focusable="false">'
          '<defs>%s</defs></svg>' % defs)

block = "%s\n    %s\n    %s\n%s\n    %s" % (START, CSS, sprite, panel(), END)

path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "template.html")
tpl = open(path, encoding="utf-8").read()
start, end = tpl.index(START), tpl.index(END) + len(END)
open(path, "w", encoding="utf-8").write(tpl[:start] + block + tpl[end:])
print("wrote the chord shapes block into template.html")
