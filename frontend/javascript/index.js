import "index.css"
import "syntax-highlighting.css"
import * as Turbo from "@hotwired/turbo"
import "bridgetown-lit-renderer"

// Example Shoelace components. Mix 'n' match however you like!
import "@shoelace-style/shoelace/dist/components/button/button.js"
import "@shoelace-style/shoelace/dist/components/icon/icon.js"
import "@shoelace-style/shoelace/dist/components/spinner/spinner.js"

// Use the public icons folder:
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js"
setBasePath("/shoelace-assets")

// Uncomment the line below to add transition animations when Turbo navigates.
// We recommend adding <meta name="turbo-cache-control" content="no-preview" />
// to your HTML head if you turn on transitions. Use data-turbo-transition="false"
// on your <main> element for pages where you don't want any transition animation.
//
// import "./turbo_transitions.js"

// Import all JavaScript & CSS files from src/_components
// To opt into `.global.css` & `.lit.css` nomenclature, change the `css` extension below to `global.css`.
// Read https://edge.bridgetownrb.com/docs/components/lit#sidecar-css-files for documentation.
import components from "bridgetownComponents/**/*.{js,jsx,js.rb,css}"

console.info("Bridgetown is loaded!")
