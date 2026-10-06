// @ts-nocheck
/* eslint-disable no-unused-vars -- kept verbatim from the mockup */
// Nota Remote phone ("Nota Remote" mockup): ported from the nota-design mockup with its logic kept as written there,
// so the two stay easy to diff. Markup was converted from the mockup's template.
import { Component as ReactComponent, Fragment } from "react";

const NN = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const TRACKS = [
  { name: "Drums", dev: "Drum Rack", color: "#58B368", kind: "drum" },
  { name: "Bass", dev: "Nota Bass", color: "#3E8E8E", kind: "inst", who: "Anna" },
  { name: "Keys", dev: "Instrument Rack", color: "#5AA0B8", kind: "inst" },
  { name: "Lead", dev: "Nota Flux", color: "#7A6FB0", kind: "inst", flux: true },
  { name: "Vox", dev: "Audio", color: "#9AA64A", kind: "audio" },
  { name: "Texture", dev: "Nota Grain", color: "#C77F55", kind: "inst" }
];
const PADN = ["Kick","Snare","Clap","Hat C","Hat O","Tom L","Tom H","Rim","Shaker","Crash","Ride","Perc","Conga L","Conga H","Cowbell","Tamb",
  "Kick 2","Snare 2","Snap","Bongo","Vox Hit","Rise","Down","Sub","Noise","Rev","Clave","Guiro","Agogo","Whistle","Cabasa","Splash"];
const KEYS = [
  { name: "A minor", root: 9, iv: [0,2,3,5,7,8,10] },
  { name: "C major", root: 0, iv: [0,2,4,5,7,9,11] },
  { name: "D dorian", root: 2, iv: [0,2,3,5,7,9,10] }
];
const TABS = ["Pads","Keys","XY","Mixer","Macros","Scenes"];
const SCENES = ["Intro","Verse","Build","Drop","Outro"];
const CLIPS = [
  ["Intro beat","Verse beat","Fill","Drop beat",null],
  [null,"Line A","Riser","Line B","Tail"],
  ["Pads","Chords","Chords","Stabs","Pads"],
  [null,null,"Arp","Hook",null],
  [null,"Verse vox",null,"Chop","Outro vox"],
  ["Field rec","Field rec","Noise",null,"Field rec"]
];
const SECTIONS = [["Intro",1],["Verse",9],["Drop",17],["Outro",33]];
const DEVICES = [
  { name: "Instrument Rack · Macros", params: [["Brightness","hz",.55,1],["Attack","ms",.1],["Release","ms",.4],["Drive","pct",.2],["Chorus","pct",.35],["Space","pct",.5,1],["Wobble","pct",0],["Width","pct",.7]] },
  { name: "Nota Chamber", params: [["Decay","s",.46],["Size","pct",.6],["Pre-delay","ms",.12],["Mix","pct",.42,1],["Damp","hz",.6],["Width","pct",.8],["Mod","pct",.18],["Early","pct",.5]] },
  { name: "Auto Filter", params: [["Cutoff","hz",.5,1],["Resonance","pct",.38],["Drive","pct",.1],["Env","pct",.3],["LFO Rate","pct",.2],["LFO Amt","pct",0],["Mix","pct",1],["Out","pct",.75]] }
];
const LEARN_T = ["Reverb · Decay", "Delay · Feedback", "Synth · Glide"];
const GEO = {
  phone: { w: 390, h: 844, bz: 52, sr: 44 },
  phoneLand: { w: 844, h: 390, bz: 52, sr: 44 },
  tablet: { w: 1180, h: 820, bz: 36, sr: 26 }
};
const CHORDS_PLAY = [[9,0,4],[5,9,0],[0,4,7],[7,11,2]];
const clamp = v => Math.min(1, Math.max(0, v));
const fmtHz = x => { const hz = 20 * Math.pow(1000, x); return hz >= 1000 ? (hz / 1000).toFixed(1) + " kHz" : Math.round(hz) + " Hz"; };
const fmt = (t, v) => t === "hz" ? fmtHz(v) : t === "ms" ? Math.round(v * 2000) + " ms" : t === "s" ? (0.2 + v * 9.8).toFixed(1) + " s" : Math.round(v * 100) + " %";
const toDb = v => v < 0.01 ? "−∞" : ((d => (d >= 0 ? "+" : "−") + Math.abs(d).toFixed(1))(40 * Math.log10(v / 0.75)));
const tog = on => ({ track: on ? "#D8A03D" : "#26231E", knob: on ? "#171613" : "#6E6A5E", x: on ? "9.5px" : "1.5px" });
const seg = on => ({ bg: on ? "#1C1A16" : "transparent", ink: on ? "#E9E4D8" : "#8D8779" });
const btn = on => ({ bg: on ? "#241F17" : "#1C1A16", edge: on ? "#6B5326" : "#2C2923", ink: on ? "#F0C060" : "#C7C0B0" });

class PhoneImpl extends ReactComponent<any, any> {
  [k: string]: any;
  constructor(p) {
    super(p);
    const ti = +(p.trackIdx ?? 0);
    const t = TRACKS[ti];
    this.state = {
      trackIdx: ti,
      screen: p.startScreen || (t.kind === "drum" ? "Pads" : t.kind === "inst" ? "Keys" : "Pads"),
      bigT: !!p.bigTransport || t.kind === "audio",
      playing: !!p.playing, rec: false, loop: false, metro: true, step: p.playing ? 176 : 172, acc: 0, bpm: 128,
      bank: 0, fullVel: false, nr: false, nrRate: 1, down: {}, vel: .8,
      keysMode: p.keysMode || "Scale", keyIdx: 0, oct: 3, kdown: {}, bend: .5, mod: .2, wDrag: null,
      xy: { x: .42, y: .58 }, hold: true, tilt: false, xyDrag: false, home: { x: .42, y: .58 },
      vols: [.75,.68,.6,.7,.72,.5], pans: [0,-.2,.3,0,0,.4], mute: [0,0,0,0,1,0], solo: [0,0,0,0,0,0], arm: [1,0,0,0,0,0], master: .75, groupOpen: true,
      devIdx: 0, mvals: DEVICES.map(d => d.params.map(q => q[2])), maps: {},
      playingClip: [1,1,1,null,1,0], queued: [null,null,null,3,null,null],
      countIn: null, loopSec: null, menu: false, tracks: false, follow: false, theme: 0, haptics: true, countInOn: true,
      learnIdx: 0, learned: null, toast: null, taps: [], t: 0
    };
  }
  componentDidMount() {
    // Tick only while the phone is on screen.
    this._io = new IntersectionObserver(([e]) => {
      clearInterval(this._iv);
      if (e.isIntersecting) this._iv = setInterval(() => this.tick(30), 30);
    });
    if (this._root) this._io.observe(this._root);
  }
  componentWillUnmount() { clearInterval(this._iv); clearTimeout(this._tt); this._io?.disconnect(); }
  tick(dt) {
    const s = this.state, up = {}; let ch = false;
    const stepMs = 60000 / s.bpm / 4;
    up.t = s.t + dt;
    if (s.countIn != null) {
      let acc = s.acc + dt;
      if (acc >= stepMs * 4) { acc -= stepMs * 4; const n = s.countIn - 1; if (n <= 0) { up.countIn = null; up.playing = true; up.rec = true; } else up.countIn = n; }
      up.acc = acc; ch = true;
    } else if (s.playing) {
      let acc = s.acc + dt, step = s.step;
      while (acc >= stepMs) {
        acc -= stepMs; step++;
        if (s.loopSec != null) { const a = (SECTIONS[s.loopSec][1] - 1) * 16, b = s.loopSec < 3 ? (SECTIONS[s.loopSec + 1][1] - 1) * 16 : a + 64; if (step >= b) step = a; }
        if (step % 16 === 0 && (up.queued || s.queued).some(q => q != null)) {
          const pc = (up.playingClip || s.playingClip).slice(), q = (up.queued || s.queued).slice();
          q.forEach((v, i) => { if (v != null) { pc[i] = v === -1 ? null : v; q[i] = null; } });
          up.playingClip = pc; up.queued = q;
        }
      }
      up.acc = acc; up.step = step; ch = true;
    }
    if (s.tilt) { const k = up.t / 1000; up.xy = { x: clamp(.5 + .32 * Math.sin(k * 1.3)), y: clamp(.5 + .26 * Math.sin(k * 0.9 + 1)) }; ch = true; }
    if (!s.xyDrag && !s.tilt && !s.hold) { const h = s.home, d = { x: s.xy.x + (h.x - s.xy.x) * .2, y: s.xy.y + (h.y - s.xy.y) * .2 }; if (Math.abs(d.x - s.xy.x) + Math.abs(d.y - s.xy.y) > .002) { up.xy = d; ch = true; } }
    if (s.wDrag !== "bend" && Math.abs(s.bend - .5) > .002) { up.bend = s.bend + (.5 - s.bend) * .3; ch = true; }
    if (ch || (this.props.conn === "lost" || this.props.conn === "down")) this.setState(up);
  }
  toastMsg(m) { clearTimeout(this._tt); this.setState({ toast: m }); this._tt = setTimeout(() => this.setState({ toast: null }), 2200); }
  learnOn() { return this.props.learn ?? false; }
  learn(key, label) {
    const t = LEARN_T[this.state.learnIdx % LEARN_T.length];
    this.setState(s => ({ maps: { ...s.maps, [key]: t }, learned: label + " → " + t, learnIdx: s.learnIdx + 1 }));
  }
  selTrack(i) {
    const n = (i + TRACKS.length) % TRACKS.length;
    this.setState({ trackIdx: n, tracks: false });
  }
  drag(key, getStart, apply, sens) {
    return {
      onDown: e => { e.currentTarget.setPointerCapture(e.pointerId); this._d = { key, y: e.clientY, v: getStart(), h: e.currentTarget.getBoundingClientRect().height }; this.setState({ wDrag: key }); },
      onMove: e => { if (!this._d || this._d.key !== key) return; apply(clamp(this._d.v + (this._d.y - e.clientY) / (sens || this._d.h))); },
      onUp: () => { this._d = null; this.setState({ wDrag: null }); }
    };
  }

