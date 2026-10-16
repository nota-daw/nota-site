import { LOGO, LOGO_NIGHT } from "../lib/brand";
import type { Theme } from "../lib/theme";

const ICON = {
  sun: "M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8 M12 2v2 M12 20v2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M2 12h2 M20 12h2 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4",
  moon: "M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z",
};

export function Nav({ theme, onTheme }: { theme: Theme; onTheme: (t: Theme) => void }) {
  const themes = (["light", "dark"] as const).map((k) => ({
    key: k,
    label: k === "dark" ? "Dark theme" : "Light theme",
    icon: k === "dark" ? ICON.moon : ICON.sun,
    on: theme === k,
    onClick: () => onTheme(k),
  }));
  return (
    <nav style={{ position: 'sticky', top: '0', zIndex: '20', background: 'var(--navBg)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid var(--line)' }}>
      <div className="nav-row" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 28px', height: '60px', display: 'flex', alignItems: 'center', gap: '28px', boxSizing: 'border-box' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--ink)' }}>
          <img src={theme === "dark" ? LOGO_NIGHT : LOGO} alt="" width="26" height="26" style={{ display: 'block', borderRadius: '6px' }} />
          <span style={{ fontSize: '16px', fontWeight: '600', letterSpacing: '-.01em' }}>Nota</span>
        </a>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap' }}>
          <a className="h1" href="#features" style={{ fontSize: '13px', fontWeight: '500', color: 'var(--ink3)' }}>Features</a>
          <a className="h2" href="#compare" style={{ fontSize: '13px', fontWeight: '500', color: 'var(--ink3)' }}>Compare</a>
          <a className="h3" href="#download" style={{ fontSize: '13px', fontWeight: '500', color: 'var(--ink3)' }}>Download</a>
          <a className="h4" href="https://nota-daw.github.io/nota-docs/" target="_blank" rel="noopener" style={{ fontSize: '13px', fontWeight: '500', color: 'var(--ink3)' }}>Docs</a>
          <a className="h4" href="https://github.com/nota-daw/nota" target="_blank" rel="noopener" style={{ fontSize: '13px', fontWeight: '500', color: 'var(--ink3)' }}>GitHub</a>
        </div>
        <div style={{ flex: '1' }} />
        <div style={{ display: 'flex', padding: '3px', background: 'var(--well)', border: '1px solid var(--hair)', borderRadius: '3px' }}>
          {themes.map((t) => (
            <button key={t.key} onClick={t.onClick} aria-label={t.label} aria-pressed={t.on} title={t.label} style={{ width: '28px', height: '24px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: '2px', background: t.on ? 'var(--accent)' : 'transparent', color: t.on ? 'var(--onAccent)' : 'var(--ink3)', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={t.icon} /></svg>
            </button>
          ))}
        </div>
        <a className="h5" href="#download" style={{ height: '34px', padding: '0 16px', display: 'flex', alignItems: 'center', borderRadius: '3px', background: 'var(--accent)', color: 'var(--onAccent)', fontSize: '13px', fontWeight: '600' }}>Download</a>
      </div>
    </nav>
  );
}
