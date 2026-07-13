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