  renderVals() {
    const s = this.state, p = this.props;
    const dev = p.device || "phone", g = GEO[dev] || GEO.phone;
    const portrait = dev === "phone", tablet = dev === "tablet", land = dev === "phoneLand";
    const conn = p.conn || "ok", learn = this.learnOn();
    const track = TRACKS[s.trackIdx];
    const lo = learn ? "1px dashed #8A6B2E" : "none";
    const blink = (Math.floor(s.t / 400) % 2) ? .35 : 1;
    const bar = Math.floor(s.step / 16) + 1, beat = Math.floor((s.step % 16) / 4) + 1, six = s.step % 4 + 1;
    const playingPcs = s.playing && track.kind === "inst" ? CHORDS_PLAY[(bar - 1) % 4] : [];

    const pv = {};
    const cnt = { ok: ["#7FB069", "#8D8779", "4 ms"], weak: ["#D9C34C", "#D9C34C", "Weak · 68 ms"], lost: ["#8D8779", "#A39D8F", "Reconnecting"], down: ["#C2554A", "#E08A72", "No connection"], expired: ["#C2554A", "#E08A72", "Not paired"] }[conn];

    // pads
    const nPads = tablet ? 32 : 16;
    const st = s.step;
    const clipHit = i => s.playing && track.kind === "drum" && ((i === 0 && st % 4 === 0) || (i === 1 && st % 8 === 4) || (i === 3 && st % 2 === 0) || (i === 4 && st % 16 === 14));
    const pads = Array.from({ length: nPads }, (_, k) => {
      const row = Math.floor(k / (tablet ? 8 : land ? 8 : 4)), cols = tablet || land ? 8 : 4, rows = nPads / cols;
      const i = (rows - 1 - row) * cols + (k % cols);
      const midi = 36 + s.bank * 12 + i;
      const pressed = !!s.down[i] && (!s.nr || Math.floor(s.t / (s.nrRate === 0 ? 234 : s.nrRate === 1 ? 117 : 58)) % 2 === 0);
      const lit = clipHit(i);
      return {
        num: String(i + 1), name: s.bank === 0 && track.kind === "drum" ? PADN[i] : NN[midi % 12] + (Math.floor(midi / 12) - 2),
        note: NN[midi % 12] + (Math.floor(midi / 12) - 2),
        bg: pressed ? "#D8A03D" : lit ? track.color : "#1C1A16",
        edge: pressed ? "#D8A03D" : lit ? track.color : "#2C2923",
        ink: pressed || lit ? "#171613" : "#E9E4D8", subInk: pressed || lit ? "#171613" : "#6E6A5E",
        onDown: e => { const r = e.currentTarget.getBoundingClientRect(); const vel = s.fullVel ? 1 : Math.max(.2, 1 - (e.clientY - r.top) / r.height); if (navigator.vibrate && s.haptics) try { navigator.vibrate(8); } catch (x) {} this.setState(q => ({ down: { ...q.down, [i]: true }, vel })); },
        onUp: () => this.state.down[i] && this.setState(q => ({ down: { ...q.down, [i]: false } }))
      };
    });

    // keys
    const key = KEYS[s.keyIdx];
    const inScale = m => key.iv.includes(((m % 12) - key.root + 12) % 12);
    const nW = portrait ? 8 : land ? 11 : 15;
    const WP = [0,2,4,5,7,9,11];
    const base = 12 * (s.oct + 1);
    const keyObj = (m, white) => {
      const on = !!s.kdown[m], pl = playingPcs.includes(m % 12);
      return {
        bg: on ? "#D8A03D" : white ? "#D9D3C5" : "#1C1A16",
        ink: on ? "#171613" : "#55514A", band: pl ? track.color : "transparent",
        label: white && m % 12 === 0 ? "C" + (Math.floor(m / 12) - 1) : "",
        onDown: () => this.setState(q => ({ kdown: { ...q.kdown, [m]: true } })),
        onUp: () => this.state.kdown[m] && this.setState(q => ({ kdown: { ...q.kdown, [m]: false } }))
      };
    };
    const whites = Array.from({ length: nW }, (_, k) => keyObj(base + WP[k % 7] + 12 * Math.floor(k / 7), true));
    const blacks = [];
    for (let k = 0; k < nW - 1; k++) if ([0,1,3,4,5].includes(k % 7)) {
      const m = base + WP[k % 7] + 12 * Math.floor(k / 7) + 1;
      blacks.push({ ...keyObj(m, false), left: `calc(${((k + 1) / nW * 100).toFixed(3)}% - ${(0.62 / nW * 50).toFixed(3)}%)`, w: (0.62 / nW * 100).toFixed(3) + "%" });
    }
    const gc = portrait ? 5 : 8, gr = portrait ? 6 : land ? 4 : 6;
    const cells = [];
    for (let r = gr - 1; r >= 0; r--) for (let c = 0; c < gc; c++) {
      const deg = r * 3 + c, o = Math.floor(deg / 7), d = deg % 7;
      const m = base + key.root + key.iv[d] + 12 * o;
      const on = !!s.kdown[m], tonic = d === 0, pl = playingPcs.includes(m % 12);
      cells.push({
        label: NN[m % 12] + (tonic ? Math.floor(m / 12) - 1 : ""), weight: tonic ? 600 : 400,
        bg: on ? "#D8A03D" : tonic ? "#2B2820" : "#1C1A16", edge: on ? "#D8A03D" : pl ? track.color : tonic ? "#3A362D" : "#2C2923",
        ink: on ? "#171613" : tonic ? "#F2EDE1" : "#A39D8F",
        onDown: () => this.setState(q => ({ kdown: { ...q.kdown, [m]: true } })),
        onUp: () => this.state.kdown[m] && this.setState(q => ({ kdown: { ...q.kdown, [m]: false } }))
      });
    }
    const ROM = ["i","ii","iii","iv","v","vi","vii"];
    const chords = key.iv.map((_, d) => {
      const a = key.iv[d], b = key.iv[(d + 2) % 7] + (d + 2 >= 7 ? 12 : 0), c = key.iv[(d + 4) % 7] + (d + 4 >= 7 ? 12 : 0);
      const t3 = b - a, t5 = c - a, q = t3 === 4 ? "" : t5 === 6 ? "°" : "m";
      const rootPc = (key.root + a) % 12, id = "ch" + d, on = !!s.kdown[id];
      return {
        roman: (q === "" ? ROM[d].toUpperCase() : ROM[d]) + (q === "°" ? "°" : ""), name: NN[rootPc] + q,
        bg: on ? "#D8A03D" : "#1C1A16", edge: on ? "#D8A03D" : playingPcs[0] === rootPc ? track.color : "#2C2923",
        ink: on ? "#171613" : "#E9E4D8", sub: on ? "#5E4A22" : "#8A6B2E",
        onDown: () => this.setState(z => ({ kdown: { ...z.kdown, [id]: true } })),
        onUp: () => this.state.kdown[id] && this.setState(z => ({ kdown: { ...z.kdown, [id]: false } }))
      };
    });
    const bendD = this.drag("bend", () => this.state.bend, v => this.setState({ bend: v }));
    const modD = this.drag("mod", () => this.state.mod, v => this.setState({ mod: v }));
    const wheels = [
      { name: "BEND", pos: (s.bend * 100).toFixed(1) + "%", mid: "#3A362D", cap: s.wDrag === "bend" ? "#F0C060" : "#A39D8F", ...bendD },
      { name: "MOD", pos: (s.mod * 100).toFixed(1) + "%", mid: "transparent", cap: s.wDrag === "mod" ? "#F0C060" : "#A39D8F", ...modD }
    ];

    // xy
    const xyDev = track.flux ? "Nota Flux · Vector" : track.name + " · Auto Filter";
    const xParam = s.maps.xyX || s.maps.tiltX || (track.flux ? "Vector X" : "Cutoff");
    const yParam = s.maps.xyY || s.maps.tiltY || (track.flux ? "Vector Y" : "Resonance");
    const axes = [
      { axis: "X", param: xParam, device: s.maps.xyX ? "Mapped in Nota" : xyDev, value: track.flux || s.maps.xyX ? Math.round(s.xy.x * 100) + " %" : fmtHz(s.xy.x), rule: "transparent" },
      { axis: "Y", param: yParam, device: s.maps.xyY ? "Mapped in Nota" : xyDev, value: Math.round(s.xy.y * 100) + " %", rule: "#221F1A" }
    ];
    const xyFrom = e => { const r = e.currentTarget.getBoundingClientRect(); return { x: clamp((e.clientX - r.left) / r.width), y: clamp(1 - (e.clientY - r.top) / r.height) }; };

    // mixer
    const vis = [];
    vis.push({ group: true });
    if (s.groupOpen) vis.push(0, 1);
    vis.push(2, 3, 4, 5);
    const level = (i, ch) => s.playing && !s.mute[i] ? Math.round(55 + 35 * Math.abs(Math.sin(s.step * (0.6 + i * 0.13) + i + ch))) * s.vols[i] / 0.75 : 0;
    const strips = vis.map(v => {
      if (v && v.group) {
        const d = this.drag("grp", () => this.state.master, () => {});
        return { name: "Beat", tag: s.groupOpen ? "▾ 2" : "▸ 2", color: "#58B368", cardBg: "#100F0D", cardEdge: "#221F1A", headCursor: "pointer", onHead: () => this.setState(q => ({ groupOpen: !q.groupOpen })),
          pan: "C", panPos: "50%", meterL: Math.min(100, (level(0, 0) + level(1, 0)) * .6) + "%", meterR: Math.min(100, (level(0, 1) + level(1, 1)) * .6) + "%", faderPos: "75%", capEdge: "#3A362D", capLine: "#A39D8F", db: "0.0", dbInk: "#8D8779", hasButtons: false, held: false, ...d };
      }
      const i = v, t = TRACKS[i], key2 = "v" + i;
      const d = this.drag(key2, () => this.state.vols[i], nv => this.setState(q => { const a = q.vols.slice(); a[i] = nv; return { vols: a }; }));
      const onDown = e => { const now = Date.now(); if (this._lt && this._lt.k === key2 && now - this._lt.t < 300) { this.setState(q => { const a = q.vols.slice(); a[i] = .75; return { vols: a }; }); this._lt = null; return; } this._lt = { k: key2, t: now }; d.onDown(e); };
      const active = s.wDrag === key2, held = t.who && !active ? t.who + " has it" : false;
      const flip = k => () => this.setState(q => { const a = q[k].slice(); a[i] = a[i] ? 0 : 1; return { [k]: a }; });
      const pan = s.pans[i];
      return {
        name: t.name, tag: "", color: t.color, cardBg: "#141310", cardEdge: active ? "#6B5326" : "#2C2923", headCursor: "default", onHead: () => {},
        pan: Math.abs(pan) < .01 ? "C" : (pan < 0 ? "L" : "R") + Math.round(Math.abs(pan) * 50), panPos: (50 + pan * 50) + "%",
        meterL: Math.min(100, level(i, 0)) + "%", meterR: Math.min(100, level(i, 1)) + "%",
        faderPos: (s.vols[i] * 100).toFixed(1) + "%", capEdge: held ? "#6D8FB5" : "#3A362D", capLine: active ? "#F0C060" : "#A39D8F",
        db: toDb(s.vols[i]), dbInk: active ? "#F0C060" : "#C7C0B0", hasButtons: true, held,
        muteBg: s.mute[i] ? "#26231E" : "#1C1A16", muteEdge: s.mute[i] ? "#6E6A5E" : "#2C2923", muteInk: s.mute[i] ? "#F2EDE1" : "#8D8779", onMute: flip("mute"),
        soloBg: s.solo[i] ? "#D8A03D" : "#1C1A16", soloEdge: s.solo[i] ? "#D8A03D" : "#2C2923", soloInk: s.solo[i] ? "#171613" : "#8D8779", onSolo: flip("solo"),
        armBg: s.arm[i] ? "#2A1A16" : "#1C1A16", armEdge: s.arm[i] ? "#C25B44" : "#2C2923", armDot: s.arm[i] ? "#C25B44" : "#55514A", armInk: s.arm[i] ? "#E08A72" : "#8D8779", onArm: flip("arm"),
        ...d, onDown
      };
    });
    const md = this.drag("master", () => this.state.master, nv => this.setState({ master: nv }));
    const mLvl = s.playing ? 60 + 25 * Math.abs(Math.sin(s.step * .5)) : 0;
    const masterStrip = [{ meterL: mLvl + "%", meterR: (mLvl * .95) + "%", faderPos: (s.master * 100).toFixed(1) + "%", capEdge: "#3A362D", capLine: s.wDrag === "master" ? "#F0C060" : "#A39D8F", db: toDb(s.master), ...md }];

    // macros
    const D = DEVICES[s.devIdx];
    const macros = D.params.map((q, i) => {
      const v = s.mvals[s.devIdx][i], k = "m" + s.devIdx + "_" + i, mapped = s.maps["mac" + i];
      const d = this.drag(k, () => this.state.mvals[this.state.devIdx][i], nv => this.setState(z => { const all = z.mvals.map(a => a.slice()); all[z.devIdx][i] = nv; return { mvals: all }; }), 200);
      const active = s.wDrag === k;
      return {
        name: (mapped || q[0]).toUpperCase(), value: fmt(q[1], v), auto: !!q[3],
        dash: (v * 98.9).toFixed(1) + " 131.9", rot: `rotate(${(-135 + 270 * v).toFixed(1)} 26 26)`,
        arc: active ? "#F0C060" : "#D8A03D", edge: active ? "#6B5326" : "#2C2923",
        labelInk: active ? "#F0C060" : "#6E6A5E", valInk: active ? "#F0C060" : "#E9E4D8",
        ...d, onDown: e => { d.onDown(e); if (this.learnOn()) this.learn("mac" + i, "Macro " + (i + 1)); }
      };
    });

    // scenes
    const sceneRows = SCENES.map((n, si) => ({
      name: n,
      onLaunch: () => this.setState(q => ({ queued: q.queued.map((_, ti) => CLIPS[ti][si] ? si : -1) })),
      cells: TRACKS.map((t, ti) => {
        const name = CLIPS[ti][si], pl = s.playingClip[ti] === si, qd = s.queued[ti] === si;
        if (!name) return { name: "", state: "", bg: "#100F0D", edge: "#221F1A", borderStyle: "dashed", ink: "#55514A", opacity: 1, playing: false, progress: "0%", onClick: () => {} };
        return {
          name, playing: pl, progress: ((s.step % 64) / 64 * 100).toFixed(1) + "%",
          state: pl ? "PLAYING" : qd ? "QUEUED · NEXT BAR" : "",
          bg: pl || qd ? t.color : "#1C1A16", edge: pl ? "#F2EDE1" : qd ? t.color : "#2C2923", borderStyle: "solid",
          ink: pl || qd ? "#171613" : "#C7C0B0", opacity: qd ? blink : 1,
          onClick: () => this.setState(z => { const a = z.queued.slice(); a[ti] = si; return { queued: a }; })
        };
      })
    }));
    const sceneHeads = TRACKS.map(t => ({ name: t.name, color: t.color }));
    const sceneStops = TRACKS.map((t, ti) => ({ onClick: () => this.setState(z => { const a = z.queued.slice(); a[ti] = -1; return { queued: a }; }) }));
    const colMin = portrait ? 96 : land ? 104 : 132;

    // big transport
    const toggleRec = () => {
      if (!s.rec && !s.playing && s.countInOn) { this.setState({ countIn: 4, acc: 0, bigT: true }); return; }
      this.setState(q => ({ rec: !q.rec }));
    };
    const B = (name, on, onClick, shape, red) => {
      const b2 = red && on ? { bg: "#2A1A16", edge: "#C25B44", ink: "#E08A72" } : name === "Play" && on ? { bg: "#D8A03D", edge: "#D8A03D", ink: "#171613" } : btn(on);
      return { name, onClick, tri: shape === "tri", sq: shape === "sq", dot: shape === "dot", ...b2, ink: shape === "dot" && !on ? "#C25B44" : b2.ink };
    };
    const bigBtns = [
      B("Play", s.playing, () => this.setState(q => ({ playing: !q.playing })), "tri"),
      B("Stop", false, () => this.setState(q => ({ playing: false, rec: false, step: q.playing ? q.step : 0 })), "sq"),
      B("Record", s.rec, toggleRec, "dot", true),
      B("Loop", s.loop, () => this.setState(q => ({ loop: !q.loop }))),
      B("Click", s.metro, () => this.setState(q => ({ metro: !q.metro }))),
      B("Undo", false, () => this.toastMsg("Undone: Bass · Volume"))
    ];
    const curSec = SECTIONS.reduce((a, x, i) => bar >= x[1] ? i : a, 0);
    const sections = SECTIONS.map(([n, b0], i) => {
      const looping = s.loopSec === i, cur = curSec === i;
      return {
        name: n, info: looping ? "LOOPING" : "BAR " + b0,
        bg: looping ? "#241F17" : cur ? "#1C1A16" : "#141310", edge: looping ? "#6B5326" : cur ? "#3A362D" : "#2C2923",
        ink: looping ? "#F0C060" : "#E9E4D8", sub: looping ? "#D8A03D" : "#6E6A5E",
        onDown: () => { this._hold = setTimeout(() => { this._hold = null; this.setState(q => ({ loopSec: q.loopSec === i ? null : i })); }, 450); },
        onUp: () => { if (this._hold) { clearTimeout(this._hold); this._hold = null; this.setState({ step: (b0 - 1) * 16, acc: 0 }); } }
      };
    });

    // banner
    let showBanner = false, bannerTitle = "", bannerSub = "", bannerBg = "#241F17", bannerEdge = "#6B5326", bannerDot = "#D8A03D", bannerInk = "#F0C060";
    if (conn === "lost") { showBanner = true; bannerTitle = "Reconnecting to Studio Mac…"; bannerSub = "Touches are not sent until the link is back"; bannerBg = "#141310"; bannerEdge = "#2C2923"; bannerDot = "#8D8779"; bannerInk = "#E9E4D8"; }
    else if (learn) {
      showBanner = true;
      bannerTitle = s.learned ? "Mapped " + s.learned : "Nota is listening: " + LEARN_T[s.learnIdx % LEARN_T.length];
      bannerSub = s.learned ? "Click another control in Nota to keep mapping" : "Move a macro, an XY axis or tilt the phone. Pads, keys and mixer can't be mapped.";
    }

    const emptyInst = track.kind === "audio" && (s.screen === "Pads" || s.screen === "Keys");
    const tabs = TABS.map(t => ({ name: t, ...seg(t === s.screen && !s.bigT), edge: t === s.screen && !s.bigT ? "#D8A03D" : "transparent", onClick: () => this.setState({ screen: t, bigT: false }) }));

    const trackRows = TRACKS.map((t, i) => ({ name: t.name, dev: t.dev, color: t.color, who: i === s.trackIdx ? "You" : t.who || false, bg: i === s.trackIdx ? "#241F17" : "#141310", edge: i === s.trackIdx ? "#D8A03D" : "transparent", onClick: () => this.selTrack(i) }));
    const fT = tog(s.follow);
    const hdrH = portrait ? 50 + 120 : land ? 62 : 24 + 66;

    Object.assign(pv, {
      w: g.w + "px", h: g.h + "px", bezelR: g.bz + "px", screenR: g.sr + "px",
      showStatus: !land, statusH: tablet ? "24px" : "50px", homeBar: !tablet || true,
      hdrPad: portrait ? "6px 10px 10px" : land ? "8px 44px 8px 44px" : "10px 16px",
      tOrder: portrait ? 3 : 2, sOrder: portrait ? 2 : 3, tBasis: portrait ? "100%" : tablet ? "460px" : "330px",
      rail: !portrait, bottomTabs: portrait, railW: land ? "104px" : "104px", railPad: land ? "8px 8px 8px 40px" : "12px 10px",
      railItemH: land ? "44px" : "56px", railFont: tablet ? "13px" : "11px",
      cPad: portrait ? "12px" : land ? "8px 44px 14px 10px" : "18px",
      cOpacity: conn === "lost" ? .35 : 1, cPE: conn === "lost" ? "none" : "auto",
      track, trackSub: track.dev + (s.follow ? " · following Nota" : ""),
      prevTrack: () => this.selTrack(s.trackIdx - 1), nextTrack: () => this.selTrack(s.trackIdx + 1),
      openTracks: () => this.setState({ tracks: true, menu: false }), openMenu: () => this.setState({ menu: true, tracks: false }),
      closeSheets: () => this.setState({ menu: false, tracks: false }),
      tracksOpen: s.tracks, menuOpen: s.menu, trackRows, follow: fT, toggleFollow: () => this.setState(q => ({ follow: !q.follow })),
      sheetL: "12px", sheetR: portrait ? "12px" : "auto", sheetW: portrait ? "auto" : "360px", sheetT: portrait ? "auto" : (land ? 64 : 92) + "px", sheetB: portrait ? "24px" : "auto",
      menuT: (portrait ? 108 : land ? 64 : 92) + "px",
      themes: ["Follow Nota", "Follow phone"].map((n, i) => ({ name: n, ...seg(s.theme === i), onClick: () => this.setState({ theme: i }) })),
      menuToggles: [
        { name: "Haptics on pads", ...tog(s.haptics), onClick: () => this.setState(q => ({ haptics: !q.haptics })) },
        { name: "Count-in before recording", ...tog(s.countInOn), onClick: () => this.setState(q => ({ countInOn: !q.countInOn })) }
      ],
      menuBg: s.menu ? "#1C1A16" : "transparent",
      onPlay: () => this.setState(q => ({ playing: !q.playing })),
      onStop: () => this.setState(q => ({ playing: false, rec: false, step: q.playing ? q.step : 0 })),
      onRec: toggleRec,
      playBg: s.playing ? "#D8A03D" : "#1C1A16", playEdge: s.playing ? "#D8A03D" : "#2C2923", playInk: s.playing ? "#171613" : "#C7C0B0",
      recBg: s.rec ? "#2A1A16" : "#1C1A16", recEdge: s.rec ? "#C25B44" : "#2C2923", recInk: s.rec ? "#C25B44" : "#8D8779",
      posShort: bar + "." + beat, posLong: bar + "." + beat + "." + six, posInk: s.rec ? "#E08A72" : "#E9E4D8", bpm: s.bpm.toFixed(0),
      toggleBig: () => this.setState(q => ({ bigT: !q.bigT })), bigT: s.bigT, bigRot: s.bigT ? "rotate(180deg)" : "none", bigEdge: s.bigT ? "#6B5326" : "#2C2923",
      bigGap: portrait ? "14px" : "12px", bigPosFont: portrait ? "52px" : land ? "40px" : "88px", bigCols: portrait ? 3 : 6, bigBtns, sections,
      tapTempo: () => { const now = Date.now(); const taps = [...s.taps.filter(x => now - x < 2500), now]; let bpm = s.bpm; if (taps.length >= 3) { const iv = (taps[taps.length - 1] - taps[0]) / (taps.length - 1); bpm = Math.round(Math.min(220, Math.max(50, 60000 / iv))); } this.setState({ taps, bpm }); },
      counting: s.countIn != null, countNum: String(s.countIn ?? ""), countFont: tablet ? "260px" : portrait ? "200px" : "150px",
      connDot: cnt[0], connInk: cnt[1], connLabel: cnt[2], connBlink: conn === "lost" || conn === "down" ? blink : 1,
      connTip: () => conn === "weak" ? this.toastMsg("Latency is 68 ms. Move closer to the router or switch the phone to 5 GHz Wi-Fi.") : this.toastMsg("Connected to Studio Mac · 4 ms"),
      isDown: conn === "down", isExpired: conn === "expired",
      showBanner, bannerTitle, bannerSub, bannerBg, bannerEdge, bannerDot, bannerInk,
      tabs, emptyInst, lo,
      isPads: s.screen === "Pads" && !emptyInst, isKeys: s.screen === "Keys" && !emptyInst, isXY: s.screen === "XY", isMixer: s.screen === "Mixer", isMacros: s.screen === "Macros", isScenes: s.screen === "Scenes",
      banks: ["C1","C2","C3","C4"].map((n, i) => ({ name: n, ...seg(i === s.bank), onClick: () => this.setState({ bank: i }) })),
      fullVel: btn(s.fullVel), toggleFullVel: () => this.setState(q => ({ fullVel: !q.fullVel })),
      nr: { ...btn(s.nr), rateInk: s.nr ? "#F0C060" : "#A39D8F" }, nrRate: ["1/8","1/16","1/32"][s.nrRate],
      toggleNR: () => this.setState(q => ({ nr: !q.nr })), cycleRate: e => { e.stopPropagation(); this.setState(q => ({ nrRate: (q.nrRate + 1) % 3 })); },
      pads, padCols: tablet || land ? 8 : 4, padGap: tablet ? "10px" : "8px", padFont: tablet ? "14px" : "12px",
      keyModes: ["Keyboard","Scale","Chords"].map(n => ({ name: n, ...seg(s.keysMode === n), onClick: () => this.setState({ keysMode: n }) })),
      keyName: key.name, keySrc: s.keyIdx === 0 ? "PROJECT" : "PHONE", cycleKey: () => this.setState(q => ({ keyIdx: (q.keyIdx + 1) % KEYS.length })),
      octLabel: "Oct " + s.oct, octDown: () => this.setState(q => ({ oct: Math.max(0, q.oct - 1) })), octUp: () => this.setState(q => ({ oct: Math.min(7, q.oct + 1) })),
      showBend: !portrait, wheels, rotateHint: portrait && s.keysMode === "Keyboard",
      isKeyboard: s.keysMode === "Keyboard", isScale: s.keysMode === "Scale", isChords: s.keysMode === "Chords",
      whites, blacks, cells, gridCols: gc, chords, chordCols: portrait ? 2 : 7,
      xyDir: portrait ? "column" : "row", xyPanelW: portrait ? "auto" : tablet ? "340px" : "290px",
      xyLeft: (s.xy.x * 100).toFixed(2) + "%", xyTop: ((1 - s.xy.y) * 100).toFixed(2) + "%", xyFillH: (s.xy.y * 100).toFixed(2) + "%",
      xAxisLabel: xParam, yAxisLabel: yParam, axes, tiltOn: s.tilt, tiltAvail: p.tilt !== false,
      tilt: btn(s.tilt), toggleTilt: () => { if (this.learnOn()) this.learn("tiltX", "Tilt ←→"); this.setState(q => ({ tilt: !q.tilt })); },
      releaseModes: [["Hold", true], ["Return", false]].map(([n, v]) => ({ name: n, ...seg(s.hold === v), onClick: () => this.setState({ hold: v }) })),
      xyNote: s.tilt ? "Tilt the phone to move the point. Tap Tilt again to use your finger." : s.hold ? "The point stays where you lift your finger." : "On release the point glides back to where it started.",
      writingAuto: s.rec && s.playing,
      xyDown: e => { if (s.tilt) return; e.currentTarget.setPointerCapture(e.pointerId); this._xs = xyFrom(e); this.setState({ xyDrag: true, xy: this._xs, home: s.hold ? s.home : s.xy }); },
      xyMove: e => { if (this.state.xyDrag) this.setState({ xy: xyFrom(e) }); },
      xyUp: () => { if (!this.state.xyDrag) return; if (this.learnOn() && this._xs) { const e2 = this.state.xy, h = Math.abs(e2.x - this._xs.x) >= Math.abs(e2.y - this._xs.y); this.learn(h ? "xyX" : "xyY", "XY " + (h ? "X" : "Y")); } this.setState({ xyDrag: false }); },
      strips, masterStrip, stripFlex: tablet ? "1 1 0" : "0 0 " + (land ? 84 : 88) + "px", masterW: tablet ? "110px" : "84px",
      devName: D.name, devPos: (s.devIdx + 1) + "/" + DEVICES.length, cycleDevice: () => this.setState(q => ({ devIdx: (q.devIdx + 1) % DEVICES.length })),
      macros, macroCols: portrait ? 2 : 4, knobSize: portrait ? 64 : land ? 52 : 112,
      sceneRows, sceneHeads, sceneStops, sceneTpl: `${portrait ? 92 : 110}px repeat(6, minmax(${colMin}px, 1fr))`, sceneH: portrait ? "58px" : land ? "50px" : "84px",
      toast: s.toast, toastB: portrait ? "110px" : "24px"
    });
    return pv;
  }

