# Sanjid Hasan Al Rifat

Personal website for Sanjid Hasan Al Rifat. A calm, black and white journal with an
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

Home, About, Work (an index plus one page per story), Thinking, Life, Now and Contact.
Pages are plain hash links (`#about`, `#work`, `#zenpack`), so `dist/` works as static files.

## Editing content

All copy is in `src/content/site.ts`. Nothing in it should claim a metric, customer,
memory, motivation or opinion that is not in Sanjid's own materials or his own words.

- Where his story is not known yet, the file holds a `gap` block with a question for him.
  Replace it with his answer as a `p` block.
- `SHOW_DRAFTS` (top of the file) shows the Thinking, Life and Now pages and the dashed
  "For Sanjid to add" notes. Keep it `true` for previews. Set it to `false` for the public
  site, which then shows only Home, About, Work and Contact.
- Lines marked `confirm: true` show a dashed **to confirm** tag. Set
  `SHOW_CONFIRM_MARKS = false` once they are checked.

Figures come from Sanjid's CV (October 2026).

## Adding photos

Story pages, About and Life show a hatched placeholder that names the file it
expects, for example `public/images/zengo-alfa/road.jpg`. Drop the image there and set the
matching `plate.src` in `site.ts` to `/images/zengo-alfa/road.jpg`. Photos render in
greyscale, to keep the site black and white.

## Contact form

With `contact.endpoint` empty, the form opens the visitor's email app addressed to
`person.email`. Set `endpoint` to a form service URL (Formspree, Basin, etc.) to post
submissions as JSON instead.
