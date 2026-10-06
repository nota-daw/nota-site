// @ts-nocheck
/* eslint-disable no-unused-vars -- kept verbatim from the mockup */
// Nota Settings window ("Nota Settings" mockup): ported from the nota-design mockup with its logic kept as written there,
// so the two stay easy to diff. Markup was converted from the mockup's template.
import { Component as ReactComponent, Fragment } from "react";

const HOME = "~";
const PLUGINS = [
  { id: "chow", name: "CHOW Tape Model", type: "EFFECT", meta: "Chowdhury DSP · 2.11.4 · GPL-3.0", size: "18.4 MB", desc: "Physically modelled analog reel-to-reel tape: saturation, hysteresis, wow and flutter, loss.", note: "Windows builds ship only as an installer; install them from the project page." },
  { id: "dexed", name: "Dexed", type: "INSTRUMENT", meta: "Digital Suburban · 1.0.1 · GPL-3.0", size: "9.7 MB", desc: "Six-operator FM synthesizer closely modelled on the Yamaha DX7; loads DX7 SysEx cartridges." },
  { id: "dragonfly", name: "Dragonfly Reverb", type: "EFFECT", meta: "Michael Willis · 3.2.10 · GPL-3.0", size: "6.2 MB", desc: "Four algorithmic reverbs: hall, room, plate and early reflections." },
  { id: "filtr", name: "FILT-R", type: "EFFECT", meta: "tiagolr · 1.3.0 · AGPL-3.0", size: "4.8 MB", desc: "Envelope-based filter modulator with drawable cutoff and resonance curves." },
  { id: "gate12", name: "GATE-12", type: "EFFECT", meta: "tiagolr · 1.3.3 · GPL-3.0", size: "5.1 MB", desc: "Trance gate and volume shaper with drawable envelopes and audio or MIDI triggering." },
];
const SHORTCUTS = [
  { title: "TRANSPORT", rows: [
    [["Space"], "Play / Stop"],
    [["Return"], "Stop (again → back to the start)"],
    [["⌘R"], "Record"],
    [["⌘M"], "Metronome"],
    [["⌘L"], "Loop on / off · loop the selected clips or time range"],
  ]},
  { title: "ARRANGEMENT & EDITING", rows: [
    [["⌘Z", "⌘⇧Z"], "Undo / redo"],
    [["⌘A"], "Select all clips"],
    [["⌘⇧A"], "Toggle automation mode"],
    [["⌘⇧M"], "Toggle the Mixer view"],
    [["Tab"], "Cycle Devices / Pattern / Clip in the detail panel"],
    [["Esc"], "Cancel the current gesture / clear the selection · close the patch-bay overlay"],
    [["⌘G", "⌘⇧G"], "Group / ungroup selected tracks"],
    [["⌘C", "⌘X", "⌘V"], "Copy / cut / paste clip (or automation range)"],
    [["⌘⇧V"], "Paste the last range as audio rendered through its devices"],
    [["⌘D"], "Duplicate the selected clip(s) / range"],
    [["⌘E"], "Split at the playhead · at the range edges"],
    [["⌘J"], "Consolidate the selection into one clip per track"],
    [["0"], "Deactivate / activate the selected clip(s)"],
    [["Delete"], "Delete the selected clip / range"],
  ]},
];
const NAV = [
  { g: "DEVICES" }, { t: "Audio" }, { t: "MIDI" }, { t: "Gamepads" },
  { g: "PLUG-INS" }, { t: "Plug-ins" }, { t: "Downloads" },
  { g: "GENERAL" }, { t: "Library" }, { t: "Appearance" }, { t: "Shortcuts" },
];
const SUB = {
  "Audio": "Device, sample rate and buffer", "MIDI": "Controllers Nota listens to", "Gamepads": "Play notes or drive mapped controls",
  "Plug-ins": "Where Nota looks for VST3", "Downloads": "Nota plugin registry", "Library": "Default save and sample locations",
  "Appearance": "Theme and AI control", "Shortcuts": "Keyboard reference",
};
const SELECTS = {
  output: { label: "Output", width: "280px", options: ["MacBook Pro Speakers", "External Headphones", "BlackHole 2ch"] },
  input: { label: "Input", width: "280px", options: ["MacBook Pro Microphone", "BlackHole 2ch", "None"] },
  rate: { label: "Sample rate", width: "150px", options: ["44100 Hz", "48000 Hz", "88200 Hz", "96000 Hz"] },
  buffer: { label: "Buffer size", width: "150px", options: ["Device default", "64", "128", "256", "512", "1024", "2048"] },
};
const ICONS = {
  "Audio": "M4 10 V14 M8 7 V17 M12 4 V20 M16 8 V16 M20 11 V13",
  "MIDI": "M4 5 H20 V19 H4 Z M8 5 V13 M12 5 V13 M16 5 V13",
  "Gamepads": "M7 8 H17 A4 4 0 0 1 21 12 V13 A4 4 0 0 1 14 16 H10 A4 4 0 0 1 3 13 V12 A4 4 0 0 1 7 8 Z M7 11 V13 M6 12 H8 M16 11.5 H16.01 M18 12.5 H18.01",
  "Plug-ins": "M9 3 V7 M15 3 V7 M6 7 H18 V11 A6 6 0 0 1 6 11 Z M12 17 V21",
  "Downloads": "M12 4 V15 M7 10 L12 15 L17 10 M5 19 H19",
  "Library": "M3 7 A1 1 0 0 1 4 6 H9 L11 8 H20 A1 1 0 0 1 21 9 V18 A1 1 0 0 1 20 19 H4 A1 1 0 0 1 3 18 Z",
  "Appearance": "M12 4 A8 8 0 1 0 12 20 Z M12 4 A8 8 0 0 1 12 20",
  "Shortcuts": "M3 7 H21 V17 H3 Z M7 11 H7.01 M11 11 H11.01 M15 11 H15.01 M8 14 H16",
};
const sw = (on) => ({ track: on ? "#D8A03D" : "#2C2923", knob: on ? "#171613" : "#6E6A5E", knobX: on ? "14px" : "2px" });

