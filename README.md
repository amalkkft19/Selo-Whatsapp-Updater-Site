# Selo marketing website

The public website for **Selo: WhatsApp Updater**, the Shopify app for WhatsApp marketing, automation and AI customer service. Built from the website brief (originally written for "SendWise"; every mention is now Selo).

Static HTML, generated at build time. No framework and no client-side rendering. Every page is readable without JavaScript.

## Quick start

```bash
npm install
npm run build            # production build into dist/ (clean URLs: /features/copilot/)
npm run preview          # serve dist/ at http://localhost:8080
```

Other builds:

| Command | What it does |
|---|---|
| `npm run build:files` | Preview build into `dist-preview/` with relative `index.html` links (open files directly) |
| `npm run build:flags` | Every upcoming feature switched on, into `dist-flags/`. **Preview only, never deploy.** |
| `SITE_URL=https://www.selo.com npm run build` | Override the site URL used in canonical links, sitemap and structured data |
| `FORM_ENDPOINT=https://… npm run build` | Set the contact form endpoint |
| `STRICT=1 npm run build` | Fail the build if any title is over 60 characters or description over 155 |

Deploy `dist/` to any static host with HTTPS and a CDN (Cloudflare Pages, Netlify, Vercel). Configure the host to serve `404.html` for unknown paths.

## Where things live

```
site.config.json          Company details, links, pricing, trial, analytics, feature flags. Replace placeholders here.
src/i18n/en.json          Interface strings (navigation, footer, CTA band, cookie banner)
src/content/en/           Page copy, one module per area (home, features, pricing, company, legal, faq)
src/content/en/upcoming.mjs   Every upcoming feature's content (section 14), in one place
src/content/en/chats.mjs      Chat mockup scripts A–E
src/lib/                  Components, chat and product UI mockups, helpers
src/styles/tokens.mjs     Design tokens (light and dark)
src/styles/styles.css     All styles, mobile-first
src/assets/main.js        Menu, theme, cookie consent, analytics events, pricing toggle, form
src/assets/brand/         Selo logo mark (SVG, recreated from the supplied logo) and the original JPG
build.mjs                 Build: pages, JSON-LD, sitemap, robots, favicons, Open Graph images
```

## Brand

- **Name:** Selo (short brand) · **Selo: WhatsApp Updater** (product name, used in structured data and the press kit).
- **Logo:** `src/assets/brand/selo-mark.svg`, a vector redraw of the supplied logo (white speech-bubble ring on a green rounded square). The wordmark "Selo" is set in Inter Bold next to it.
- **Colours:** the brief's teal was swapped for greens taken from the logo. The logo green `#00A14B` is used only for the mark, because white text on it is 3.4:1, below WCAG AA. Buttons and links use `#087A3F` (5.4:1 on white). Dark mode uses `#3DDC84` with dark text on buttons.

## Mobile

Mobile-first CSS with breakpoints at 640px, 1024px and 1100px (desktop navigation). Checked with no horizontal scroll at 320, 390, 768 and 1280px on every page. Tables reflow into stacked cards under 768px. The pricing comparison becomes per-plan accordions under 900px. The mobile menu is a full-height panel with the two buttons pinned at the bottom, and it works without JavaScript.

## Feature flags (brief section 14)

```json
"features": { "voiceNotes": false, "codRiskScoring": false, "addressFixer": false, "copilotDailySummary": false, "showComingSoon": false }
```

- A flag that is `false` removes all of that feature's content at build time: page section, FAQ entries (and FAQ structured data), pricing rows, use-case bullets, changelog entry, Home and "Also included" lines. Nothing is hidden with CSS.
- Override one flag with an environment variable: `SITE_FEATURES_VOICE_NOTES=true`, `SITE_FEATURES_COD_RISK_SCORING=true`, `SITE_FEATURES_ADDRESS_FIXER=true`, `SITE_FEATURES_COPILOT_DAILY_SUMMARY=true`, `SITE_FEATURES_SHOW_COMING_SOON=true`.
- Before switching one on, open `src/content/en/upcoming.mjs` and check every line marked `CONFIRM AT RELEASE` against what shipped. Set its `releaseDate` for the changelog.

## Placeholders to replace before launch

All in `site.config.json` unless noted:

- Prices, plan gating (`src/content/en/pricing.mjs`), trial length, annual discount
- Company legal name, address, phones, emails, social links, company number / VAT
- App Store URL (`company.appListing`), scheduling link, form endpoint, Turnstile site key
- Analytics provider (`analytics`): loads only after consent
- Legal text (`src/content/en/legal.mjs`): all sections are headings only and need a lawyer
- Sub-processors and the AI provider name (`/security`)
- About story, team, company facts (`src/content/en/company.mjs`)
- Changelog dates (`changelogEntries` in `company.mjs`)
- Blog posts: outlines only. They are `noindex` and left out of the sitemap until written
- Sample testimonials, sample story and "Example results" stats are visibly labelled; replace with real, permission-cleared ones. The brief's "98% open rate" stat was left out because it had no source.
- The logo strip from the brief is not built, as instructed, until real logos exist.

## Checks run on this build

- No horizontal overflow at 320 / 390 / 768 / 1280 px on all 29 pages
- axe-core: 0 violations (WCAG 2.2 AA + best practice) on 10 key pages, light and dark, phone and desktop
- Lighthouse mobile: Home 99/100/100/100, Pricing 100/100/100/100, AI assistant 100/100/100/100 (performance / accessibility / best practices / SEO)
- Launch build contains no upcoming-feature copy; the all-flags build renders every block in its place
- 2,069 internal links resolve; contact form validation, success state and topic presets work; analytics only load after "Accept"
