#!/usr/bin/env python3
"""Draw the chord shapes block (piano keyboards and guitar diagrams) into the template.

    python3 _build/chord_shapes.py && python3 _build/build.py

Rewrites what sits between the "chord shapes" markers inside <section id="chords">
in _build/template.html, so changing which chords are shown, or their fingerings,
is an edit here instead of by hand in the SVG. The copy around the diagrams lives
in the template and its translations in i18n.json. Colours follow the app's dark
mode, because the block sits in the dark chords section.
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


def piano(notes, octaves=2, w=10.0, h=58.0, maxw=None):
    on = set(voicing(notes))
    bw, bh = 6.0, 35.0
    cap = ("max-width: %dpx;" % maxw) if maxw else ""
    parts = ['<svg viewBox="0 0 %g %g" width="100%%" height="auto" aria-hidden="true" focusable="false" '
             'style="display: block; width: 100%%; %s height: auto; margin: 0 auto;">' % (octaves * 7 * w, h, cap)]
    for o in range(octaves):
        for i, semi in enumerate(WHITE):
            fill = KEY_ON if (o * 12 + semi) in on else KEY
            parts.append('<rect x="%g" y="0.5" width="%g" height="%g" rx="1.6" fill="%s" stroke="%s" stroke-width="1"/>'
                         % ((o * 7 + i) * w + 0.5, w - 1, h - 1, fill, KEY_EDGE))
    for o in range(octaves):                                   # black keys sit on top of the white ones
        for i, semi in BLACK_AFTER.items():
            fill = KEY_ON if (o * 12 + semi) in on else KEY_BLACK
            parts.append('<rect x="%g" y="0.5" width="%g" height="%g" rx="1.4" fill="%s"/>'
                         % ((o * 7 + i + 1) * w - bw / 2, bw, bh, fill))
    return "".join(parts) + "</svg>"


def guitar(base, barre, dots, muted, width):
    """base: first fret drawn; barre: (fret, from_string, to_string); dots: [(string, fret)]."""
    L, TOP, SX, FY, FRETS = 15.0, 18.0, 11.0, 15.0, 5
    W, H = L + 5 * SX + 10, TOP + FRETS * FY + 4
    p = ['<svg viewBox="0 0 %g %g" width="%d" height="auto" aria-hidden="true" focusable="false" '
         'style="display: block; width: %dpx; max-width: 100%%; height: auto; margin: 0 auto;">' % (W, H, width, width)]
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
    return "".join(p) + "</svg>"


# the same moment of a song on both instruments: G# playing, then C#, F#, A#m
PIANO = [("G#", "G# C D#"), ("C#", "C# F G#"), ("F#", "F# A# C#"), ("A#m", "A# C# F")]
GUITAR = [  # (name, notes, first fret drawn, barre, dots, muted strings) — low E on the left
    ("G#", "G# C D#", 4, (4, 0, 5), [(1, 6), (2, 6), (3, 5)], []),
    ("C#", "C# F G#", 4, (4, 1, 5), [(2, 6), (3, 6), (4, 6)], [0]),
    ("F#", "F# A# C#", 2, (2, 0, 5), [(1, 4), (2, 4), (3, 3)], []),
    ("A#m", "A# C# F", 1, (1, 1, 5), [(2, 3), (3, 3), (4, 2)], [0]),
]


def playing_card(name, notes, art):
    return ('<div style="border: 1px solid #2E4C77; border-radius: 12px; background: #17243A; padding: 14px 14px 16px; '
            'flex: 1; display: flex; flex-direction: column; justify-content: center;">\n'
            '            <div style="%s font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em; color: #8A97A8; text-align: center;">PLAYING</div>\n'
            '            <div translate="no">\n'
            '              <div style="font-size: clamp(21px, 2vw, 26px); font-weight: 800; letter-spacing: -0.03em; color: #6098DB; text-align: center; padding: 3px 0 1px;">%s</div>\n'
            '              <div style="%s font-size: 11px; letter-spacing: 0.06em; color: #8FB6E8; text-align: center; padding-bottom: 12px;">%s</div>\n'
            '              %s\n'
            '            </div>\n'
            '          </div>' % (MONO, name, MONO, notes, art))


def next_card(name, notes, art):
    return ('<div style="border: 1px solid #2A333F; border-radius: 10px; padding: 10px 8px 12px;" translate="no">\n'
            '            <div style="font-size: 13.5px; font-weight: 800; letter-spacing: -0.02em; color: #F4F7FA; text-align: center;">%s</div>\n'
            '            <div style="%s font-size: 9.5px; letter-spacing: 0.06em; color: #8A97A8; text-align: center; padding-bottom: 9px;">%s</div>\n'
            '            %s\n'
            '          </div>' % (name, MONO, notes, art))


def card(active, cards):
    pills = []
    for label in ("Piano", "Guitar"):
        if label == active:
            pills.append('<span style="border-radius: 99px; padding: 6px 15px; font-size: 12.5px; font-weight: 700; background: #2A333F; color: #6098DB;">%s</span>' % label)
        else:
            pills.append('<span style="border-radius: 99px; padding: 6px 15px; font-size: 12.5px; font-weight: 600; color: #8A97A8;">%s</span>' % label)
    nexts = "\n          ".join(next_card(*c) for c in cards[1:])
    return ('      <div data-reveal="1" style="background: #101823; border: 1px solid #2A333F; border-radius: 16px; '
            'padding: clamp(14px, 1.8vw, 20px); display: flex; flex-direction: column;">\n'
            '        <div style="display: inline-flex; align-items: center; gap: 4px; background: #1C232C; border-radius: 99px; '
            'padding: 3px; margin-bottom: 16px; align-self: flex-start;">\n'
            '          %s\n'
            '        </div>\n'
            '        %s\n'
            '        <div style="%s font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em; color: #8A97A8; padding: 16px 0 10px;">UP NEXT</div>\n'
            '        <div class="shapes-next">\n'
            '          %s\n'
            '        </div>\n'
            '      </div>' % ("\n          ".join(pills), playing_card(*cards[0]), MONO, nexts))


piano_cards = [(n, notes, piano(notes.split(), maxw=232 if i == 0 else 126))
               for i, (n, notes) in enumerate(PIANO)]
guitar_cards = [(n, notes, guitar(b, barre, dots, muted, 124 if i == 0 else 72))
                for i, (n, notes, b, barre, dots, muted) in enumerate(GUITAR)]

block = '%s\n    <div class="shapes-grid">\n%s\n%s\n    </div>\n    %s' % (
    START, card("Piano", piano_cards), card("Guitar", guitar_cards), END)

path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "template.html")
tpl = open(path, encoding="utf-8").read()
start, end = tpl.index(START), tpl.index(END) + len(END)
open(path, "w", encoding="utf-8").write(tpl[:start] + block + tpl[end:])
print("wrote the chord shapes block into template.html")
