# Hao Peng — Academic Homepage

Website: https://haopeng2000.github.io/

Adapted from [luost26/academic-homepage](https://github.com/luost26/academic-homepage), with a responsive two-column profile, publication cards, and research code pages. This version generates plain HTML and has no runtime dependencies.

## Update your information

1. Edit `profile.json`: biography, affiliation, research interests, and publications. Optional `email`, `portrait`, and `scholar` fields are empty until provided. `portrait` may contain a local image path; `scholar` should be a full profile URL.
2. Run `node build.mjs` (Node.js 18 or newer).
3. Commit the generated `index.html`, `publications.html`, and `projects.html` together with the source changes.

For a local preview, serve this folder with a static HTTP server, for example `npx --yes http-server . -p 8080`.

## GitHub Pages

In **Settings → Pages**, select **Deploy from a branch**, branch **main**, folder **/(root)**, and save. The `.nojekyll` file enables direct static publishing. No Ruby installation or build workflow is needed.

## Content sources

Name and affiliation: public GitHub profile. Publication metadata and paper URLs: the public [DAFRL](https://github.com/haopeng2000/DAFRL) and [DFTR](https://github.com/haopeng2000/DFTR) repositories. Research interests and biography summarize these published topics. No unverified degrees, positions, awards, or publication dates beyond the documented year are included.

## Credits

The layout is inspired by the MIT-licensed academic-homepage template. Its original license is retained in `LICENSE`.