class SettingsWindowImpl extends ReactComponent<any, any> {
  [k: string]: any;
  state = {
    tab: this.props.startTab || "Downloads",
    sel: { output: "MacBook Pro Speakers", input: "MacBook Pro Microphone", rate: "44100 Hz", buffer: "Device default" },
    open: null, tone: false, cpu: "idle", cpuLeft: 0,
    midi: { ump: true }, pad: true,
    folders: [HOME + "/Library/Application Support/Nota/plugins/VST3"], selFolder: 0, scan: "idle",
    filter: "All", q: "", installed: { chow: true }, busy: {}, refreshing: false,
    theme: "Ember Graphite", mcp: true, port: "3900", copied: false,
    lib: { samples: null, projects: null }, sq: "",
  };
  componentWillUnmount() { clearInterval(this.cpuT); }
  later(fn, ms) { setTimeout(() => fn(), ms); }

  runCpu() {
    if (this.state.cpu === "running") return;
    this.setState({ cpu: "running", cpuLeft: 5 });
    clearInterval(this.cpuT);
    this.cpuT = setInterval(() => {
      const left = this.state.cpuLeft - 1;
      if (left <= 0) { clearInterval(this.cpuT); this.setState({ cpu: "done", cpuLeft: 0 }); }
      else this.setState({ cpuLeft: left });
    }, 1000);
  }

