import { Fragment } from "react";

const stack = [
  { k: "Engine", v: "Audio engine and DSP in portable C++20" },
  { k: "Interface", v: "Avalonia (.NET), Studio Dark, Studio Light, Ember Graphite and Ember Paper themes, a Classic look and your own skins" },
  { k: "Plug-ins", v: "VST3, plus AU on macOS, hosted through JUCE in its own isolated module" },
];

export function OpenSource() {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '9px', padding: 'clamp(28px,5vw,56px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: '40px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: '500', color: 'var(--ink4)' }}>Free and open source</div>
        <h3 style={{ margin: '0', fontSize: '32px', fontWeight: '600', letterSpacing: '-.02em', lineHeight: '1.1' }}>No license keys, no tiers. The whole thing is on GitHub.</h3>
        <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.65', color: 'var(--ink3)', textWrap: 'pretty' }}>Read the code, file an issue, send a pull request. Updates install themselves from the start screen with one button.</p>
        <a href="https://github.com/nota-daw/nota" target="_blank" rel="noopener" style={{ alignSelf: 'flex-start', fontSize: '14px', fontWeight: '600', borderBottom: '1px solid var(--accentEdge)', paddingBottom: '2px' }}>github.com/nota-daw/nota →</a>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {stack.map((s, sI) => (
          <Fragment key={sI}>
            <div style={{ display: 'grid', gridTemplateColumns: '140px minmax(0,1fr)', gap: '18px', padding: '16px 0', borderBottom: '1px solid var(--hair)' }}>
              <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--ink4)', paddingTop: '1px' }}>{s.k}</span>
              <span style={{ fontSize: '14px', lineHeight: '1.55', color: 'var(--ink2)' }}>{s.v}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
