import type { LocationPaymentMode, ServiceInfo, WorkerInfo } from "$src/types/Location";
import { writable } from "@macfja/svelte-persistent-store";

interface ShopStore {
  selectedLocation: string | null;
  selectedProfessional: WorkerInfo | null;
  selectedService: ServiceInfo | null;
  bookingType: "waitlist" | "appointment";
  bookingDelay: string;
  bookingDate: Date | null;
  bookingTime: Date | null;
  tipPercent: number | null;
  cardenFee: number | null;
  totalBill: number;
}

export const initialStore: ShopStore = {
  selectedLocation: null,
  selectedProfessional: null,
  selectedService: null,
  bookingType: "waitlist",
  bookingDelay: "10",
  bookingDate: null,
  bookingTime: null,
  tipPercent: null,
  cardenFee: 150,
  totalBill: 0,
};

export const shopStore = writable<ShopStore>("shopStore", structuredClone(initialStore));

export const resetShopStore = () => {
  shopStore.set(initialStore);
};

export const setBarber = (barber: WorkerInfo | null) => {
  shopStore.update((store) => {
    store.selectedProfessional = barber;
    return store;
  });
};

export const setService = (service: ServiceInfo | null) => {
  shopStore.update((store) => {
    store.selectedService = service;
    if (service) {
      store.totalBill = service.price;
    } else {
      store.totalBill = 0;
    }

    return store;
  });
};

export const setBookingType = (bookingType: "waitlist" | "appointment") => {
  shopStore.update((store) => {
    store.bookingType = bookingType;
    return store;
  });
};

export const setBookingDelay = (delay: number) => {
  shopStore.update((store) => {
    store.bookingDelay = delay.toString();
    return store;
  });
};

export const setBookingDate = (date: Date | null) => {
  shopStore.update((store) => {
    store.bookingDate = date;
    return store;
  });
};

export const setBookingTime = (time: Date | null) => {
  shopStore.update((store) => {
    store.bookingTime = time;
    return store;
  });
};

export const setTipPercent = (tipPercent: number | null) => {
  shopStore.update((store) => {
    store.tipPercent = tipPercent;
    if (tipPercent !== null && store.selectedService) {
      let totalBill =
        store.selectedService.price + (store.selectedService.price * tipPercent) / 100;
      store.totalBill = parseFloat(totalBill.toFixed(2));
    }
    return store;
  });
};
