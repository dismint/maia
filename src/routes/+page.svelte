<script lang="ts">
  import { onMount } from 'svelte';
  import { checkAuth, user, isAuthenticated } from '../stores/auth';
    import Login from './Login.svelte';
  let filename = $state(1);

  function increment() {
    filename += 1;
  }
  
  onMount(async () => {
    await checkAuth();
  });
</script>

<div class="homepage">
  <h1>Maia</h1>
  {#if $isAuthenticated && $user}
    <p>Welcome, {$user?.email}!</p>
  {:else}
    <p>Please log in to see super special message.</p>
    <Login />
  {/if}

  <input />
  <div class="tile-container">
    {#each Array(3) as _, outerIndex}
      <div class="outer">
        {#each Array(9) as _, innerIndex}
          <button class="tile-button">
            <div class="tile-background">
              <img
                src={`/tiles/${outerIndex === 0 ? "Man" : outerIndex === 1 ? "Pin" : "Sou"}${innerIndex + 1}.svg`}
                class="tile-image"
                alt="Arrow"
              />
            </div>
          </button>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @use "$lib/styles/variables" as *;

  button {
    width: 100%;
    height: 100%;
  }
  .homepage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
  }
  .outer {
    display: flex;
    flex-direction: row;
    gap: 1.25%;
  }
  h1 {
    font-weight: 500;
    line-height: 1.2;
    // margin: 0.2em 0;
    margin: 0;
    padding: 0;
    font-size: 3em;
    font-family: "Monaspace Argon", monaspace;
  }
  .tile-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    aspect-ratio: 1 / 0.43;
  }
  .tile-background {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tile-button {
    background-color: $primary;
    width: 10%;
    aspect-ratio: 1 / 1.36;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.1s linear;
  }
  .tile-button:hover {
    transform: scale(0.9);
  }
  .tile-image {
    width: 90%;
    height: 90%;
  }
</style>
