// Privacy-friendly visit counting with GoatCounter (no cookies, no personal data, so no
// consent banner). Page views carry the campaign from links like ?ref=hn or
// ?utm_source=telegram; clicks on downloads and outbound links are counted as events.
//
// Dashboard: https://<GOATCOUNTER_CODE>.goatcounter.com. Empty code = analytics off.

const GOATCOUNTER_CODE = "";

type GoatCounter = { count?: (v: { path: string; title?: string; event?: boolean }) => void };
const gc = () => (window as Window & { goatcounter?: GoatCounter }).goatcounter;

/** Event name for a link, or null when the click isn't worth counting. */
function eventFor(a: HTMLAnchorElement): string | null {
  let url: URL;
  try { url = new URL(a.href, location.href); } catch { return null; }
  if (url.origin === location.origin && url.pathname === location.pathname) return null; // in-page anchors

  // Release assets: drop the version so every release sums up, e.g. download/Nota-arm64.dmg.
  const asset = url.pathname.match(/\/releases\/download\/[^/]+\/(.+)$/);
  if (asset) return "download/" + decodeURIComponent(asset[1]).replace(/-\d+\.\d+\.\d+(?=[-.])/, "");
  if (/\/releases(\/latest)?\/?$/.test(url.pathname)) return "download/releases-page";

  const host = url.hostname.replace(/^www\./, "");
  if (host === "github.com") return "out/github" + url.pathname.replace(/^\/nota-daw\/nota/, "").replace(/\/$/, "");
  if (host.endsWith("github.io")) return "out/" + url.pathname.split("/")[1]; // e.g. out/nota-docs
  return "out/" + host;
}

function onClick(e: MouseEvent) {
  const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!a) return;
  const name = eventFor(a);
  if (name) gc()?.count?.({ path: name, title: a.textContent?.trim().slice(0, 80) || name, event: true });
}

export function initAnalytics() {
  if (!GOATCOUNTER_CODE || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`;
  document.head.appendChild(s);
  document.addEventListener("click", onClick, true);
}
