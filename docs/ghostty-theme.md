# Ghostty theme implementation notes

This document records the Ghostty theme format and the intended mapping from
the existing Colorful Classic palette. It is a design and implementation
reference for a possible future Ghostty integration. Ghostty is not currently
part of the active development setup, and the actual theme files will be added
and tested separately when Ghostty support is pursued.

Documentation checked: 2026-09-20.

## Official Ghostty model

A Ghostty theme is an ordinary Ghostty configuration file. It uses the same
case-sensitive `key = value` syntax as the main configuration, but Ghostty
loads the theme before the user's configuration. As a result, a user can
override any color from the theme in their own configuration.

Theme files should remain color-only even though Ghostty technically permits
most configuration options in them. A theme must not set `theme` or
`config-file`; Ghostty ignores those options inside a theme.

Important syntax details:

- Use one `key = value` assignment per line.
- Blank lines are ignored.
- Comments begin with `#` and must occupy their own line. Do not append an
  inline comment after a value.
- Colors accept `#RRGGBB`, `RRGGBB`, or named X11 colors. Colorful Classic
  should use six-digit hexadecimal values consistently.
- Ghostty's documented color options do not accept the eight-digit alpha
  colors used by the Zed theme. Transparent Colorful Classic colors must be
  composited into solid RGB colors before being copied into Ghostty.
- A theme may contain options beyond colors, so users should review themes
  from untrusted sources before installing them.

The core options expected in a complete color theme are:

| Option | Purpose |
| --- | --- |
| `background` | Default terminal cell and window background |
| `foreground` | Default terminal text color |
| `palette = N=#RRGGBB` | ANSI/256-color entry; repeat once per index |
| `cursor-color` | Cursor fill color |
| `cursor-text` | Text drawn under a block cursor |
| `selection-background` | Selected-cell background |
| `selection-foreground` | Selected text color |

Useful optional color-related settings include `minimum-contrast`,
`bold-color`, `search-background`, `search-foreground`,
`search-selected-background`, and `search-selected-foreground`. They should
only be added when there is a deliberate Colorful Classic design decision for
them. In particular, setting `bold-color` to one fixed color would discard the
semantic color of bold ANSI text, so it should be omitted unless that behavior
is explicitly desired.

## ANSI palette indices

Most themes define the standard 16 ANSI entries. Ghostty also supports indices
16-255. `palette-generate` can derive those extended entries from the first 16
colors, but it is disabled by default because some applications assume the
standard xterm 256-color cube. Colorful Classic should initially leave
`palette-generate` disabled and define only indices 0-15.

| Index | Conventional role | Index | Conventional role |
| ---: | --- | ---: | --- |
| 0 | black | 8 | bright black |
| 1 | red | 9 | bright red |
| 2 | green | 10 | bright green |
| 3 | yellow | 11 | bright yellow |
| 4 | blue | 12 | bright blue |
| 5 | magenta | 13 | bright magenta |
| 6 | cyan | 14 | bright cyan |
| 7 | white | 15 | bright white |

Applications choose ANSI colors by index, so the role and ordering must not be
changed even if a palette color's visual hue is unusual.

## Planned Colorful Classic mapping

The canonical source for terminal colors is the `terminal.*` section of
[`colorful-classic.json`](../colorful-classic.json). Do not derive the
terminal palette from syntax tokens or from the IntelliJ UI theme.

### Core colors

| Ghostty role | Colorful Classic Dark | Colorful Classic Light | Source or decision |
| --- | --- | --- | --- |
| `background` | `#1b1712` | `#ddd1c0` | `terminal.background` |
| `foreground` | `#d6c0a2` | `#35312b` | `terminal.foreground` |
| `cursor-color` | `#69bfd2` | `#126c8a` | Existing cyan caret/accent |
| `cursor-text` | `#1b1712` | `#ede3d6` | Solid contrasting color |
| `selection-background` | `#2f4142` | `#aab8b2` | Cyan selection composited over terminal background |
| `selection-foreground` | `#d6c0a2` | `#35312b` | Default foreground |

The selection backgrounds above are the solid approximations of the existing
25%-opacity cyan selections (`#69bfd240` and `#126c8a40`) over each terminal
background. This preserves the intended look without relying on unsupported
alpha notation.

The light cursor text uses the lighter editor surface rather than the terminal
background. Its contrast against the cursor is about 4.68:1, while the light
terminal background against the same cursor is only about 3.94:1.

### ANSI colors

| Index | Role | Dark | Light |
| ---: | --- | --- | --- |
| 0 | black | `#1b1712` | `#35312b` |
| 1 | red | `#fa6a60` | `#c0261e` |
| 2 | green | `#5bc600` | `#367106` |
| 3 | yellow | `#e4a91f` | `#895a06` |
| 4 | blue | `#4cb2d0` | `#11668c` |
| 5 | magenta | `#8986d9` | `#5e58b2` |
| 6 | cyan | `#69bfd2` | `#126c8a` |
| 7 | white | `#d6c0a2` | `#6f5c42` |
| 8 | bright black | `#6a563d` | `#6e5b41` |
| 9 | bright red | `#fa8479` | `#bf433a` |
| 10 | bright green | `#5bc600` | `#3a7c07` |
| 11 | bright yellow | `#e1bc5f` | `#926408` |
| 12 | bright blue | `#69bfd2` | `#15769a` |
| 13 | bright magenta | `#be93d0` | `#825ea3` |
| 14 | bright cyan | `#2ce7ac` | `#0e7c5e` |
| 15 | bright white | `#ebd9c6` | `#796b5a` |

