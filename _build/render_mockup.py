#!/usr/bin/env python3
"""Render the hero device mockup to the still images phones and tablets get.

The live mockup (a 2400px photo rig with the app UI laid out underneath and masked
to each screen) is too heavy for iOS Safari, whose web process runs out of memory and
fails with "A problem repeatedly occurred". Pages show these stills instead unless
the <head> script marks the screen as a desktop pointer (see styles.css, app.js).

Re-run after changing the mockup markup, its styles, or the photos in mockup/:
    python3 _build/render_mockup.py
Needs Google Chrome and Pillow. Writes mockup/still-{light,dark}-{800,1200,1800,2400}.webp
plus a 1200px PNG of each for browsers without WebP.
"""
import functools
import http.server
import os
import re
import subprocess
import tempfile
import threading
import time

from PIL import Image

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
WIDTHS = (800, 1200, 1800, 2400)
STAGE_W = 1200                      # CSS px; at 2x this is the photo's native 2400px
STAGE_H = STAGE_W * 1498 // 2400

# Freeze the moving parts on a representative frame: playhead a third of the way in,
# meters at their staggered levels, no transitions.
FREEZE_CSS = """
html, body { margin: 0 !important; background: transparent !important; }
.devices { padding: 0 !important; }
.devices-stage { width: %dpx !important; max-width: none !important; margin: 0 !important; }
*, *::before, *::after { animation-play-state: paused !important; transition: none !important; }
.playhead { animation-delay: -13s !important; }
""" % STAGE_W


def render_page(template, theme):
    fonts = re.search(r'<link href="https://fonts\.googleapis\.com/css2[^>]*>', template).group(0)
    block = template[template.index('<div class="devices">'):template.index('<section id="how"')]
    if theme == "dark":
        block = block.replace('data-theme="light"', 'data-theme="dark"')
        block = block.replace('id="ovLaptop"', 'id="ovLaptop" data-theme="dark"')
        block = block.replace('class="ov-phone"', 'class="ov-phone is-dark"')
    return (
        '<!DOCTYPE html><html class="live-mockup"><head><meta charset="utf-8">'
        + fonts
        + '<link rel="stylesheet" href="/styles.css"><style>' + FREEZE_CSS + "</style>"
        # app.js lays the rig out and draws the waveform; stop its theme flipping
        + "<script>window.setInterval = function () { return 0; };</script>"
        + '<script src="/app.js" defer></script></head><body>' + block + "</body></html>"
    )


def wait_for_file(path, proc, timeout=90):
    last, deadline = -1, time.time() + timeout
    while time.time() < deadline:
        size = os.path.getsize(path) if os.path.exists(path) else -1
        if size > 0 and size == last:
            return
        if size < 0 and proc.poll() is not None:
            raise SystemExit("Chrome exited without writing %s" % path)
        last = size
        time.sleep(1)
    raise SystemExit("timed out waiting for %s" % path)


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def main():
    with open(os.path.join(SITE, "_build", "template.html"), encoding="utf-8") as f:
        template = f.read()

    server = http.server.ThreadingHTTPServer(
        ("127.0.0.1", 0), functools.partial(QuietHandler, directory=SITE))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    port = server.server_address[1]

    page = os.path.join(SITE, "_build", ".still.html")
    try:
        with tempfile.TemporaryDirectory() as tmp:
            for theme in ("light", "dark"):
                with open(page, "w", encoding="utf-8") as f:
                    f.write(render_page(template, theme))
                shot = os.path.join(tmp, theme + ".png")
                # headless Chrome writes the screenshot but its updater can keep the process
                # alive, so wait for the file and then stop it
                chrome = subprocess.Popen([
                    CHROME, "--headless=new", "--hide-scrollbars", "--no-first-run",
                    "--no-default-browser-check", "--use-mock-keychain", "--password-store=basic",
                    "--disable-extensions", "--disable-sync", "--disable-background-networking",
                    "--user-data-dir=" + os.path.join(tmp, "profile"),
                    "--default-background-color=00000000", "--force-device-scale-factor=2",
                    "--window-size=%d,%d" % (STAGE_W, STAGE_H), "--virtual-time-budget=8000",
                    "--screenshot=" + shot, "http://127.0.0.1:%d/_build/.still.html" % port,
                ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                try:
                    wait_for_file(shot, chrome)
                finally:
                    chrome.kill()
                    chrome.wait()

                img = Image.open(shot).convert("RGBA")
                if img.size != (STAGE_W * 2, STAGE_H * 2):
                    raise SystemExit("unexpected screenshot size %s" % (img.size,))
                for w in WIDTHS:
                    out = img if w == img.width else img.resize((w, round(w * 1498 / 2400)), Image.LANCZOS)
                    out.save(os.path.join(SITE, "mockup", "still-%s-%d.webp" % (theme, w)),
                             "WEBP", quality=86, method=6)
                    if w == 1200:
                        out.save(os.path.join(SITE, "mockup", "still-%s-1200.png" % theme), optimize=True)
                print("rendered", theme)
    finally:
        server.shutdown()
        if os.path.exists(page):
            os.remove(page)


if __name__ == "__main__":
    main()
