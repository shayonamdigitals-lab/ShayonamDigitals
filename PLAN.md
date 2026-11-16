# Phase 0 Architecture & Execution Plan: Shayonam Digital Website Rebuild

## 1. Stack & Pinned Package Versions

Every package has been verified directly against the latest npm registry versions.

| Package | Version | Role | Notes |
|---|---|---|---|
| `astro` | `7.4.12` | Core static-first SSG/SSR framework | Hybrid rendering with static pre-rendering and server endpoints |
| `@astrojs/cloudflare` | `14.4.8` | Cloudflare Workers / Pages adapter | Enables Cloudflare D1 and serverless API endpoints |
| `@astrojs/react` | `7.1.9` | React Islands integration | Isolated client interactivity (forms, mobile menu, hero animation) |
| `@astrojs/sitemap` | `3.7.5` | XML Sitemap generation | Automated SEO crawling and indexing |
| `tailwindcss` | `4.3.5` | Styling engine | Tailwind v4 via `@tailwindcss/vite` |
| `@tailwindcss/vite` | `4.3.5` | Vite plugin for Tailwind v4 | Zero-config CSS theme tokens |
| `drizzle-orm` | `0.45.4` | Parameterized ORM | Type-safe queries on Cloudflare D1 |
| `drizzle-kit` | `0.31.11` | D1 Migrations and schema management | CLI schema migration generator |
| `resend` | `6.38.1` | Transactional email | Instant lead alert delivery to owner |
| `zod` | `4.6.7` | Schema validation | Shared client/server form validation |
| `motion` | `14.14.0` | Micro-interactions | Lazy-loaded inside React islands only |
| `@fontsource-variable/sora` | `5.3.0` | Display / Headline font | Self-hosted, zero render-blocking requests |
| `@fontsource-variable/instrument-sans` | `5.3.0` | Body / Text font | Self-hosted variable font for mobile legibility |
| `lucide-react` | `1.73.0` | Icons | Curated SVG icons, tree-shaken |
| `clsx` & `tailwind-merge` | `2.1.1` / `3.7.0` | Class merging | shadcn utility helpers |

**Package Manager:** `pnpm` only. Old `package-lock.json`, `figma-asset-resolver`, and obsolete prototype dependencies (MUI, Emotion, Slick, Recharts, React-DND, Express server) will be completely removed.

---

## 2. Design Tokens & Palette

Derived and sampled directly from `only logo.png` (icon mark) and `FP SD.png` (full lockup).

### 2.1 Color Tokens (`tokens.css`)

| Token | Hex Value | WCAG Contrast | Purpose / Placement |
|---|---|---|---|
| `--paper` | `#FFFEFC` | - | Primary warm white background |
| `--surface` | `#F7F2EA` | - | Warm cream background for alternate sections, cards, and input fields |
| `--ink` | `#3A2C22` | 13.33:1 on paper (AAA) | Body text; exact dark brown extracted from the "SHAYONAM" wordmark |
| `--ink-muted` | `#6B594D` | 6.59:1 on paper (AA) | Secondary copy, metadata, timestamps, and subtle borders |
| `--espresso` | `#2A201B` | 15.77:1 with paper | Deep rich dark band for footer and final high-impact CTA |
| `--amber` | `#F5A03C` | 6.38:1 with ink text | Primary warm button fill and visual accents (sampled from mark) |
| `--coral` | `#F26A52` | - | Secondary accent for active button states, highlights, and subtle hover tints |
| `--gold` | `#E8C27A` | - | Fine borders, subtle badges, and pixel trail accents |
| `--amber-text` | `#A45806` | 5.24:1 on paper (AA) | High-contrast amber text and inline links on light backgrounds |
| `--gold-espresso` | `#F0D49C` | 11.06:1 on espresso (AAA)| High-contrast warm gold text for dark espresso band |

### 2.2 Typography Selection & Justification

