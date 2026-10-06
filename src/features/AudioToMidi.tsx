import { Fragment } from "react";
import { rng, wpath } from "../lib/wave";

const N = 150;
const KEYS_AMP = (() => {
  const r = rng(31), a: number[] = [];
  for (let i = 0; i < N; i++) { const p = (i % (N / 8)) / (N / 8); a.push(Math.exp(-p * 2.4) * (0.7 + r() * 0.3) + 0.05); }
  return a;
})();
const keysD = wpath(KEYS_AMP, 600, 60);

const ROWS = 20, TOP_MIDI = 76;
const BLACK = [1, 3, 6, 8, 10];
const CHORDS = [[57, 60, 64], [53, 57, 60], [60, 64, 67], [55, 59, 62]];
const MELODY = [[0, 72, 1], [1, 71, 0.5], [1.5, 69, 0.5], [2, 72, 1], [3, 74, 0.5], [3.5, 72, 0.5], [4, 67, 1.5], [5.5, 69, 0.5], [6, 71, 1], [7, 67, 1]];
const notes = (() => {
  const out: { left: string; width: string; top: string; h: string; op: string }[] = [];
  const r = rng(5), h = (100 / ROWS).toFixed(3) + "%";
  const place = (start: number, pitch: number, len: number, op: number) => {
    const row = TOP_MIDI - pitch; if (row < 0 || row >= ROWS) return;
    out.push({ left: (start / 8 * 100).toFixed(2) + "%", width: "calc(" + (len / 8 * 100).toFixed(2) + "% - 2px)", top: (row / ROWS * 100).toFixed(2) + "%", h, op: op.toFixed(2) });
  };
  CHORDS.forEach((c, i) => c.forEach((p) => place(i * 2, p, 1.9, 0.5 + r() * 0.3)));
  MELODY.forEach(([s, p, l]) => place(s, p, l - 0.06, 0.8 + r() * 0.2));
  return out;
})();
const keysRows = Array.from({ length: ROWS }, (_, i) => ({ bg: BLACK.includes((TOP_MIDI - i) % 12) ? "var(--line)" : "transparent" }));

export function AudioToMidi() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: '48px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '460px' }}>
        <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', letterSpacing: '.14em', color: 'var(--ink4)' }}>AUDIO → MIDI</div>
        <h3 style={{ margin: '0', fontSize: '32px', fontWeight: '600', letterSpacing: '-.02em', lineHeight: '1.1' }}>Hum it, play it, get the notes.</h3>
        <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.65', color: 'var(--ink3)', textWrap: 'pretty' }}>Convert Melody and Convert Harmony use Spotify's basic-pitch model. They pick up every note, chords included, with velocities that follow the playing. Nota also reads tempo and key from your sample library, so you can filter loops by BPM and key.</p>
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', boxSizing: 'border-box', minWidth: '0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 4px' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--ink)' }}>Keys take 2</span>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: 'var(--ink4)' }}>Convert Harmony</span>
          <span style={{ flex: '1' }} />
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: 'var(--brassInk)' }}>A minor · 124 BPM</span>
        </div>
        <div style={{ height: '56px', borderRadius: '5px', background: 'var(--well)', border: '1px solid var(--hair)', overflow: 'hidden' }}>
          <svg viewBox={'0 0 600 60'} preserveAspectRatio={'none'} style={{ width: '100%', height: '100%', display: 'block' }}>
            <path d={keysD} stroke="#5AA0B8" strokeWidth="1.6" fill="none" />
          </svg>
        </div>
        <div style={{ height: '220px', display: 'flex', borderRadius: '5px', overflow: 'hidden', border: '1px solid var(--hair)' }}>
          <div style={{ width: '30px', flex: 'none', display: 'flex', flexDirection: 'column', background: 'var(--raised)', borderRight: '1px solid var(--hair)' }}>
            {keysRows.map((k, kI) => (
              <Fragment key={kI}>
                <div style={{ flex: '1', background: k.bg, borderBottom: '1px solid var(--hair)' }} />
              </Fragment>
            ))}
          </div>
          <div style={{ flex: '1', minWidth: '0', position: 'relative', background: 'var(--well)', backgroundImage: 'repeating-linear-gradient(90deg,var(--grid) 0 1px,transparent 1px 12.5%)' }}>
            {notes.map((n, nI) => (
              <Fragment key={nI}>
                <div style={{ position: 'absolute', left: n.left, top: n.top, width: n.width, height: n.h, borderRadius: '2px', background: '#D8A03D', opacity: n.op, boxShadow: 'inset 0 0 0 1px #00000030' }} />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
