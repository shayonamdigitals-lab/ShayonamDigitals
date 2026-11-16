# Shayonam Digital Website Rebuild

Official website and lead-capture platform for **Shayonam Digital**, an independent digital agency based in Bhavnagar, Gujarat, India.

---

## 1. Quick Start & Local Development

### Prerequisites
- Node.js `v20+` or `v22+` (v26 tested)
- `pnpm` `v11+`

### Installation
```bash
# Install dependencies
pnpm install

# Approve post-install native build scripts (esbuild, workerd)
pnpm approve-builds --all
```

### Local Database Setup (Cloudflare D1 Simulation)
```bash
# Generate D1 SQLite migration files from Drizzle schema
pnpm run db:generate

# Apply migrations to local D1 simulated database
pnpm run db:migrate:local
```

### Running Dev Server
```bash
# Start Astro development server
pnpm dev
```
Open **[http://localhost:4321/](http://localhost:4321/)** in your browser.

---

## 2. Environment Variables & Production Secrets

Create a `.env` file in the root directory for local overrides (copy from [.env.example](file:///Users/neelsarvaiya/Downloads/Shayonam%20DIgital%20web/.env.example)):

```bash
# Resend API Key for lead notification emails to agency owner
RESEND_API_KEY=re_your_api_key_here

# Notification recipient email (where leads will be sent)
OWNER_NOTIFICATION_EMAIL=shayonamdigitals@gmail.com

# Cloudflare Turnstile bot challenge keys
PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAABBBBBBBBCCCCCC
TURNSTILE_SECRET_KEY=0x4AAAAAAABBBBBBBBCCCCCCDDDDDDDDDDDD
```

> **Security Note:** In production on Cloudflare Workers, **never commit keys to git**. Add secrets securely via Wrangler:
> ```bash
> pnpm exec wrangler secret put RESEND_API_KEY
> pnpm exec wrangler secret put TURNSTILE_SECRET_KEY
> pnpm exec wrangler secret put OWNER_NOTIFICATION_EMAIL
> ```

---

## 3. Cloudflare Deployment Guide (Step-by-Step)

### Step 1: Create Remote Cloudflare D1 Database
```bash
pnpm exec wrangler d1 create shayonam-db
```
Wrangler will output your `database_id`. Update `wrangler.json` with this ID:
```json
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "shayonam-db",
      "database_id": "<PASTE_YOUR_DATABASE_ID_HERE>"
    }
  ]
}
```

### Step 2: Apply Migrations to Remote D1
```bash
pnpm run db:migrate:prod
```

### Step 3: Deploy to Cloudflare Workers
```bash
pnpm run build
pnpm exec wrangler deploy
```

---

## 4. Reading Leads from Cloudflare D1

Leads submitted via the website (project quotes and free audit requests) are saved directly in D1 with salted IP hashes and zero unhashed PII logs.

### Querying Local Database
```bash
pnpm exec wrangler d1 execute shayonam-db --local --command="SELECT id, created_at, type, name, email, phone, service, site_url, status FROM leads ORDER BY created_at DESC"
```

### Querying Production Database
```bash
pnpm exec wrangler d1 execute shayonam-db --remote --command="SELECT id, created_at, type, name, email, phone, service, site_url, status FROM leads ORDER BY created_at DESC"
```

### Updating a Lead Status (e.g. marked as contacted)
```bash
pnpm exec wrangler d1 execute shayonam-db --remote --command="UPDATE leads SET status = 'contacted' WHERE id = '<LEAD_UUID>'"
```

---

## 5. Content Management & The Hide-When-Empty Rule

Per project specifications, empty sections (Work/Case studies, Testimonials, Pricing) are automatically suppressed until real content is added.

### Adding a Work Case Study
Create a Markdown file in `src/content/work/client-name.md`:
```markdown
---
title: "Modern Catalog Website for Local Medical Clinic"
client: "Shreeji Healthcare"
outcome: "Boosted direct WhatsApp inquiries by 240% with sub-second mobile loading."
services: ["Website Design", "Local SEO"]
year: 2026
draft: false
---

Case study details here...
```
Once added, the case study section and navigation link will appear automatically.

### Adding a Testimonial
Create a Markdown file in `src/content/testimonials/client-name.md`:
```markdown
---
quote: "Working with Shayonam Digital was completely seamless. They delivered our retail catalog site in 10 days and our customers love the mobile ordering."
author: "Haresh Mehta"
role: "Director"
business: "Mehta Industrial Supplies"
location: "Bhavnagar, Gujarat"
---
```

### Enabling Pricing Packages
In `src/config/site.ts`, set `features.showPricing: true` and specify package starting prices.

---

## 6. Marketing & Local Business Recommendations

### Google Business Profile Setup (Bhavnagar)
1. Register or claim your business on **Google Business Profile** as "Shayonam Digital" in Bhavnagar, Gujarat.
2. Select categories: *Website Designer*, *Internet Marketing Service*, *Software Company*.
3. Add office hours (Mon-Sat, 9:30 AM to 7:00 PM) matching the website schema.
4. Upload high-resolution brand assets from `brand-source/`.
5. Link your profile website directly to `https://shayonamdigitals.com`.

### Email DNS (SPF, DKIM, DMARC) for Resend
To ensure high email deliverability from Resend:
- Add a TXT record for SPF: `v=spf1 include:amazonses.com ~all`
- Add the CNAME DKIM records provided in your Resend Dashboard under Domain Settings.
- Add a DMARC policy: `v=DMARC1; p=none; rua=mailto:shayonamdigitals@gmail.com`.

---

## 7. Archived Headline Directions

- **Direction A (Selected - Softened):**
  - *Headline:* "Fast, reliable websites for businesses in Gujarat and across India."
  - *Subhead:* "We design and build clean, high-performance websites and web applications that turn visitors into paying customers. Direct communication, built in Bhavnagar."
- **Direction B (Trust & Accessibility):**
  - *Headline:* "A website you can rely on, built by people you can call."
  - *Subhead:* "Direct communication, honest timelines, and zero technical headache. Based in Bhavnagar, reachable anytime."
- **Direction C (Redesign / Problem-Focused):**
  - *Headline:* "Stop losing business to an outdated website."
  - *Subhead:* "We rebuild slow, broken sites into modern digital storefronts that work properly on every phone."
