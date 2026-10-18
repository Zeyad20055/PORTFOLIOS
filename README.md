# Zeyad Hamdy — Portfolio

A modern, animated personal portfolio for Eng. Zeyad Hamdy, Full Stack
Developer. Built with React 19, Vite, Tailwind CSS v4, and Framer Motion.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- Persistent light/dark themes and English/Arabic localization
- Framer Motion (section/element animations, with reduced-motion support)
- Typed.js (hero typing effect)
- React Icons
- react-scroll (in-page smooth scrolling/active-link tracking)
- react-router-dom (app shell routing)
- EmailJS (contact form)

## Getting Started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build → dist/
npm run preview   # preview the production build locally
npm run lint       # oxlint
```

## Project Structure

```
src/
  assets/        portrait images used by components (imported, hashed at build time)
  components/    one folder per UI component (Navbar, Hero, About, ...)
  data/          content as plain data — projects, skills, certificates,
                 services, tech stack, social links. Edit these files to
                 update site content without touching component code.
  hooks/         useActiveSection, useScrollProgress
  context/       language and theme providers
  layouts/       MainLayout (navbar + footer + global chrome)
  pages/         Home.jsx (composes all sections)
public/
  assets/cv/     CV_Zeyad_Hamdy.pdf — the file the "Download CV" button serves
  assets/images/ og-cover.jpg — social share preview image
```

## Before you deploy

1. **CV** — swap `public/assets/cv/Zeyad_Hamdy.pdf` for your real, up to
   date resume (same filename, or update the path in `Hero.jsx`).
2. **Social links** — open `src/data/socialLinks.js` and replace every URL
   marked `// TODO` with your real LinkedIn, Facebook, WhatsApp, and
   Instagram links.
3. **EmailJS** — create a `.env.local` file in the project root with
   `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and
   `VITE_EMAILJS_PUBLIC_KEY` from your [EmailJS](https://www.emailjs.com/)
   dashboard. The template receives `from_name`, `reply_to`, `subject`, and
   `message`.
   The public key is intended for browser use; never put a private key or a
   GitHub token in frontend environment variables. Until configured, the form
   displays a setup message and the direct email link remains available.
4. **Projects** — the projects section reads public repositories from GitHub
   automatically, caches successful responses for 12 hours, and uses the
   verified names/links in `src/data/projects.js` if GitHub is unavailable.
   Project cards use a category-specific illustrated placeholder until real
   project screenshots are added; these illustrations are not presented as
   screenshots. Each card opens the real repository homepage when available,
   otherwise its GitHub repository. It requires no token or backend.
5. **Certificates** — review `src/data/certificates.js` to ensure the existing
   certificate details and dates match your records.
6. **og:image** — `public/assets/images/og-cover.jpg` is currently a copy of
   the hero portrait; replace with a dedicated 1200×630 social preview image
   if you'd like a custom one.

## Notes

- All content-heavy sections (Projects, Skills, Certificates, Services,
  Tech Stack, Social Links) render from the files in `src/data/` — add or
  remove entries there rather than editing JSX.
- The hero portrait ships as optimized WebP (with a JPEG fallback via
  `<picture>`) to keep the largest-contentful-paint payload small.
- The theme preference is stored in `portfolio-theme` in local storage; the
  language preference is stored in `portfolio-language`.
