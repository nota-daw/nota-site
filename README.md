# nota-site

The landing page for [Nota](https://github.com/nota-daw/nota), the free, open-source DAW.
Implements the "Nota Site" design from `nota-design`.

Vite + React + TypeScript, built to a static `dist/`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check and build to dist/
```

## Layout

- `src/sections/` — page sections: Nav, Hero, Features, Compare, Download, Footer
- `src/features/` — the interactive feature demos (stems, version history, audio → MIDI, devices, plug-ins, MCP, Nota Remote)
- `src/MainWindow.tsx` — the interactive main-window mock in the hero, laid out at 1680 px and scaled to fit
- `src/lib/release.ts` — fetches the latest GitHub release and picks the download for the visitor's OS; falls back to the releases page offline
- `src/styles.css` — Ember Graphite (dark) / Ember Paper (light) tokens and hover states

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`.
Enable it once in the repo: Settings → Pages → Source: **GitHub Actions**.
