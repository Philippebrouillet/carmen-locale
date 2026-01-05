import CalenderIcon from "$lib/assets/icons/CalenderIcon.svelte";
import Lightning from "$lib/assets/icons/Lightning.svelte";
import * as m from "$lib/paraglide/messages.js";

export interface BookingType {
  icon: any;
  title: string;
  text1: string;
  text2: string;
  badge: string;
  mode: "waitlist" | "appointment";
}

export let bookingTypes: BookingType[] = [
  {
    icon: Lightning,
    title: m.withoutAppointment(),
    text1:
      "Venez aujourd’hui en prenant la prochaine place disponible dans la file d’attente du professionnel de votre choix.",
    text2:
      "Votre horaire est donné à titre indicatif pour améliorer votre confort, il est succeptible d’être modifié.",
    badge: "DERNIÈRE MINUTE",
    mode: "waitlist",
  },
  {
    icon: CalenderIcon,
    title: m.withAppointment(),
    text1: "Choisissez le jour et l’horaire qui vous convient le mieux pour votre rendez-vous. ",
    text2: "Le professionnel fera son maximum pour respecter votre horaire de passage.",
    badge: "CONFORT",
    mode: "appointment",
  },
];
