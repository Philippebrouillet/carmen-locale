import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, o as onDestroy, a as add_attribute } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import { l as location } from "../../../chunks/location.store.js";
import { m as mainBackgroundColorByTheme } from "../../../chunks/Location.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $location, $$unsubscribe_location;
  let $$unsubscribe_page;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { data } = $$props;
  console.log("layout data", data);
  location.set(data);
  onDestroy(() => {
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$unsubscribe_location();
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-134wda8_START --><script src="https://js.stripe.com/v3" async data-svelte-h="svelte-jifc8h"><\/script><!-- HEAD_svelte-134wda8_END -->`, ""} <main${add_attribute("class", mainBackgroundColorByTheme[$location.location.theme], 0)}>${slots.default ? slots.default({}) : ``}</main>`;
});
export {
  Layout as default
};
