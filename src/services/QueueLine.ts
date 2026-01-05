import { clock } from "$src/lib/stores/clock.svelte";
import { sameDay } from "$src/lib/utils/isSameDay";
import type {
  FormatedProStatus,
  LocationInfoResp,
  TicketInfo,
  TicketInfoWithTime,
  WorkerInfo,
} from "$src/types/Location";
import type { QueueInfo, WorkerStatus } from "$src/types/QueueLine";
import { get } from "svelte/store";

export function computeQueue(
  locationStore: LocationInfoResp,
  now: Date,
  start: Date,
  durationS = 15 * 60,
): QueueInfo[] {
  if (locationStore == undefined) {
    return [];
  }
  const workers = locationStore.workers.filter((w) => w.status != "DISABLED");

  let workersQueues: QueueInfo[] = [];

  for (let w of workers) {
    const workerTickets = w.tickets || [];
    let doneTickets = workerTickets
      .map((t) => t.canceledTime || t.doneTime)
      .filter((d) => d != null)
      .map((d) => d.getTime());
    let waitingTickets = workerTickets.filter((t) => t.doneTime == null && t.canceledTime == null);
    let waitingSince = doneTickets.length > 0 ? new Date(Math.max(...doneTickets)) : null;

    let status = w.status || "STOPED";

    if (status !== "AVAILABLE" && status !== "UNAVAILABLE" && status !== "STOPED") {
      status = "STOPED";
    }
    const nextAvailable = nextAvailableTime(waitingTickets, now, start, durationS);
    const formatedStatus = getWorkerFormatedStatus(w, nextAvailable?.next);
    const workerQueue = {
      id: w.id,
      name: w.name,
      avatar: w.avatar,
      status: status,
      planning: [],
      tickets: waitingTickets,
      waitingSince,
      nextAvailable: nextAvailable,
      formatedStatus: formatedStatus,
    };
    workersQueues.push(workerQueue);
  }

  workersQueues.sort((a, b) => {
    if (a.status == "STOPED" && b.status == "STOPED") {
      return a.name.localeCompare(b.name);
    }
    if (a.status == "STOPED" && b.status != "STOPED") {
      return 1;
    }
    if (a.status != "STOPED" && b.status == "STOPED") {
      return -1;
    }
    if (
      a.nextAvailable != null &&
      a.nextAvailable?.next.getTime() == b.nextAvailable?.next.getTime()
    ) {
      if (a.waitingSince == b.waitingSince) {
        return 0;
        // return 0.5 - rand;
      }

      return (
        (a.waitingSince == null ? 0 : a.waitingSince.getTime()) -
        (b.waitingSince == null ? 0 : b.waitingSince.getTime())
      );
    }
    return (a.nextAvailable?.next?.getTime() ?? 0) - (b.nextAvailable?.next?.getTime() ?? 0);
  });

  return workersQueues;
}

export function nextAvailableTime(
  tickets: TicketInfo[],
  now: Date,
  start: Date,
  durationS = 15 * 60,
): { ticketBefore: number; next: Date; isFirstSlot: boolean; createHole: boolean } {
  // We only keep ticket that are not RDV for current day
  if (!sameDay(now, start)) {
    tickets = tickets.filter((t) => t.rdvTime && t.rdvTime.getTime() > start.getTime());
  }

  let withTime = ticketsWithTime(tickets, now);
  let ticketBefore = 0;
  let isFirstSlot = true;

  if (withTime.length == 0) {
    return { ticketBefore, next: start, isFirstSlot, createHole: now.getTime() < start.getTime() };
  }

  for (let t of withTime) {
    let ticketEnd = t.time.getTime() + t.durationS * 1000;
    if (ticketEnd < start.getTime()) {
      ticketBefore += 1;
      continue;
    }
    let duration = t.timeBefore;
    let slotStart = t.time.getTime() - t.timeBefore;
    let createHole = false;

    if (slotStart < start.getTime()) {
      duration -= start.getTime() - t.time.getTime();
      slotStart = start.getTime();
      createHole = true;
    }
    if (duration >= durationS * 1000) {
      const next = new Date(slotStart);
      return { ticketBefore, next, isFirstSlot, createHole };
    }
    if (duration > 0) {
      isFirstSlot = false;
    }
    ticketBefore += 1;
  }

  let last = withTime[tickets.length - 1];

  const next = new Date(last.time.getTime() + last.durationS * 1000);

  if (start.getTime() > next.getTime()) {
    return { ticketBefore, next: start, isFirstSlot, createHole: true };
  }
  // if next is after planning end return null

  return { ticketBefore, next: next, isFirstSlot, createHole: false };
}

function ticketsWithTime(tickets: TicketInfo[], now: Date): TicketInfoWithTime[] {
  let withTimes: TicketInfoWithTime[] = [];

  let currentTime = new Date(now);

  for (let t of tickets) {
    let time = new Date(currentTime);
    let timeBefore = 0;
    let duration = t.durationS * 1000;

    if (t.startedTime) {
      let started = new Date(t.startedTime);
      if (started.getTime() + duration < currentTime.getTime()) {
        time = new Date(t.startedTime);
      } else {
        let progress = currentTime.getTime() - new Date(t.startedTime).getTime();
        time = new Date(t.startedTime);
        currentTime.setTime(currentTime.getTime() + (duration - progress));
      }
    } else {
      if (t.rdvTime != null && currentTime < new Date(t.rdvTime)) {
        time = new Date(t.rdvTime);
        timeBefore = new Date(t.rdvTime).getTime() - currentTime.getTime();
      } else {
        time = new Date(currentTime);
      }
      currentTime.setTime(time.getTime() + duration);
    }
    withTimes.push({ id: t.id, durationS: t.durationS, time, timeBefore });
  }
  return withTimes;
}

const getWorkerFormatedStatus = (worker: WorkerInfo, nextAvailableTime: Date | null) => {
  let status: FormatedProStatus = "unavailable";
  const now = new Date(get(clock));
  const start = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes from now
  const minDuration = 5 * 60 * 1000; // 5 minutes in ms

  const endWorkerDate = new Date(now);
  endWorkerDate.setHours(worker.endHour, worker.endMinute, 0, 0);
  const startWorkerDate = new Date(now);
  startWorkerDate.setHours(worker.startHour, worker.startMinute, 0, 0);

  // Check if current time is within worker's working hours
  if (now >= endWorkerDate || now <= startWorkerDate) {
    return "unavailable";
  }

  if (nextAvailableTime != null && worker.status != "STOPED") {
    // Check if the next available time is within the minDuration from start
    if (Math.abs(nextAvailableTime.getTime() - start.getTime()) < minDuration) {
      status = "available";
    } else {
      status = "waiting";
    }
  } else {
    status = "unavailable";
  }
  return status;
};
