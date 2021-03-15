import Component from "./Component.svelte";
import "prismjs-tomorrow-theme/prism-tomorrow.css";
import "./dev.css";

const app = new Component({
  target: document.getElementById("svelte"),
});

export default app;
