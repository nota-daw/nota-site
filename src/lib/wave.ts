/** Small deterministic LCG so the demo waveforms look the same on every load. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Vertical-bar waveform path for amplitudes in 0..1, drawn into a w×h viewBox. */
export function wpath(amps: number[], w: number, h: number) {
  const step = w / amps.length;
  let d = "";
  amps.forEach((a, i) => {
    const x = (i * step + step / 2).toFixed(1);
    const v = Math.max(0.6, (Math.min(1, a) * h) / 2 - 2);
    d += "M" + x + " " + (h / 2 - v).toFixed(1) + "V" + (h / 2 + v).toFixed(1);
  });
  return d;
}
