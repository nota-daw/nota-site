import { Fragment } from "react";

const DEVICES = [
  { title: "Instruments", color: "#5AA0B8", items: ["Synth", "Volt", "Aurora", "Operator", "Bass", "Flux", "Grain", "Pentad", "Consort", "Monolith", "Physical", "Pendulum", "Sampler", "Drum Rack", "Rhythm"] },
  { title: "Audio effects", color: "#D8A03D", items: ["EQ-3", "EQ-8", "Dynamic EQ", "Compressor", "Ceiling", "Level", "Prism", "Reverb", "Chamber", "Delay", "Chorus", "Phaser", "Flanger", "Orbit", "Auto Filter", "Auto Shift", "Forge", "Valve", "Vintage", "Crush", "Beat Repeat", "Shutter", "Strata", "Lens", "Utility"] },
  { title: "MIDI effects", color: "#9AA64A", items: ["Arp", "Chord", "Scale", "Length", "Velocity", "Random"] },
];
const deviceGroups = DEVICES.map((g) => ({ ...g, count: g.items.length }));

export function Devices() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: '48px', alignItems: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '520px' }}>
          <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', letterSpacing: '.14em', color: 'var(--ink4)' }}>INSTRUMENTS AND EFFECTS</div>
          <h3 style={{ margin: '0', fontSize: '32px', fontWeight: '600', letterSpacing: '-.02em', lineHeight: '1.1' }}>46 devices in the box, each with live graphs and presets.</h3>
        </div>
        <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.65', color: 'var(--ink3)', textWrap: 'pretty', maxWidth: '520px' }}>Subtractive, FM, wavetable, granular, physical and vector synths, a sampler and two drum machines with 29 kits. Every effect shows what it does to the sound, and most ship with around 30 presets.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: '12px' }}>
        {deviceGroups.map((g, gI) => (
          <Fragment key={gI}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink)' }}>{g.title}</span>
                <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: 'var(--brassInk)' }}>{g.count}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {g.items.map((it, itI) => (
                  <Fragment key={itI}>
                    <span style={{ height: '26px', padding: '0 10px', display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '4px', background: 'var(--well)', border: '1px solid var(--hair)', fontSize: '12px', color: 'var(--ink2)', boxSizing: 'border-box' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '2px', background: g.color }} />{it}

                    </span>
                  </Fragment>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
