import { ScaleToFit } from "../components/ScaleToFit";
import { Phone } from "./remote/Phone";

const SCREENS = ["Pads", "Keys", "XY", "Mixer", "Macros", "Scenes"];

export function Remote() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: '48px', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', minWidth: '0' }}>
        <ScaleToFit width={412} height={866}>
          <Phone device="phone" startScreen="Pads" trackIdx={0} playing />
        </ScaleToFit>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '460px' }}>
        <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', letterSpacing: '.14em', color: 'var(--ink4)' }}>NOTA REMOTE</div>
        <h3 style={{ margin: '0', fontSize: '32px', fontWeight: '600', letterSpacing: '-.02em', lineHeight: '1.1' }}>Your phone becomes a wireless controller.</h3>
        <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.65', color: 'var(--ink3)', textWrap: 'pretty' }}>Click Remote in the top bar and scan the QR code. Nota serves the controller over your local network, so there is nothing to install. The phone opens the screen that fits the selected track: pads for a Drum Rack, keys for a synth.</p>
        <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.65', color: 'var(--ink3)', textWrap: 'pretty' }}>Play, record and jump between sections from the vocal booth, ride faders, drag an XY pad or tilt the phone, launch clips and scenes. The phone here is live: tap the pads, switch screens, press Play.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '4px' }}>
          {SCREENS.map((s) => (
            <span key={s} style={{ height: '26px', padding: '0 10px', display: 'flex', alignItems: 'center', borderRadius: '4px', background: 'var(--well)', border: '1px solid var(--hair)', fontSize: '12px', color: 'var(--ink2)', boxSizing: 'border-box' }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