- **Headline / Display Face: Sora (`@fontsource-variable/sora`)**
  *Justification:* The "SHAYONAM" wordmark uses a geometric, wide-proportioned uppercase structure. Sora echoes this with subtle square-round terminals and distinct geometry that naturally reflects the logo's pixel-square motif, without feeling cold or quirky.
- **Body / Interface Face: Instrument Sans (`@fontsource-variable/instrument-sans`)**
  *Justification:* A modern, humanist grotesk crafted specifically for screen legibility. It provides effortless reading on 360px mobile screens, avoids the generic "AI template" look of Inter and Poppins, and delivers warm, trustworthy rhythm.

### 2.3 Type Scale (1.25 Major Third)
- **Display / Hero:** 48px / 3.05rem (mobile: 36px / 2.25rem), tracking -0.02em, line-height 1.15
- **H1:** 39px / 2.44rem (mobile: 30px / 1.88rem), tracking -0.02em, line-height 1.2
- **H2:** 31px / 1.95rem (mobile: 24px / 1.5rem), tracking -0.015em, line-height 1.25
- **H3:** 25px / 1.56rem (mobile: 20px / 1.25rem), tracking -0.01em, line-height 1.3
- **Body:** 16px / 1.0rem, line-height 1.6, max measure 68ch
- **Caption / Small:** 14px / 0.875rem, line-height 1.5

---

## 3. Logo Optimization & Brand Rules

- Original assets preserved untouched in `/brand-source`:
  - `/brand-source/only-logo.png` (6250x6250px)
  - `/brand-source/full-lockup.png` (6250x6250px)
- **Trimmed & Optimized Derivatives:**
  - `only-logo.png` trimmed from 6250x6250 (artwork is 2292x1966) down to responsive WebP/AVIF formats.
  - `full-lockup.png` trimmed from 6250x6250 (artwork is 4703x3059).
  - Header logo: 220px display width, target size < 12 KB AVIF / WebP.
  - Dark section rule: Use the **icon-only mark** on `--espresso` dark bands; never the full lockup (the brown wordmark vanishes on dark backgrounds).

---

## 4. Hero Animation Concept: "Pixels Becoming a Website"

- **Concept:** The logo features pixel squares breaking away from the S/D mark. In the hero, a cluster of 8-10 subtle gold, amber, and coral pixel squares gently drifts into place, assembling into an abstract wireframe of a website (header bar, hero block, 3 cards).
- **Execution:**
  - Lightweight SVG + CSS keyframes / Motion island (< 6 KB total payload).
  - Plays exactly once on load (duration ~1.6s) and settles permanently into a resting static state.
  - Zero layout shift: space pre-allocated via CSS grid / aspect ratio.
  - Headline and CTAs render immediately with zero delay (user can interact before animation completes).
  - Desktop-only subtle cursor tilt (< 3px movement).
  - Respects `prefers-reduced-motion: reduce` by immediately showing the completed static wireframe.

---

## 5. Headline Directions

- **Direction A (Outcome-focused, softened per approval) — [SELECTED]:**
  - **Headline:** "Fast, reliable websites for businesses in Gujarat and across India."
  - **Subhead:** "We design and build clean, high-performance websites and web applications that turn visitors into paying customers. Direct communication, built in Bhavnagar."
  - *Why selected:* Strikes the ideal balance: guarantees clean speed and reliability for businesses across Gujarat, while framing the customer-conversion value in the subhead without overpromising.
- **Direction B (Trust & accessibility-focused):**
  - **Headline:** "A website you can rely on, built by people you can call."
  - **Subhead:** "Direct communication, honest timelines, and zero technical headache. Based in Bhavnagar, reachable anytime."
- **Direction C (Redesign / problem-focused):**
  - **Headline:** "Stop losing business to an outdated website."
  - **Subhead:** "We rebuild slow, broken sites into modern digital storefronts that work properly on every phone."

*(All directions will also be archived in README.md for future marketing reference).*

---

## 6. ASCII Wireframes

### 6.1 Home Page (Mobile: 360px viewport)

