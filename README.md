# Purple Verse Bts Atlas

Add two new pages to my website: "BTS Members" and "BTS Discography." The BTS Members page should include all the members' names and relevant information about each member. The BTS Discography page should include relevant information about BTS's discography. Add navigation buttons to the index page that link to both pages, while keeping the existing design and style consistent. - SEO friendly
- Mobile friendly
- Contact form
- Easy to navigate
- Pretty to look at

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://purple-verse-bts-atlas.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f9d66a8c-9a96-446e-8c0d-ecaf515325b8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## GitHub Pages

The GitHub Pages build uses `vite.pages.config.ts` to prerender the four pages as static HTML. The normal Lovable build remains in `vite.config.ts`.

```sh
npm install
npx vite build --config vite.pages.config.ts
node scripts/prepare-pages.mjs
```

Published URL: https://dacevedocubillo.github.io/purple-verse-bts-atlas/

In repository Settings → Pages, select **GitHub Actions** as the source. The `Deploy GitHub Pages` workflow builds and deploys changes pushed to `main`.

The contact form opens the visitor's email application; it does not use a mail server.
