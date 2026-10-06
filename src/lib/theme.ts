import { useEffect, useState } from "react";

export type Theme = "dark" | "light";
const KEY = "nota-site-theme";

function initial(): Theme {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch { /* storage blocked */ }
  return "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initial);
  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);
  const choose = (t: Theme) => {
    setTheme(t);
    try { localStorage.setItem(KEY, t); } catch { /* storage blocked */ }
  };
  return [theme, choose] as const;
}
