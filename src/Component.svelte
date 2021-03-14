<script>
  import { highlight, languages } from "prismjs";

  export let borderColor = "black";
  export let code = "<em>test</em>";
  $: highlighted = highlight(code, languages.html, "html");

  const onInput = (e) => {
    code = e.target.innerText;
  };
</script>

<div class="wrap" style="--border-color: {borderColor}">
  <pre
    on:input={onInput}
    contenteditable
    class="language-html"><code class="language-html">{@html highlighted}
    </code></pre>
  <div class="output">
    {@html code}
  </div>
</div>

<style>
  .wrap {
    display: flex;
    border: var(--border-color) 2px solid;
  }

  pre {
    height: 5em;
    margin: 0;
    flex-grow: 1;
  }

  .output {
    margin: 8px;
    flex-grow: 1;
  }
</style>
