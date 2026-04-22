import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./app-layout.css";
import "./visuals/visuals.css";
import "./editorial.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
