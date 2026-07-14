# St. Pete Acting Coach — Gillian Arnold Atlas

A fast, cinematic marketing site for on-camera acting coach **Gillian Arnold Atlas**,
based in St. Petersburg, Florida.

- **Framework:** [Astro](https://astro.build) (static output)
- **CMS:** [Decap CMS](https://decapcms.org) (git-based, edits one JSON file)
- **Hosting:** Netlify (Identity + Git Gateway for CMS auth)
- **Motion:** Lenis smooth scroll, spotlight cursor, scroll-reveal animations

---

## 100% editable content

Every word and image on the site comes from a single file:

```
src/content/homepage.json
```

Nothing is hard-coded. The Decap CMS config (`public/admin/config.yml`) maps 1:1 to
that JSON, so the client edits everything through a friendly dashboard.

---

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

---

## Deploying

Two easy options:

1. **Say `deploy`** in Claude Code from the project folder — it builds, commits, and
   pushes; Netlify rebuilds automatically.
2. **Manually:**
   ```bash
   npm run build      # make sure it passes
   git add -A
   git commit -m "your message"
   git push
   ```

Pushing to `main` triggers a Netlify build (`npm run build`, publish `dist/`).

---

## One-time Netlify + CMS setup

Do this once so the client can log in at **/admin** and edit content.

1. **Create the site on Netlify** → "Add new site" → "Import an existing project" →
   connect the GitHub repo `unit6854/StPeteActingCoach`.
   Build command `npm run build`, publish directory `dist` (already in `netlify.toml`).
2. **Enable Identity:** Site → **Identity** → *Enable Identity*.
3. **Registration:** Identity → Settings → set registration to **Invite only**.
4. **Enable Git Gateway:** Identity → Services → **Enable Git Gateway**.
5. **Invite the client:** Identity → *Invite users* → enter their email. They accept
   the email, set a password, and can then log in.
6. **Log in to the CMS:** visit `https://stpeteactingcoach.com/admin` and sign in.
7. **Contact form email (important):** Site → **Forms** → after the first deploy the
   `session-request` form appears → **Form notifications** → *Add notification* →
   *Email notification* → send to **gillianatlas8@gmail.com**. Now every "Request a
   Session" submission is emailed to Gillian (no mail app opens for the visitor).

## The Gallery

- The **Gallery** page (`/gallery`) is managed in the CMS under **Gallery**. Each item
  is one photo **or** video plus an optional caption.
- Supports images (JPG, PNG, WEBP, AVIF, GIF) and video (MP4, WEBM, MOV) — Gillian just
  uploads a file. Newest items (by Date) show first; click any item to enlarge.
- Clicking **Gallery** in the nav plays a theatrical curtain transition.
- **Note on video size:** uploads are stored in the Git repo via Git Gateway, so keep
  clips reasonably small (short highlights). For long/large videos, host on
  YouTube/Vimeo and we can add embed support.

## What Gillian can edit

Everything text and every image on the site **and** the gallery — through `/admin`.
(The cinematic background photos are intentionally left fixed to preserve the design;
everything else — logos, portrait, testimonials, gallery, copy — is editable.)

### What happens when the client edits content

1. They open `/admin`, log in via Netlify Identity.
2. They edit text/images in the **Homepage** entry (backed by `homepage.json`).
3. On **Publish**, Decap commits the change to `main` via Git Gateway.
4. Netlify detects the commit and rebuilds — the live site updates in ~1 minute.

---

## Project structure

```
Site/
├─ public/
│  ├─ admin/           # Decap CMS (index.html + config.yml)
│  ├─ images/          # all site imagery
│  └─ favicon.*
├─ src/
│  ├─ components/      # Nav, Hero, Location, ValueProps, About,
│  │                   # Testimonials, Services, Contact, ServiceStrip, Footer, Icon
│  ├─ content/
│  │  └─ homepage.json # ← ALL editable content
│  ├─ layouts/Layout.astro
│  ├─ pages/index.astro
│  └─ styles/global.css
├─ astro.config.mjs
└─ netlify.toml
```

## SEO

- **Sitemap:** auto-generated at `/sitemap-index.xml` (via `@astrojs/sitemap`), referenced by `/robots.txt`.
- **Metadata + schema:** all `<head>` tags and JSON-LD live in `src/components/SEO.astro`
  (ProfessionalService + Person + WebSite site-wide; testimonials as Review markup;
  Article + BreadcrumbList on blog posts). Each page passes its own `title`/`description`.
- **Canonical host:** `netlify.toml` 301-redirects `www` → non-www.
- After deploy, validate with Google's **Rich Results Test** and submit the sitemap in
  **Google Search Console**.

## Adding a blog post (Resources)

1. Go to `/admin` → **Resources / Blog** → **New Article**.
2. Fill in:
   - **Title** — becomes the H1 and browser title (e.g. *"How to Prepare for a Self-Tape Audition"*).
   - **Meta Description** — 150–160 characters, lead with the search phrase you're targeting.
   - **Publish Date**, optional **Featured Image** (+ its **Alt Text**), and the **Body** (markdown).
3. Inside the body, link to `/#services` and `/#contact` where natural (internal linking helps SEO).
4. **Publish.** Netlify rebuilds; the post appears at `/resources/<slug>/`, is added to the
   sitemap automatically, and gets Article structured data with no extra work.
