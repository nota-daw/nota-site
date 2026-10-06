import { Fragment } from "react";

const mcp = [
  { who: "YOU", t: "Find a dusty drum loop that fits this track. Save a version before you change anything." },
  { who: "TOOL", t: "save_version(\"Before drum swap\")", r: "v16 saved" },
  { who: "TOOL", t: "search_samples(bpm: 120–128, key: \"A minor\", kind: loop)", r: "14 matches, relative major included" },
  { who: "TOOL", t: "find_similar(\"Dusty Break 03.wav\")", r: "6 similar sounds" },
  { who: "AI", t: "Dusty Break 03 is on a new track, matched to 124 BPM. v16 is there if you want to go back." },
].map((m) => ({
  ...m, r: m.r || null,
  whoInk: m.who === "YOU" ? "var(--ink3)" : m.who === "AI" ? "var(--brassInk)" : "var(--ink4)",
  font: m.who === "TOOL" ? "'Geist Mono',monospace" : "Geist, system-ui, sans-serif",
  size: m.who === "TOOL" ? "12px" : "14px",
  ink: m.who === "TOOL" ? "var(--ink2)" : "var(--ink)",
}));

export function Mcp() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: '48px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '460px' }}>
        <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', letterSpacing: '.14em', color: 'var(--ink4)' }}>MCP · AI ASSISTANTS</div>
        <h3 style={{ margin: '0', fontSize: '32px', fontWeight: '600', letterSpacing: '-.02em', lineHeight: '1.1' }}>Let an assistant do the busywork.</h3>
        <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.65', color: 'var(--ink3)', textWrap: 'pretty' }}>Nota speaks MCP, so an AI assistant can read and control nearly every device, search your samples by tempo and key, find similar sounds, separate stems, turn audio into MIDI and save a project version before it tries anything.</p>
      </div>
      <div style={{ background: 'var(--well)', border: '1px solid var(--line)', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', boxSizing: 'border-box', minWidth: '0' }}>
        {mcp.map((m, mI) => (
          <Fragment key={mI}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ width: '44px', flex: 'none', fontFamily: "'Geist Mono',monospace", fontSize: '10px', letterSpacing: '.08em', paddingTop: '2px', color: m.whoInk }}>{m.who}</span>
              <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontFamily: m.font, fontSize: m.size, lineHeight: '1.55', color: m.ink, overflowWrap: 'anywhere' }}>{m.t}</span>
                {m.r ? (
                  <>
                    <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: '11px', color: 'var(--ink4)' }}>→ {m.r}</span>
                  </>
                ) : null}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
