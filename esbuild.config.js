import build from "./config/esbuild.defaults.js"
import { plugins } from "./config/esbuild-plugins.js"
import ruby2js from "@ruby2js/esbuild-plugin"

// You can customize this as you wish, perhaps to add new esbuild plugins.
// See https://www.bridgetownrb.com/docs/frontend-assets#esbuild-setup

const esbuildOptions = {
  plugins: [
    ...plugins,
    // See docs on Ruby2JS options here: https://www.ruby2js.com/docs/options
    ruby2js({
      eslevel: 2022,
      autoexports: "default",
      filters: ["camelCase", "functions", "lit", "esm", "return"]
    })
  ],
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
