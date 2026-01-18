import { c as clock } from "./clock.svelte.js";
import { g as get_store_value } from "./utils.js";
function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}
function computeQueue(locationStore, now, start, durationS = 15 * 60) {
  if (locationStore == void 0) {
    return [];
  }
  const workers = locationStore.workers.filter((w) => w.status != "DISABLED");
  let workersQueues = [];
  for (let w of workers) {
    const workerTickets = w.tickets || [];
    let doneTickets = workerTickets.map((t) => t.canceledTime || t.doneTime).filter((d) => d != null).map((d) => d.getTime());
    let waitingTickets = workerTickets.filter((t) => t.doneTime == null && t.canceledTime == null);
    let waitingSince = doneTickets.length > 0 ? new Date(Math.max(...doneTickets)) : null;
    let status = w.status || "STOPED";
    if (status !== "AVAILABLE" && status !== "UNAVAILABLE" && status !== "STOPED") {
      status = "STOPED";
    }
    const endWorkerDate = new Date(now);
    endWorkerDate.setHours(w.endHour, w.endMinute, 0, 0);
    const startWorkerDate = new Date(now);
    startWorkerDate.setHours(w.startHour, w.startMinute, 0, 0);
    const nextAvailable = nextAvailableTime(waitingTickets, now, start, durationS);
    const isWorking = now <= endWorkerDate && now >= startWorkerDate && status === "AVAILABLE";
    const isFullSlotBooked = nextAvailable.next.getTime() >= endWorkerDate.getTime();
    const formatedStatus = getWorkerFormatedStatus(
      w,
      nextAvailable?.next,
      isWorking,
      isFullSlotBooked,
      nextAvailable.ticketBefore,
      nextAvailable.isLate
    );
    const workerQueue = {
      id: w.id,
      name: w.name,
      avatar: w.avatar,
      status,
      planning: [],
      tickets: waitingTickets,
      waitingSince,
      nextAvailable,
      formatedStatus,
      startWorkerDate,
      endWorkerDate,
      isWorking,
      isFullSlotBooked
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
    if (a.nextAvailable != null && a.nextAvailable?.next.getTime() == b.nextAvailable?.next.getTime()) {
      if (a.waitingSince == b.waitingSince) {
        return 0;
      }
      return (a.waitingSince == null ? 0 : a.waitingSince.getTime()) - (b.waitingSince == null ? 0 : b.waitingSince.getTime());
    }
    return (a.nextAvailable?.next?.getTime() ?? 0) - (b.nextAvailable?.next?.getTime() ?? 0);
  });
  workersQueues.sort((a, b) => {
    const statusOrder = { available: 0, waiting: 1, unavailable: 2 };
    const orderA = statusOrder[a.formatedStatus] ?? 3;
    const orderB = statusOrder[b.formatedStatus] ?? 3;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.name.localeCompare(b.name);
  });
  return workersQueues;
}
function nextAvailableTime(tickets, now, start, durationS = 15 * 60, worker) {
  if (!sameDay(now, start)) {
    tickets = tickets.filter((t) => t.rdvTime && t.rdvTime.getTime() > start.getTime());
  }
  const withTime = ticketsWithTime(tickets, now);
  let ticketBefore = 0;
  let isFirstSlot = true;
  if (withTime.length == 0) {
    return { ticketBefore, next: start, isFirstSlot, createHole: now.getTime() < start.getTime() };
  }
  for (let t of withTime) {
    const ticketEnd = t.time.getTime() + t.durationS * 1e3;
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
    if (duration >= durationS * 1e3) {
      const next2 = new Date(slotStart);
      return {
        ticketBefore,
        next: next2,
        isFirstSlot,
        createHole,
        isLate: true,
        timeLate: start.getTime() - next2.getTime()
      };
    }
    if (duration > 0) {
      isFirstSlot = false;
    }
    ticketBefore += 1;
  }
  const last = withTime[tickets.length - 1];
  const next = new Date(last.time.getTime() + last.durationS * 1e3);
  if (start.getTime() > next.getTime()) {
    return {
      ticketBefore,
      next: start,
      isFirstSlot,
      createHole: true,
      isLate: true,
      timeLate: start.getTime() - next.getTime()
    };
  }
  return { ticketBefore, next, isFirstSlot, createHole: false };
}
function ticketsWithTime(tickets, now) {
  let withTimes = [];
  let currentTime = new Date(now);
  for (let t of tickets) {
    let time = new Date(currentTime);
    let timeBefore = 0;
    let duration = t.durationS * 1e3;
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
const getWorkerFormatedStatus = (worker, nextAvailableTime2, isWorkingTime, isFullSlotBooked, ticketBefore, isLate) => {
  let status = "unavailable";
  const now = new Date(get_store_value(clock));
  const start = new Date(now.getTime() + 5 * 60 * 1e3);
  const minDuration = 5 * 60 * 1e3;
  if (isWorkingTime === false || worker.status === "STOPED" || nextAvailableTime2 == null || isFullSlotBooked) {
    status = "unavailable";
    return status;
  }
  if (isLate && ticketBefore > 0) {
    status = "waiting";
    return status;
  }
  if (Math.abs(nextAvailableTime2.getTime() - start.getTime()) < minDuration) {
    status = "available";
  } else {
    status = "waiting";
  }
  return status;
};
export {
  computeQueue as c,
  nextAvailableTime as n,
  sameDay as s
};
