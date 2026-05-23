# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website hosted on GitHub Pages. Currently a "coming soon" landing page — a minimalist static site with no build tools, no package manager, and no dependencies.

## Local Development

No build step. Open `index.html` directly in a browser, or serve it with any static file server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Architecture

Three files make up the entire site:

- `index.html` — structure and inline SVG social icons
- `style.css` — all styling (no external CSS libraries)
- `script.js` — placeholder; currently only a `console.log`

## Design Conventions

**Color palette:**
- Background: `#ddd8cc` (warm beige)
- Dark surface / buttons: `#111`
- Light text / icon fill: `#f5f0e8`

**Typography:** `"Courier New", Courier, monospace` for the main label; wide letter-spacing (`0.35em`) and uppercase for the labelmaker aesthetic.

**Shadows:** Both `.label` and `.socials a` share the same three-layer box-shadow pattern (inner highlight, inner bottom shadow, outer drop shadow). Keep them in sync when adding new elements.

**SVG icons:** Inline SVGs use `fill: currentColor` — icon color is inherited from the parent's `color` property, so changing `color` on `.socials a` automatically recolors icons.

**Hover state:** Opacity reduction (`opacity: 0.65`) on `transition: opacity 0.15s ease` — no color change on hover.

## HTML Conventions

External links always use `target="_blank" rel="noopener" aria-label="..."`. Maintain this pattern for any new social or outbound links.
