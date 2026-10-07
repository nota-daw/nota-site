import { LOGO } from "../lib/brand";

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--hair)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', boxSizing: 'border-box' }}>
        <img src={LOGO} alt="" width="20" height="20" style={{ display: 'block', borderRadius: '5px' }} />
        <span style={{ fontSize: '13px', color: 'var(--ink3)' }}>Nota · free, open-source DAW</span>
        <span style={{ flex: '1' }} />
        <a className="h12" href="https://nota-daw.github.io/nota-docs/" target="_blank" rel="noopener" style={{ fontSize: '13px', color: 'var(--ink3)' }}>Docs</a>
        <a className="h12" href="https://github.com/nota-daw/nota" target="_blank" rel="noopener" style={{ fontSize: '13px', color: 'var(--ink3)' }}>GitHub</a>
        <a className="h13" href="https://github.com/nota-daw/nota/issues" target="_blank" rel="noopener" style={{ fontSize: '13px', color: 'var(--ink3)' }}>Issues</a>
        <a className="h14" href="https://github.com/nota-daw/nota/discussions" target="_blank" rel="noopener" style={{ fontSize: '13px', color: 'var(--ink3)' }}>Discussions</a>
      </div>
    </footer>
  );
}