  renderVals() {
    const s = this.state;
    const accent = this.props.navStyle ?? "Tinted";
    const nav = NAV.map((n) => {
      if (n.g) return { isGroup: true, isItem: false, label: n.g };
      const on = n.t === s.tab;
      const badge = n.t === "Downloads" ? String(PLUGINS.filter((p) => !s.installed[p.id]).length) : "";
      return {
        isGroup: false, isItem: true, label: n.t, badge, icon: ICONS[n.t], iconInk: on ? "#D8A03D" : "#6E6A5E",
        bg: on && accent === "Tinted" ? "#241F17" : "transparent",
        edge: on ? "#D8A03D" : "transparent",
        ink: on ? (accent === "Tinted" ? "#E9BE6A" : "#E9E4D8") : "#A39D8F",
        weight: on ? 600 : 400,
        onClick: () => this.setState({ tab: n.t, open: null }),
      };
    });

    const selects = Object.keys(SELECTS).map((k) => {
      const d = SELECTS[k];
      const open = s.open === k;
      return {
        label: d.label, width: d.width, value: s.sel[k], open,
        border: open ? "#D8A03D" : "#2C2923",
        onToggle: () => this.setState({ open: open ? null : k }),
        items: d.options.map((o) => ({
          label: o, check: o === s.sel[k] ? "✓" : "", ink: o === s.sel[k] ? "#E9E4D8" : "#A39D8F",
          onClick: () => this.setState({ sel: { ...s.sel, [k]: o }, open: null }),
        })),
      };
    });
    const rate = parseInt(s.sel.rate, 10);
    const buf = s.sel.buffer === "Device default" ? 512 : parseInt(s.sel.buffer, 10);
    const latencyMs = (buf / rate * 1000).toFixed(1) + " ms";
    const latencyDetail = buf + " frames @ " + (rate / 1000) + " kHz";

    const midiRows = [{ id: "ump", name: "UMP Network Network MIDI 2.0 Session 1", kind: "MIDI 2.0" }].map((m, i) => {
      const on = !!s.midi[m.id];
      const t = sw(on);
      return { ...m, rule: i ? "#221F1A" : "transparent", dot: on ? "#D8A03D" : "#3A362E", ink: on ? "#E9E4D8" : "#6E6A5E",
        track: t.track, knob: t.knob, knobX: t.knobX,
        onClick: () => this.setState({ midi: { ...s.midi, [m.id]: !on } }) };
    });

    const padMap = [
      ["Face buttons", "C4  D4  E4  F4"], ["Shoulder buttons", "G4  A4  B4  C5"],
      ["D-pad up / down", "Octave −1 / +1"], ["D-pad left / right", "Velocity − / +"],
    ].map(([input, action], i) => ({ input, action, rule: i ? "#221F1A" : "transparent" }));

    const folderRows = s.folders.map((p, i) => ({
      path: p, tag: i === 0 ? "default" : "",
      bg: i === s.selFolder ? "#241F17" : "transparent", ink: i === s.selFolder ? "#E9E4D8" : "#A39D8F",
      onClick: () => this.setState({ selFolder: i }),
    }));
    const canRemove = s.selFolder > 0;

    const counts = {
      All: PLUGINS.length,
      Instruments: PLUGINS.filter((p) => p.type === "INSTRUMENT").length,
      Effects: PLUGINS.filter((p) => p.type === "EFFECT").length,
      Installed: PLUGINS.filter((p) => s.installed[p.id]).length,
    };
    const filters = Object.keys(counts).map((f) => {
      const on = f === s.filter;
      return { label: f, count: counts[f], bg: on ? "#D8A03D" : "transparent", ink: on ? "#171613" : "#A39D8F",
        countInk: on ? "#5E4A22" : "#55514A", weight: on ? 600 : 500, onClick: () => this.setState({ filter: f }) };
    });
    const q = s.q.trim().toLowerCase();
    const list = PLUGINS.filter((p) =>
      (s.filter === "All" || (s.filter === "Instruments" && p.type === "INSTRUMENT") || (s.filter === "Effects" && p.type === "EFFECT") || (s.filter === "Installed" && s.installed[p.id])) &&
      (!q || (p.name + " " + p.meta + " " + p.desc).toLowerCase().includes(q)));
    const plugins = list.map((p, i) => {
      const inst = !!s.installed[p.id], busy = !!s.busy[p.id];
      return {
        ...p, note: p.note || "", sizeLabel: inst ? "" : p.size, rule: i ? "#221F1A" : "transparent",
        isInstalled: inst, canInstall: !inst,
        btnLabel: busy ? "Installing…" : "Install", btnBg: busy ? "#100F0D" : "#1F1D19", btnInk: busy ? "#8D8779" : "#E9E4D8",
        onInstall: () => {
          if (busy) return;
          this.setState({ busy: { ...this.state.busy, [p.id]: true } });
          this.later(() => this.setState({ busy: { ...this.state.busy, [p.id]: false }, installed: { ...this.state.installed, [p.id]: true } }), 1400);
        },
        onRemove: () => this.setState({ installed: { ...s.installed, [p.id]: false } }),
      };
    });

    const libRows = [
      { k: "samples", label: "Samples", def: HOME + "/Music/Nota Samples", alt: HOME + "/Music/Samples" },
      { k: "projects", label: "Projects", def: HOME + "/Documents/Nota Projects", alt: HOME + "/Music/Projects" },
    ].map((l, i) => ({
      label: l.label, path: s.lib[l.k] || l.def, tag: s.lib[l.k] ? "custom" : "default",
      rule: i ? "#221F1A" : "transparent",
      onClick: () => this.setState({ lib: { ...s.lib, [l.k]: s.lib[l.k] ? null : l.alt } }),
    }));

    const themes = [["Ember Graphite", "#171613", "#3A362E"], ["Ember Paper", "#EFEAE0", "#EFEAE0"], ["System", "linear-gradient(135deg,#EFEAE0 50%,#171613 50%)", "#3A362E"]].map(([t, sv, sb]) => {
      const on = t === s.theme;
      return { label: t, swatch: sv, swatchBorder: on ? "#171613" : sb, bg: on ? "#D8A03D" : "transparent", ink: on ? "#171613" : "#A39D8F",
        weight: on ? 600 : 500, onClick: () => this.setState({ theme: t }) };
    });

    const sq = s.sq.trim().toLowerCase();
    const shortcutGroups = SHORTCUTS.map((g) => {
      const rows = g.rows.filter(([k, d]) => !sq || (d + " " + k.join(" ")).toLowerCase().includes(sq))
        .map(([k, d], i) => ({ keys: k.map((label) => ({ label })), desc: d, rule: i ? "#221F1A" : "transparent" }));
      return { title: g.title, count: rows.length, rows };
    }).filter((g) => g.rows.length);

    const cpuNote = s.cpu === "running" ? "Measuring… " + s.cpuLeft + " s left — play your project for a real-world figure."
      : s.cpu === "done" ? "Last check: 11% average, 18% peak on the audio thread."
      : "Measures audio-thread load for 5 s — play your project for a real-world figure.";

    return {
      nav, tab: s.tab, subtitle: SUB[s.tab],
      isAudio: s.tab === "Audio", isMidi: s.tab === "MIDI", isPads: s.tab === "Gamepads", isPlugins: s.tab === "Plug-ins",
      isGet: s.tab === "Downloads", isLibrary: s.tab === "Library", isAppearance: s.tab === "Appearance", isShortcuts: s.tab === "Shortcuts",
      selects, latencyMs, latencyDetail, anyOpen: !!s.open, closeAll: () => this.setState({ open: null }),
      toneLabel: s.tone ? "■  Stop tone" : "Play test tone", toneBg: s.tone ? "#D8A03D" : "#1F1D19",
      toneInk: s.tone ? "#171613" : "#E9E4D8", toneBorder: s.tone ? "#D8A03D" : "#2C2923",
      toggleTone: () => this.setState({ tone: !s.tone }),
      runCpu: () => this.runCpu(), cpuLabel: s.cpu === "running" ? "Measuring…" : "CPU check", cpuNote,
      cpuInk: s.cpu === "done" ? "#A39D8F" : "#6E6A5E",
      midiRows, pad: sw(s.pad), togglePad: () => this.setState({ pad: !s.pad }), padMap,
      folderRows, removeInk: canRemove ? "#E9E4D8" : "#55514A",
      addFolder: () => this.setState({ folders: [...s.folders, HOME + "/Music/VST3 Extra" + (s.folders.length > 1 ? " " + s.folders.length : "")], selFolder: s.folders.length }),
      removeFolder: () => { if (canRemove) this.setState({ folders: s.folders.filter((_, i) => i !== s.selFolder), selFolder: 0 }); },
      rescan: () => { if (s.scan === "busy") return; this.setState({ scan: "busy" }); this.later(() => this.setState({ scan: "done" }), 1600); },
      scanLabel: s.scan === "busy" ? "Scanning…" : "Rescan plugins",
      scanNote: s.scan === "busy" ? "Searching " + s.folders.length + " folder" + (s.folders.length > 1 ? "s" : "") : s.scan === "done" ? "Scanned just now" : "",
      filters, q: s.q, onQ: (e) => this.setState({ q: e.target.value }), plugins, noPlugins: plugins.length === 0,
      refresh: () => { this.setState({ refreshing: true }); this.later(() => this.setState({ refreshing: false }), 1000); },
      refreshLabel: s.refreshing ? "Refreshing…" : "Refresh",
      libRows, themes,
      mcpSw: sw(s.mcp), toggleMcp: () => this.setState({ mcp: !s.mcp }), mcpOpacity: s.mcp ? 1 : 0.4,
      port: s.port, onPort: (e) => this.setState({ port: e.target.value.replace(/\D/g, "").slice(0, 5) }),
      mcpDot: s.mcp ? "#7FB069" : "#3A362E",
      mcpStatus: s.mcp ? "Listening on http://127.0.0.1:" + (s.port || "—") + "/ (loopback)" : "Off",
      copyLabel: s.copied ? "Copied ✓" : "Copy config",
      copyConfig: () => { if (!s.mcp) return; this.setState({ copied: true }); this.later(() => this.setState({ copied: false }), 1500); },
      shortcutGroups, sq: s.sq, onSq: (e) => this.setState({ sq: e.target.value }),
    };
  }

