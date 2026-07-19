# Zeyad Hamdy — Portfolio

A modern, animated personal portfolio for Eng. Zeyad Hamdy, Full Stack
Developer. Built with React 19, Vite, Tailwind CSS v4, and Framer Motion.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion (section/element animations)
- AOS (scroll reveal)
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
  assets/        images used by components (imported, hashed at build time)
  components/    one folder per UI component (Navbar, Hero, About, ...)
  data/          content as plain data — projects, skills, certificates,
                 services, tech stack, social links. Edit these files to
                 update site content without touching component code.
  hooks/         useActiveSection, useScrollProgress
  layouts/       MainLayout (navbar + footer + global chrome)
  pages/         Home.jsx (composes all sections)
public/
  assets/cv/     CV_Zeyad_Hamdy.pdf — the file the "Download CV" button serves
  assets/images/ og-cover.jpg — social share preview image
```

## Before you deploy — replace these placeholders

1. **CV** — swap `public/assets/cv/CV_Zeyad_Hamdy.pdf` for your real, up to
   date resume (same filename, or update the path in `Hero.jsx`).
2. **Social links** — open `src/data/socialLinks.js` and replace every URL
   marked `// TODO` with your real LinkedIn, Facebook, WhatsApp, and
   Instagram links.
3. **EmailJS** — open `src/components/Contact/Contact.jsx` and set
   `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, and `EMAILJS_PUBLIC_KEY` from
   your [EmailJS](https://www.emailjs.com/) dashboard. Also update
   `CONTACT_EMAIL` to your real address (used by the "Send Email" mailto
   card).
4. **Projects & certificates** — `src/data/projects.js` and
   `src/data/certificates.js` currently use placeholder Unsplash images and
   `github.com/zeyad20055` / `#` links. Swap in real project screenshots,
   repo links, and live demo URLs.
5. **og:image** — `public/assets/images/og-cover.jpg` is currently a copy of
   the hero portrait; replace with a dedicated 1200×630 social preview image
   if you'd like a custom one.

## Notes

- All content-heavy sections (Projects, Skills, Certificates, Services,
  Tech Stack, Social Links) render from the files in `src/data/` — add or
  remove entries there rather than editing JSX.
- The hero portrait ships as optimized WebP (with a JPEG fallback via
  `<picture>`) to keep the largest-contentful-paint payload small.
