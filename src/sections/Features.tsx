import { Stems } from "../features/Stems";
import { History } from "../features/History";
import { AudioToMidi } from "../features/AudioToMidi";
import { Devices } from "../features/Devices";
import { Plugins } from "../features/Plugins";
import { Mcp } from "../features/Mcp";
import { Remote } from "../features/Remote";
import { OpenSource } from "../features/OpenSource";

export function Features() {
  return (
    <section id="features" style={{ maxWidth: '1200px', margin: '0 auto', padding: '140px 28px 0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '120px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '720px' }}>
        <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: '12px', letterSpacing: '.16em', color: 'var(--eyebrow)' }}>01 · FEATURES</div>
        <h2 style={{ margin: '0', fontSize: 'clamp(32px,4.4vw,52px)', fontWeight: '600', letterSpacing: '-.03em', lineHeight: '1.05', textWrap: 'balance' }}>Tools that usually cost extra, built in and running locally.</h2>
      </div>
      <Stems />
      <History />
      <AudioToMidi />
      <Devices />
      <Plugins />
      <Mcp />
      <Remote />
      <OpenSource />
    </section>
  );
}
