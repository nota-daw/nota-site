import { GITHUB } from "../lib/github";

// Everyone with commits across the nota-daw repositories, from the build-time GitHub snapshot.
// Coding assistants credited as co-authors are not people, so they are left out.
const HIDDEN = new Set(["claude"]);
const people = GITHUB.contributors.filter((c) => !HIDDEN.has((c.login ?? c.name).toLowerCase()));
const initials = (name: string) => name.split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

export function Contributors() {
  return (
    <div id="contributors" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: '48px', alignItems: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '520px' }}>
          <div style={{ fontSize: '11px', fontWeight: '500', color: 'var(--ink4)' }}>Contributors</div>
          <h3 style={{ margin: '0', fontSize: '32px', fontWeight: '600', letterSpacing: '-.02em', lineHeight: '1.1' }}>Made by the people who use it.</h3>
        </div>
        <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.65', color: 'var(--ink3)', textWrap: 'pretty', maxWidth: '520px' }}>
          {people.length === 1 ? "One person has" : `${people.length} people have`} committed to Nota's app, docs, site and registries. Fixes, devices, presets and translations are all welcome.
        </p>
      </div>
      <ul style={{ listStyle: 'none', margin: '0', padding: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '8px' }}>
        {people.map((p) => {
          const body = (
            <>
              {p.avatar
                ? <img src={p.avatar + (p.avatar.includes("?") ? "&" : "?") + "s=80"} alt="" width={36} height={36} loading="lazy" decoding="async" style={{ display: 'block', borderRadius: '5px', background: 'var(--well)' }} />
                : <span aria-hidden="true" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px', background: 'var(--well)', color: 'var(--ink3)', fontSize: '13px', fontWeight: '600' }}>{initials(p.name)}</span>}
              <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                <span style={{ fontSize: '11px', color: 'var(--ink4)' }}>{p.contributions} {p.contributions === 1 ? "commit" : "commits"}</span>
              </span>
            </>
          );
          const box = { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '7px', color: 'inherit' } as const;
          return (
            <li key={p.login ?? p.name}>
              {p.url ? <a className="h9" href={p.url} target="_blank" rel="noopener" style={box}>{body}</a> : <div style={box}>{body}</div>}
            </li>
          );
        })}
      </ul>
      <a href="https://github.com/nota-daw/nota/graphs/contributors" target="_blank" rel="noopener" style={{ alignSelf: 'flex-start', fontSize: '14px', fontWeight: '600', borderBottom: '1px solid var(--accentEdge)', paddingBottom: '2px' }}>All contributors on GitHub →</a>
    </div>
  );
}
