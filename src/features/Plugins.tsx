import { ScaleToFit } from "../components/ScaleToFit";
import { useShot } from "../lib/theme";

// Settings > Downloads rendered from the real app in the site theme at 2x, listing the
// plug-ins in nota-plugins-registry.

export function Plugins() {
  const shot = useShot();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: '48px', alignItems: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '520px' }}>
          <div style={{ fontSize: '11px', fontWeight: '500', color: 'var(--ink4)' }}>Get plug-ins · VST3 / AU</div>
          <h3 style={{ margin: '0', fontSize: '32px', fontWeight: '600', letterSpacing: '-.02em', lineHeight: '1.1' }}>Free plug-ins, one click away.</h3>
        </div>
        <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.65', color: 'var(--ink3)', textWrap: 'pretty', maxWidth: '520px' }}>Open Settings → Downloads and install Dexed, Dragonfly Reverb, CHOW Tape Model and more without running an installer. Each plug-in comes from its project's own GitHub release and is checked against the registry before unpacking. Your own VST3 and AU plug-ins get a device card with every parameter as a knob.</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ScaleToFit width={880} height={640}>
          <img src={shot("settings/downloads.avif")} width={880} height={640} loading="lazy" decoding="async" alt="Settings, Downloads page: the plug-in registry with Install buttons" style={{ display: 'block', borderRadius: '9px', border: '1px solid var(--line)', boxShadow: '0 30px 80px var(--shadow)', boxSizing: 'border-box' }} />
        </ScaleToFit>
      </div>
    </div>
  );
}
