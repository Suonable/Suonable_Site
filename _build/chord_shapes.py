#!/usr/bin/env python3
"""Draw the chord shapes section (piano keyboards and guitar diagrams) into the template.

    python3 _build/chord_shapes.py && python3 _build/build.py

Rewrites the <section id="shapes"> block in _build/template.html from the chords
listed below, so changing which chords are shown (or their fingerings) is an edit
here rather than by hand in the SVG markup. The copy around the diagrams lives in
the template and its translations in i18n.json.
"""
PC = {"C":0,"C#":1,"D":2,"D#":3,"E":4,"F":5,"F#":6,"G":7,"G#":8,"A":9,"A#":10,"B":11}
WHITE = [0,2,4,5,7,9,11]
BLACK_AFTER = {0:1, 1:3, 3:6, 4:8, 5:10}   # white index in octave -> black key semitone

LINE, KEY_ON, DOT = "#17171B", "#4F86E3", "#1055AD"

def voicing(notes):
    """Semitone positions for the chord, stacked upwards from the root."""
    out, prev = [], None
    for n in notes:
        s = PC[n]
        while prev is not None and s <= prev:
            s += 12
        out.append(s); prev = s
    return out

def piano(notes, octaves=2, w=10.0, h=58.0, maxw=None):
    on = set(voicing(notes))
    bw, bh = 6.0, 35.0
    parts = ['<svg viewBox="0 0 %g %g" width="100%%" height="auto" aria-hidden="true" focusable="false" style="display: block; width: 100%%; %s height: auto; margin: 0 auto;">' % (octaves*7*w, h, ("max-width: %dpx;" % maxw) if maxw else "")]
    for o in range(octaves):                       # white keys first, black keys on top
        for i, semi in enumerate(WHITE):
            x = (o*7+i)*w
            fill = KEY_ON if (o*12+semi) in on else "#FFFFFF"
            parts.append('<rect x="%g" y="0.5" width="%g" height="%g" rx="1.6" fill="%s" stroke="%s" stroke-width="1"/>'
                         % (x+0.5, w-1, h-1, fill, LINE))
    for o in range(octaves):
        for i, semi in BLACK_AFTER.items():
            x = (o*7+i+1)*w - bw/2
            fill = KEY_ON if (o*12+semi) in on else LINE
            parts.append('<rect x="%g" y="0.5" width="%g" height="%g" rx="1.4" fill="%s"/>' % (x, bw, bh, fill))
    return "".join(parts) + "</svg>"

def guitar(base, barre, dots, muted, width):
    """base: first fret drawn; barre: (fret, from_string, to_string); dots: [(string, fret)]."""
    L, TOP, SX, FY, FRETS = 15.0, 18.0, 11.0, 15.0, 5
    W, H = L + 5*SX + 10, TOP + FRETS*FY + 4
    p = ['<svg viewBox="0 0 %g %g" width="%d" height="auto" aria-hidden="true" focusable="false" style="display: block; width: %dpx; max-width: 100%%; height: auto; margin: 0 auto;">' % (W, H, width, width)]
    for s in range(6):                                            # strings
        p.append('<line x1="%g" y1="%g" x2="%g" y2="%g" stroke="%s" stroke-width="1"/>' % (L+s*SX, TOP, L+s*SX, TOP+FRETS*FY, LINE))
    for f in range(FRETS+1):                                      # frets
        p.append('<line x1="%g" y1="%g" x2="%g" y2="%g" stroke="%s" stroke-width="1"/>' % (L, TOP+f*FY, L+5*SX, TOP+f*FY, LINE))
    if base == 1:                                                 # nut
        p.append('<rect x="%g" y="%g" width="%g" height="3.2" rx="1.2" fill="%s"/>' % (L-0.5, TOP-3.4, 5*SX+1, LINE))
    else:
        p.append('<text x="%g" y="%g" font-family="\'JetBrains Mono\', monospace" font-size="9" font-weight="700" fill="#6E6E78" text-anchor="end">%d</text>' % (L-4, TOP+FY*0.72, base))
    for s in muted:                                               # muted strings
        x, y = L+s*SX, TOP-5.5
        p.append('<path d="M%g %g l5 5 M%g %g l-5 5" stroke="%s" stroke-width="1.2" stroke-linecap="round" fill="none"/>' % (x-2.5, y-2.5, x+2.5, y-2.5, LINE))
    if barre:
        f, s1, s2 = barre
        y = TOP + (f-base+0.5)*FY
        p.append('<rect x="%g" y="%g" width="%g" height="6.4" rx="3.2" fill="%s"/>' % (L+s1*SX-3.2, y-3.2, (s2-s1)*SX+6.4, DOT))
    for s, f in dots:
        p.append('<circle cx="%g" cy="%g" r="3.6" fill="%s"/>' % (L+s*SX, TOP+(f-base+0.5)*FY, DOT))
    return "".join(p) + "</svg>"