```text
+------------------------------------------+
| [Logo: Shayonam Lockup]           [Menu] |
+------------------------------------------+
|                                          |
|  Websites that turn local                |
|  visitors into paying customers.         |
|                                          |
|  We design and build fast, reliable      |
|  websites and web applications for       |
|  businesses in Gujarat and across India. |
|                                          |
|  [ Get a Free Quote ]                    |
|  [ WhatsApp Us ]                         |
|                                          |
|  +------------------------------------+  |
|  |  [Pixel Assembly Hero Graphic]     |  |
|  |  (Assembled wireframe visual)      |  |
|  +------------------------------------+  |
|                                          |
|  Bhavnagar, Gujarat * Direct Communication|
|                                          |
+------------------------------------------+
| WHAT WE DO                               |
|                                          |
| 1. Website Design & Development          |
|    Fast, mobile-ready sites that sell.   |
|    [Explore service]                     |
|    ----------------------------------    |
| 2. Web Applications                      |
|    Custom portals, billing, & tools.     |
|    [Explore service]                     |
|    ----------------------------------    |
| 3. Social Media Handling                 |
|    Monthly management & local reach.     |
|    [Explore service]                     |
|    ----------------------------------    |
| 4. Website Redesign                      |
|    Rebuild outdated sites for speed.     |
|    [Explore service]                     |
+------------------------------------------+
| HOW WE WORK (Step-by-step)               |
|                                          |
| [01] Talk & Understand                   |
| [02] Plan & Wireframe                    |
| [03] Design in Brand Colors              |
| [04] Build with Modern Tech              |
| [05] Launch & Mobile Test                |
| [06] Ongoing Support                     |
+------------------------------------------+
| WHY SHAYONAM (Honest Guarantees)         |
|                                          |
| - 95+ Mobile Lighthouse Speed            |
| - Local & reachable in Bhavnagar         |
| - Direct access to the developer         |
| - Secure by default, zero bloat          |
+------------------------------------------+
| FREE WEBSITE AUDIT (Lead Magnet)         |
|                                          |
| Enter your website URL for a free        |
| 3-point speed & mobile review.           |
| [ Website URL ]                          |
| [ Your Email ]                           |
| [ Request Free Audit ]                   |
+------------------------------------------+
| FREQUENTLY ASKED QUESTIONS               |
|                                          |
| > How long does a website take?          |
| > What do you need from me to start?     |
| > Who owns the website after launch?     |
| > How do domain and hosting work?        |
| > Do you work with clients outside GJ?   |
+------------------------------------------+
| [ESPRESSO DARK BAND]                     |
| [Only Mark - S/D Icon in Gold]           |
| Ready to build something that works?     |
| [ Start a Project ]                      |
|                                          |
| Contact: shayonamdigitals@gmail.com      |
| Bhavnagar, Gujarat, India                |
| (c) 2026 Shayonam Digital. Privacy. Terms|
+------------------------------------------+
| [STICKY MOBILE ACTION BAR]               |
| [ Call ]   [ WhatsApp ]   [ Get Quote ]  |
+------------------------------------------+
```

### 6.2 Home Page (Desktop: 1440px viewport)

