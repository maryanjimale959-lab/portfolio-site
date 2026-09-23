# Mariam Hassan Jimale — Portfolio

Dark arcade-themed developer portfolio: hand-coded pixel sprites (no image assets),
a playable 9×9 Go demo with a greedy AI opponent, animated RPG skill bars,
achievements, and every project linked to public code.

**Live site:** https://maryanjimale959-lab.github.io/portfolio-site

## Structure

| File | Purpose |
|---|---|
| `index.html` | Single-page site: hero, about, skills, achievements, arcade, projects, contact |
| `style.css` | Dark purple arcade theme, responsive, reduced-motion friendly |
| `sprites.js` | Pixel-art engine — every mascot/icon is a string map rendered to canvas |
| `script.js` | Interactions, particles, and the Go game engine (captures, ko, territory scoring) |

## Stack

Pure HTML / CSS / JavaScript — zero frameworks, zero dependencies.
Deployed with GitHub Pages from this repo.

## Editing

- Projects live directly in `index.html` (search for `project-card`).
- Pixel art: edit the string maps in `sprites.js` (`.` = transparent, letters = palette colors).
- Contact details: `index.html` (contact section) and `SITE_URL` / email in `script.js`.

Created by Mariam Hassan Jimale · Mogadishu