  render() {
    const { axes, banks, bannerBg, bannerDot, bannerEdge, bannerInk, bannerSub, bannerTitle, bezelR, bigBtns, bigCols, bigEdge, bigGap, bigPosFont, bigRot, bigT, blacks, bottomTabs, bpm, cOpacity, cPE, cPad, cells, chordCols, chords, closeSheets, connBlink, connDot, connInk, connLabel, connTip, countFont, countNum, counting, cycleDevice, cycleKey, cycleRate, devName, devPos, emptyInst, follow, fullVel, gridCols, h, hdrPad, homeBar, isChords, isDown, isExpired, isKeyboard, isKeys, isMacros, isMixer, isPads, isScale, isScenes, isXY, keyModes, keyName, keySrc, knobSize, lo, macroCols, macros, masterStrip, masterW, menuBg, menuOpen, menuT, menuToggles, nextTrack, nr, nrRate, octDown, octLabel, octUp, onPlay, onRec, onStop, openMenu, openTracks, padCols, padFont, padGap, pads, playBg, playEdge, playInk, posInk, posLong, posShort, prevTrack, rail, railFont, railItemH, railPad, railW, recBg, recEdge, recInk, releaseModes, rotateHint, sOrder, sceneH, sceneHeads, sceneRows, sceneStops, sceneTpl, screenR, sections, sheetB, sheetL, sheetR, sheetT, sheetW, showBanner, showBend, showStatus, statusH, stripFlex, strips, tBasis, tOrder, tabs, tapTempo, themes, tilt, tiltAvail, tiltOn, toast, toastB, toggleBig, toggleFollow, toggleFullVel, toggleNR, toggleTilt, track, trackRows, trackSub, tracksOpen, w, wheels, whites, writingAuto, xAxisLabel, xyDir, xyDown, xyFillH, xyLeft, xyMove, xyNote, xyPanelW, xyTop, xyUp, yAxisLabel } = this.renderVals();
    return (

      <div ref={(el) => { this._root = el; }} style={{ display: 'inline-block', padding: '10px', background: '#050504', border: '1px solid #2C2923', borderRadius: bezelR, fontFamily: 'Geist,system-ui,sans-serif' }}>
        <div style={{ width: w, height: h, borderRadius: screenR, overflow: 'hidden', background: '#0B0A09', display: 'flex', flexDirection: 'column', position: 'relative', touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}>
          {showStatus ? (
            <>
              <div style={{ height: statusH, flex: 'none', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 30px 6px', boxSizing: 'border-box' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#E9E4D8' }}>21:40</span>
                <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: '#8D8779' }}>Wi-Fi · 82%</span>
              </div>
            </>
          ) : null}
          <div style={{ flex: 'none', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 10px', padding: hdrPad, borderBottom: '1px solid #221F1A', position: 'relative', zIndex: '6', background: '#0B0A09' }}>
            <div style={{ order: '1', flex: '1', minWidth: '0', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div className="ph1" onClick={prevTrack} style={{ width: '36px', height: '44px', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '5px' }}>
                <svg width="10" height="14" viewBox="0 0 10 14" fill="none" stroke="#8D8779" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 2 L2 7 L7 12" />
                </svg>
              </div>
              <div onClick={openTracks} style={{ flex: '1', minWidth: '0', height: '44px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 10px', background: '#141310', border: '1px solid #2C2923', borderRadius: '6px', cursor: 'pointer', boxSizing: 'border-box' }}>
                <span style={{ width: '4px', height: '24px', borderRadius: '2px', flex: 'none', background: track.color }} />
                <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#E9E4D8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.name}</span>
                  <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: '#6E6A5E', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{trackSub}</span>
                </div>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#8D8779" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3.5 L5 6.5 L8 3.5" />
                </svg>
              </div>
              <div className="ph2" onClick={nextTrack} style={{ width: '36px', height: '44px', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '5px' }}>
                <svg width="10" height="14" viewBox="0 0 10 14" fill="none" stroke="#8D8779" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 2 L8 7 L3 12" />
                </svg>
              </div>
            </div>
            <div style={{ order: tOrder, flexBasis: tBasis, flexGrow: '0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div onClick={onStop} style={{ width: '44px', height: '40px', borderRadius: '5px', background: '#1C1A16', border: '1px solid #2C2923', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxSizing: 'border-box' }}>
                <span style={{ width: '11px', height: '11px', borderRadius: '1px', background: '#C7C0B0' }} />
              </div>
              <div onClick={onPlay} style={{ width: '54px', height: '40px', borderRadius: '5px', background: playBg, border: `1px solid ${playEdge}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxSizing: 'border-box' }}>
                <span style={{ width: '0', height: '0', borderLeft: `12px solid ${playInk}`, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', marginLeft: '3px' }} />
              </div>
              <div onClick={onRec} style={{ width: '44px', height: '40px', borderRadius: '5px', background: recBg, border: `1px solid ${recEdge}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxSizing: 'border-box' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: recInk }} />
              </div>
              <div onClick={toggleBig} style={{ flex: '1', minWidth: '0', height: '40px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 10px', borderRadius: '5px', background: '#100F0D', border: `1px solid ${bigEdge}`, cursor: 'pointer', boxSizing: 'border-box', boxShadow: 'inset 0 1px 0 #00000080' }}>
                <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '16px', fontWeight: '500', color: '#E9E4D8', fontVariantNumeric: 'tabular-nums' }}>{posShort}</span>
                <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: '#8D8779' }}>{bpm}</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#8D8779" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', transform: bigRot }}>
                  <path d="M2 3.5 L5 6.5 L8 3.5" />
                </svg>
              </div>
            </div>
            <div style={{ order: sOrder, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div onClick={connTip} style={{ height: '44px', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 8px', borderRadius: '5px', cursor: 'pointer' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: connDot, opacity: connBlink }} />
                <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: connInk, whiteSpace: 'nowrap' }}>{connLabel}</span>
              </div>
              <div className="ph3" onClick={openMenu} style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', borderRadius: '5px', cursor: 'pointer', background: menuBg }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#A39D8F' }} />
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#A39D8F' }} />
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#A39D8F' }} />
              </div>
            </div>
          </div>
          {showBanner ? (
            <>
              <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 16px', background: bannerBg, borderBottom: `1px solid ${bannerEdge}` }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', flex: 'none', background: bannerDot, opacity: connBlink }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', minWidth: '0' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: bannerInk }}>{bannerTitle}</span>
                  <span style={{ fontSize: '11px', color: '#A39D8F' }}>{bannerSub}</span>
                </div>
              </div>
            </>
          ) : null}
          <div style={{ flex: '1', minHeight: '0', display: 'flex' }}>
            {rail ? (
              <>
                <div style={{ width: railW, flex: 'none', display: 'flex', flexDirection: 'column', gap: '4px', padding: railPad, borderRight: '1px solid #221F1A', boxSizing: 'border-box' }}>
                  {tabs.map((t, tI) => (
                    <Fragment key={tI}>
                      <div onClick={t.onClick} style={{ height: railItemH, borderRadius: '5px', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '0', top: '10px', bottom: '10px', width: '2px', borderRadius: '1px', background: t.edge }} />
                        <span style={{ fontSize: railFont, fontWeight: '600', color: t.ink }}>{t.name}</span>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
            <div style={{ flex: '1', minWidth: '0', position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: '1', minHeight: '0', display: 'flex', flexDirection: 'column', padding: cPad, boxSizing: 'border-box', opacity: cOpacity, pointerEvents: cPE, transition: 'opacity 200ms ease-out' }}>
                {emptyInst ? (
                  <>
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', textAlign: 'center', padding: '24px', border: '1px dashed #2C2923', borderRadius: '6px' }}>
                      <span style={{ fontSize: '15px', fontWeight: '600', color: '#E9E4D8' }}>{track.name} is an audio track</span>
                      <span style={{ fontSize: '12px', lineHeight: '1.6', color: '#8D8779', maxWidth: '280px', textWrap: 'pretty' }}>There is no instrument to play. Pick an instrument track, or use the transport to record.</span>
                      <div onClick={openTracks} style={{ height: '44px', display: 'flex', alignItems: 'center', padding: '0 18px', borderRadius: '5px', background: '#1C1A16', border: '1px solid #2C2923', fontSize: '13px', fontWeight: '600', color: '#E9E4D8', cursor: 'pointer' }}>Choose another track</div>
                    </div>
                  </>
                ) : null}
                {isPads ? (
                  <>
                    <div style={{ flex: '1', minHeight: '0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', gap: '2px', background: '#100F0D', border: '1px solid #221F1A', borderRadius: '6px', padding: '3px' }}>
                          {banks.map((b, bI) => (
                            <Fragment key={bI}>
                              <div onClick={b.onClick} style={{ minWidth: '38px', height: '36px', padding: '0 4px', borderRadius: '4px', background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxSizing: 'border-box' }}>
                                <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', fontWeight: '500', color: b.ink }}>{b.name}</span>
                              </div>
                            </Fragment>
                          ))}
                        </div>
                        <div onClick={toggleFullVel} style={{ height: '42px', display: 'flex', alignItems: 'center', gap: '7px', padding: '0 10px', borderRadius: '5px', background: fullVel.bg, border: `1px solid ${fullVel.edge}`, cursor: 'pointer', boxSizing: 'border-box' }}>
                          <span style={{ fontSize: '12px', fontWeight: '600', color: fullVel.ink }}>Full vel.</span>
                        </div>
                        <div onClick={toggleNR} style={{ height: '42px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 6px 0 10px', borderRadius: '5px', background: nr.bg, border: `1px solid ${nr.edge}`, cursor: 'pointer', boxSizing: 'border-box' }}>
                          <span style={{ fontSize: '12px', fontWeight: '600', color: nr.ink }}>Repeat</span>
                          <span onClick={cycleRate} style={{ height: '30px', display: 'flex', alignItems: 'center', padding: '0 7px', borderRadius: '3px', background: '#100F0D', fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: nr.rateInk }}>{nrRate}</span>
                        </div>
                      </div>
                      <div style={{ flex: '1', minHeight: '0', display: 'grid', gridTemplateColumns: `repeat(${padCols},minmax(0,1fr))`, gridAutoRows: 'minmax(0,1fr)', gap: padGap }}>
                        {pads.map((p, pI) => (
                          <Fragment key={pI}>
                            <div onPointerDown={p.onDown} onPointerUp={p.onUp} onPointerLeave={p.onUp} style={{ borderRadius: '6px', background: p.bg, border: `1px solid ${p.edge}`, boxShadow: 'inset 0 1px 0 #FFFFFF08', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '8px', boxSizing: 'border-box', cursor: 'pointer', minHeight: '0', overflow: 'hidden' }}>
                              <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: p.subInk }}>{p.num}</span>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', minWidth: '0' }}>
                                <span style={{ fontSize: padFont, fontWeight: '600', color: p.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
                                <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '9px', color: p.subInk }}>{p.note}</span>
                              </div>
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
                {isKeys ? (
                  <>
                    <div style={{ flex: '1', minHeight: '0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', gap: '2px', background: '#100F0D', border: '1px solid #221F1A', borderRadius: '6px', padding: '3px' }}>
                          {keyModes.map((m, mI) => (
                            <Fragment key={mI}>
                              <div onClick={m.onClick} style={{ height: '36px', padding: '0 11px', borderRadius: '4px', background: m.bg, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <span style={{ fontSize: '12px', fontWeight: '600', color: m.ink }}>{m.name}</span>
                              </div>
                            </Fragment>
                          ))}
                        </div>
                        <div onClick={cycleKey} style={{ height: '42px', display: 'flex', alignItems: 'center', gap: '7px', padding: '0 10px', borderRadius: '5px', background: '#1C1A16', border: '1px solid #2C2923', cursor: 'pointer', boxSizing: 'border-box' }}>
                          <span style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '.1em', color: '#6E6A5E' }}>KEY</span>
                          <span style={{ fontSize: '12px', fontWeight: '600', color: '#E9E4D8' }}>{keyName}</span>
                          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '9px', color: '#8A6B2E' }}>{keySrc}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginLeft: 'auto' }}>
                          <div onClick={octDown} style={{ width: '42px', height: '42px', borderRadius: '5px', background: '#1C1A16', border: '1px solid #2C2923', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', color: '#C7C0B0', boxSizing: 'border-box' }}>−</div>
                          <span style={{ width: '46px', textAlign: 'center', fontFamily: "'Geist Mono',monospace", fontSize: '12px', color: '#E9E4D8' }}>{octLabel}</span>
                          <div onClick={octUp} style={{ width: '42px', height: '42px', borderRadius: '5px', background: '#1C1A16', border: '1px solid #2C2923', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', color: '#C7C0B0', boxSizing: 'border-box' }}>+</div>
                        </div>
                      </div>
                      <div style={{ flex: '1', minHeight: '0', display: 'flex', gap: '8px' }}>
                        {showBend ? (
                          <>
                            {wheels.map((wh, whI) => (
                              <Fragment key={whI}>
                                <div style={{ width: '52px', flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                  <div onPointerDown={wh.onDown} onPointerMove={wh.onMove} onPointerUp={wh.onUp} onPointerCancel={wh.onUp} style={{ flex: '1', width: '100%', position: 'relative', borderRadius: '6px', background: '#100F0D', border: '1px solid #221F1A', boxShadow: 'inset 0 1px 0 #00000080', cursor: 'ns-resize', overflow: 'hidden' }}>
                                    <span style={{ position: 'absolute', left: '8px', right: '8px', top: '50%', height: '1px', background: wh.mid }} />
                                    <span style={{ position: 'absolute', left: '4px', right: '4px', bottom: wh.pos, height: '22px', marginBottom: '-11px', borderRadius: '4px', background: '#1C1A16', border: '1px solid #3A362D', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                      <span style={{ width: '20px', height: '2px', borderRadius: '1px', background: wh.cap }} />
                                    </span>
                                  </div>
                                  <span style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '.08em', color: '#6E6A5E' }}>{wh.name}</span>
                                </div>
                              </Fragment>
                            ))}
                          </>
                        ) : null}
                        {isKeyboard ? (
                          <>
                            <div style={{ flex: '1', minWidth: '0', position: 'relative', display: 'flex', gap: '3px' }}>
                              {whites.map((k, kI) => (
                                <Fragment key={kI}>
                                  <div onPointerDown={k.onDown} onPointerUp={k.onUp} onPointerLeave={k.onUp} style={{ flex: '1', minWidth: '0', borderRadius: '0 0 6px 6px', background: k.bg, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: '6px', paddingBottom: '8px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                                    <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: k.ink }}>{k.label}</span>
                                    <span style={{ position: 'absolute', left: '0', right: '0', bottom: '0', height: '5px', background: k.band }} />
                                  </div>
                                </Fragment>
                              ))}
                              {blacks.map((k, kI) => (
                                <Fragment key={kI}>
                                  <div onPointerDown={k.onDown} onPointerUp={k.onUp} onPointerLeave={k.onUp} style={{ position: 'absolute', top: '0', left: k.left, width: k.w, height: '58%', borderRadius: '0 0 5px 5px', background: k.bg, border: '1px solid #3A362D', borderTop: 'none', boxSizing: 'border-box', cursor: 'pointer', overflow: 'hidden' }}>
                                    <span style={{ position: 'absolute', left: '0', right: '0', bottom: '0', height: '5px', background: k.band }} />
                                  </div>
                                </Fragment>
                              ))}
                            </div>
                          </>
                        ) : null}
                        {isScale ? (
                          <>
                            <div style={{ flex: '1', minWidth: '0', display: 'grid', gridTemplateColumns: `repeat(${gridCols},minmax(0,1fr))`, gridAutoRows: 'minmax(0,1fr)', gap: '6px' }}>
                              {cells.map((c, cI) => (
                                <Fragment key={cI}>
                                  <div onPointerDown={c.onDown} onPointerUp={c.onUp} onPointerLeave={c.onUp} style={{ borderRadius: '5px', background: c.bg, border: `1px solid ${c.edge}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: '0' }}>
                                    <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '12px', fontWeight: c.weight, color: c.ink }}>{c.label}</span>
                                  </div>
                                </Fragment>
                              ))}
                            </div>
                          </>
                        ) : null}
                        {isChords ? (
                          <>
                            <div style={{ flex: '1', minWidth: '0', display: 'grid', gridTemplateColumns: `repeat(${chordCols},minmax(0,1fr))`, gridAutoRows: 'minmax(0,1fr)', gap: '8px' }}>
                              {chords.map((c, cI) => (
                                <Fragment key={cI}>
                                  <div onPointerDown={c.onDown} onPointerUp={c.onUp} onPointerLeave={c.onUp} style={{ borderRadius: '6px', background: c.bg, border: `1px solid ${c.edge}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', minHeight: '0' }}>
                                    <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '12px', color: c.sub }}>{c.roman}</span>
                                    <span style={{ fontSize: '20px', fontWeight: '600', color: c.ink }}>{c.name}</span>
                                  </div>
                                </Fragment>
                              ))}
                            </div>
                          </>
                        ) : null}
                      </div>
                      {rotateHint ? (
                        <>
                          <span style={{ fontSize: '11px', color: '#6E6A5E' }}>Turn the phone sideways for 1.5 octaves, pitch bend and mod wheel.</span>
                        </>
                      ) : null}
                    </div>
                  </>
                ) : null}
                {isXY ? (
                  <>
                    <div style={{ flex: '1', minHeight: '0', display: 'flex', flexDirection: xyDir, gap: '12px' }}>
                      <div onPointerDown={xyDown} onPointerMove={xyMove} onPointerUp={xyUp} onPointerCancel={xyUp} style={{ flex: '1', minHeight: '0', minWidth: '0', position: 'relative', borderRadius: '6px', background: '#100F0D', border: '1px solid #221F1A', boxShadow: 'inset 0 1px 0 #00000080', overflow: 'hidden', cursor: 'crosshair', outline: lo, outlineOffset: '2px' }}>
                        <div style={{ position: 'absolute', inset: '0', backgroundImage: 'linear-gradient(#1E1C18 1px,transparent 1px),linear-gradient(90deg,#1E1C18 1px,transparent 1px)', backgroundSize: '25% 25%', backgroundPosition: '-1px -1px' }} />
                        <div style={{ position: 'absolute', left: '0', bottom: '0', width: xyLeft, height: xyFillH, background: track.color, opacity: '.08' }} />
                        <div style={{ position: 'absolute', top: '0', bottom: '0', left: xyLeft, width: '1px', background: '#5E4A22' }} />
                        <div style={{ position: 'absolute', left: '0', right: '0', top: xyTop, height: '1px', background: '#5E4A22' }} />
                        <div style={{ position: 'absolute', left: xyLeft, top: xyTop, width: '40px', height: '40px', margin: '-20px 0 0 -20px', borderRadius: '50%', border: '2px solid #D8A03D', background: '#241F17', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F0C060' }} />
                        </div>
                        <span style={{ position: 'absolute', right: '10px', bottom: '8px', fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: '#6E6A5E' }}>{xAxisLabel} →</span>
                        <span style={{ position: 'absolute', left: '10px', top: '8px', fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: '#6E6A5E' }}>↑ {yAxisLabel}</span>
                        {tiltOn ? (
                          <>
                            <span style={{ position: 'absolute', left: '50%', top: '12px', transform: 'translateX(-50%)', height: '24px', display: 'flex', alignItems: 'center', padding: '0 10px', borderRadius: '12px', background: '#241F17', border: '1px solid #6B5326', fontSize: '11px', fontWeight: '600', color: '#F0C060', whiteSpace: 'nowrap' }}>Tilt is moving the point</span>
                          </>
                        ) : null}
                      </div>
                      <div style={{ width: xyPanelW, flex: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #2C2923', borderRadius: '6px', overflow: 'hidden' }}>
                          {axes.map((a, aI) => (
                            <Fragment key={aI}>
                              <div style={{ height: '50px', display: 'flex', alignItems: 'center', gap: '12px', padding: '0 12px', background: '#141310', borderTop: `1px solid ${a.rule}`, outline: lo, outlineOffset: '-3px' }}>
                                <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '13px', fontWeight: '500', color: '#8A6B2E', width: '12px' }}>{a.axis}</span>
                                <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#E9E4D8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.param}</span>
                                  <span style={{ fontSize: '10px', color: '#6E6A5E', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.device}</span>
                                </div>
                                <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '13px', color: '#E9E4D8', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{a.value}</span>
                              </div>
                            </Fragment>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <div style={{ flex: '1', display: 'flex', gap: '2px', background: '#100F0D', border: '1px solid #221F1A', borderRadius: '6px', padding: '3px' }}>
                            {releaseModes.map((r, rI) => (
                              <Fragment key={rI}>
                                <div onClick={r.onClick} style={{ flex: '1', height: '38px', borderRadius: '4px', background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                  <span style={{ fontSize: '12px', fontWeight: '600', color: r.ink }}>{r.name}</span>
                                </div>
                              </Fragment>
                            ))}
                          </div>
                          {tiltAvail ? (
                            <>
                              <div onClick={toggleTilt} style={{ height: '46px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 14px', borderRadius: '6px', background: tilt.bg, border: `1px solid ${tilt.edge}`, cursor: 'pointer', boxSizing: 'border-box', outline: lo, outlineOffset: '2px' }}>
                                <span style={{ width: '10px', height: '14px', borderRadius: '2px', border: `1.5px solid ${tilt.ink}`, boxSizing: 'border-box', transform: 'rotate(-18deg)' }} />
                                <span style={{ fontSize: '12px', fontWeight: '600', color: tilt.ink }}>Tilt</span>
                              </div>
                            </>
                          ) : null}
                        </div>
                        <span style={{ fontSize: '11px', lineHeight: '1.5', color: '#8D8779', textWrap: 'pretty' }}>{xyNote}</span>
                        {writingAuto ? (
                          <>
                            <div style={{ height: '30px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 10px', borderRadius: '4px', background: '#1C1A16', border: '1px solid #2C2923', alignSelf: 'flex-start' }}>
                              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#C25B44' }} />
                              <span style={{ fontSize: '11px', fontWeight: '600', color: '#E9E4D8' }}>Writing automation · latch</span>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </>
                ) : null}
                {isMixer ? (
                  <>
                    <div style={{ flex: '1', minHeight: '0', display: 'flex', gap: '8px' }}>
                      <div style={{ flex: '1', minWidth: '0', display: 'flex', gap: '6px', overflowX: 'auto', overflowY: 'hidden' }}>
                        {strips.map((s, sI) => (
                          <Fragment key={sI}>
                            <div style={{ flex: stripFlex, minWidth: '0', display: 'flex', flexDirection: 'column', gap: '6px', padding: '8px 6px', borderRadius: '6px', background: s.cardBg, border: `1px solid ${s.cardEdge}`, boxSizing: 'border-box' }}>
                              <div onClick={s.onHead} style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '0', height: '28px', cursor: s.headCursor }}>
                                <span style={{ width: '3px', height: '16px', borderRadius: '2px', flex: 'none', background: s.color }} />
                                <span style={{ flex: '1', minWidth: '0', fontSize: '12px', fontWeight: '600', color: '#E9E4D8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</span>
                                <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '9px', color: '#6E6A5E' }}>{s.tag}</span>
                              </div>
                              <div style={{ height: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <div style={{ flex: '1', height: '4px', borderRadius: '2px', background: '#100F0D', position: 'relative' }}>
                                  <span style={{ position: 'absolute', top: '-3px', left: s.panPos, width: '3px', height: '10px', marginLeft: '-1.5px', borderRadius: '1px', background: '#C7C0B0' }} />
                                </div>
                                <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '9px', color: '#8D8779', width: '22px', textAlign: 'right' }}>{s.pan}</span>
                              </div>
                              <div style={{ flex: '1', minHeight: '0', display: 'flex', gap: '6px', justifyContent: 'center', position: 'relative' }}>
                                {s.held ? (
                                  <>
                                    <span style={{ position: 'absolute', left: '50%', top: '0', transform: 'translateX(-50%)', zIndex: '2', height: '18px', display: 'flex', alignItems: 'center', padding: '0 6px', borderRadius: '9px', background: '#26231E', border: '1px solid #3A362D', fontSize: '9px', fontWeight: '600', color: '#E9E4D8', whiteSpace: 'nowrap' }}>{s.held}</span>
                                  </>
                                ) : null}
                                <div style={{ display: 'flex', gap: '2px', padding: '4px 0' }}>
                                  <div style={{ width: '4px', height: '100%', borderRadius: '2px', background: '#100F0D', position: 'relative', overflow: 'hidden' }}>
                                    <span style={{ position: 'absolute', left: '0', right: '0', bottom: '0', height: s.meterL, background: '#58B368' }} />
                                  </div>
                                  <div style={{ width: '4px', height: '100%', borderRadius: '2px', background: '#100F0D', position: 'relative', overflow: 'hidden' }}>
                                    <span style={{ position: 'absolute', left: '0', right: '0', bottom: '0', height: s.meterR, background: '#58B368' }} />
                                  </div>
                                </div>
                                <div onPointerDown={s.onDown} onPointerMove={s.onMove} onPointerUp={s.onUp} onPointerCancel={s.onUp} style={{ width: '40px', position: 'relative', display: 'flex', justifyContent: 'center', cursor: 'ns-resize', padding: '10px 0', boxSizing: 'border-box' }}>
                                  <div style={{ width: '4px', height: '100%', borderRadius: '2px', background: '#100F0D', border: '1px solid #221F1A', boxSizing: 'border-box' }} />
                                  <div style={{ position: 'absolute', left: '0', right: '0', top: '10px', bottom: '10px' }}>
                                    <span style={{ position: 'absolute', left: '4px', right: '4px', bottom: s.faderPos, height: '20px', marginBottom: '-10px', borderRadius: '4px', background: '#1C1A16', border: `1px solid ${s.capEdge}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                      <span style={{ width: '18px', height: '2px', borderRadius: '1px', background: s.capLine }} />
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: s.dbInk, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{s.db}</span>
                              {s.hasButtons ? (
                                <>
                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                                    <div onClick={s.onMute} style={{ height: '34px', borderRadius: '4px', background: s.muteBg, border: `1px solid ${s.muteEdge}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px', fontWeight: '700', color: s.muteInk, boxSizing: 'border-box' }}>M</div>
                                    <div onClick={s.onSolo} style={{ height: '34px', borderRadius: '4px', background: s.soloBg, border: `1px solid ${s.soloEdge}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px', fontWeight: '700', color: s.soloInk, boxSizing: 'border-box' }}>S</div>
                                    <div onClick={s.onArm} style={{ gridColumn: 'span 2', height: '30px', borderRadius: '4px', background: s.armBg, border: `1px solid ${s.armEdge}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', cursor: 'pointer', boxSizing: 'border-box' }}>
                                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.armDot }} />
                                      <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.08em', color: s.armInk }}>ARM</span>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </Fragment>
                        ))}
                      </div>
                      <div style={{ width: '1px', background: '#221F1A' }} />
                      {masterStrip.map((s, sI) => (
                        <Fragment key={sI}>
                          <div style={{ width: masterW, flex: 'none', display: 'flex', flexDirection: 'column', gap: '6px', padding: '8px 6px', borderRadius: '6px', background: '#141310', border: '1px solid #2C2923', boxSizing: 'border-box' }}>
                            <div style={{ height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.12em', color: '#A39D8F' }}>MASTER</span>
                            </div>
                            <div style={{ flex: '1', minHeight: '0', display: 'flex', gap: '6px', justifyContent: 'center' }}>
                              <div style={{ display: 'flex', gap: '2px', padding: '4px 0' }}>
                                <div style={{ width: '5px', height: '100%', borderRadius: '2px', background: '#100F0D', position: 'relative', overflow: 'hidden' }}>
                                  <span style={{ position: 'absolute', left: '0', right: '0', bottom: '0', height: s.meterL, background: '#58B368' }} />
                                </div>
                                <div style={{ width: '5px', height: '100%', borderRadius: '2px', background: '#100F0D', position: 'relative', overflow: 'hidden' }}>
                                  <span style={{ position: 'absolute', left: '0', right: '0', bottom: '0', height: s.meterR, background: '#58B368' }} />
                                </div>
                              </div>
                              <div onPointerDown={s.onDown} onPointerMove={s.onMove} onPointerUp={s.onUp} onPointerCancel={s.onUp} style={{ width: '40px', position: 'relative', display: 'flex', justifyContent: 'center', cursor: 'ns-resize', padding: '10px 0', boxSizing: 'border-box' }}>
                                <div style={{ width: '4px', height: '100%', borderRadius: '2px', background: '#100F0D', border: '1px solid #221F1A', boxSizing: 'border-box' }} />
                                <div style={{ position: 'absolute', left: '0', right: '0', top: '10px', bottom: '10px' }}>
                                  <span style={{ position: 'absolute', left: '4px', right: '4px', bottom: s.faderPos, height: '20px', marginBottom: '-10px', borderRadius: '4px', background: '#1C1A16', border: `1px solid ${s.capEdge}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ width: '18px', height: '2px', borderRadius: '1px', background: s.capLine }} />
                                  </span>
                                </div>
                              </div>
                            </div>
                            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: '#C7C0B0', textAlign: 'center' }}>{s.db}</span>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </>
                ) : null}
                {isMacros ? (
                  <>
                    <div style={{ flex: '1', minHeight: '0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div onClick={cycleDevice} style={{ flex: '1', minWidth: '0', height: '44px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 12px', background: '#100F0D', border: '1px solid #2C2923', borderRadius: '5px', boxShadow: 'inset 0 1px 0 #00000080', cursor: 'pointer', boxSizing: 'border-box' }}>
                          <span style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '.1em', color: '#6E6A5E' }}>DEVICE</span>
                          <span style={{ flex: '1', minWidth: '0', fontSize: '13px', fontWeight: '600', color: '#E9E4D8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{devName}</span>
                          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: '#6E6A5E' }}>{devPos}</span>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#8D8779" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3.5 L5 6.5 L8 3.5" />
                          </svg>
                        </div>
                      </div>
                      <div style={{ flex: '1', minHeight: '0', display: 'grid', gridTemplateColumns: `repeat(${macroCols},minmax(0,1fr))`, gridAutoRows: 'minmax(0,1fr)', gap: '8px' }}>
                        {macros.map((m, mI) => (
                          <Fragment key={mI}>
                            <div onPointerDown={m.onDown} onPointerMove={m.onMove} onPointerUp={m.onUp} onPointerCancel={m.onUp} style={{ minHeight: '0', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', borderRadius: '6px', background: '#171613', border: `1px solid ${m.edge}`, cursor: 'ns-resize', outline: lo, outlineOffset: '2px' }}>
                              {m.auto ? (
                                <>
                                  <span style={{ position: 'absolute', top: '8px', right: '8px', width: '6px', height: '6px', borderRadius: '50%', background: '#D8A03D' }} />
                                </>
                              ) : null}
                              <svg width={knobSize} height={knobSize} viewBox="0 0 52 52">
                                <circle cx="26" cy="26" r="21" fill="none" stroke="#100F0D" strokeWidth="5" strokeDasharray="98.9 131.9" transform="rotate(135 26 26)" strokeLinecap="round" />
                                <circle cx="26" cy="26" r="21" fill="none" stroke={m.arc} strokeWidth="5" strokeDasharray={m.dash} transform="rotate(135 26 26)" strokeLinecap="round" />
                                <circle cx="26" cy="26" r="14" fill="#141311" stroke="#3A362D" />
                                <g transform={m.rot}>
                                  <line x1="26" y1="26" x2="26" y2="14" stroke="#F0C060" strokeWidth="2.4" strokeLinecap="round" />
                                </g>
                              </svg>
                              <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.08em', color: m.labelInk, maxWidth: '92%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</span>
                              <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '12px', color: m.valInk }}>{m.value}</span>
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
                {isScenes ? (
                  <>
                    <div style={{ flex: '1', minHeight: '0', overflow: 'auto' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: sceneTpl, gap: '6px', minWidth: 'min-content' }}>
                        <div style={{ height: '36px', display: 'flex', alignItems: 'center', paddingLeft: '4px', fontSize: '9px', fontWeight: '700', letterSpacing: '.12em', color: '#6E6A5E' }}>SCENE</div>
                        {sceneHeads.map((t, tI) => (
                          <Fragment key={tI}>
                            <div style={{ height: '36px', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 6px', minWidth: '0' }}>
                              <span style={{ width: '3px', height: '14px', borderRadius: '2px', background: t.color }} />
                              <span style={{ fontSize: '12px', fontWeight: '600', color: '#C7C0B0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</span>
                            </div>
                          </Fragment>
                        ))}
                        {sceneRows.map((r, rI) => (
                          <Fragment key={rI}>
                            <div onClick={r.onLaunch} style={{ height: sceneH, display: 'flex', alignItems: 'center', gap: '8px', padding: '0 10px', borderRadius: '5px', background: '#1C1A16', border: '1px solid #2C2923', cursor: 'pointer', boxSizing: 'border-box' }}>
                              <span style={{ width: '0', height: '0', borderLeft: '9px solid #A39D8F', borderTop: '6px solid transparent', borderBottom: '6px solid transparent' }} />
                              <span style={{ fontSize: '12px', fontWeight: '600', color: '#E9E4D8' }}>{r.name}</span>
                            </div>
                            {r.cells.map((c, cI) => (
                              <Fragment key={cI}>
                                <div onClick={c.onClick} style={{ height: sceneH, position: 'relative', borderRadius: '5px', background: c.bg, border: `1px ${c.borderStyle} ${c.edge}`, opacity: c.opacity, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '3px', padding: '0 10px', cursor: 'pointer', boxSizing: 'border-box', overflow: 'hidden', minWidth: '0' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '0' }}>
                                    {c.playing ? (
                                      <>
                                        <span style={{ width: '0', height: '0', flex: 'none', borderLeft: `8px solid ${c.ink}`, borderTop: '5px solid transparent', borderBottom: '5px solid transparent' }} />
                                      </>
                                    ) : null}
                                    <span style={{ fontSize: '12px', fontWeight: '600', color: c.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
                                  </div>
                                  <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '9px', color: c.ink, opacity: '.8' }}>{c.state}</span>
                                  {c.playing ? (
                                    <>
                                      <span style={{ position: 'absolute', left: '0', bottom: '0', height: '4px', width: c.progress, background: '#F2EDE1', opacity: '.75' }} />
                                    </>
                                  ) : null}
                                </div>
                              </Fragment>
                            ))}
                          </Fragment>
                        ))}
                        <div />
                        {sceneStops.map((t, tI) => (
                          <Fragment key={tI}>
                            <div onClick={t.onClick} style={{ height: '44px', borderRadius: '5px', background: '#1C1A16', border: '1px solid #2C2923', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', boxSizing: 'border-box' }}>
                              <span style={{ width: '9px', height: '9px', borderRadius: '1px', background: '#A39D8F' }} />
                              <span style={{ fontSize: '11px', fontWeight: '600', color: '#A39D8F' }}>Stop</span>
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              {bigT ? (
                <>
                  <div style={{ position: 'absolute', inset: '0', zIndex: '4', background: '#0B0A09', display: 'flex', flexDirection: 'column', gap: bigGap, padding: cPad, boxSizing: 'border-box', opacity: cOpacity, pointerEvents: cPE }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.14em', color: '#6E6A5E' }}>POSITION</span>
                        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: bigPosFont, fontWeight: '500', lineHeight: '1', color: posInk, fontVariantNumeric: 'tabular-nums' }}>{posLong}</span>
                      </div>
                      <div onClick={tapTempo} style={{ height: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', padding: '0 16px', borderRadius: '6px', background: '#1C1A16', border: '1px solid #2C2923', cursor: 'pointer', boxSizing: 'border-box' }}>
                        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '18px', fontWeight: '500', color: '#E9E4D8' }}>{bpm}</span>
                        <span style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '.1em', color: '#6E6A5E' }}>TAP TEMPO</span>
                      </div>
                    </div>
                    <div style={{ flex: '1', minHeight: '0', display: 'grid', gridTemplateColumns: `repeat(${bigCols},minmax(0,1fr))`, gridAutoRows: 'minmax(0,1fr)', gap: '8px' }}>
                      {bigBtns.map((b, bI) => (
                        <Fragment key={bI}>
                          <div onClick={b.onClick} style={{ minHeight: '0', borderRadius: '8px', background: b.bg, border: `1px solid ${b.edge}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', boxSizing: 'border-box' }}>
                            {b.tri ? (
                              <>
                                <span style={{ width: '0', height: '0', borderLeft: `26px solid ${b.ink}`, borderTop: '16px solid transparent', borderBottom: '16px solid transparent', marginLeft: '6px' }} />
                              </>
                            ) : null}
                            {b.sq ? (
                              <>
                                <span style={{ width: '26px', height: '26px', borderRadius: '3px', background: b.ink }} />
                              </>
                            ) : null}
                            {b.dot ? (
                              <>
                                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: b.ink }} />
                              </>
                            ) : null}
                            <span style={{ fontSize: '14px', fontWeight: '600', color: b.ink }}>{b.name}</span>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.14em', color: '#6E6A5E' }}>SECTIONS · tap to jump, hold to loop</span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '6px' }}>
                        {sections.map((s, sI) => (
                          <Fragment key={sI}>
                            <div onPointerDown={s.onDown} onPointerUp={s.onUp} style={{ height: '52px', borderRadius: '5px', background: s.bg, border: `1px solid ${s.edge}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', cursor: 'pointer', boxSizing: 'border-box' }}>
                              <span style={{ fontSize: '13px', fontWeight: '600', color: s.ink }}>{s.name}</span>
                              <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '9px', color: s.sub }}>{s.info}</span>
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
              {counting ? (
                <>
                  <div style={{ position: 'absolute', inset: '0', zIndex: '7', background: '#0B0A09', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: countFont, fontWeight: '500', lineHeight: '1', color: '#F0C060' }}>{countNum}</span>
                    <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '.14em', color: '#C25B44' }}>COUNT-IN · RECORDING STARTS ON 1</span>
                  </div>
                </>
              ) : null}
              {isDown ? (
                <>
                  <div style={{ position: 'absolute', inset: '0', zIndex: '8', background: '#0B0A09', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '18px', padding: '28px', boxSizing: 'border-box' }}>
                    <span style={{ fontSize: '22px', fontWeight: '600', color: '#F2EDE1' }}>Nota isn't responding</span>
                    <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #2C2923', borderRadius: '6px', overflow: 'hidden', maxWidth: '420px' }}>
                      <div style={{ padding: '12px 14px', background: '#141310', display: 'flex', gap: '12px' }}>
                        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: '#8A6B2E' }}>1</span>
                        <span style={{ fontSize: '12px', color: '#C7C0B0' }}>Nota is open on Studio Mac</span>
                      </div>
                      <div style={{ padding: '12px 14px', background: '#141310', borderTop: '1px solid #221F1A', display: 'flex', gap: '12px' }}>
                        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: '#8A6B2E' }}>2</span>
                        <span style={{ fontSize: '12px', color: '#C7C0B0' }}>Remote is on: the Remote button in the top bar is lit</span>
                      </div>
                      <div style={{ padding: '12px 14px', background: '#141310', borderTop: '1px solid #221F1A', display: 'flex', gap: '12px' }}>
                        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: '#8A6B2E' }}>3</span>
                        <span style={{ fontSize: '12px', lineHeight: '1.5', color: '#C7C0B0', textWrap: 'pretty' }}>The phone is on the same Wi-Fi. Guest networks often keep devices apart; share the phone's hotspot with the computer instead.</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#6E6A5E', opacity: connBlink }} />
                      <span style={{ fontSize: '12px', color: '#8D8779' }}>Retrying every few seconds</span>
                    </div>
                  </div>
                </>
              ) : null}
              {isExpired ? (
                <>
                  <div style={{ position: 'absolute', inset: '0', zIndex: '8', background: '#0B0A09', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '18px', padding: '28px', boxSizing: 'border-box' }}>
                    <span style={{ fontSize: '22px', fontWeight: '600', color: '#F2EDE1' }}>Scan a new code in Nota</span>
                    <span style={{ fontSize: '13px', lineHeight: '1.6', color: '#A39D8F', maxWidth: '420px', textWrap: 'pretty' }}>This phone was removed from trusted devices, or the code has expired. In Nota, click Remote to show a fresh QR, or type its four digits here.</span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,64px)', gap: '10px' }}>
                      <div style={{ height: '68px', borderRadius: '6px', background: '#100F0D', border: '1px solid #6B5326', boxShadow: 'inset 0 1px 0 #00000080', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ width: '2px', height: '28px', background: '#D8A03D' }} />
                      </div>
                      <div style={{ height: '68px', borderRadius: '6px', background: '#100F0D', border: '1px solid #221F1A', boxShadow: 'inset 0 1px 0 #00000080' }} />
                      <div style={{ height: '68px', borderRadius: '6px', background: '#100F0D', border: '1px solid #221F1A', boxShadow: 'inset 0 1px 0 #00000080' }} />
                      <div style={{ height: '68px', borderRadius: '6px', background: '#100F0D', border: '1px solid #221F1A', boxShadow: 'inset 0 1px 0 #00000080' }} />
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          {bottomTabs ? (
            <>
              <div style={{ flex: 'none', padding: '8px 12px 28px', borderTop: '1px solid #221F1A' }}>
                <div style={{ display: 'flex', gap: '2px', background: '#100F0D', border: '1px solid #221F1A', borderRadius: '8px', padding: '3px' }}>
                  {tabs.map((t, tI) => (
                    <Fragment key={tI}>
                      <div onClick={t.onClick} style={{ flex: '1', minWidth: '0', height: '44px', borderRadius: '5px', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <span style={{ fontSize: '11px', fontWeight: '600', color: t.ink }}>{t.name}</span>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </>
          ) : null}
          {tracksOpen ? (
            <>
              <div onClick={closeSheets} style={{ position: 'absolute', inset: '0', zIndex: '20', background: '#0A0908', opacity: '.6' }} />
              <div style={{ position: 'absolute', zIndex: '21', left: sheetL, right: sheetR, top: sheetT, bottom: sheetB, width: sheetW, background: '#141310', border: '1px solid #3A362D', borderRadius: '8px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '14px 16px 8px', fontSize: '10px', fontWeight: '700', letterSpacing: '.14em', color: '#6E6A5E' }}>PLAY ON TRACK</div>
                {trackRows.map((t, tI) => (
                  <Fragment key={tI}>
                    <div onClick={t.onClick} style={{ height: '52px', display: 'flex', alignItems: 'center', gap: '12px', padding: '0 16px', background: t.bg, borderTop: '1px solid #221F1A', cursor: 'pointer', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '0', top: '10px', bottom: '10px', width: '2px', background: t.edge }} />
                      <span style={{ width: '4px', height: '22px', borderRadius: '2px', background: t.color }} />
                      <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#E9E4D8' }}>{t.name}</span>
                        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '10px', color: '#6E6A5E' }}>{t.dev}</span>
                      </div>
                      {t.who ? (
                        <>
                          <span style={{ height: '20px', display: 'flex', alignItems: 'center', padding: '0 8px', borderRadius: '10px', background: '#26231E', fontSize: '10px', fontWeight: '600', color: '#C7C0B0' }}>{t.who}</span>
                        </>
                      ) : null}
                    </div>
                  </Fragment>
                ))}
                <div onClick={toggleFollow} style={{ minHeight: '56px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 16px', borderTop: '1px solid #2C2923', cursor: 'pointer', marginTop: 'auto' }}>
                  <span style={{ width: '18px', height: '10px', borderRadius: '5px', background: follow.track, position: 'relative', display: 'block', flex: 'none' }}>
                    <span style={{ position: 'absolute', top: '1.5px', left: follow.x, width: '7px', height: '7px', borderRadius: '50%', background: follow.knob, display: 'block' }} />
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    <span style={{ fontSize: '12px', color: '#E9E4D8' }}>Follow Nota's selection</span>
                    <span style={{ fontSize: '10px', color: '#6E6A5E' }}>Off: this phone keeps its own track</span>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          {menuOpen ? (
            <>
              <div onClick={closeSheets} style={{ position: 'absolute', inset: '0', zIndex: '20', background: '#0A0908', opacity: '.6' }} />
              <div style={{ position: 'absolute', zIndex: '21', right: '12px', top: menuT, width: '300px', maxWidth: 'calc(100% - 24px)', background: '#141310', border: '1px solid #3A362D', borderRadius: '8px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.14em', color: '#6E6A5E' }}>DEVICE NAME</span>
                  <div style={{ height: '40px', display: 'flex', alignItems: 'center', padding: '0 12px', background: '#100F0D', border: '1px solid #2C2923', borderRadius: '4px', boxShadow: 'inset 0 1px 0 #00000080', fontSize: '13px', color: '#E9E4D8' }}>Egor's iPhone</div>
                </div>
                <div style={{ padding: '4px 16px 14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.14em', color: '#6E6A5E' }}>THEME</span>
                  <div style={{ display: 'flex', gap: '2px', background: '#100F0D', border: '1px solid #221F1A', borderRadius: '6px', padding: '3px' }}>
                    {themes.map((t, tI) => (
                      <Fragment key={tI}>
                        <div onClick={t.onClick} style={{ flex: '1', height: '36px', borderRadius: '4px', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                          <span style={{ fontSize: '12px', fontWeight: '600', color: t.ink }}>{t.name}</span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
                {menuToggles.map((t, tI) => (
                  <Fragment key={tI}>
                    <div onClick={t.onClick} style={{ height: '48px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 16px', borderTop: '1px solid #221F1A', cursor: 'pointer' }}>
                      <span style={{ width: '18px', height: '10px', borderRadius: '5px', background: t.track, position: 'relative', display: 'block', flex: 'none' }}>
                        <span style={{ position: 'absolute', top: '1.5px', left: t.x, width: '7px', height: '7px', borderRadius: '50%', background: t.knob, display: 'block' }} />
                      </span>
                      <span style={{ fontSize: '12px', color: '#E9E4D8' }}>{t.name}</span>
                    </div>
                  </Fragment>
                ))}
                <div onClick={closeSheets} style={{ height: '52px', display: 'flex', alignItems: 'center', padding: '0 16px', borderTop: '1px solid #2C2923', fontSize: '13px', fontWeight: '600', color: '#E08A72', cursor: 'pointer' }}>Disconnect</div>
              </div>
            </>
          ) : null}
          {toast ? (
            <>
              <div style={{ position: 'absolute', left: '50%', bottom: toastB, transform: 'translateX(-50%)', zIndex: '30', maxWidth: '86%', padding: '10px 14px', borderRadius: '6px', background: '#1C1A16', border: '1px solid #3A362D', fontSize: '12px', lineHeight: '1.45', color: '#E9E4D8', textAlign: 'center' }}>{toast}</div>
            </>
          ) : null}
          {homeBar ? (
            <>
              <div style={{ position: 'absolute', left: '50%', bottom: '8px', width: '134px', height: '5px', marginLeft: '-67px', borderRadius: '3px', background: '#3A362D', zIndex: '31' }} />
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

export function Phone(props: Record<string, unknown>) {
  return <PhoneImpl {...props} />;
}
