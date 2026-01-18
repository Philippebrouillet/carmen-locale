import { r as readable } from "./index2.js";
const clock = readable((/* @__PURE__ */ new Date()).getTime(), (set) => {
  set((/* @__PURE__ */ new Date()).getTime());
  const interval = setInterval(() => {
    set((/* @__PURE__ */ new Date()).getTime());
  }, 15e3);
  return () => clearInterval(interval);
});
export {
  clock as c
};
