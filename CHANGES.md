# Changes & Prototype Refactoring Log

This document lists every legacy item removed or refactored from the previous prototype and the engineering justification.

---

## 1. Eliminated Dependencies & Tech Bloat

The old prototype bundled over 70 unneeded libraries, contributing to massive node_modules and slow compilation:

| Removed Package | Reason for Removal |
|---|---|
| `@emotion/react`, `@emotion/styled` | Replaced by native Tailwind v4 CSS variables; eliminated heavy runtime CSS-in-JS overhead. |
| `@mui/material`, `@mui/icons-material` | Unused in production; conflicted with Tailwind styling and added multi-megabyte bundle weight. |
| `recharts` | Banned decorative/fake stats dashboards that added client JS overhead without business utility. |
| `react-dnd`, `react-dnd-html5-backend` | Unused drag-and-drop mechanics from template mockup. |
| `react-slick`, `embla-carousel-react` | Removed carousel fluff; replaced with responsive CSS Grid layouts. |
| `concurrently` | Unnecessary with Astro's integrated dev server daemon and Cloudflare worker adapter. |
| `express`, `cors` | Replaced by serverless Astro endpoints (`/api/contact`, `/api/health`) on Cloudflare Workers; removed vulnerable Express runtime. |
| `tw-animate-css` | Replaced with lightweight CSS keyframes and modern Motion islands. |
| `vaul`, `cmdk`, `react-resizable-panels` | Unused UI primitives that were never configured or utilized by real users. |

---

## 2. Brand & Visual Palette Refactoring

- **Eliminated Blue/Purple Neon Palette:** The old prototype used electric neon purple and blue styling that bore zero relationship to the official Shayonam Digital brand identity.
- **Sampled True Palette:** Sampled colors directly from `only logo.png` and `FP SD.png`:
  - Main background: warm light paper (`#FFFEFC`) and surface cream (`#F7F2EA`).
  - Text: dark brown ink (`#3A2C22`) matching the exact "SHAYONAM" wordmark.
  - Buttons & Accents: warm amber (`#F5A03C`) and coral (`#F26A52`).
  - Dark Accent: single espresso band (`#2A201B`) used for high-impact footer and final CTA, featuring the gold/amber icon mark.
- **Logo Optimization:**
  - Preserved original 6250x6250 px assets untouched in `/brand-source`.
  - Trimmed empty transparent borders (which accounted for >60% of original file sizes).
  - Generated responsive WebP/AVIF derivatives, reducing the header logo from **2.5 MB** down to **14 KB**.

---

## 3. Structural & Content Anti-Slop Fixes

- **Removed Fake Client Testimonials & Stats:** Eliminated placeholder reviews and arbitrary numbers ("99.9% satisfaction", "500+ happy clients"). Implemented the strict **Hide-When-Empty rule** where sections only render when populated with real data.
- **Banned Em-Dashes in Copy:** Refactored all typography to use hyphens or clear sentence structures.
- **Replaced 3-Equal Card Rows:** Converted Services into an editorial horizontal list with outcome lines, and process into a step-by-step sequential roadmap.
- **Fixed Broken WhatsApp Link:** The old link had an invalid space and plus sign (`wa.me/+91 ...`) which threw errors in modern browsers; fixed to `https://wa.me/919879181464`.
- **Replaced Desktop-Only Call Bar:** Replaced with a mobile-first sticky bottom bar (`Call` · `WhatsApp` · `Get a quote`) in the smartphone thumb zone.

---

## 4. Backend & Security Upgrades

- **Eliminated In-Memory Array & Hardcoded Port 3001:** The old prototype stored leads in an ephemeral volatile JavaScript array that reset on restart and posted to `http://localhost:3001`.
- **Integrated Cloudflare D1 with Drizzle ORM:** Leads are stored securely in SQLite with parameterized queries, preventing SQL injection.
- **Bot Protection & Rate Limiting:** Added Cloudflare Turnstile verification, honeypot field, and a 5 request / 10 min sliding window rate limiter.
- **Privacy-Preserving IP Hashing:** Client IP addresses are cryptographically salted and hashed using SHA-256 before storage; raw IPs are never saved or logged.
- **Hardened HTTP Headers:** Added strict Content-Security-Policy (CSP), HSTS, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy in `_headers`.
