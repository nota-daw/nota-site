import { useState } from "react";
import { ScaleToFit } from "../components/ScaleToFit";
import { useShot } from "../lib/theme";

// Screenshots of the real Nota Remote web app (src/web/remote) in Studio Dark and Studio Light,
// captured at 2x on a 390 x 844 phone viewport.
const SCREENS = ["Pads", "Keys", "XY", "Mixer", "Macros", "Scenes"];

export function Remote() {
  const [screen, setScreen] = useState("Pads");
  const shot = useShot();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: '48px', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', minWidth: '0' }}>
        <ScaleToFit width={412} height={866}>
          <div style={{ padding: '10px', background: '#141517', border: '1px solid #141517', borderRadius: '52px' }}>
            <img src={shot("remote/" + screen.toLowerCase() + ".avif")} width={390} height={844} loading="lazy" decoding="async" alt={"Nota Remote, " + screen + " screen"} style={{ display: 'block', borderRadius: '44px' }} />
          </div>
        </ScaleToFit>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '460px' }}>
        <div style={{ fontSize: '11px', fontWeight: '500', color: 'var(--ink4)' }}>Nota Remote</div>
        <h3 style={{ margin: '0', fontSize: '32px', fontWeight: '600', letterSpacing: '-.02em', lineHeight: '1.1' }}>Your phone becomes a wireless controller.</h3>
        <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.65', color: 'var(--ink3)', textWrap: 'pretty' }}>Click Remote in the top bar and scan the QR code. Nota serves the controller over your local network, so there is nothing to install. The phone opens the screen that fits the selected track: pads for a Drum Rack, keys for a synth.</p>
        <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.65', color: 'var(--ink3)', textWrap: 'pretty' }}>Play, record and jump between sections from the vocal booth, ride faders, drag an XY pad or tilt the phone, launch clips and scenes. Pick a screen below to see it.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '4px' }}>
          {SCREENS.map((s) => {
            const on = s === screen;
            return (
              <button key={s} className={'g-chip' + (on ? ' on' : '')} onClick={() => setScreen(s)} aria-pressed={on} style={{ height: '28px', padding: '0 12px', display: 'flex', alignItems: 'center', borderRadius: '7px', background: on ? 'var(--accentSoft)' : 'var(--well)', border: 'none', fontSize: '12px', fontWeight: on ? 600 : 400, color: on ? 'var(--accentInk)' : 'var(--ink2)', boxSizing: 'border-box', cursor: 'pointer' }}>{s}</button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
