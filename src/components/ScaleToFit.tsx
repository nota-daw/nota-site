import { useEffect, useRef, useState, type ReactNode } from "react";

/** Lays a fixed-size mock out at its native size and scales it down to the available width. */
export function ScaleToFit({ width, height, children }: { width: number; height: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScale(Math.min(1, el.clientWidth / width));
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, [width]);
  return (
    <div ref={ref} style={{ width: "100%", maxWidth: width + "px", height: Math.round(height * scale) + "px", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: width + "px", height: height + "px", transformOrigin: "0 0", transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
