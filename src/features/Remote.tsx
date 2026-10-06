import { Fragment, useEffect, useState } from "react";

const REMOTE = [["Drums", "#58B368", 74], ["Bass", "#C2554A", 58], ["Vocals", "#9AA64A", 66], ["Keys", "#5AA0B8", 40]] as const;

export function Remote() {
  const [playing, setPlaying] = useState(true);
  const [pos, setPos] = useState(17);
  const [muted, setMuted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => setPos((p) => (p >= 33 ? 1 : p + 0.0125)), 50);
    return () => clearInterval(iv);
  }, [playing]);

  const posBar = Math.floor(pos), beat = Math.floor((pos - posBar) * 4) + 1, tick = Math.floor((((pos - posBar) * 4) % 1) * 100);
  const remotePos = posBar + "." + beat + "." + String(tick).padStart(2, "0");
  const remotePlayBg = playing ? "#D8A03D" : "#1C1A16", remotePlayEdge = playing ? "#D8A03D" : "#2C2923", remotePlayInk = playing ? "#171613" : "#C7C0B0";
  const remoteToggle = () => setPlaying(!playing);
  const remoteStop = () => { setPlaying(false); setPos(1); };
  const remoteTracks = REMOTE.map(([name, color, m], i) => {
    const mu = !!muted[name], lvl = playing && !mu ? Math.max(8, m + Math.sin(pos * 9 + i * 2) * 18) : 0;
    return {
      name, color, meter: lvl.toFixed(0) + "%",
      muteBg: mu ? "#D8A03D" : "#100F0D", muteInk: mu ? "#171613" : "#8D8779",
      onMute: () => setMuted((st) => ({ ...st, [name]: !st[name] })),
    };
  });
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: '48px', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
        <div style={{ width: '260px', height: '520px', borderRadius: '40px', background: '#0B0A09', border: '1px solid #3A362D', padding: '12px', boxSizing: 'border-box', boxShadow: '0 30px 80px #00000050' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '30px', background: '#141310', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '22px 16px 16px', gap: '14px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7FB069' }} />
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#C7C0B0' }}>Studio Mac</span>
              <span style={{ flex: '1' }} />
              <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: '#6E6A5E' }}>demo02</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '6px 0' }}>
              <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '36px', fontWeight: '500', color: '#F2EDE1', fontVariantNumeric: 'tabular-nums', letterSpacing: '-.02em' }}>{remotePos}</span>
              <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: '#8D8779' }}>124.00 BPM · 4/4 · A minor</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div onClick={remoteStop} style={{ flex: '1', height: '52px', borderRadius: '10px', background: '#1C1A16', border: '1px solid #2C2923', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxSizing: 'border-box' }}>
                <div style={{ width: '12px', height: '12px', background: '#C7C0B0', borderRadius: '2px' }} />
              </div>
              <div onClick={remoteToggle} style={{ flex: '1.4', height: '52px', borderRadius: '10px', background: remotePlayBg, border: `1px solid ${remotePlayEdge}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxSizing: 'border-box' }}>
                <div style={{ width: '0', height: '0', borderLeft: `14px solid ${remotePlayInk}`, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', marginLeft: '3px' }} />
              </div>
              <div style={{ flex: '1', height: '52px', borderRadius: '10px', background: '#1C1A16', border: '1px solid #2C2923', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
                <div style={{ width: '13px', height: '13px', borderRadius: '50%', background: '#C25B44' }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1', minHeight: '0' }}>
              {remoteTracks.map((r, rI) => (
                <Fragment key={rI}>
                  <div style={{ height: '46px', flex: 'none', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 10px', borderRadius: '8px', background: '#1C1A16', border: '1px solid #2C2923', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '3px', background: r.color }} />
                    <span style={{ flex: '1', fontSize: '12px', fontWeight: '600', color: '#E9E4D8' }}>{r.name}</span>
                    <div style={{ width: '46px', height: '4px', borderRadius: '2px', background: '#100F0D', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: r.meter, background: '#58B368' }} />
                    </div>
                    <span onClick={r.onMute} style={{ width: '26px', height: '24px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', cursor: 'pointer', background: r.muteBg, color: r.muteInk, border: '1px solid #2C2923', boxSizing: 'border-box' }}>M</span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '460px' }}>
        <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', letterSpacing: '.14em', color: 'var(--ink4)' }}>NOTA REMOTE</div>
        <h3 style={{ margin: '0', fontSize: '32px', fontWeight: '600', letterSpacing: '-.02em', lineHeight: '1.1' }}>Your phone is the transport.</h3>
        <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.65', color: 'var(--ink3)', textWrap: 'pretty' }}>Pair a phone with the code from Settings → Phone and control Nota over Wi-Fi: start, stop and record from the vocal booth, mute tracks and watch the levels without walking back to the computer.</p>
      </div>
    </div>
  );
}
