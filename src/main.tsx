import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./fonts.css";
import "./styles.css";
import { App } from "./App";
import { initAnalytics } from "./lib/analytics";

initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
