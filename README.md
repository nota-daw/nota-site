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
- `src/features/` — the feature demos: stems, Nota Remote, the device gallery, version history, audio → MIDI, plug-ins, MCP
- `src/features/remote/Phone.tsx`, `src/features/plugins/SettingsWindow.tsx` — the live phone and the Settings window, ported from the "Nota Remote" and "Nota Settings" mockups with their logic kept as written there
- `src/MainWindow.tsx`, `src/hero/Transport.tsx` — the interactive main-window mock in the hero, laid out at 1680 px and scaled to fit; the transport follows `MainWindow.axaml`
- `public/devices/` + `src/features/devices/devices.json` — device gallery images: every tab of each device mockup in `nota-design`, shot at 2x (Monolith and Strata have no mockup, so they are cards captured from the app)
- `public/hero/devices-panel.webp` — the Devices panel (Volt + Flanger) captured from the real app at 2x
- `src/lib/release.ts` — fetches the latest GitHub release and picks the download for the visitor's OS; falls back to the releases page offline
- `src/styles.css` — Ember Graphite (dark) / Ember Paper (light) tokens and hover states

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`.
Enable it once in the repo: Settings → Pages → Source: **GitHub Actions**.
