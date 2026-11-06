# Arbor Dental Services site

One-page site for Arbor Dental Services (mobile dentistry for long-term care residents, Gilford NH).
Static HTML and CSS with a small Motion bundle. No framework. Deploy the folder as static files
(`index.html`, `assets/`, `img/`).

```bash
npm install
npm run build     # bundles src/main.js with Motion, copies fonts
npm run serve     # http://localhost:4173
npm test          # Playwright at 8 screen sizes + axe WCAG 2.1 AA checks
npm run shots     # section screenshots into ./screenshots
```

Before launch, see "Must confirm with client" in `CLAUDE.md` (sample quotes, office email, towns, Medicaid enrollment,
X-ray rules). The request forms validate and confirm on the page but are not connected to a backend yet.
