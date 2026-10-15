# Yanqi Feng / 冯焱琦 — personal academic website

A bilingual, responsive academic homepage for GitHub Pages. The site uses plain HTML, CSS and JavaScript, with no package dependencies, external font requests, analytics, or build service. Chinese is the default; `?lang=en` opens English directly. The selected language is saved locally when browser storage is available.

## Files to maintain

| File | Purpose |
| --- | --- |
| `index.html` | Entry point, metadata, structured data and a pre-rendered Chinese snapshot |
| `assets/site-content.js` | All bilingual research, publication, education and award content; BibTeX records |
| `assets/site.js` | Rendering, language switch, topic filters, mobile menu and citation copy |
| `assets/site.css` | Responsive styling, keyboard focus styles, reduced motion and print layout |
| `assets/media/` | Portrait, paper figure and FinsROV design image |
| `cv/cv-zh.pdf`, `cv/cv-en.pdf` | Current downloadable CVs |
| `tools/prerender.cjs` | Refreshes the default Chinese HTML content without dependencies |
| `robots.txt`, `sitemap.xml` | Search discovery |

Edit both the `zh` and `en` entries in `assets/site-content.js` when updating content. Papers use the categories `underwater` and `planning`; `all` is a UI filter. Publication titles and author lists remain in their original publication language. The site does not display personal telephone numbers or birth dates.

After editing content or rendering templates, refresh the static snapshot:

```sh
node tools/prerender.cjs
```

The Chinese page remains readable when JavaScript is unavailable. Language switching, filters and clipboard behavior use JavaScript. BibTeX copy tries the Clipboard API, then a legacy copy fallback, and finally a keyboard-accessible manual copy dialog.

## Preview

Serve the repository with any static server. For example:

```sh
python -m http.server 8000
```

Open `http://localhost:8000/` and `http://localhost:8000/?lang=en`. Check mobile widths, navigation, publication filters, expandable summaries, copy buttons and the two CV links before publication. A `file://` preview can display the page, but an HTTP server better reflects production behavior.

## GitHub Pages

The entry point is root-level `index.html`; `.nojekyll` prevents legacy Jekyll processing. Serve the repository root through GitHub Pages, or publish these static files through a Pages workflow. The old Academic Pages template has been removed from the current tree; it remains recoverable in Git history at commit `06a7958`. The old CV download URLs in `files/` serve copies of the current PDFs.

When changing the domain, update the canonical, alternate-language and Open Graph URLs in `index.html`, the dynamic metadata in `assets/site.js`, the Person JSON-LD, `robots.txt`, and `sitemap.xml` together.

## Content and image sources

The supplied Chinese CV is the primary source for education, research, competitions and skills; the English CV is used as a translation aid. The new September 2026 preprint is included separately from the peer-reviewed ACTCE 2025 paper. Academic score 98.68 is not labeled GPA. The stated FinsROV contribution is limited to control and communication debugging and tutorial production.

- Personal portrait: reused from the original `Frank95zz.github.io` repository, `images/yanqifeng.png`. Its actual encoding is JPEG; the new copy has the matching `.jpg` extension.
- FinsROV model: [IWIN-FINS / FinsROV](https://github.com/IWIN-FINS/FinsROV-An-Underwater-Camera-Based-Multi-Robot-Platform), repository `Structure/Images/7b80ec35-c6fb-4c0f-8c48-df3105a3505e.png`. Copyright (c) 2026 FPJ-GAOGE; the repository provides an MIT license, retained in `assets/media/FINSROV-LICENSE.txt`, and also displays a CC BY-SA 4.0 badge. Preserve attribution and upstream licensing when redistributing its materials.
- Tracking paper illustration: Figure 1 from [Underwater Visual Target Tracking…](https://arxiv.org/html/2609.20731v1#S1.F1), a task-and-coordinate-system schematic, not an experimental photograph.
- ACTCE bibliographic record: [DOI 10.1109/ACTCE66599.2025.00019](https://doi.org/10.1109/ACTCE66599.2025.00019), checked against Crossref.
- The path illustration for the search paper is a decorative schematic, not a scientific result or reproduced experiment.

Content last reconciled: 15 October 2026. Star counts, view counts and other changing popularity metrics are intentionally omitted.