The source theme also defines `terminal.bright_foreground`,
`terminal.dim_foreground`, and a separate set of `terminal.ansi.dim_*` colors.
Ghostty's base 16-color theme format has no direct slots for the eight dim
variants. Faint text is produced through opacity, and the bright foreground
should not be mapped to a fixed `bold-color` because doing so would flatten
colored bold text. These source tokens therefore remain intentionally unmapped.

## Planned files and names

When implementation begins, use this layout:

```text
ghostty/
├── Colorful Classic Dark
└── Colorful Classic Light
```

The filename is the custom theme name. Avoid an extension so that the user
configuration stays clean and matches the product names used by Zed and the
JetBrains plugin.

Each file should contain only the six standalone core color assignments and
the 16 `palette` assignments. Keep the index lines in numeric order so the
light and dark files can be compared easily.

Minimal shape of one file:

```ini
background = #RRGGBB
foreground = #RRGGBB
cursor-color = #RRGGBB
cursor-text = #RRGGBB
selection-background = #RRGGBB
selection-foreground = #RRGGBB

palette = 0=#RRGGBB
palette = 1=#RRGGBB
# Continue in order through index 15.
```

## Installation and selection

For lookup by name, install both files in:

```text
$XDG_CONFIG_HOME/ghostty/themes/
```

If `XDG_CONFIG_HOME` is unset, that resolves to:

```text
~/.config/ghostty/themes/
```

Ghostty also accepts an absolute theme file path. The name-based setup below is
the simplest portable installation for a distributed theme. Theme lookup is
case-sensitive on case-sensitive filesystems, so the configured names must
match the filenames exactly.

Add this to the Ghostty user configuration:

```ini
theme = light:Colorful Classic Light,dark:Colorful Classic Dark
```

Both `light:` and `dark:` must be present in the paired form. Their order does
not matter. Ghostty then follows the current system appearance. A current
Ghostty limitation documented for macOS is that the titlebar tabs style may
not update when the system switches themes.

The main configuration file is normally one of:

- `$XDG_CONFIG_HOME/ghostty/config.ghostty`
- `~/.config/ghostty/config.ghostty` when `XDG_CONFIG_HOME` is unset
- `~/Library/Application Support/com.mitchellh.ghostty/config.ghostty` on
  macOS

If multiple supported config files exist, Ghostty loads them in its documented
order and later conflicting values win.

Reload the configuration after installing or editing themes:

- macOS: `cmd+shift+,`
- Linux: `ctrl+shift+,`

These are default bindings for the `reload_config` action. Some unrelated
Ghostty options require a restart, but color changes are intended to reload.

## Validation plan

Ghostty is planned for future use and is not currently part of the active
development environment. Execute these checks later, when the theme files are
implemented and Ghostty is available for hands-on testing.

1. Copy both files into the user theme directory.
2. Run `ghostty +list-themes` and confirm that both exact names appear and
   preview correctly.
3. Add the paired `theme` setting to the user configuration.
4. Run `ghostty +validate-config`; a successful validation exits without a
   configuration error.
5. Reload Ghostty and test both system appearances.
6. Print or display all ANSI colors, including normal and bright indices.
7. Test default text, bold text, faint text, inverse video, selected text, and
   the cursor over both default and explicitly colored cells.
8. Test a palette-heavy TUI such as Neovim, `htop`, or a shell prompt, plus a
   true-color sample. True-color application output is not remapped by the
   16-color palette.
9. Check that selection and cursor text remain readable in both variants.
10. Compare screenshots with the Zed terminal rendering and investigate any
    role mismatch rather than adjusting colors ad hoc.

Accessibility targets for this theme:

- Default foreground/background: at least 7:1 where practical. The current
  mapping is approximately 10.12:1 in dark mode and 8.59:1 in light mode.
- Selection foreground/background: at least 4.5:1. The current mapping is
  approximately 6.10:1 dark and 6.28:1 light.
- ANSI semantic colors: at least 3:1 against the default background. This
  lower threshold retains hue separation for terminal UI elements; long-form
  text should use the default foreground.

Do not add `minimum-contrast` to the distributed theme initially. It can alter
the authored palette at render time. Users who prefer enforcement can add, for
example, `minimum-contrast = 3` to their own configuration, which overrides
the theme.

## Official references

- [Ghostty: Color Theme](https://ghostty.org/docs/features/theme) — theme
  authoring, theme locations, listing themes, and light/dark pairing.
- [Ghostty: Configuration](https://ghostty.org/docs/config) — config file
  locations, syntax, load order, reloading, and offline documentation.
- [Ghostty: Option Reference](https://ghostty.org/docs/config/reference) —
  authoritative definitions for `theme`, color fields, `palette`,
  `palette-generate`, `minimum-contrast`, and related options.
- [Ghostty configuration source](https://github.com/ghostty-org/ghostty/blob/main/src/config/Config.zig)
  — upstream source comments from which the option reference is generated.
