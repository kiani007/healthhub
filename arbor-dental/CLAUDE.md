# Arbor Dental Services — website redesign

Client: Arbor Dental Services, LLC (Gilford, NH). Owner-dentist: Dr. Kristine "Kris" Blackwelder, DMD.
Current live site: https://arbordentalservices.com/ (GoDaddy one-pager). This repo holds the redesign.

## What the business actually is
Mobile dentistry for residents of nursing homes, assisted living and memory care communities in NH's Lakes Region.
Not a walk-in clinic. Two audiences:
1. Facility administrators / Directors of Nursing (primary buyer). They buy compliance relief: 42 CFR §483.55 (F790/F791),
   3-day denture referral rule, survey-ready documentation, less staff workload.
2. Families / responsible parties. They want reassurance, a call before non-urgent treatment, cost clarity, denture help.

No self-serve booking widget. Conversions are: "Schedule a facility consult" (primary), "Request a visit for a loved one",
and click-to-call (603) 707-1230 everywhere.

## Verified facts (safe to use)
- 54 Morgan Way, Gilford, NH 03249 · (603) 707-1230 · Org NPI 1922820703 · LLC registered Jun 2024
- Dr. Kris: DMD University of Louisville; licensed since 2005; Fellow, International College of Dentists (2016);
  NH Dental Society trustee and chair of Council on Governmental Affairs; co-owns Winnisquam Dental, Tilton
- Stats used on site: 84% of dependent LTC residents get no mouth care (Zimmerman et al., JAMA Netw Open 2020);
  31% fewer pneumonia cases in year one of a mouth-care program (UNC "Mouth Care Without a Battle", 2020)

## Must confirm with client before launch
- NH Smiles (Medicaid) provider enrollment
- Portable X-ray claims (NH He-P 4046.09 may restrict handheld units)
- Office email, hours, exact towns served (current list is plausible, not confirmed)
- Testimonials: the three quotes are tagged "Sample quote" and must be replaced with real ones
- 4.9 / 480+ reviews belongs to Winnisquam Dental, not Arbor

## Design system (from assets/css/site.css :root)
- Colors: white #FFFFFF, mist #F3F8FA, tint #E3F4F7, line #D8E3E8, line-strong #C2D3DA, teal #016E7C (brand accent, derived from
  the logo teal #0195A8 and darkened to pass 4.5:1 on white; actions/accents only), teal-dark #015A66, deep #06343A (the few dark
  surfaces: facility panel, equipment band, final call to action), teal-on-deep #8ED6DF, ink #0B1A1D, muted #46585E.
- Type: Newsreader (self-hosted variable serif, optical sizes) for h1/h2, panel and quote text, and big numerals, weight 400,
  -0.02 to -0.03em tracking. Plus Jakarta Sans for body, h3, labels and buttons. Body 18px / 1.6. Lede 18-20px.
- Layout: 1200px container, left-aligned; section padding clamp(72px, 9vw, 128px); radius 12/20/28px. Ruled lists (hairlines)
  instead of boxed cards for services, kit, creds, tips and payment. Hero photo bleeds to the right edge on desktop.
- Motion (Motion 14, bundled by esbuild into assets/js/main.js): one hero entrance (words come into focus, photo wipes in),
  photos open from an inset frame as they scroll in, a scroll-linked rail in "How it works", spring tab indicator,
  height-animated FAQ, phone action bar that hides near the hero buttons, the form and the footer. Everything is visible
  without JavaScript and with reduced motion.
- No gradients, no emoji icons, no eyebrow labels above headings, inline stroke SVG icons only, one primary CTA per view.
- Photos: real photography only (img/), never stock or AI-looking imagery. Responsive WebP/JPEG variants from scripts/images.sh.

## Files
- index.html: page markup and copy (source of truth for copy and layout).
- assets/css/site.css: all styles. assets/js/main.js: built bundle (do not edit). src/main.js: animation and interaction source.
- assets/fonts/: Newsreader and Plus Jakarta Sans, copied from @fontsource-variable by the build.
- img/: hero, process, kit, portrait (client-supplied) plus 800/1400 WebP and 800 JPEG variants, kris-face.jpg (byline crop),
  logo-mark.png (transparent teal mark).
- original.html: the pre-refinement page, kept for comparison. Safe to delete.
- tests/site.spec.js: Playwright suite run at 8 screen sizes (320 to 1920px). scripts/shots.mjs: section screenshots.

## Commands
- npm install, then npm run build (bundle + fonts), npm run serve (http://localhost:4173), npm run dev (watch + serve)
- npm test (build, then Playwright + axe accessibility checks), npm run shots (screenshots into ./screenshots), npm run images

## Suggested next steps in Claude Code
1. Port to Next.js (App Router) + Tailwind, keeping the tokens above as theme values. One route per audience:
   / (home), /facilities, /families, /services, /how-it-works, /about, /contact.
2. Form handler: Supabase table `visit_requests` with `audience` enum (facility|family), server action with validation,
   notification email via a BAA-capable vendor. Keep the "no medical details" hint on both forms.
3. Add LocalBusiness/Dentist JSON-LD (already in index.html head), sitemap, OG image.
4. Lighthouse pass: images already sized and lazy-loaded; add `next/image` with the given dimensions.

## Conventions
- Copy: plain, specific, active voice, no em dashes, sentence case. Keep Dr. Kris's own wording in the signed note.
- Accessibility: 4.5:1 contrast, visible focus rings, labels on every input, 44px touch targets, reduced-motion respected.
