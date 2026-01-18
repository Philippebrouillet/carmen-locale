import { s as subscribe } from "../../../../chunks/utils.js";
import { c as create_ssr_component, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { F as Footer } from "../../../../chunks/Footer.js";
import { s as shopStore } from "../../../../chunks/basketStore.js";
import { p as page } from "../../../../chunks/stores.js";
import { l as location } from "../../../../chunks/location.store.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let bookingTime;
  let workerFilterId;
  let serviceId;
  let selectedService;
  let selectedProfessional;
  let $location, $$unsubscribe_location;
  let $page, $$unsubscribe_page;
  let $shopStore, $$unsubscribe_shopStore;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_shopStore = subscribe(shopStore, (value) => $shopStore = value);
  bookingTime = $page.url.searchParams.get("bookingTime");
  workerFilterId = $page.url.searchParams.get("workerFilter");
  serviceId = $page.url.searchParams.get("serviceId");
  selectedService = $location.services.find((s) => s.id == serviceId);
  selectedProfessional = $location.workers.find((w) => w.id == workerFilterId);
  {
    shopStore.update((prev) => ({
      ...prev,
      selectedService,
      selectedProfessional,
      bookingTime
    }));
  }
  $$unsubscribe_location();
  $$unsubscribe_page();
  $$unsubscribe_shopStore();
  return `<div class="flex h-full flex-col gap-2 pb-16 md:pb-0 md:px-8 lg:px-12 xl:px-16 2xl:px-40"><div class="flex flex-col md:flex-row items-center md:items-start w-full"><div class="${"w-full flex-[11] " + escape($shopStore.selectedService ? "md:pr-10" : "", true)}">${slots.default ? slots.default({}) : ``}</div></div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Layout as default
};
