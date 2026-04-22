import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { StickyAudioPlayer } from "./components/StickyAudioPlayer";
import { AboutAtharvaPage } from "./pages/AboutAtharvaPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <StickyAudioPlayer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-atharva" element={<AboutAtharvaPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
