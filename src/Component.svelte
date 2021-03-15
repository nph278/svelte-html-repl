<script>
  import Misbehave from "misbehave";
  import { highlightElement } from "prismjs";
  import { onMount } from "svelte";

  export let borderColor = "black";
  export let startingCode = "<em>test</em>";
  export let startingJS = "";
  export let startingCSS = "";
  export let startingHTML = startingCode;
  export let tab = "html";
  let js = startingJS;
  let css = startingCSS;
  let html = startingHTML;
  let htmlElement = {};
  let jsElement = {};
  let cssElement = {};
  let outputElement = {};

  const setTab = (t) => {
    tab = t;
  };

  let setCode = (c) => {
    if (c !== undefined) {
      if (tab === "js") {
        js = c.prefix + c.suffix;
      } else if (tab === "css") {
        css = c.prefix + c.suffix;
      } else {
        html = c.prefix + c.suffix;
      }
    }
  };

  $: outputElement.contentDocument &&
    (() => {
      outputElement.contentDocument.querySelector("head").innerHTML = `
        ${"<"}style>
        html {
          background: white
        }
        ${css}
        ${"<"}/style>
        ${"<"}script defer>
          ${js}
        ${"<"}/script>
      `;
      outputElement.contentDocument.body.innerHTML = html;
    })();

  onMount(() => {
    outputElement.addEventListener("load", () => {
      outputElement.contentDocument.body.innerHTML = html;
    });

    new Misbehave(htmlElement, {
      oninput: () => highlightElement(htmlElement),
      store: setCode,
    });

    new Misbehave(jsElement, {
      oninput: () => highlightElement(jsElement),
      store: setCode,
    });

    new Misbehave(cssElement, {
      oninput: () => highlightElement(cssElement),
      store: setCode,
    });
  });
</script>

<div class="wrapwrap">
  <div class="tabs">
    <button on:click={() => setTab("html")}>HTML</button>
    <button on:click={() => setTab("js")}>JS</button>
    <button on:click={() => setTab("css")}>CSS</button>
  </div>
  <div class="wrap" style="--border-color: {borderColor}">
    <pre
      class="language-html"
      class:gone={tab !==
        "html"}><code class="language-html"
        contenteditable="true"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        bind:this={htmlElement}
      >
      {startingHTML}
      </code></pre>
    <pre
      class="language-css"
      class:gone={tab !==
        "css"}><code class="language-css"
      contenteditable="true"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      bind:this={cssElement}
    >
    {startingCSS}
    </code></pre>
    <pre
      class="language-js"
      class:gone={tab !==
        "js"}><code class="language-js"
      contenteditable="true"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      bind:this={jsElement}
    >
    {startingJS}
    </code></pre>
    <iframe class="output" title="REPL Output" bind:this={outputElement} />
  </div>
</div>

<style>
  button {
    background-color: rgb(82, 82, 82);
    color: rgb(197, 197, 197);
    border: none;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    height: 1.5em;
    transform: translate(0.1em, 0.3em);
    margin: 0 0.1em;
  }

  button:active {
    background-color: rgb(150, 150, 150);
  }

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

  .gone {
    display: none;
  }
</style>
