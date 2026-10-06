import { Fragment } from "react";
import { rng, wpath } from "../lib/wave";

const N = 150;
function stemAmps() {
  const r = rng(7), beat = N / 16;
  const drums: number[] = [], bass: number[] = [], vox: number[] = [], other: number[] = [];
  for (let i = 0; i < N; i++) {
    const p = (i % beat) / beat, sec = i / N;
    drums.push(Math.exp(-p * 5) * (0.75 + r() * 0.25) + r() * 0.05);
    bass.push((Math.floor(i / beat) % 2 ? 0.45 : 0.6) * (1 - p * 0.5) + r() * 0.06);
    vox.push(sec < 0.25 ? 0.02 : (0.25 + 0.45 * Math.abs(Math.sin(i / 6)) * (0.6 + r() * 0.4)) * (Math.sin(i / 2.3) > -0.7 ? 1 : 0.1));
    other.push(0.22 + 0.18 * Math.sin(i / 9) + r() * 0.12);
  }
  const mix = drums.map((_, i) => (drums[i] + bass[i] + vox[i] + other[i]) * 0.48);
  return { drums, bass, vox, other, mix };
}
const STEMS = stemAmps();
const mixD = wpath(STEMS.mix, 600, 60);
const stems = ([["Drums", "#58B368", STEMS.drums], ["Bass", "#C2554A", STEMS.bass], ["Vocals", "#9AA64A", STEMS.vox], ["Other", "#5AA0B8", STEMS.other]] as const)
  .map(([name, color, a]) => ({ name, color, tint: color + "12", d: wpath([...a], 600, 60) }));

export function Stems() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: '48px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '460px' }}>
        <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', letterSpacing: '.14em', color: 'var(--ink4)' }}>SEPARATE STEMS</div>
        <h3 style={{ margin: '0', fontSize: '32px', fontWeight: '600', letterSpacing: '-.02em', lineHeight: '1.1' }}>Any song, split into four tracks.</h3>
        <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.65', color: 'var(--ink3)', textWrap: 'pretty' }}>Right-click an audio clip and choose Separate Stems. Drums, Bass, Vocals and Other land on four tracks, lined up with the original. It runs on Meta's Demucs model on your computer: a three-minute song takes under a minute, and no audio leaves your machine.</p>
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box', minWidth: '0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 4px 4px' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--ink)' }}>loop.wav</span>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: 'var(--ink4)' }}>3:12 · 44.1 kHz</span>
          <span style={{ flex: '1' }} />
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: 'var(--brassInk)' }}>Separated · 41 s</span>
        </div>
        <div style={{ height: '62px', display: 'flex', borderRadius: '5px', overflow: 'hidden', background: 'var(--well)', border: '1px solid var(--hair)' }}>
          <div style={{ width: '84px', flex: 'none', display: 'flex', alignItems: 'center', padding: '0 10px', borderRight: '1px solid var(--hair)', fontSize: '11px', fontWeight: '600', color: 'var(--ink2)' }}>Original</div>
          <svg viewBox={'0 0 600 60'} preserveAspectRatio={'none'} style={{ flex: '1', minWidth: '0', height: '100%', display: 'block' }}>
            <path d={mixD} stroke="var(--ink4)" strokeWidth="1.6" fill="none" />
          </svg>
        </div>
        {stems.map((s, sI) => (
          <Fragment key={sI}>
            <div style={{ height: '46px', display: 'flex', borderRadius: '5px', overflow: 'hidden', background: 'var(--well)', border: '1px solid var(--hair)' }}>
              <div style={{ width: '84px', flex: 'none', display: 'flex', alignItems: 'center', gap: '7px', padding: '0 10px', borderRight: '1px solid var(--hair)', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '3px', background: s.color }} />
                <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ink2)' }}>{s.name}</span>
              </div>
              <svg viewBox={'0 0 600 60'} preserveAspectRatio={'none'} style={{ flex: '1', minWidth: '0', height: '100%', display: 'block', background: s.tint }}>
                <path d={s.d} stroke={s.color} strokeWidth="1.6" fill="none" />
              </svg>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
