<script>
  import { page } from "$app/stores";
  import { languageTag } from "$lib/paraglide/runtime.js";
</script>

<a
  href="/select-language?redirect={$page.url.pathname}"
  class="z-10 hover:scale-[1.04] transition-all duration-300 ease-in-out uppercase border bg-white/20 border-white/30 backdrop-blur-sm rounded-2xl text-white py-2 px-2.5 text-sm font-normal"
>
  {languageTag().split("-")[0]}
</a>
