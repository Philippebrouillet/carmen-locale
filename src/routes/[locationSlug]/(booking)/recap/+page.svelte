<script>
  import { fade } from "svelte/transition";
  import Basket from "../components/Basket.svelte";
</script>

<div in:fade class="fixed left-0 right-0 z-[100]">
  <Basket />
</div>
