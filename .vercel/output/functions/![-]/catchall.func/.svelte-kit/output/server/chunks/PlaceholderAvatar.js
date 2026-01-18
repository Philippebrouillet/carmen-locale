import { c as create_ssr_component, e as escape } from "./ssr.js";
const PlaceholderAvatar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  let { shape = "circle" } = $$props;
  const getInitials = (name2) => {
    const trimmedName = name2.trim();
    const firstLetter = trimmedName.charAt(0).toUpperCase();
    const secondLetter = trimmedName.charAt(1).toLowerCase();
    return firstLetter + secondLetter;
  };
  const initials = getInitials(name);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.shape === void 0 && $$bindings.shape && shape !== void 0) $$bindings.shape(shape);
  return `${shape == "circle" ? `<div class="flex-1 font-medium md:font-semibold bg-gradient-to-b from-white via-[#FB9400] to-[#23BBAC] rounded-full min-w-16 w-16 md:min-w-28 aspect-square p-1 text-2xl md:text-4xl"><div class="${"flex items-center justify-center text-white w-full bg-[#CF95FB] " + escape(
    shape == "circle" ? "rounded-full aspect-square" : "w-full h-full",
    true
  )}">${escape(initials)}</div></div>` : `${shape == "square" ? `<div class="flex-1 font-medium md:font-semibold bg-gradient-to-b from-white via-[#FB9400] to-[#23BBAC] 'w-full h-full p-2 min-h-28 rounded-sm text-2xl md:text-4xl"><div class="flex items-center justify-center text-white bg-[#CF95FB] w-full h-full">${escape(initials)}</div></div>` : `${shape == "mini-square" ? `<div class="flex-1 font-medium md:font-semibold bg-gradient-to-b from-white via-[#FB9400] to-[#23BBAC] w-full h-full p-1 aspect-square rounded-sm text-lg"><div class="flex items-center justify-center text-white w-full bg-[#CF95FB] h-full">${escape(initials)}</div></div>` : `${shape == "mini-circle" ? `<div class="flex-1 min-w-16 w-16 max-w-16 font-medium md:font-semibold bg-gradient-to-b from-white via-[#FB9400] to-[#23BBAC] p-1 aspect-square rounded-full text-lg"><div class="flex items-center justify-center text-white w-full bg-[#CF95FB] rounded-full h-full">${escape(initials)}</div></div>` : ``}`}`}`}`;
});
export {
  PlaceholderAvatar as P
};
