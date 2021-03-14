<script>
  import { highlight, languages } from "prismjs";
  import { onMount } from "svelte";

  export let borderColor = "black";
  export let code = "<em>test</em>";

  let outputElement = {};
  $: highlighted = highlight(code, languages.html, "html");

  const onInput = (e) => {
    code = e.target.innerText;
    outputElement.contentDocument.body.innerHTML = code;
  };

  onMount(() => {
    outputElement.addEventListener("load", () => {
      outputElement.contentDocument.body.innerHTML = code;
    });
  });
</script>

<div class="wrap" style="--border-color: {borderColor}">
  <pre
    class="language-html"><code class="language-html"
    on:input={onInput}
    contenteditable>{@html highlighted}
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
    flex-grow: 1;
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
