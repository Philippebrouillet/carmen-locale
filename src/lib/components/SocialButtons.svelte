<script>
  import { Button } from "$lib/components/ui/button";
  import InstagramIcon from "$lib/assets/icons/InstagramIcon.svelte";
  import ShopIcon from "$lib/assets/icons/ShopIcon.svelte";
  import TikTokIcon from "$lib/assets/icons/TikTokIcon.svelte";
  import * as m from "$lib/paraglide/messages.js";
</script>

<div class="flex flex-col gap-4 w-full py-4">
  <Button variant="outline" class="w-full gap-2"><InstagramIcon /> Instagram</Button>
  <Button variant="outline" class="w-full gap-2"><TikTokIcon /> TikTok</Button>
  <Button variant="outline" class="w-full gap-2"><ShopIcon />{m.onlineStore()}</Button>
</div>
