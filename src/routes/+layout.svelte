<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import "../app.scss";

  // fonts
  import "@fontsource-variable/source-serif-4";
  import "@fontsource/monaspace-argon/200.css";
  import "@fontsource/monaspace-argon/300.css";
  import "@fontsource/monaspace-argon/400.css";
  import "@fontsource/monaspace-argon/500.css";
  import "@fontsource/monaspace-argon/600.css";
  import "@fontsource/monaspace-argon/700.css";
  import "@fontsource/monaspace-argon/800.css";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
