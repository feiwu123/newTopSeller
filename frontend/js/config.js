// Default backend for local开发: Flask 代理跑在 127.0.0.1:5051
// 如需改动，可在浏览器 console: window.API_BASE = 'http://...'; 然后刷新。
export const API_BASE =
  (typeof window !== "undefined" && window.API_BASE != null ? window.API_BASE : "http://127.0.0.1:5051");
