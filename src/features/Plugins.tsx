import { Fragment, useEffect, useRef, useState } from "react";

const PLUGINS = [
  ["Surge XT", "Hybrid synthesizer"], ["Dexed", "FM synthesizer · DX7-style"], ["Dragonfly Reverb", "Hall, room and plate reverbs"],
  ["CHOW Tape Model", "Analog tape emulation"], ["Stochas", "Probability step sequencer"],
] as const;

export function Plugins() {
  const [progress, setProgress] = useState<Record<string, number>>({ "Surge XT": 100 });
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearInterval), []);

  // Fake download: tick the bar up until it reaches 100 %.
  const install = (name: string) => {
    if (progress[name] != null) return;
    setProgress((p) => ({ ...p, [name]: 0 }));
    const iv = window.setInterval(() => {
      setProgress((p) => {
        const v = Math.min(100, (p[name] || 0) + 7 + Math.random() * 10);
        if (v >= 100) clearInterval(iv);
        return { ...p, [name]: v };
      });
    }, 120);
    timers.current.push(iv);
  };

  const plugins = PLUGINS.map(([name, kind]) => {
    const p = progress[name], done = p != null && p >= 100, busy = p != null && p < 100;
    return {
      name, kind, pct: (p || 0) + "%", barOp: busy ? 1 : 0,
      label: done ? "Installed" : busy ? Math.round(p) + "%" : "Install",
      bg: done ? "transparent" : busy ? "var(--raised)" : "var(--brass)",
      ink: done ? "var(--ink4)" : busy ? "var(--ink2)" : "var(--onBrass)",
      edge: done || busy ? "var(--line)" : "var(--brass)",
      onClick: () => install(name),
    };
  });
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: '48px', alignItems: 'center' }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', overflow: 'hidden', boxSizing: 'border-box', minWidth: '0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 18px', borderBottom: '1px solid var(--hair)' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--ink)' }}>Settings → Get Plug-ins</span>
          <span style={{ flex: '1' }} />
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: 'var(--ink4)' }}>Nota plugin registry</span>
        </div>
        {plugins.map((p, pI) => (
          <Fragment key={pI}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 18px', borderBottom: '1px solid var(--hair)' }}>
              <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ink)' }}>{p.name}</span>
                <span style={{ fontSize: '11px', color: 'var(--ink4)' }}>{p.kind}</span>
              </div>
              <div style={{ width: '90px', height: '4px', borderRadius: '2px', background: 'var(--well)', overflow: 'hidden', opacity: p.barOp }}>
                <div style={{ height: '100%', width: p.pct, background: 'var(--brass)' }} />
              </div>
              <button onClick={p.onClick} style={{ width: '84px', height: '28px', borderRadius: '5px', border: `1px solid ${p.edge}`, background: p.bg, color: p.ink, fontFamily: 'Geist, system-ui, sans-serif', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>{p.label}</button>
            </div>
          </Fragment>
        ))}
        <div style={{ padding: '12px 18px', fontSize: '11px', color: 'var(--ink4)' }}>Each plug-in comes from its own GitHub release and is checked against the registry before unpacking.</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '460px' }}>
        <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', letterSpacing: '.14em', color: 'var(--ink4)' }}>GET PLUG-INS · VST3 / AU</div>
        <h3 style={{ margin: '0', fontSize: '32px', fontWeight: '600', letterSpacing: '-.02em', lineHeight: '1.1' }}>Free plug-ins, one click away.</h3>
        <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.65', color: 'var(--ink3)', textWrap: 'pretty' }}>Install Surge XT, Dexed, Dragonfly Reverb, CHOW Tape Model and more from Settings, without running an installer. If a project needs a plug-in you don't have, Nota offers to install it. Your own VST3 and AU plug-ins get a device card with every parameter as a knob.</p>
      </div>
    </div>
  );
}