  render() {
    const { addFolder, anyOpen, closeAll, copyConfig, copyLabel, cpuInk, cpuLabel, cpuNote, filters, folderRows, isAppearance, isAudio, isGet, isLibrary, isMidi, isPads, isPlugins, isShortcuts, latencyDetail, latencyMs, libRows, mcpDot, mcpOpacity, mcpStatus, mcpSw, midiRows, nav, noPlugins, onPort, onQ, onSq, pad, padMap, plugins, port, q, refresh, refreshLabel, removeFolder, removeInk, rescan, runCpu, scanLabel, scanNote, selects, shortcutGroups, sq, subtitle, tab, themes, toggleMcp, togglePad, toggleTone, toneBg, toneBorder, toneInk, toneLabel } = this.renderVals();
    return (
      <div ref={(el) => { this._root = el; }} data-screen-label="Settings" style={{ width: '880px', height: '640px', display: 'flex', flexDirection: 'column', background: '#171613', border: '1px solid #2C2923', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,.55)', position: 'relative' }}>
        <div style={{ height: '38px', flex: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 14px', background: '#141310', borderBottom: '1px solid #2C2923', position: 'relative' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57' }} />
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#3A362E' }} />
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28C840' }} />
          <div style={{ position: 'absolute', left: '0', right: '0', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#A39D8F', pointerEvents: 'none' }}>Settings</div>
        </div>
        <div style={{ flex: '1', minHeight: '0', display: 'flex' }}>
          <div style={{ width: '188px', flex: 'none', display: 'flex', flexDirection: 'column', gap: '2px', padding: '12px 10px', background: '#141310', borderRight: '1px solid #2C2923', boxSizing: 'border-box' }}>
            {nav.map((t, tI) => (
              <Fragment key={tI}>
                {t.isGroup ? (
                  <>
                    <div style={{ padding: '12px 10px 5px', fontSize: '9px', fontWeight: '700', letterSpacing: '.12em', color: '#55514A' }}>{t.label}</div>
                  </>
                ) : null}
                {t.isItem ? (
                  <>
                    <div className="st1" onClick={t.onClick} style={{ height: '28px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 10px', borderRadius: '5px', cursor: 'pointer', position: 'relative', background: t.bg }}>
                      <div style={{ position: 'absolute', left: '0', top: '7px', bottom: '7px', width: '2px', borderRadius: '1px', background: t.edge }} />
                      <svg width="14" height="14" viewBox={'0 0 24 24'} fill="none" stroke={t.iconInk} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" style={{ flex: 'none' }}>
                        <path d={t.icon} />
                      </svg>
                      <span style={{ flex: '1', fontSize: '12px', fontWeight: t.weight, color: t.ink }}>{t.label}</span>
                      {t.badge ? (
                        <>
                          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '9px', color: '#6E6A5E' }}>{t.badge}</span>
                        </>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </Fragment>
            ))}
          </div>
          <div className="scr" style={{ flex: '1', minWidth: '0', overflowY: 'auto', padding: '26px 32px 40px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '20px' }}>
              <div style={{ fontSize: '17px', fontWeight: '600', color: '#E9E4D8' }}>{tab}</div>
              <div style={{ fontSize: '11px', color: '#6E6A5E' }}>{subtitle}</div>
            </div>
            {isAudio ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.12em', color: '#6E6A5E', paddingBottom: '4px' }}>AUDIO DEVICE</div>
                    {selects.map((f, fI) => (
                      <Fragment key={fI}>
                        <div style={{ display: 'grid', gridTemplateColumns: '150px minmax(0,1fr)', alignItems: 'center', minHeight: '34px' }}>
                          <span style={{ fontSize: '12px', color: '#A39D8F' }}>{f.label}</span>
                          <div style={{ position: 'relative', width: f.width, maxWidth: '100%' }}>
                            <div className="st2" onClick={f.onToggle} style={{ height: '28px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 8px 0 10px', background: '#100F0D', border: `1px solid ${f.border}`, borderRadius: '5px', cursor: 'pointer', boxSizing: 'border-box' }}>
                              <span style={{ flex: '1', minWidth: '0', fontSize: '12px', color: '#E9E4D8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.value}</span>
                              <svg width="10" height="10" viewBox={'0 0 10 10'} fill="none" stroke="#8D8779" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 3.5 L5 6.5 L8 3.5" />
                              </svg>
                            </div>
                            {f.open ? (
                              <>
                                <div style={{ position: 'absolute', left: '0', right: '0', top: '32px', zIndex: '20', display: 'flex', flexDirection: 'column', padding: '4px', background: '#1F1D19', border: '1px solid #3A362E', borderRadius: '6px', boxShadow: '0 12px 30px rgba(0,0,0,.5)' }}>
                                  {f.items.map((o, oI) => (
                                    <Fragment key={oI}>
                                      <div className="st3" onClick={o.onClick} style={{ height: '26px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 8px', borderRadius: '4px', cursor: 'pointer' }}>
                                        <span style={{ width: '10px', fontSize: '11px', color: '#D8A03D' }}>{o.check}</span>
                                        <span style={{ fontSize: '12px', color: o.ink, whiteSpace: 'nowrap' }}>{o.label}</span>
                                      </div>
                                    </Fragment>
                                  ))}
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </Fragment>
                    ))}
                    <div style={{ display: 'grid', gridTemplateColumns: '150px minmax(0,1fr)', alignItems: 'center', minHeight: '34px' }}>
                      <span style={{ fontSize: '12px', color: '#A39D8F' }}>Latency</span>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', fontFamily: "'Geist Mono',monospace", fontSize: '12px' }}>
                        <span style={{ color: '#E9E4D8' }}>{latencyMs}</span>
                        <span style={{ color: '#6E6A5E' }}>{latencyDetail}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #221F1A', paddingTop: '20px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.12em', color: '#6E6A5E', paddingBottom: '4px' }}>TEST</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 132px minmax(0,1fr)', alignItems: 'center', gap: '0 14px', minHeight: '34px' }}>
                      <span style={{ fontSize: '12px', color: '#A39D8F' }}>Output check</span>
                      <div onClick={toggleTone} style={{ height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: '500', background: toneBg, color: toneInk, border: `1px solid ${toneBorder}`, boxSizing: 'border-box' }}>{toneLabel}</div>
                      <span style={{ fontSize: '11px', lineHeight: '1.5', color: '#6E6A5E', textWrap: 'pretty' }}>440 Hz sine at −14 dBFS, through the master.</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 132px minmax(0,1fr)', alignItems: 'center', gap: '0 14px', minHeight: '34px' }}>
                      <span style={{ fontSize: '12px', color: '#A39D8F' }}>Performance</span>
                      <div className="st4" onClick={runCpu} style={{ height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: '500', background: '#1F1D19', color: '#E9E4D8', border: '1px solid #2C2923', boxSizing: 'border-box' }}>{cpuLabel}</div>
                      <span style={{ fontSize: '11px', lineHeight: '1.5', color: cpuInk, textWrap: 'pretty' }}>{cpuNote}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            {isMidi ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.12em', color: '#6E6A5E', paddingBottom: '4px' }}>MIDI INPUTS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #2C2923', borderRadius: '6px', overflow: 'hidden' }}>
                    {midiRows.map((m, mI) => (
                      <Fragment key={mI}>
                        <div onClick={m.onClick} style={{ height: '40px', display: 'flex', alignItems: 'center', gap: '12px', padding: '0 12px', background: '#141310', cursor: 'pointer', borderTop: `1px solid ${m.rule}` }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: m.dot }} />
                          <span style={{ flex: '1', minWidth: '0', fontSize: '12px', color: m.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</span>
                          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: '#6E6A5E' }}>{m.kind}</span>
                          <div style={{ width: '28px', height: '16px', flex: 'none', borderRadius: '8px', position: 'relative', background: m.track }}>
                            <div style={{ position: 'absolute', top: '2px', left: m.knobX, width: '12px', height: '12px', borderRadius: '50%', background: m.knob }} />
                          </div>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  <div style={{ fontSize: '11px', lineHeight: '1.55', color: '#6E6A5E' }}>Uncheck a controller to stop Nota listening to it. New devices are on by default.</div>
                </div>
              </>
            ) : null}
            {isPads ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.12em', color: '#6E6A5E', paddingBottom: '2px' }}>GAMEPAD INPUT</div>
                    <div onClick={togglePad} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <div style={{ width: '28px', height: '16px', flex: 'none', borderRadius: '8px', position: 'relative', background: pad.track }}>
                        <div style={{ position: 'absolute', top: '2px', left: pad.knobX, width: '12px', height: '12px', borderRadius: '50%', background: pad.knob }} />
                      </div>
                      <span style={{ fontSize: '12px', color: '#E9E4D8' }}>Use a connected gamepad for notes and mapped controls</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '44px', padding: '0 14px', border: '1px dashed #2C2923', borderRadius: '6px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3A362E' }} />
                      <span style={{ fontSize: '11px', color: '#8D8779' }}>No gamepad detected. Connect one and it appears here.</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #221F1A', paddingTop: '20px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.12em', color: '#6E6A5E', paddingBottom: '2px' }}>LAYOUT</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px minmax(0,1fr)', border: '1px solid #2C2923', borderRadius: '6px', overflow: 'hidden' }}>
                      {padMap.map((p, pI) => (
                        <Fragment key={pI}>
                          <div style={{ padding: '9px 12px', fontSize: '12px', color: '#A39D8F', background: '#141310', borderTop: `1px solid ${p.rule}` }}>{p.input}</div>
                          <div style={{ padding: '9px 12px', fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: '#E9E4D8', background: '#141310', borderTop: `1px solid ${p.rule}` }}>{p.action}</div>
                        </Fragment>
                      ))}
                    </div>
                    <div style={{ fontSize: '11px', lineHeight: '1.6', color: '#8D8779', textWrap: 'pretty' }}>Notes go to the armed (record-enabled) instrument track — enable Record to capture them, or use the audition track to just play.</div>
                    <div style={{ fontSize: '11px', lineHeight: '1.6', color: '#6E6A5E', textWrap: 'pretty' }}>Any button can be mapped to a control instead: click MIDI in the top-right, click the control, then press the button. A mapped button drives that control and stops playing its note; the rest of the pad keeps the layout above. The sticks and the trigger travel map the same way and are continuous, so they suit a knob or a fader — they play no notes, and do nothing until mapped. Mappings are listed in the browser's MIDI Map tab and travel with the project.</div>
                  </div>
                </div>
              </>
            ) : null}
            {isPlugins ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.12em', color: '#6E6A5E', paddingBottom: '2px' }}>PLUGIN SCAN FOLDERS</div>
                    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '132px', background: '#100F0D', border: '1px solid #2C2923', borderRadius: '6px', padding: '4px', boxSizing: 'border-box' }}>
                      {folderRows.map((d, dI) => (
                        <Fragment key={dI}>
                          <div onClick={d.onClick} style={{ height: '28px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 8px', borderRadius: '4px', cursor: 'pointer', background: d.bg }}>
                            <span style={{ flex: '1', minWidth: '0', fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: d.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.path}</span>
                            <span style={{ fontSize: '10px', color: '#6E6A5E' }}>{d.tag}</span>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="st5" onClick={addFolder} style={{ height: '28px', display: 'flex', alignItems: 'center', padding: '0 14px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: '500', background: '#1F1D19', color: '#E9E4D8', border: '1px solid #2C2923', boxSizing: 'border-box' }}>Add folder…</div>
                      <div onClick={removeFolder} style={{ height: '28px', display: 'flex', alignItems: 'center', padding: '0 14px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: '500', background: '#1F1D19', color: removeInk, border: '1px solid #2C2923', boxSizing: 'border-box' }}>Remove</div>
                    </div>
                    <div style={{ fontSize: '11px', lineHeight: '1.55', color: '#6E6A5E' }}>Extra folders are searched for VST3 plugins on the next rescan (AU uses the system registry).</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #221F1A', paddingTop: '20px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.12em', color: '#6E6A5E', paddingBottom: '2px' }}>SCAN</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div className="st6" onClick={rescan} style={{ height: '28px', display: 'flex', alignItems: 'center', padding: '0 14px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: '500', background: '#1F1D19', color: '#E9E4D8', border: '1px solid #2C2923', boxSizing: 'border-box' }}>{scanLabel}</div>
                      <span style={{ fontSize: '11px', color: '#6E6A5E' }}>{scanNote}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            {isGet ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ fontSize: '11px', lineHeight: '1.6', color: '#8D8779', textWrap: 'pretty', maxWidth: '600px' }}>Open-source VST3 plugins from the Nota plugin registry. Each one downloads from the project's own GitHub release, is checked against the registry's checksum and unpacked — installers never run.</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', padding: '2px', gap: '2px', background: '#100F0D', border: '1px solid #2C2923', borderRadius: '6px' }}>
                      {filters.map((c, cI) => (
                        <Fragment key={cI}>
                          <div onClick={c.onClick} style={{ height: '24px', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: c.weight, background: c.bg, color: c.ink }}>
                            <span>{c.label}</span>
                            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '9px', color: c.countInk }}>{c.count}</span>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                    <div style={{ flex: '1', minWidth: '140px', height: '30px', display: 'flex', alignItems: 'center', gap: '7px', padding: '0 10px', background: '#100F0D', border: '1px solid #2C2923', borderRadius: '6px', boxSizing: 'border-box' }}>
                      <svg width="11" height="11" viewBox={'0 0 24 24'} fill="none" stroke="#6E6A5E" strokeWidth="2">
                        <circle cx="10.5" cy="10.5" r="6.5" />
                        <path d="M15.5 15.5 L21 21" />
                      </svg>
                      <input value={q} onChange={onQ} placeholder="Search" style={{ flex: '1', minWidth: '0', background: 'transparent', border: '0', outline: 'none', fontFamily: 'Geist,system-ui,sans-serif', fontSize: '12px', color: '#E9E4D8' }} />
                    </div>
                    <div className="st7" onClick={refresh} style={{ height: '30px', display: 'flex', alignItems: 'center', padding: '0 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '500', color: '#A39D8F' }}>{refreshLabel}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #2C2923', borderRadius: '6px', overflow: 'hidden' }}>
                    {plugins.map((p, pI) => (
                      <Fragment key={pI}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '16px', padding: '14px 14px 14px 16px', background: '#141310', borderTop: `1px solid ${p.rule}` }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '13px', fontWeight: '600', color: '#E9E4D8' }}>{p.name}</span>
                              <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '9px', letterSpacing: '.08em', color: '#8D8779' }}>{p.type}</span>
                            </div>
                            <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: '#6E6A5E' }}>{p.meta}</div>
                            <div style={{ fontSize: '12px', lineHeight: '1.5', color: '#A39D8F', textWrap: 'pretty' }}>{p.desc}</div>
                            {p.note ? (
                              <>
                                <div style={{ fontSize: '11px', lineHeight: '1.5', color: '#6E6A5E' }}>{p.note}</div>
                              </>
                            ) : null}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', minWidth: '96px' }}>
                            {p.isInstalled ? (
                              <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '26px' }}>
                                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D8A03D' }} />
                                  <span style={{ fontSize: '11px', fontWeight: '500', color: '#D8A03D' }}>Installed</span>
                                </div>
                                <div className="st8" onClick={p.onRemove} style={{ fontSize: '11px', color: '#8D8779', cursor: 'pointer' }}>Remove</div>
                              </>
                            ) : null}
                            {p.canInstall ? (
                              <>
                                <div onClick={p.onInstall} style={{ height: '26px', minWidth: '88px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: '500', background: p.btnBg, color: p.btnInk, border: '1px solid #2C2923', boxSizing: 'border-box' }}>{p.btnLabel}</div>
                              </>
                            ) : null}
                            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: '#6E6A5E' }}>{p.sizeLabel}</span>
                            <a href="#" style={{ fontSize: '11px', color: '#8D8779' }}>Source ↗</a>
                          </div>
                        </div>
                      </Fragment>
                    ))}
                    {noPlugins ? (
                      <>
                        <div style={{ padding: '28px', textAlign: 'center', fontSize: '12px', color: '#6E6A5E', background: '#141310' }}>Nothing matches.</div>
                      </>
                    ) : null}
                  </div>
                </div>
              </>
            ) : null}
            {isLibrary ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.12em', color: '#6E6A5E', paddingBottom: '2px' }}>CONTENT FOLDERS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #2C2923', borderRadius: '6px', overflow: 'hidden' }}>
                    {libRows.map((l, lI) => (
                      <Fragment key={lI}>
                        <div style={{ display: 'grid', gridTemplateColumns: '110px minmax(0,1fr) auto', alignItems: 'center', gap: '12px', padding: '12px 14px', background: '#141310', borderTop: `1px solid ${l.rule}` }}>
                          <span style={{ fontSize: '12px', color: '#A39D8F' }}>{l.label}</span>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: '#E9E4D8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.path}</span>
                            <span style={{ fontSize: '10px', color: '#6E6A5E' }}>{l.tag}</span>
                          </div>
                          <div className="st9" onClick={l.onClick} style={{ height: '28px', display: 'flex', alignItems: 'center', padding: '0 14px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: '500', background: '#1F1D19', color: '#E9E4D8', border: '1px solid #2C2923', boxSizing: 'border-box' }}>Choose…</div>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
            {isAppearance ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.12em', color: '#6E6A5E', paddingBottom: '2px' }}>UI</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px minmax(0,1fr)', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#A39D8F' }}>Theme</span>
                      <div style={{ display: 'flex', width: 'max-content', padding: '2px', gap: '2px', background: '#100F0D', border: '1px solid #2C2923', borderRadius: '6px' }}>
                        {themes.map((c, cI) => (
                          <Fragment key={cI}>
                            <div onClick={c.onClick} style={{ height: '24px', display: 'flex', alignItems: 'center', gap: '7px', padding: '0 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: c.weight, background: c.bg, color: c.ink }}>
                              <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: c.swatch, border: `1px solid ${c.swatchBorder}`, boxSizing: 'border-box' }} />
                              <span>{c.label}</span>
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px minmax(0,1fr)' }}>
                      <span />
                      <div style={{ fontSize: '11px', lineHeight: '1.55', color: '#6E6A5E', textWrap: 'pretty' }}>Ember Graphite is the warm dark palette; Ember Paper is the same system on a light ground. System follows the OS appearance and switches with it.</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid #221F1A', paddingTop: '20px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.12em', color: '#6E6A5E', paddingBottom: '2px' }}>AI CONTROL (MCP)</div>
                    <div onClick={toggleMcp} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <div style={{ width: '28px', height: '16px', flex: 'none', borderRadius: '8px', position: 'relative', background: mcpSw.track }}>
                        <div style={{ position: 'absolute', top: '2px', left: mcpSw.knobX, width: '12px', height: '12px', borderRadius: '50%', background: mcpSw.knob }} />
                      </div>
                      <span style={{ fontSize: '12px', color: '#E9E4D8' }}>Enable MCP server (let an AI drive Nota)</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', opacity: mcpOpacity }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '150px minmax(0,1fr)', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', color: '#A39D8F' }}>Port</span>
                        <input value={port} onChange={onPort} style={{ width: '96px', height: '28px', padding: '0 10px', background: '#100F0D', border: '1px solid #2C2923', borderRadius: '5px', outline: 'none', fontFamily: "'Geist Mono',monospace", fontSize: '12px', color: '#E9E4D8', boxSizing: 'border-box' }} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '150px minmax(0,1fr)', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', color: '#A39D8F' }}>Status</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '0' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', flex: 'none', background: mcpDot }} />
                          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: '#A39D8F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mcpStatus}</span>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '150px minmax(0,1fr)', alignItems: 'start' }}>
                        <span />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
                          <div className="st10" onClick={copyConfig} style={{ height: '28px', display: 'flex', alignItems: 'center', padding: '0 14px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: '500', background: '#1F1D19', color: '#E9E4D8', border: '1px solid #2C2923', boxSizing: 'border-box' }}>{copyLabel}</div>
                          <div style={{ fontSize: '11px', lineHeight: '1.55', color: '#6E6A5E', textWrap: 'pretty' }}>Add this config (or the URL) as an MCP server in Claude Desktop / Claude Code. Loopback only; off by default.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            {isShortcuts ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ height: '30px', maxWidth: '320px', display: 'flex', alignItems: 'center', gap: '7px', padding: '0 10px', background: '#100F0D', border: '1px solid #2C2923', borderRadius: '6px', boxSizing: 'border-box' }}>
                    <svg width="11" height="11" viewBox={'0 0 24 24'} fill="none" stroke="#6E6A5E" strokeWidth="2">
                      <circle cx="10.5" cy="10.5" r="6.5" />
                      <path d="M15.5 15.5 L21 21" />
                    </svg>
                    <input value={sq} onChange={onSq} placeholder="Filter shortcuts" style={{ flex: '1', minWidth: '0', background: 'transparent', border: '0', outline: 'none', fontFamily: 'Geist,system-ui,sans-serif', fontSize: '12px', color: '#E9E4D8' }} />
                  </div>
                  {shortcutGroups.map((g, gI) => (
                    <Fragment key={gI}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '4px' }}>
                          <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.12em', color: '#6E6A5E' }}>{g.title}</span>
                          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '9px', color: '#55514A' }}>{g.count}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #2C2923', borderRadius: '6px', overflow: 'hidden' }}>
                          {g.rows.map((s, sI) => (
                            <Fragment key={sI}>
                              <div style={{ display: 'grid', gridTemplateColumns: '150px minmax(0,1fr)', alignItems: 'center', gap: '12px', padding: '7px 12px', minHeight: '34px', background: '#141310', borderTop: `1px solid ${s.rule}`, boxSizing: 'border-box' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                                  {s.keys.map((k, kI) => (
                                    <Fragment key={kI}>
                                      <span style={{ height: '20px', minWidth: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px', fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: '#E9E4D8', background: '#1F1D19', border: '1px solid #2C2923', borderBottomColor: '#3A362E', borderRadius: '4px', boxSizing: 'border-box' }}>{k.label}</span>
                                    </Fragment>
                                  ))}
                                </div>
                                <span style={{ fontSize: '12px', lineHeight: '1.45', color: '#A39D8F', textWrap: 'pretty' }}>{s.desc}</span>
                              </div>
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
        {anyOpen ? (
          <>
            <div onClick={closeAll} style={{ position: 'absolute', inset: '0', zIndex: '10' }} />
          </>
        ) : null}
      </div>
    );
  }
}

export function SettingsWindow(props: Record<string, unknown>) {
  return <SettingsWindowImpl {...props} />;
}
