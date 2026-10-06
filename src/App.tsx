import { useRelease } from "./lib/release";
import { useTheme } from "./lib/theme";
import { Nav } from "./sections/Nav";
import { Hero } from "./sections/Hero";
import { Features } from "./sections/Features";
import { Compare } from "./sections/Compare";
import { Download } from "./sections/Download";
import { Footer } from "./sections/Footer";

export function App() {
  const [theme, setTheme] = useTheme();
  const release = useRelease();
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--ink)" }}>
      <Nav theme={theme} onTheme={setTheme} />
      <Hero release={release} />
      <Features />
      <Compare />
      <Download release={release} />
      <Footer />
    </div>
  );
}