```text
+------------------------------------------------------------------------------------+
| [Shayonam Full Lockup]       Services   About   FAQ   Contact   [ Get a Free Quote ]|
+------------------------------------------------------------------------------------+
|                                                                                    |
|  Websites that turn local visitors        |  +----------------------------------+  |
|  into paying customers.                   |  |  [HERO ANIMATION: PIXELS TO SITE]|  |
|                                           |  |  Squares converge into abstract  |  |
|  We design and build fast, reliable       |  |  modern website wireframe        |  |
|  business sites and web applications.     |  |  (Amber, Gold, Coral accents)    |  |
|  Direct communication, built in Gujarat.  |  +----------------------------------+  |
|                                                                                    |
|  [ Get a Free Quote ]   [ Message on WhatsApp ]                                    |
|                                                                                    |
+------------------------------------------------------------------------------------+
|  WHAT WE DO                                                                        |
|  Editorial Service List:                                                           |
|  01. Website Design & Development  | Modern, mobile-first business sites   [View]  |
|  02. Web Applications              | Custom dashboards, portals & tools    [View]  |
|  03. Social Media Handling         | Monthly content, growth & local SEO   [View]  |
|  04. Website Redesign              | Rebuilding slow, outdated websites    [View]  |
+------------------------------------------------------------------------------------+
|  HOW WE WORK (Sequence)               |  WHY SHAYONAM (Proof Grid)                 |
|  1. Discovery & Scope                 |  - Measured 95+ Mobile Lighthouse Speed    |
|  2. Wireframe & Content               |  - Direct communication (no sales middleman|
|  3. Custom Design                     |  - Bhavnagar, Gujarat based & accountable  |
|  4. High-Performance Build            |  - Zero recurring hidden lock-ins          |
|  5. Launch & Domain Setup             |                                            |
|  6. Post-launch Support               |                                            |
+------------------------------------------------------------------------------------+
|  FREE WEBSITE AUDIT LEAD MAGNET                                                    |
|  "Wondering why your site isn't getting leads?"                                    |
|  [ Enter Website URL ]  [ Enter Email ]  [ Get 24-Hour Review ]                    |
+------------------------------------------------------------------------------------+
|  FAQ (Two-column layout, smooth accessible accordion)                              |
+------------------------------------------------------------------------------------+
|  [ESPRESSO BAND]                                                                   |
|  [S/D Mark]  Ready to launch a site that actually brings in business?              |
|              [ Start Your Project ]   [ Chat on WhatsApp ]                         |
|  Footer links, Bhavnagar address, Contact details, Privacy, Terms                  |
+------------------------------------------------------------------------------------+
```

### 6.3 Service Detail Page (e.g., `/services/website-design`)

```text
+------------------------------------------------------------------------------------+
| [Shayonam Lockup]            Services   About   FAQ   Contact    [ Get a Quote ]   |
+------------------------------------------------------------------------------------+
|  Services / Website Design                                                         |
|                                                                                    |
|  Website Design & Development                                                      |
|  Tailor-made, fast-loading business websites that look great on any phone          |
|  and convert visitors into customers.                                              |
|                                                                                    |
|  [ Get a Free Quote for Your Site ]   [ Discuss on WhatsApp ]                      |
+------------------------------------------------------------------------------------+
|  WHO THIS IS FOR                                                                   |
|  - Local retail stores, clinics, manufacturers, and professional services          |
|  - Businesses needing their first professional online presence                     |
|  - Companies that get traffic but zero inquiries                                   |
+------------------------------------------------------------------------------------+
|  WHAT'S INCLUDED                                                                   |
|  - Custom design in your brand colors (no recycled themes)                         |
|  - 100% mobile responsive testing across Android and iOS                           |
|  - WhatsApp click-to-chat and instant contact forms                                |
|  - Google Business Profile and local SEO integration                               |
|  - Fast hosting setup and domain connection                                        |
+------------------------------------------------------------------------------------+
|  WHAT WE NEED FROM YOU                                                             |
|  - Business logo and photos (or we assist with sourcing)                           |
|  - List of services and pricing/products                                           |
|  - Contact numbers and physical address                                            |
+------------------------------------------------------------------------------------+
|  FREQUENT QUESTIONS FOR THIS SERVICE                                               |
|  > How long does development take? (Usually 1-2 weeks)                             |
|  > Can I update text later? (Yes, clean structure or CMS integration)              |
+------------------------------------------------------------------------------------+
|  [ESPRESSO BAND CTA: Ready to start your website? [Get a Quote] ]                  |
+------------------------------------------------------------------------------------+
```

---

## 7. Borrowed Patterns & Adaptation

1. **Editorial Service List (Inspired by Awake / Studiova):**
   - *Original:* Heavy black and white brutalist list with large hover preview overlays.
   - *Adapted for Shayonam:* Warm paper background, subtle ink borders, clear outcome-driven summary line, and clean touch-friendly tap targets for mobile visitors.
