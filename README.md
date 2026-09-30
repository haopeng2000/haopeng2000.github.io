# Hao Peng — Academic Homepage

Website: https://haopeng2000.github.io/

Uses the original HTML layouts, Bootstrap styles, fonts, navigation, profile cards, and publication cards from [luost26/academic-homepage](https://github.com/luost26/academic-homepage). The original Liquid source is stored in `template-sources.json`, and rendered to static HTML for GitHub Pages.

## Update content

Edit `profile.json`, then install dependencies and rebuild:

```sh
pnpm install
node build.mjs
```

Commit the generated HTML pages with your content changes. The optional email and Scholar fields remain empty until supplied.

## Photos and publication figures

- `haopeng.jpg`: optimized copy of the supplied personal photograph.
- `dafrl.png`: rasterized from the supplied one-page DAFRL diagram PDF.
- `dftr.png`: the supplied DFTR diagram.

Original local image folders are excluded from Git; their files are unchanged. Only web-ready copies are published.

## Layout

The original Home, Home (Layout 2), Publications, Blog, and Showcase navigation is retained. Blog and Showcase have empty states until personal content is added. Education, awards, and news remain hidden until verified content is supplied. The sidebar adds （彭浩） beneath Hao Peng.

## Deployment

GitHub Pages publishes `main` at `/(root)`. `.nojekyll` enables static publishing without Ruby. `projects.html` redirects to the publication list, which includes all code links.

## Credits and content sources

The MIT license and template attribution are retained. Publication metadata comes from the public DAFRL and DFTR repositories; name and affiliation come from the public GitHub profile.
