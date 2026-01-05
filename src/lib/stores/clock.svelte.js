import { readable } from "svelte/store";

export const clock = readable(new Date().getTime(), (set) => {
  set(new Date().getTime());

  const interval = setInterval(() => {
    set(new Date().getTime());
  }, 15000);

  return () => clearInterval(interval);
});
