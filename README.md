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

## Pages

A personal website first and a portfolio second. Home, About (How I got here),
What moves me, How I see problems, Work (an index plus one page per story), Life,
Notes and Now. There is no contact page: Home ends with an invitation to write, and
every footer carries the email and profile links.

Pages are plain hash links (`#about`, `#work`, `#zenpack`), so `dist/` works as static files.

## Editing content

All copy is in `src/content/site.ts`. Nothing in it should claim a metric, customer,
memory, motivation or opinion that is not in Sanjid's own materials or his own words.

- Where his story is not known yet, the file holds a `gap` block with a question for him.
  Gaps never render. Replace one with his answer as a `p` block.
  `docs/content-checklist.md` lists every open gap for Sanjid.
- What moves me, How I see problems, Notes and Now each have `ready: false` until they
  are filled. Unready pages are hidden from the nav and their links disappear.
- `SHOW_UNFINISHED_PAGES` (top of the file) shows unready pages anyway. Use `true` for
  review previews and `false` for the public site.

Figures come from Sanjid's CV (October 2026).

## Photos

Sanjid's photos are catalogued in `docs/image-library.md` (readable) and
`src/content/image-library.json` (used by the site): what each one shows, its date,
where it is used, alt text, caption and tone. Pages pick a photo by id with
`img("emk-center")` in `site.ts`.

The site itself is black and white. Photos keep their colour unless their `tone` is
`mono`, which renders them in grey. Only real photos are shown; a photo with no file
renders nothing.

To add photos, put the originals in an uploads folder, add an entry (and a tone) to
`scripts/image_library.py` and run `python3 scripts/image_library.py <folder>` (needs
Pillow). It writes resized copies to `public/images/library/`.
