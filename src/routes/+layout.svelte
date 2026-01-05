<script lang="ts">
  import { ParaglideJS } from "@inlang/paraglide-sveltekit";
  import { i18n } from "$lib/i18n";
  import { ModeWatcher } from "mode-watcher";
  import "../app.css";
  import { languageTag } from "$lib/paraglide/runtime.js";
</script>

<ParaglideJS {i18n}>
  <ModeWatcher />
  <div class="w-full" dir={languageTag() === "ar" ? "rtl" : "ltr"}>
    <slot />
  </div>
</ParaglideJS>
