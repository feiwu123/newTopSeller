// Default backend: prefer same-origin when frontend is served by Flask.
// Override in browser console: window.API_BASE = "http://..."; then refresh.
const fallbackOrigin =
  typeof window !== "undefined" && window.location && window.location.origin && window.location.origin !== "null"
    ? window.location.origin
    : "http://127.0.0.1:5051";

export const API_BASE =
  typeof window !== "undefined" && window.API_BASE != null ? window.API_BASE : fallbackOrigin;
