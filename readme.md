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
