// The transport island of the main window, built from MainWindow.axaml / NotaTheme.axaml
// (Ember Graphite tokens): project name and view switch, the console (stop · play · record ·
// position · loop in one recess), value-over-label readouts, switch icons, MIDI / Remote
// chips, CPU and the master well.
import { useState, type CSSProperties, type ReactNode } from "react";

const C = {
  abyss: "#0A0908", sunken: "#100F0D", panel: "#141310", card: "#171613", raised: "#1C1A16",
  border: "#2C2923", strong: "#3A362D", hair: "#221F1A",
  ink1: "#E9E4D8", ink2: "#C7C0B0", ink3: "#A39D8F", ink5: "#6E6A5E",
  accent: "#D8A03D", accentSoft: "#241F17", accentEdge: "#6B5326", onAccent: "#171613",
  record: "#C25B44", success: "#58B368",
};
const MONO = "'Geist Mono',monospace";
const cellLabel: CSSProperties = { fontSize: "8px", fontWeight: 700, letterSpacing: ".1em", lineHeight: "10px", color: C.ink5 };
const hairline = (h: number): CSSProperties => ({ width: "1px", height: h + "px", background: C.hair, flex: "none" });

function TpButton({ w = 28, on, onClick, title, children, playing }: { w?: number; on?: boolean; onClick?: () => void; title: string; children: ReactNode; playing?: boolean }) {
  const bg = playing ? C.accent : on ? C.accentSoft : C.raised;
  const edge = playing ? C.accent : on ? C.accentEdge : C.strong;
  return (
    <div className="tp-btn" title={title} onClick={onClick}
      style={{ width: w + "px", height: "28px", flex: "none", boxSizing: "border-box", borderRadius: "5px", background: bg, border: `1px solid ${edge}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
      {children}
    </div>
  );
}

function Icon({ d, ink, fill }: { d: ReactNode; ink: string; fill?: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={fill ? ink : "none"} stroke={fill ? "none" : ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  );
}

function Readout({ value, label, ink = C.ink1, onClick, minW }: { value: ReactNode; label: string; ink?: string; onClick?: () => void; minW: number }) {
  return (
    <div onClick={onClick} style={{ height: "34px", padding: "0 7px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px", cursor: onClick ? "pointer" : "default", borderRadius: "4px" }}>
      <span style={{ fontFamily: MONO, fontSize: "14px", lineHeight: "16px", color: ink, minWidth: minW + "px", textAlign: "center" }}>{value}</span>
      <span style={cellLabel}>{label}</span>
    </div>
  );
}

const GRIDS = ["1/4", "1/8", "1/16", "1 Bar"];

export function Transport({ project, view, onView, playing, pos, onPlay, onStop }: {
  project: string; view: string; onView: (v: string) => void;
  playing: boolean; pos: string; onPlay: () => void; onStop: () => void;
}) {
  const [rec, setRec] = useState(false);
  const [loop, setLoop] = useState(false);
  const [sw, setSw] = useState({ metro: false, follow: false, snap: true, auto: false });
  const [grid, setGrid] = useState(0);
  const flip = (k: keyof typeof sw) => () => setSw((s) => ({ ...s, [k]: !s[k] }));
  const ink = (on: boolean) => (on ? C.accent : C.ink2);
  const meter = playing ? 58 : 0;

  return (
    <div style={{ height: "60px", flex: "none", boxSizing: "border-box", padding: "0 14px", background: C.sunken, border: `1px solid ${C.border}`, borderRadius: "6px", display: "flex", alignItems: "center" }}>
      {/* Project name, then the view switch */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "0 14px 0 2px" }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: C.ink1, whiteSpace: "nowrap" }}>{project}</span>
        <div style={{ display: "flex", gap: "2px", padding: "2px", background: C.card, border: `1px solid ${C.border}`, borderRadius: "5px", boxShadow: "inset 0 1px 2px #00000060" }}>
          {["Arrangement", "Session", "Modular"].map((v) => (
            <div key={v} onClick={() => onView(v)} style={{ height: "24px", padding: "0 10px", borderRadius: "3px", display: "flex", alignItems: "center", cursor: "pointer", fontSize: "11px", fontWeight: 600, background: view === v ? C.accent : "transparent", color: view === v ? C.onAccent : C.ink3 }}>{v}</div>
          ))}
        </div>
      </div>

      {/* The console: transport · position · loop in one recess */}
      <div style={{ height: "42px", boxSizing: "border-box", padding: "0 14px 0 12px", background: C.abyss, border: `1px solid ${C.border}`, borderRadius: "6px", boxShadow: "inset 0 1px 3px #00000080", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ display: "flex", gap: "5px" }}>
          <TpButton title="Stop" onClick={() => { onStop(); setRec(false); }}>
            <div style={{ width: "9px", height: "9px", borderRadius: "1px", background: C.ink2 }} />
          </TpButton>
          <TpButton w={40} title="Play" onClick={onPlay} playing={playing}>
            <svg width="10" height="12" viewBox="0 0 10 12" style={{ marginLeft: "2px" }}><path d="M0 0 L10 6 L0 12 Z" fill={playing ? C.onAccent : C.ink2} /></svg>
          </TpButton>
          <div title="Record" onClick={() => setRec(!rec)}
            style={{ width: "28px", height: "28px", boxSizing: "border-box", borderRadius: "5px", background: rec ? C.record : C.raised, border: `1px solid ${rec ? C.record : C.strong}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: rec ? "#F2E2DC" : C.record }} />
          </div>
        </div>
        <div style={hairline(24)} />
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <span style={{ fontFamily: MONO, fontSize: "19px", lineHeight: "20px", fontWeight: 500, color: C.ink1, minWidth: "96px", fontVariantNumeric: "tabular-nums" }}>{pos}</span>
          <span style={cellLabel}>bars</span>
        </div>
        <div style={hairline(24)} />
        <div onClick={() => setLoop(!loop)} style={{ height: "34px", padding: "0 7px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2px", cursor: "pointer" }}>
          <span style={{ ...cellLabel, color: loop ? C.accent : C.ink5 }}>LOOP</span>
          <span style={{ fontFamily: MONO, fontSize: "11px", lineHeight: "12px", minWidth: "58px", color: loop ? C.accent : C.ink5 }}>1.1 – 5.1</span>
        </div>
      </div>

      {/* Readouts: value over label */}
      <div style={{ display: "flex", alignItems: "center", gap: "2px", marginLeft: "14px" }}>
        <Readout value="124.00" label="BPM" minW={52} />
        <Readout value={<>4<span style={{ color: C.ink5, margin: "0 3px" }}>/</span>4</>} label="SIG" minW={36} />
        <Readout value="Am" label="KEY" minW={30} />
        <Readout value={GRIDS[grid]} label="GRID" minW={36} onClick={() => setGrid((grid + 1) % GRIDS.length)} />
      </div>

      {/* Switches: metronome, follow playhead, snap magnet, automation envelope */}
      <div style={{ display: "flex", gap: "4px", marginLeft: "14px" }}>
        <TpButton title="Metronome" on={sw.metro} onClick={flip("metro")}>
          <Icon ink={ink(sw.metro)} d={<><path d="M9.8 5.5 H14.2 L19 20 H5 Z" /><path d="M12 19 L13.9 3.2" /><circle cx="12.93" cy="11" r="1.6" fill={ink(sw.metro)} stroke="none" /></>} />
        </TpButton>
        <TpButton title="Follow playhead" on={sw.follow} onClick={flip("follow")}>
          <Icon ink={ink(sw.follow)} d={<><path d="M3.5 17.8 H20.5" /><path d="M6.5 5 H12.5 V9 L9.5 12.5 L6.5 9 Z" fill={ink(sw.follow)} stroke="none" /><path d="M9.5 12.5 V17.8" /></>} />
        </TpButton>
        <TpButton title="Snap to grid" on={sw.snap} onClick={flip("snap")}>
          <Icon fill ink={ink(sw.snap)} d={<><path d="M4 17 V12.5 A8 8 0 0 1 20 12.5 V17 H15.5 V12.5 A3.5 3.5 0 0 0 8.5 12.5 V17 Z" /><rect x="4" y="19" width="4.5" height="2.5" /><rect x="15.5" y="19" width="4.5" height="2.5" /></>} />
        </TpButton>
        <TpButton title="Automation" on={sw.auto} onClick={flip("auto")}>
          <Icon ink={ink(sw.auto)} d={<><path d="M3 17.5 H9 L14.5 7.5 H21" strokeWidth="1.8" /><circle cx="9" cy="17.5" r="1.9" fill={ink(sw.auto)} stroke="none" /><circle cx="14.5" cy="7.5" r="1.9" fill={ink(sw.auto)} stroke="none" /></>} />
        </TpButton>
      </div>

      <div style={{ flex: 1 }} />

      {/* MIDI learn and Nota Remote */}
      <div style={{ display: "flex", gap: "6px", marginLeft: "8px" }}>
        <div style={{ height: "26px", padding: "0 9px", boxSizing: "border-box", borderRadius: "4px", background: C.raised, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: C.ink3 }}>
          MIDI<span style={{ width: "5px", height: "5px", borderRadius: "50%", background: C.strong }} />
        </div>
        <div style={{ height: "26px", padding: "0 9px", boxSizing: "border-box", borderRadius: "4px", background: C.raised, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: "7px", fontSize: "11px", color: C.ink3 }}>
          <span style={{ width: "8px", height: "12px", boxSizing: "border-box", borderRadius: "2px", border: `1.5px solid ${C.ink3}` }} />
          Remote<span style={{ fontFamily: MONO, fontSize: "10px" }}>1</span>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: playing ? C.success : C.strong }} />
        </div>
      </div>

      <div style={{ ...hairline(26), margin: "0 14px" }} />

      {/* CPU */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        <div style={{ width: "52px", height: "4px", borderRadius: "2px", background: C.abyss, overflow: "hidden" }}>
          <div style={{ width: playing ? "11%" : "1%", height: "100%", background: C.success, borderRadius: "2px" }} />
        </div>
        <span style={{ fontFamily: MONO, fontSize: "8px", letterSpacing: ".1em", lineHeight: "10px", color: C.ink5 }}>CPU {playing ? 11 : 1}%</span>
      </div>

      {/* Master: fader over its meter, gain in dB */}
      <div style={{ marginLeft: "14px", height: "42px", boxSizing: "border-box", padding: "0 12px", background: C.panel, borderRadius: "6px", display: "flex", alignItems: "center", gap: "9px" }}>
        <span style={cellLabel}>MST</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "3px", width: "88px" }}>
          <div style={{ height: "12px", position: "relative", display: "flex", alignItems: "center" }}>
            <div style={{ width: "100%", height: "3px", borderRadius: "2px", background: C.strong }} />
            <div style={{ position: "absolute", left: "0", width: "68%", height: "3px", borderRadius: "2px", background: C.ink3 }} />
            <div style={{ position: "absolute", left: "calc(68% - 3px)", width: "6px", height: "10px", borderRadius: "1.5px", background: C.ink1 }} />
          </div>
          <div style={{ height: "5px", display: "flex", flexDirection: "column", gap: "1px" }}>
            {[0, 1].map((i) => (
              <div key={i} style={{ height: "2px", background: C.raised, borderRadius: "1px", overflow: "hidden" }}>
                <div style={{ width: Math.max(0, meter - i * 4) + "%", height: "100%", background: C.success }} />
              </div>
            ))}
          </div>
        </div>
        <span style={{ fontFamily: MONO, fontSize: "10px", minWidth: "46px", textAlign: "right", color: C.ink3 }}>0.0 dB</span>
      </div>
    </div>
  );
}