# the same moment of a song on both instruments: G# playing, then C#, F#, A#m
PIANO = [("G#", "G# C D#"), ("C#", "C# F G#"), ("F#", "F# A# C#"), ("A#m", "A# C# F")]
GUITAR = [  # (base fret, barre, dots, muted strings) — low E on the left
    ("G#", "G# C D#", 4, (4, 0, 5), [(1, 6), (2, 6), (3, 5)], []),
    ("C#", "C# F G#", 4, (4, 1, 5), [(2, 6), (3, 6), (4, 6)], [0]),
    ("F#", "F# A# C#", 2, (2, 0, 5), [(1, 4), (2, 4), (3, 3)], []),
    ("A#m", "A# C# F", 1, (1, 1, 5), [(2, 3), (3, 3), (4, 2)], [0]),
]

MONO = "font-family: 'JetBrains Mono', monospace;"

def playing_card(name, notes, art):
    return ('<div style="border: 1px solid #C9DCF7; border-radius: 14px; background: #F2F7FF; padding: 18px 16px 20px; flex: 1; display: flex; flex-direction: column; justify-content: center;">\n'
            '            <div style="%s font-size: 10px; font-weight: 700; letter-spacing: 0.12em; color: #8C8C94; text-align: center;">PLAYING</div>\n'
            '            <div translate="no">\n'
            '              <div style="font-size: clamp(28px, 3vw, 38px); font-weight: 800; letter-spacing: -0.03em; color: #1055AD; text-align: center; padding: 4px 0 2px;">%s</div>\n'
            '              <div style="%s font-size: 12.5px; letter-spacing: 0.06em; color: #4F86E3; text-align: center; padding-bottom: 16px;">%s</div>\n'
            '              %s\n'
            '            </div>\n'
            '          </div>' % (MONO, name, MONO, notes, art))

def next_card(name, notes, art):
    return ('<div style="border: 1px solid #E8E8E4; border-radius: 12px; padding: 14px 12px 16px;" translate="no">\n'
            '                <div style="font-size: 16px; font-weight: 800; letter-spacing: -0.02em; text-align: center;">%s</div>\n'
            '                <div style="%s font-size: 10.5px; letter-spacing: 0.06em; color: #6E6E78; text-align: center; padding-bottom: 12px;">%s</div>\n'
            '                %s\n'
            '              </div>' % (name, MONO, notes, art))

def band(active, cards):
    pills = []
    for label in ("Piano", "Guitar"):
        if label == active:
            pills.append('<span style="border-radius: 99px; padding: 7px 17px; font-size: 13.5px; font-weight: 700; background: #FFFFFF; color: #1055AD; box-shadow: 0 1px 2px rgba(12,15,20,0.10);">%s</span>' % label)
        else:
            pills.append('<span style="border-radius: 99px; padding: 7px 17px; font-size: 13.5px; font-weight: 600; color: #6E6E78;">%s</span>' % label)
    nexts = "\n          ".join(next_card(*c) for c in cards[1:])
    return ('      <div data-reveal="1" style="background: #FFFFFF; border: 1px solid #E8E8E4; border-radius: 18px; padding: clamp(18px, 2.2vw, 26px); display: flex; flex-direction: column;">\n'
            '        <div style="display: inline-flex; align-items: center; gap: 4px; background: #F1F1EE; border-radius: 99px; padding: 4px; margin-bottom: clamp(16px, 1.8vw, 22px); align-self: flex-start;">\n'
            '          %s\n'
            '        </div>\n'
            '        %s\n'
            '        <div style="%s font-size: 10px; font-weight: 700; letter-spacing: 0.12em; color: #8C8C94; padding: 20px 0 12px;">UP NEXT</div>\n'
            '        <div class="shapes-next">\n'
            '          %s\n'
            '        </div>\n'
            '      </div>' % ("\n          ".join(pills), playing_card(*cards[0]), MONO, nexts))

piano_cards = [(n, notes, piano(notes.split(), maxw=360 if i == 0 else None)) for i, (n, notes) in enumerate(PIANO)]
guitar_cards = [(n, notes, guitar(b, barre, dots, muted, 196 if i == 0 else 100))
                for i, (n, notes, b, barre, dots, muted) in enumerate(GUITAR)]

section = """  <section id="shapes" style="max-width: 1160px; margin: var(--space-gap, clamp(88px, 16vh, 196px)) auto 0;">
    <div style="{mono} font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #FDA51B; padding-bottom: 22px;">Chords, and how to play them</div>
    <h2 data-reveal="1" style="margin: 0 0 22px; font-size: clamp(30px, 4.4vw, 60px); font-weight: 800; letter-spacing: -0.045em; line-height: 1.05; max-width: 24ch;">Every chord, with the shape to play it.</h2>
    <p style="margin: 0 0 48px; font-size: clamp(15px, 1.3vw, 18px); line-height: 1.6; color: #6E6E78; max-width: 60ch;">Automatic chords don't stop at the name. Pick piano or guitar and the chord that's sounding shows the notes to press or the shape to hold, with the next three already on screen so your hand arrives ready to the change.</p>

    <div class="shapes-grid">
{piano}
{guitar}
    </div>
  </section>
""".format(mono=MONO, piano=band("Piano", piano_cards), guitar=band("Guitar", guitar_cards))

import os
tpl_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "template.html")
tpl = open(tpl_path, encoding="utf-8").read()
start = tpl.index('  <section id="shapes"')
end = tpl.index("</section>", start) + len("</section>\n")
open(tpl_path, "w", encoding="utf-8").write(tpl[:start] + section + tpl[end:])
print("wrote the chord shapes section into template.html")
