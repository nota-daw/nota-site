import { ScaleToFit } from "../components/ScaleToFit";
import { SettingsWindow } from "./plugins/SettingsWindow";

export function Plugins() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: '48px', alignItems: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '520px' }}>
          <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', letterSpacing: '.14em', color: 'var(--ink4)' }}>GET PLUG-INS · VST3 / AU</div>
          <h3 style={{ margin: '0', fontSize: '32px', fontWeight: '600', letterSpacing: '-.02em', lineHeight: '1.1' }}>Free plug-ins, one click away.</h3>
        </div>
        <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.65', color: 'var(--ink3)', textWrap: 'pretty', maxWidth: '520px' }}>Open Settings → Downloads and install Dexed, Dragonfly Reverb, CHOW Tape Model and more without running an installer. Each plug-in comes from its project's own GitHub release and is checked against the registry before unpacking. Your own VST3 and AU plug-ins get a device card with every parameter as a knob.</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ScaleToFit width={880} height={640}>
          <SettingsWindow startTab="Downloads" />
        </ScaleToFit>
      </div>
    </div>
  );
}
