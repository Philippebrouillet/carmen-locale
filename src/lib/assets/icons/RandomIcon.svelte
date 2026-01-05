<script lang="ts">
  import type { LocationTheme } from "$src/types/Location";

  export let theme: LocationTheme = "NEUTRAL";
</script>

{#if theme === "NEUTRAL"}
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M35 57C41.6274 57 47 51.6274 47 45C47 38.3726 41.6274 33 35 33C28.3726 33 23 38.3726 23 45C23 51.6274 28.3726 57 35 57Z"
      fill="#DFE5E7"
    />
    <path d="M15 85C15 65 55 65 55 85H15Z" fill="#DFE5E7" />
    <path
      d="M65 57C71.6274 57 77 51.6274 77 45C77 38.3726 71.6274 33 65 33C58.3726 33 53 38.3726 53 45C53 51.6274 58.3726 57 65 57Z"
      fill="#DFE5E7"
    />
    <path d="M45 85C45 65 85 65 85 85H45Z" fill="#DFE5E7" />
    <path
      d="M50 54C57.732 54 64 47.732 64 40C64 32.268 57.732 26 50 26C42.268 26 36 32.268 36 40C36 47.732 42.268 54 50 54Z"
      fill="#616163"
    />
    <path d="M25 85C25 60 75 60 75 85H25Z" fill="#616163" />
  </svg>
{/if}

{#if theme === "CARDEN"}
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M35 57C41.6274 57 47 51.6274 47 45C47 38.3726 41.6274 33 35 33C28.3726 33 23 38.3726 23 45C23 51.6274 28.3726 57 35 57Z"
      fill="#C7E0FF"
    />
    <path d="M15 85C15 65 55 65 55 85H15Z" fill="#C7E0FF" />
    <path
      d="M65 57C71.6274 57 77 51.6274 77 45C77 38.3726 71.6274 33 65 33C58.3726 33 53 38.3726 53 45C53 51.6274 58.3726 57 65 57Z"
      fill="#C7E0FF"
    />
    <path d="M45 85C45 65 85 65 85 85H45Z" fill="#C7E0FF" />
    <path
      d="M50 54C57.732 54 64 47.732 64 40C64 32.268 57.732 26 50 26C42.268 26 36 32.268 36 40C36 47.732 42.268 54 50 54Z"
      fill="#0073FF"
    />
    <path d="M25 85C25 60 75 60 75 85H25Z" fill="#0073FF" />
  </svg>
{/if}

{#if theme === "PINK"}
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M35 57C41.6274 57 47 51.6274 47 45C47 38.3726 41.6274 33 35 33C28.3726 33 23 38.3726 23 45C23 51.6274 28.3726 57 35 57Z"
      fill="#E5CEF7"
    />
    <path d="M15 85C15 65 55 65 55 85H15Z" fill="#E5CEF7" />
    <path
      d="M65 57C71.6274 57 77 51.6274 77 45C77 38.3726 71.6274 33 65 33C58.3726 33 53 38.3726 53 45C53 51.6274 58.3726 57 65 57Z"
      fill="#E5CEF7"
    />
    <path d="M45 85C45 65 85 65 85 85H45Z" fill="#E5CEF7" />
    <path
      d="M50 54C57.732 54 64 47.732 64 40C64 32.268 57.732 26 50 26C42.268 26 36 32.268 36 40C36 47.732 42.268 54 50 54Z"
      fill="#CF95FB"
    />
    <path d="M25 85C25 60 75 60 75 85H25Z" fill="#CF95FB" />
  </svg>
{/if}
