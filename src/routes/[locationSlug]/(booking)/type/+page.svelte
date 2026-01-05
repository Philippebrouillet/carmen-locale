<script lang="ts">
  import CalenderIcon from "$lib/assets/icons/CalenderIcon.svelte";
  import Lightning from "$lib/assets/icons/Lightning.svelte";
  import * as m from "$lib/paraglide/messages.js";
  import AppointmentTypeCard from "../components/AppointmentTypeCard.svelte";
  import BookingHeader from "../components/BookingHeader.svelte";
  import { page } from "$app/stores";

  let waitlist = new URL(`schedule`, $page.url);
  for(let [k,v] of $page.url.searchParams) {
    waitlist.searchParams.set(k,v)
  }
  waitlist.searchParams.set("mode","waitlist");
  
  let appointment = new URL(`schedule`, $page.url);
  for(let [k,v] of $page.url.searchParams) {
    appointment.searchParams.set(k,v)
  }
  appointment.searchParams.set("mode", "appointment");

</script>

<main class="w-full flex flex-col md:items-start gap-6">
  <BookingHeader text={m.appointmentType()} />

  <div class="flex flex-col lg:flex-row gap-4 md:mt-0 px-4">
    <AppointmentTypeCard
      index={0}
      icon={Lightning}
      title={m.withoutAppointment()}
      text1={m.withoutAppointmentDescription()}
      text2={m.withoutAppointmentDescription2()}
      badge={m.lastMinute()}
      href={waitlist.toString()}
    />
    <AppointmentTypeCard
      index={1}
      icon={CalenderIcon}
      title={m.withAppointment()}
      text1={m.withAppointmentDescription()}
      text2={m.withAppointmentDescription2()}
      badge={m.comfort()}
      href={appointment.toString()}
    />
  </div>
</main>
