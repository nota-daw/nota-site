import { Fragment, useState } from "react";

const VERSIONS = [
  ["v15", "Added Bass · Tempo 120 → 124", "now", 0],
  ["v14", "Vocal take 3 · Chamber on Vox", "12 min", 0],
  ["v13b", "Drop idea · New drum pattern", "40 min", 1],
  ["v13", "Separated stems of loop.wav", "1 h", 0],
  ["v12", "Sections: Intro, Verse, Drop", "yesterday", 0],
] as const;

export function History() {
  const [sel, setSel] = useState("v15");
  const versions = VERSIONS.map(([v, msg, time, br]) => {
    const on = sel === v;
    return {
      v, msg, time, isBranch: !!br, dotX: br ? "23px" : "7px",
      dot: on ? "var(--brass)" : br ? "var(--brassEdge)" : "var(--ink4)",
      tagInk: on ? "var(--brassInk)" : "var(--ink4)", bg: on ? "var(--brassSoft)" : "transparent",
      onClick: () => setSel(v),
    };
  });
  const selVersion = sel;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: '48px', alignItems: 'center' }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '8px 0', boxSizing: 'border-box', minWidth: '0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 18px 12px', borderBottom: '1px solid var(--hair)' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--ink)' }}>History</span>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: 'var(--ink4)' }}>demo02.nota · 15 versions · 212 MB shared</span>
        </div>
        {versions.map((v, vI) => (
          <Fragment key={vI}>
            <div className="h9" onClick={v.onClick} style={{ display: 'flex', alignItems: 'stretch', gap: '12px', padding: '0 18px', cursor: 'pointer', background: v.bg }}>
              <div style={{ width: '40px', flex: 'none', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '11px', top: '0', bottom: '0', width: '2px', background: 'var(--line)' }} />
                {v.isBranch ? (
                  <>
                    <div style={{ position: 'absolute', left: '12px', top: '50%', width: '18px', height: '2px', background: 'var(--brassEdge)' }} />
                  </>
                ) : null}
                <div style={{ position: 'absolute', left: v.dotX, top: '50%', width: '10px', height: '10px', marginTop: '-5px', borderRadius: '50%', background: v.dot, border: '2px solid var(--surface)' }} />
              </div>
              <div style={{ flex: '1', minWidth: '0', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid var(--hair)' }}>
                <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: v.tagInk, width: '34px', flex: 'none' }}>{v.v}</span>
                <span style={{ flex: '1', minWidth: '0', fontSize: '13px', color: 'var(--ink2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.msg}</span>
                <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: 'var(--ink4)', flex: 'none' }}>{v.time}</span>
              </div>
            </div>
          </Fragment>
        ))}
        <div style={{ display: 'flex', gap: '8px', padding: '14px 18px 8px' }}>
          <span style={{ height: '28px', padding: '0 12px', display: 'flex', alignItems: 'center', borderRadius: '5px', background: 'var(--brass)', color: 'var(--onBrass)', fontSize: '12px', fontWeight: '600' }}>Go back to {selVersion}</span>
          <span style={{ height: '28px', padding: '0 12px', display: 'flex', alignItems: 'center', borderRadius: '5px', border: '1px solid var(--line)', color: 'var(--ink2)', fontSize: '12px', fontWeight: '500', boxSizing: 'border-box' }}>Open as copy</span>
          <span style={{ height: '28px', padding: '0 12px', display: 'flex', alignItems: 'center', borderRadius: '5px', border: '1px solid var(--line)', color: 'var(--ink2)', fontSize: '12px', fontWeight: '500', boxSizing: 'border-box' }}>New branch</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '460px' }}>
        <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', letterSpacing: '.14em', color: 'var(--ink4)' }}>VERSION HISTORY</div>
        <h3 style={{ margin: '0', fontSize: '32px', fontWeight: '600', letterSpacing: '-.02em', lineHeight: '1.1' }}>A time machine for every project.</h3>
        <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.65', color: 'var(--ink3)', textWrap: 'pretty' }}>Every save keeps a version. The History tab shows them as a tree: go back to any one, open it as a copy or start a new branch. Each version describes its own changes, and versions share their audio, so they take almost no space.</p>
      </div>
    </div>
  );
}
