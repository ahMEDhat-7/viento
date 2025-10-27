import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeFacebookPixel } from "@/hooks/useFacebookPixel"
import { initializeTikTokPixel } from "@/hooks/useTikTokPixel"

// Initialize tracking pixels
initializeFacebookPixel();
initializeTikTokPixel();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
