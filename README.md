# nota-site

The landing page for [Nota](https://github.com/nota-daw/nota), the free, open-source DAW.
Implements the "Nota Site" design from `nota-design`.

Vite + React + TypeScript, built to a static `dist/`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run snapshot # refresh src/data/github.json (latest release, contributors) from GitHub
npm run build    # type-check and build to dist/
```

## Layout

- `src/sections/` — page sections: Nav, Hero, Features, Compare, Download, Footer
- `src/features/` — the feature demos: stems, Nota Remote, the device gallery, version history, audio → MIDI, plug-ins, MCP
- `public/hero/main-window.avif` (`src/MainWindow.tsx`) — the main window in the hero, rendered headlessly from the app at 2x (the "Night Drive" demo, Lead selected), laid out at 1680 px and scaled to fit
- App screenshots are AVIF (quality 60, encoded from the lossless renders) and come in Studio Dark (`<name>.avif`) and Studio Light (`<name>-light.avif`); `useShot()` in `src/lib/theme.ts` picks the one matching the site theme, which follows the system until the visitor picks one with the sun/moon toggle
- `public/remote/*.avif` — Nota Remote screens captured from the web app (`src/web/remote`) against its mock server on a 390 x 844 viewport at 2x
- `public/settings/downloads.avif` — Settings → Downloads rendered headlessly at 2x, with `NOTA_PLUGIN_REGISTRY` pointed at a local build of nota-plugins-registry's `index.json`
- `public/devices/` + `src/features/devices/devices.json` — device gallery images: device cards rendered headlessly from the app at 2x (the nota-docs `shots/app` harness), one view per tab or factory preset
- `src/lib/counts.ts` — the instrument, effect and device counts in the copy and meta description, derived from `devices.json` so they move with the gallery
- `scripts/github-snapshot.mjs` → `src/data/github.json` — the latest nota-daw/nota release (version, date, assets) and the contributors across the nota-daw repos, snapshotted at build time; on a failed fetch it keeps the committed file
- `src/lib/release.ts` — starts from the snapshot, then fetches the latest GitHub release and picks the download for the visitor's OS; falls back to the releases page offline
- `src/features/Contributors.tsx` — the contributors section, from the snapshot
- `src/styles.css` — Studio Dark / Studio Light tokens (from the app's `Theme/Themes/studio-*.json`, the style guide of nota spec 038) and hover states. The site follows the app's look: one typeface (Geist with tabular figures), controls on a faint well with no border, the soft orange tint for what is picked and solid orange only for the main call to action, corners 9 / 7 / 6 / 5

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main` and daily,
running `npm run snapshot` first so the release and contributor figures stay current.
Enable it once in the repo: Settings → Pages → Source: **GitHub Actions**.
