# Jean Batista — Portfolio

Personal portfolio for **Jean Batista**, Data Analyst & Developer (New York, NY).

A single-page, monochromatic, editorial site built with a modern front-end stack.

## Stack

- **Vite 6** + **React 18** + **TypeScript**
- **Tailwind CSS v4** (CSS-first config, `@tailwindcss/vite`)
- **shadcn/ui** project structure (`components.json`, `@/` alias, `src/components/ui`)
- **Framer Motion** for the hand-drawn name animation and scroll reveals
- **lucide-react** icons

## Local development

```bash
npm install
npm run dev        # http://localhost:5173/
```

Other scripts:

```bash
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run typecheck  # tsc --noEmit
```

> **Heads up:** this is a Vite/React app, so opening `index.html` directly with
> VS Code Live Server shows a blank page — that file only loads `/src/main.tsx`,
> which needs Vite to compile. To view it, run `npm run dev`, **or** run
> `npm run build` and point Live Server at the generated **`dist/`** folder.

## Project structure

```
index.html                     Vite entry
src/
  App.tsx                      Page composition
  index.css                    Tailwind v4 theme + monochrome design tokens
  data/content.ts              All résumé-tailored copy (single source of truth)
  lib/utils.ts                 cn() + asset() base-path helper
  components/
    ui/hand-writing-text.tsx   Animated hand-drawn title (shadcn-style component)
    site/                      Section components (Hero, About, Work, …)
public/
  assets/                      Images (passthrough, served as-is)
  Curent Projects/             Project slideshow pages + documents
  Past Projects/               Archived project documents
```

> Static files in `public/` (project slideshows, images) are copied to the build
> root untouched, so their existing relative links keep working.

## Deployment (GitHub Pages)

The build uses a **relative base** (`base: "./"` in `vite.config.ts`), so the
`dist/` output works unchanged whether it's served from the project sub-path
(`jbat005.github.io/minimal/`), a custom root domain (`jeanbatista.com`), or a
local static server like Live Server — no reconfiguration needed.

A workflow at `.github/workflows/deploy.yml` builds and publishes on every push to
`master`. **One-time setup:** in the repo, go to
**Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.

## Résumé

The Word résumé is generated separately from `.resume_build/` (`node gen.js`).
