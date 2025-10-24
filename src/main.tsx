import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeFacebookPixel } from "@/hooks/useFacebookPixel"

// Initialize Facebook Pixel
initializeFacebookPixel();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