2. **Accessible Accordion FAQ & Islands (Inspired by shadcn/ui):**
   - *Original:* Standard shadcn Radix accordion.
   - *Adapted for Shayonam:* Clean native HTML `<details>` and `<summary>` for zero-JS static sections where possible; lightweight accessible React island only where animated smooth collapse is desired.
3. **Tactile Interaction & Mobile Bottom Bar (Inspired by Emil Kowalski rules):**
   - *Original:* Desktop-first floating nav.
   - *Adapted for Shayonam:* Fixed mobile action bar (`Call` · `WhatsApp` · `Get a quote`) in the thumb zone for 360px Android devices, tactile active scale (`scale(0.97)` on tap), and instant navigation transitions.
4. **Transparent Proof Grid (Inspired by Land-book boutique agency portfolios):**
   - *Original:* Generic 3-card feature columns with icon circles and vague text.
   - *Adapted for Shayonam:* Asymmetric grid with concrete proof points (verified Lighthouse metrics, direct phone access, Bhavnagar office presence).

---

## 8. Anti-Slop & Craft Self-Review

| Generic Pattern Avoided | What Shayonam Digital Uses Instead |
|---|---|
| Blue/purple neon gradients with dark glass cards | Warm boutique paper (`#FFFEFC`), warm cream (`#F7F2EA`), and grounding espresso (`#2A201B`) |
| Em-dashes (`—`) in headlines and body text | Plain hyphens or natural sentence structures |
| Section numbering eyebrows (`01 // CAPABILITIES`) | Plain, descriptive sentence-case headings |
| Bouncing scroll-down arrows | Content-first layout where hero elements guide naturally |
| Generic 3-equal card rows with icons | Editorial lists and asymmetric sequence grids |
| Fake statistics ("99.9% Client Satisfaction", "500+ Projects") | Real, verifiable facts (Bhavnagar location, Lighthouse score, direct engineer contact) |
| Fake team member stock photos or placeholder testimonials | **Hide-when-empty rule:** Sections only render when real data exists in content collections |
| Broken external links or unvalidated endpoints | Serverless Astro endpoint with Zod validation, Turnstile, rate limiting, and Resend |

---

## 9. Key Decisions Made

1. **Font Pair:** Selected **Sora** for headlines and **Instrument Sans** for body. Sora provides geometric character matching the logo's pixel shapes, while Instrument Sans provides superior legibility on compact Android screens.
2. **Hero Animation:** Selected lightweight SVG/CSS pixel-assembly over heavy Three.js or canvas libraries. Takes under 6 KB, runs once, settles cleanly, zero CLS.
3. **Hide-When-Empty Rule:** Work/Case Studies, Testimonials, Client Logos, and Pricing will have full Astro Content Collections and schemas built, but the template and nav links will cleanly suppress rendering until Markdown files or config values are supplied.
4. **Primary Color Balance:** The site is 90% warm light (`#FFFEFC` / `#F7F2EA`) so the full lockup with dark brown text displays properly. Only the footer/final CTA uses the dark espresso band, featuring the gold/amber icon mark.

---

## 10. Decisions & Input Confirmations (Approved)

1. **Phone Numbers:**
   - Call (tel link): `+91 87587 31449`
   - WhatsApp (wa.me link): `+91 98791 81464` (`https://wa.me/919879181464`)
   - Both numbers are confirmed real and retained in `src/config/site.ts`.
2. **Credentials & Database Strategy:**
   - Zero keys or secrets stored in code or repository.
   - Local Cloudflare D1 simulated via `wrangler d1` for testing.
   - Complete `.env.example` prepared with documentation for production Cloudflare / Resend setup.
3. **Pricing Section Visibility:**
   - Hidden (`priceFrom: null`). No invented placeholder prices.
4. **Free Website Audit Feature:**
   - Included behind `featureFlags.freeAudit: true` in `src/config/site.ts`.
   - Clear promise: "Reviewed within 2 working days".
   - Can be toggled off instantly if lead volume requires.
