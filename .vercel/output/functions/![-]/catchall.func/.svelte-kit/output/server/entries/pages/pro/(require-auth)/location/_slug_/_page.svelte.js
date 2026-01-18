import { c as create_ssr_component, e as escape } from "../../../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<pre>${escape(JSON.stringify(data.locationInfo, null, 2))}</pre>`;
});
export {
  Page as default
};
