<script>
  import Misbehave from "misbehave";
  import { highlightElement, languages } from "prismjs";
  import { onMount } from "svelte";

  export let borderColor = "black";
  export let startingCode = "<em>test</em>";

  let inputElement = {};
  let outputElement = {};
  let code = startingCode;
  $: outputElement.contentDocument &&
    (() => {
      outputElement.contentDocument.querySelector("head").innerHTML +=
        "<" + "style>html {background: white}<" + "/style>";
      outputElement.contentDocument.body.innerHTML = code;
    })();

  let setCode = (c) => {
    if (c !== undefined) {
      code = c.prefix + c.suffix;
    }
  };

  onMount(() => {
    outputElement.addEventListener("load", () => {
      outputElement.contentDocument.body.innerHTML = code;
    });
    new Misbehave(inputElement, {
      oninput: () => highlightElement(inputElement),
      store: setCode,
    });
  });
</script>

<div class="wrap" style="--border-color: {borderColor}">
  <pre
    class="language-html"><code class="language-html"
  contenteditable="true"
  autocorrect="off"
  autocapitalize="off"
  spellcheck="false"
   bind:this={inputElement}
  >
    {startingCode}
    </code></pre>
  <iframe class="output" title="REPL Output" bind:this={outputElement} />
</div>

<style>
  .wrap {
    display: flex;
    border: var(--border-color) 2px solid;
  }

  pre {
    height: inherit;
    min-height: 5em;
    margin: 0;
    width: 30em;
    display: flex;
  }

  code {
    width: 100%;
    height: 100%;
    flex-grow: 1;
  }

  .output {
    flex-grow: 1;
    border: none;
  }
</style>
