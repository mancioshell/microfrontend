import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/night.css";
import "reveal.js/plugin/highlight/monokai.css";

import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.js";
import Highlight from "reveal.js/plugin/highlight/highlight.js";

Reveal.initialize({
  transition: "convex",
  plugins: [Markdown, Highlight],
});

Reveal.on("ready", (event) => {
  Reveal.slide(
    sessionStorage.getItem("indexh"),
    sessionStorage.getItem("indexv")
  );
});

Reveal.on("slidechanged", (event) => {
  sessionStorage.setItem("indexh", event.indexh);
  sessionStorage.setItem("indexv", event.indexv);
});
