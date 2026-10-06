import { Fragment } from "react";

const RIVALS = [["Nota", "0.43"], ["Ableton Live", "12"], ["Logic Pro", "11"], ["Bitwig Studio", "5"]];
const Y = "✓", NO = "—";
const COMPARE: [string, string[]][] = [
  ["Price", ["Free", "$99 – $749", "$199.99", "$99 – $399"]],
  ["macOS", [Y, Y, Y, Y]],
  ["Windows", [Y, Y, NO, Y]],
  ["Linux", [Y, NO, NO, Y]],
  ["Open source", [Y, NO, NO, NO]],
  ["On-device stem separation", [Y, "Suite only", Y, NO]],
  ["Audio to MIDI with chords", [Y, Y, "Melody only", NO]],
  ["Project version tree", [Y, NO, "Alternatives", NO]],
  ["Built-in MCP for AI assistants", [Y, NO, NO, NO]],
  ["Phone remote", [Y, NO, Y, NO]],
  ["One-click free plug-in installs", [Y, NO, NO, NO]],
  ["VST3 hosting", [Y, Y, NO, Y]],
];
const rivals = RIVALS.map(([name, sub], i) => ({ name, sub, bg: i ? "transparent" : "var(--brassSoft)", ink: i ? "var(--ink2)" : "var(--ink)" }));
const compare = COMPARE.map(([label, cells]) => ({
  label,
  cells: cells.map((t, i) => ({
    t, w: i === 0 ? 600 : 400, bg: i === 0 ? "var(--brassSoft)" : "transparent",
    ink: t === NO ? "var(--ink4)" : i === 0 ? "var(--brassInk)" : t === Y ? "var(--ink)" : "var(--ink2)",
  })),
}));

export function Compare() {
  return (
    <section id="compare" style={{ maxWidth: '1200px', margin: '0 auto', padding: '140px 28px 0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '720px' }}>
        <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: '12px', letterSpacing: '.16em', color: 'var(--eyebrow)' }}>02 · COMPARE</div>
        <h2 style={{ margin: '0', fontSize: 'clamp(32px,4.4vw,52px)', fontWeight: '600', letterSpacing: '-.03em', lineHeight: '1.05', textWrap: 'balance' }}>How Nota lines up.</h2>
      </div>
      <div style={{ overflowX: 'auto', border: '1px solid var(--line)', borderRadius: '10px', background: 'var(--surface)' }}>
        <div style={{ minWidth: '720px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px,1.6fr) repeat(4,minmax(110px,1fr))', borderBottom: '1px solid var(--line)' }}>
            <span style={{ padding: '18px 20px' }} />
            {rivals.map((r, rI) => (
              <Fragment key={rI}>
                <div style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: '3px', background: r.bg, borderLeft: '1px solid var(--hair)' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: r.ink }}>{r.name}</span>
                  <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: 'var(--ink4)' }}>{r.sub}</span>
                </div>
              </Fragment>
            ))}
          </div>
          {compare.map((row, rowI) => (
            <Fragment key={rowI}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px,1.6fr) repeat(4,minmax(110px,1fr))', borderBottom: '1px solid var(--hair)' }}>
                <span style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--ink2)' }}>{row.label}</span>
                {row.cells.map((c, cI) => (
                  <Fragment key={cI}>
                    <span style={{ padding: '14px 16px', fontSize: '13px', fontWeight: c.w, color: c.ink, background: c.bg, borderLeft: '1px solid var(--hair)' }}>{c.t}</span>
                  </Fragment>
                ))}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <p style={{ margin: '0', fontSize: '12px', lineHeight: '1.6', color: 'var(--ink4)', maxWidth: '760px' }}>Based on the vendors' public product pages as of October 2026. Prices are US list prices for the cheapest and most complete editions.</p>
    </section>
  );
}
