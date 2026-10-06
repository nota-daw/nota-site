import { Fragment } from "react";
import { LOGO } from "../lib/brand";
import type { Theme } from "../lib/theme";

export function Nav({ theme, onTheme }: { theme: Theme; onTheme: (t: Theme) => void }) {
  const themes = (["dark", "light"] as const).map((k) => ({
    name: k === "dark" ? "Dark" : "Light",
    bg: theme === k ? "var(--brass)" : "transparent",
    ink: theme === k ? "var(--onBrass)" : "var(--ink3)",
    onClick: () => onTheme(k),
  }));
  return (
    <nav style={{ position: 'sticky', top: '0', zIndex: '20', background: 'var(--navBg)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid var(--hair)' }}>
      <div className="nav-row" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 28px', height: '60px', display: 'flex', alignItems: 'center', gap: '28px', boxSizing: 'border-box' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--ink)' }}>
          <img src={LOGO} alt="" width="26" height="26" style={{ display: 'block', borderRadius: '6px' }} />
          <span style={{ fontSize: '16px', fontWeight: '600', letterSpacing: '-.01em' }}>Nota</span>
        </a>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap' }}>
          <a className="h1" href="#features" style={{ fontSize: '13px', fontWeight: '500', color: 'var(--ink3)' }}>Features</a>
          <a className="h2" href="#compare" style={{ fontSize: '13px', fontWeight: '500', color: 'var(--ink3)' }}>Compare</a>
          <a className="h3" href="#download" style={{ fontSize: '13px', fontWeight: '500', color: 'var(--ink3)' }}>Download</a>
          <a className="h4" href="https://github.com/nota-daw/nota" target="_blank" rel="noopener" style={{ fontSize: '13px', fontWeight: '500', color: 'var(--ink3)' }}>GitHub</a>
        </div>
        <div style={{ flex: '1' }} />
        <div style={{ display: 'flex', padding: '3px', background: 'var(--well)', border: '1px solid var(--hair)', borderRadius: '6px' }}>
          {themes.map((t, tI) => (
            <Fragment key={tI}>
              <button onClick={t.onClick} style={{ height: '24px', padding: '0 10px', border: 'none', borderRadius: '4px', background: t.bg, color: t.ink, fontFamily: 'Geist, system-ui, sans-serif', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>{t.name}</button>
            </Fragment>
          ))}
        </div>
        <a className="h5" href="#download" style={{ height: '34px', padding: '0 16px', display: 'flex', alignItems: 'center', borderRadius: '6px', background: 'var(--brass)', color: 'var(--onBrass)', fontSize: '13px', fontWeight: '600' }}>Download</a>
      </div>
    </nav>
  );
}
