# Sanjid Hasan Al Rifat

Personal website for Sanjid Hasan Al Rifat. A calm journal with an
engineer's notebook inside it. Vite + React + TypeScript, with a small hand-written CSS system.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check and build to dist/
npm run preview   # serve the built site
```

`dist/` is a static site. It deploys as-is to Vercel, Netlify, Cloudflare Pages or GitHub Pages.

## The page

One long page: the name, a short hello, a datasheet of Sanjid (facts only),
ten dated photographs in a sideways reel, four projects that open in place,
how he works, what moves him, life, his record, and a way to write to him.
Section links are plain hashes (`#work`), and a link to a project (`#zenpack`)
opens it.

## Editing content

All copy is in `src/content/sanjid.ts`. Nothing in it should claim a metric,
customer, memory, motivation or opinion that is not in Sanjid's own materials
or his own words. Where his story is not known yet, a `gap` block keeps the
question for him; gaps never render. `docs/content-checklist.md` lists them.

Figures come from Sanjid's CV (October 2026).

## Photos

Sanjid's photos are catalogued in `docs/image-library.md` (readable) and
`src/content/image-library.json` (used by the site): what each one shows, its date,
where it is used, alt text, caption and tone. Pages pick a photo by id with
`img("emk-center")` in `site.ts`.

Photos show in their own colour. Only real photos are shown; a photo with no
file renders nothing.

To add photos, put the originals in an uploads folder, add an entry (and a tone) to
`scripts/image_library.py` and run `python3 scripts/image_library.py <folder>` (needs
Pillow). It writes resized copies to `public/images/library/`.
