<script>
  export let value = 0;
  export let disabled = false;

  let display = Math.floor(value * 100);
</script>

<div class="progressbar-wrapper">
  {#if !disabled}
    <div class="progressbar" class:full={value == 1} style="whidth:{display}%">{display}%</div>
  {/if}
</div>

<style>
  :root {
    --progress: rgba(0, 184, 148, 0.5);
    --full: #e17055;
  }

  .progressbar-wrapper {
    background-color: #dfe6e9;
    color: white;
    border-radius: 5px;
    width: 100%;
  }

  .progressbar {
    background-color: var(--progress);
    color: white;
    padding: 0.3rem;
    text-align: right;
    border-radius: 5px;
  }

  .progressbar {
    background-color: var(--progress);
  }

  .progressbar.full {
    background-color: var(--full);
  }
</style>
