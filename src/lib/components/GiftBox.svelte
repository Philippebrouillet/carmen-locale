<script>
  import AppStore from "$lib/assets/icons/AppStore.svelte";

  import GooglePlay from "$lib/assets/icons/GooglePlay.svelte";
  import * as m from "$lib/paraglide/messages.js";
</script>

<div
  class="relative w-full p-6 md:p-8 bg-accent text-accent-foreground rounded-3xl flex flex-col gap-4 items-center"
>
  <img class="-mt-[3rem] w-12 h-12" src="/present.png" alt="present" />
  <p class="font-semibold text-lg">
    {m.recoverPoints()}
  </p>
  <div class="w-full flex gap-2">
    <button
      class="flex gap-1 bg-white/15 items-center justify-center rounded-lg p-2 w-full font-semibold"
    >
      <GooglePlay />
      Google Play
    </button>
    <button
      class="flex gap-1 bg-white/15 items-center justify-center rounded-lg p-2 w-full font-semibold"
    >
      <AppStore />
      App Store
    </button>
  </div>
</div>
