import { Fragment } from "react";
import { META, type BuildKey, type Release } from "../lib/release";

const ALT: Partial<Record<BuildKey, BuildKey>> = { win: "winArm", linux: "linuxArm" };

export function Download({ release }: { release: Release }) {
  const { version, date, osKey, dl } = release;
  const cardKey: BuildKey = osKey === "winArm" ? "win" : osKey === "linuxArm" ? "linux" : osKey;
  const relDate = date ? new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : null;
  const releaseNote = (relDate ? "Released " + relDate + ". " : "") + "Nota updates itself from the start screen after the first install.";

  const downloads = (["macArm", "macIntel", "win", "linux"] as BuildKey[]).map((k) => {
    const yours = k === cardKey, main = yours && osKey !== cardKey ? osKey : k, d = dl(main);
    const altKey = ALT[k] ? (main === k ? ALT[k]! : k) : null, ad = altKey ? dl(altKey) : null;
    return {
      os: META[main].os, arch: META[main].arch, file: d.file, size: d.size, href: d.href, yours,
      hasAlt: !!ad, altHref: ad ? ad.href : "", altLabel: ad && altKey ? META[altKey].arch.split(" ·")[0] + " build " + ad.size : "",
      bg: yours ? "var(--brassSoft)" : "var(--surface)", edge: yours ? "var(--brassEdge)" : "var(--line)",
      btnBg: yours ? "var(--brass)" : "transparent", btnInk: yours ? "var(--onBrass)" : "var(--ink2)", btnEdge: yours ? "var(--brass)" : "var(--line)",
    };
  });
  return (
    <section id="download" style={{ maxWidth: '1200px', margin: '0 auto', padding: '140px 28px 120px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '720px' }}>
          <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: '12px', letterSpacing: '.16em', color: 'var(--eyebrow)' }}>03 · DOWNLOAD</div>
          <h2 style={{ margin: '0', fontSize: 'clamp(32px,4.4vw,52px)', fontWeight: '600', letterSpacing: '-.03em', lineHeight: '1.05' }}>Get Nota {version}</h2>
          <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.6', color: 'var(--ink3)' }}>{releaseNote}</p>
        </div>
        <a href="https://github.com/nota-daw/nota/releases" target="_blank" rel="noopener" style={{ fontSize: '14px', fontWeight: '600', borderBottom: '1px solid var(--brassEdge)', paddingBottom: '2px' }}>All releases and changelogs →</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: '12px' }}>
        {downloads.map((d, dI) => (
          <Fragment key={dI}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a className="h10" href={d.href} style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '22px', padding: '22px', borderRadius: '10px', background: d.bg, border: `1px solid ${d.edge}`, color: 'var(--ink)', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px', fontWeight: '600' }}>{d.os}</span>
                  {d.yours ? (
                    <>
                      <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', letterSpacing: '.08em', padding: '3px 7px', borderRadius: '3px', background: 'var(--brass)', color: 'var(--onBrass)' }}>YOUR SYSTEM</span>
                    </>
                  ) : null}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--ink3)' }}>{d.arch}</span>
                  <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: 'var(--ink4)', overflowWrap: 'anywhere' }}>{d.file}</span>
                </div>
                <span style={{ height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', background: d.btnBg, color: d.btnInk, border: `1px solid ${d.btnEdge}`, boxSizing: 'border-box' }}>Download {d.size}</span>
              </a>
              {d.hasAlt ? (
                <>
                  <a className="h11" href={d.altHref} style={{ padding: '0 4px', fontSize: '12px', color: 'var(--ink3)' }}>{d.altLabel} →</a>
                </>
              ) : null}
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
