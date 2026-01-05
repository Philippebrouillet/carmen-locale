import InstagramIcon from "$lib/assets/icons/InstagramIcon.svelte";
import TikTokIcon from "$lib/assets/icons/TikTokIcon.svelte";
import ShopIcon from "$lib/assets/icons/ShopIcon.svelte";

export let socials = [
  {
    name: "Instagram",
    icon: InstagramIcon,
    link: "https://www.instagram.com/cardenapp/",
  },
  {
    name: "TikTok",
    icon: TikTokIcon,
    link: "https://www.tiktok.com/@cardenapp",
  },
  {
    name: "Site web",
    icon: ShopIcon,
    link: "https://carden.app",
  },
];
