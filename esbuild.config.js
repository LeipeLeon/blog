import build from "./config/esbuild.defaults.js"
import { plugins } from "./config/esbuild-plugins.js"

// You can customize this as you wish, perhaps to add new esbuild plugins.
// See https://www.bridgetownrb.com/docs/frontend-assets#esbuild-setup

const esbuildOptions = {
  plugins: [...plugins],
  globOptions: {
    excludeFilter: /\.(dsd|lit)\.css$/
  },
  entryPoints: [
    "frontend/styles/index.css",
    "frontend/styles/travels.css",
    "frontend/javascript/index.js",
    "frontend/javascript/travels.js",
  ],
  format: "esm"
}

build(esbuildOptions)
