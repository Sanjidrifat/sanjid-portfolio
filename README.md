# Sanjid Hasan Al Rifat · portfolio

Personal site for Sanjid Hasan Al Rifat: engineer, strategist, builder, operator.
Vite + React + TypeScript, styled with Tailwind v4 and a small hand-written CSS system.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check and build to dist/
npm run preview   # serve the built site
```

`dist/` is a static site. It deploys as-is to Vercel, Netlify, Cloudflare Pages or GitHub Pages.

## Editing content

All copy is in `src/content/site.ts`: hero, current work, the four projects, how I work,
systems I work across, About, experience, recognition and contact.

Projects are told as a chain of reasoning under four panels: Reality → Decision → Build →
Field. Technology is explained in layers (the idea, the system, technical depth, user value,
field proof), and every metric carries the reason it matters. Raw specs sit in a small
spec sheet under each schematic.

Figures come from Sanjid's CV (October 2026). Anything not backed by his materials is
marked `confirm: true` and shows a dashed **to confirm** tag on the page. Once everything
is checked, set `SHOW_CONFIRM_MARKS = false` at the top of the file.

## Adding photos

Each project and the About section show a hatched placeholder that names the file it
expects, for example `public/images/zengo-alfa/photo.jpg`. Drop the image there and set the
matching `plate.src` in `site.ts` to `/images/zengo-alfa/photo.jpg`. Photos render in
greyscale, to keep the site black and white.

## Contact form

With `contact.endpoint` empty, the form opens the visitor's email app addressed to
`person.email`. Set `endpoint` to a form service URL (Formspree, Basin, etc.) to post
submissions as JSON instead.
