import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  // renderers: ["@astrojs/renderer-react"],
  integrations: [react()],
  output: "server",
});