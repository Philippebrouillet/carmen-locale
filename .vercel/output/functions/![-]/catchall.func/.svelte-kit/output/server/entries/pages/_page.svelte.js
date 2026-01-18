import { c as create_ssr_component, a as add_attribute, v as validate_component } from "../../chunks/ssr.js";
import { B as Button } from "../../chunks/button.js";
const cardenSvg = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%3e%3crect%20x='0.2437'%20y='0.2437'%20width='18.7557'%20height='18.7557'%20rx='4.1429'%20fill='%23150B3D'%20stroke='white'%20stroke-width='0.4874'%20/%3e%3crect%20width='2.41876'%20height='7.1959'%20rx='1.20938'%20transform='matrix(0.654753%200.755843%20-0.73635%200.676601%208.71973%203.42102)'%20fill='%230073FF'%20/%3e%3crect%20x='7.70166'%20y='9.37268'%20width='2.21142'%20height='4.01711'%20rx='1.10571'%20transform='rotate(48.2616%207.70166%209.37268)'%20fill='white'%20/%3e%3crect%20width='2.22678'%20height='8.03791'%20rx='1.11339'%20transform='matrix(0.654753%200.755843%20-0.73635%200.676601%2014.0435%208.5174)'%20fill='%23CF95FB'%20/%3e%3c/svg%3e";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col items-center justify-center min-h-screen py-2"><img width="100"${add_attribute("src", cardenSvg, 0)} alt="carden"> <h1 class="text-3xl" data-svelte-h="svelte-1iy8q48">Welcome to Carden</h1> <div class="flex flex-col gap-2 items-center p-4">${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "flex-1 w-full text-lg",
      variant: "link",
      href: "/24"
    },
    {},
    {
      default: () => {
        return `Demo`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "flex-1 w-full text-lg",
      variant: "link",
      href: "/barber-avenue"
    },
    {},
    {
      default: () => {
        return `Barber avenue`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "flex-1 w-full text-lg",
      variant: "link",
      href: "/barber-district"
    },
    {},
    {
      default: () => {
        return `Barber district`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "flex-1 w-full text-lg ",
      variant: "link",
      href: "/pro"
    },
    {},
    {
      default: () => {
        return `Admin`;
      }
    }
  )}</div></div>`;
});
export {
  Page as default
};
