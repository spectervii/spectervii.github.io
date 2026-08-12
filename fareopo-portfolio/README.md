# Michael Oladapo Fareopo — Portfolio

Personal portfolio site for **Michael Oladapo Fareopo**, a Biotechnology graduate
(B.Tech, Federal University of Technology, Akure) with laboratory experience in
microbiology and molecular biology, and field experience in public health research
and data documentation.

**Live site:** https://spectervii.github.io/fareopo-portfolio/

## About this site

A single, self-contained page — `index.html`. No build step, no framework, no
dependencies beyond the Inter webfont. Open the file in a browser and it works.

- Light theme, responsive down to mobile
- Print stylesheet — the "Save as PDF" button produces a clean, one-file CV
- Semantic HTML with Open Graph tags for link previews

## Editing

All content lives directly in `index.html`. Everything is plain HTML in clearly
labelled sections (`<!-- HERO -->`, `<!-- EXPERIENCE -->`, and so on), so text can be
updated by editing it in place. Colours, spacing, and the accent colour are CSS
variables in the `:root` block at the top of the `<style>` tag.

## Deployment

Served by GitHub Pages from the `main` branch, root directory. Any push to `main`
republishes the site within a minute or so.
