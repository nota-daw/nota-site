import { Fragment, useEffect, useRef, useState } from "react";
import { META, type BuildKey, type Release } from "../lib/release";
import { MainWindow } from "../MainWindow";

export function Hero({ release }: { release: Release }) {
  const { version, osKey, dl } = release;
  const heroRef = useRef<HTMLDivElement>(null);
  const winRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ scale: 0.5, winH: 1010 });

  // The main window mock is laid out at its native 1680 px and scaled to fit.
  useEffect(() => {
    const hero = heroRef.current, win = winRef.current;
    if (!hero || !win) return;
    const measure = () => setSize({ scale: hero.clientWidth / 1680, winH: win.offsetHeight });
    const ro = new ResizeObserver(measure);
    ro.observe(hero);
    ro.observe(win);
    measure();
    return () => ro.disconnect();
  }, []);

  const pd = dl(osKey);
  const primary = {
    label: META[osKey].label,
    sub: (osKey === "macArm" ? "Apple Silicon · " : osKey === "macIntel" ? "Intel · " : "") + version,
    href: pd.href,
  };
  const otherOs = (["macArm", "win", "linux"] as BuildKey[])
    .filter((k) => META[k].os !== META[osKey].os)
    .map((k) => ({ label: META[k].short, href: "#download" }));
  const heroScale = size.scale.toFixed(4);
  const heroH = Math.round(size.winH * size.scale) + "px";
  return (
    <header id="top" style={{ maxWidth: '1200px', margin: '0 auto', padding: '88px 28px 0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '56px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '820px' }}>
        <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: '12px', fontWeight: '500', letterSpacing: '.16em', color: 'var(--eyebrow)' }}>NOTA {version} · FREE AND OPEN SOURCE</div>
        <h1 style={{ margin: '0', fontSize: 'clamp(40px,6.4vw,76px)', fontWeight: '600', letterSpacing: '-.035em', lineHeight: '1', color: 'var(--ink)', textWrap: 'balance' }}>The free DAW for macOS, Windows and Linux.</h1>
        <p style={{ margin: '0', fontSize: '18px', lineHeight: '1.6', color: 'var(--ink3)', maxWidth: '680px', textWrap: 'pretty' }}>Arrange, record, mix and master with 15 instruments, 25 audio effects and 6 MIDI effects built in. Stem separation and audio-to-MIDI run on your own computer, and every save is kept as a version you can return to.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', paddingTop: '6px' }}>
          <a className="h6" href={primary.href} style={{ height: '48px', padding: '0 22px', display: 'flex', alignItems: 'center', gap: '14px', borderRadius: '8px', background: 'var(--brass)', color: 'var(--onBrass)' }}>
            <span style={{ fontSize: '15px', fontWeight: '600' }}>{primary.label}</span>
            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', opacity: '.75' }}>{primary.sub}</span>
          </a>
          <a className="h7" href="https://github.com/nota-daw/nota" target="_blank" rel="noopener" style={{ height: '48px', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '8px', background: 'var(--raised)', border: '1px solid var(--line)', color: 'var(--ink2)', boxSizing: 'border-box' }}>
            <span style={{ fontSize: '15px', fontWeight: '500' }}>Source on GitHub</span>
          </a>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: 'var(--ink4)' }}>
          <span>Also for</span>
          {otherOs.map((o, oI) => (
            <Fragment key={oI}>
              <a className="h8" href={o.href} style={{ color: 'var(--ink3)', borderBottom: '1px solid var(--line)' }}>{o.label}</a>
            </Fragment>
          ))}
        </div>
      </div>
      <div ref={heroRef} style={{ position: 'relative', width: '100%', height: heroH, borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--line)', boxShadow: '0 40px 100px #00000060', background: '#0C0B09' }}>
        <div ref={winRef} style={{ position: 'absolute', left: '0', top: '0', width: '1680px', transformOrigin: '0 0', transform: `scale(${heroScale})` }}>
          <MainWindow />
        </div>
      </div>
    </header>
  );
}
