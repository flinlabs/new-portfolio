import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

const proxy = { "/api": "http://127.0.0.1:8000", "/health": "http://127.0.0.1:8000" };

export default defineConfig({
  plugins: process.env.SINGLEFILE ? [react(), viteSingleFile()] : [react()],
  server: { port: 5173, proxy },
  preview: { port: 5173, proxy },
});