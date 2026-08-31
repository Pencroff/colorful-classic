# Colorful Classic

**[Live theme demo →](https://colorful-classic.theme.pencroff.com/)**

Both variants — **Colorful Classic Dark** and **Colorful Classic Light** — ship in
every artifact below.

## Install

Neither artifact is published to a marketplace yet, so installation is manual.

### Zed

Drop the theme file into Zed's user themes directory; Zed picks it up without a
restart.

| Platform | Directory |
| --- | --- |
| macOS / Linux | `~/.config/zed/themes/` |
| Windows | `%APPDATA%\Zed\themes\` |

```sh
mkdir -p ~/.config/zed/themes
curl -fsSL -o ~/.config/zed/themes/colorful-classic.json \
  https://raw.githubusercontent.com/Pencroff/colorful-classic/main/colorful-classic.json
```

Then open the theme selector (`cmd-k cmd-t` on macOS, `ctrl-k ctrl-t` elsewhere)
and pick a variant. To pin it instead, set it in `settings.json`:

```json
{
  "theme": {
    "mode": "system",
    "light": "Colorful Classic Light",
    "dark": "Colorful Classic Dark"
  }
}
```

### JetBrains IDEs (IntelliJ IDEA, GoLand, PyCharm, WebStorm, …)

**Plugin — UI theme + editor colours.** Grab
[`intellij/colorful-classic.jar`](https://github.com/Pencroff/colorful-classic/raw/main/intellij/colorful-classic.jar),
then in the IDE:

1. *Settings → Plugins* → the gear icon → **Install Plugin from Disk…**
2. Select `colorful-classic.jar` and restart the IDE.
3. *Settings → Appearance & Behavior → Appearance → Theme* → **Colorful Classic
   Dark** or **Colorful Classic Light**. The matching editor colour scheme is
   applied with the theme.

Requires build 232 (2023.2) or newer.

**Editor colour scheme only.** If you want to keep your current UI theme, import
just the scheme — [`intellij/colorful-classic.icls`](intellij/colorful-classic.icls)
or [`intellij/colorful-classic-light.icls`](intellij/colorful-classic-light.icls):

1. *Settings → Editor → Color Scheme* → the gear icon → **Import Scheme…**
2. Pick the `.icls` file, then choose the imported scheme from the dropdown.

**Building the plugin from source.** `intellij/build.sh` zips `plugin.xml`, both
`.theme.json` files and both `.icls` files into `intellij/colorful-classic.jar`
(needs `bash` and `zip`):

```sh
./intellij/build.sh
```

## Development

Run it locally with `bun serve.ts` (serves `index.html` on http://localhost:8000).

---

Good palette-consistent candidates (none currently used by
  syntax):
  - #be93d0 — soft purple (from the Colorful Darcula reference,
   used there for GO_PACKAGE_LOCAL_CONSTANT). Fits the
  "literal/constant" semantics and sits far from every green in
   your theme.
  - #2ce7ac — bright cyan/teal (your
  terminal.ansi.bright_cyan). Distinctive, but slightly
  greenish — still differentiable from #5bc600/#30be47 because
  it shifts hue toward cyan.
  - #e1bc5f — warm yellow (bright_yellow), closer to
  attribute/tag family, which may collide instead.

  My recommendation: #be93d0 at syntax.text.literal — it pulls
  inline code/markdown literals into the purple lane, mirrors
  Darcula's "local constant" intent, and has maximum hue
  distance from both greens.

  If you'd prefer to keep things in the cooler/green-cyan
  family, #2ce7ac is the fallback.
