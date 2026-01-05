import { CalendarDate } from "@internationalized/date";

import { sameDay } from "./isSameDay";
import { convertOrdinalToDate } from "../formater";
import type { LocationInfoResp, Planning } from "$src/types/Location";

export function computeAppointmentTimes(
  now: Date,
  selectedDay: CalendarDate,
  plannings: Planning[],
) {
  if (sameDay(now, selectedDay.toDate("UTC"))) {
    let nowHour = new Date(now.getTime());
    nowHour.setHours(nowHour.getHours());
    nowHour.setMilliseconds(0);
    nowHour.setSeconds(0);
    nowHour.setMinutes(0);

    return [
      new Date(nowHour.getTime() + 1 * 3600 * 1000),
      new Date(nowHour.getTime() + 2 * 3600 * 1000),
      new Date(nowHour.getTime() + 3 * 3600 * 1000),
      new Date(nowHour.getTime() + 4 * 3600 * 1000),
      new Date(nowHour.getTime() + 5 * 3600 * 1000),
      new Date(nowHour.getTime() + 6 * 3600 * 1000),
    ];
  }

  let start = selectedDay.toDate("UTC");
  start.setHours(9, 0);
  return [
    new Date(start.setHours(9, 0)),
    new Date(start.setHours(10, 0)),
    new Date(start.setHours(11, 0)),
    new Date(start.setHours(12, 0)),
    new Date(start.setHours(13, 0)),
    new Date(start.setHours(14, 0)),
    new Date(start.setHours(15, 0)),
    new Date(start.setHours(16, 0)),
    new Date(start.setHours(17, 0)),
    new Date(start.setHours(18, 0)),
    new Date(start.setHours(19, 0)),
  ];
}

export function getLocationPlaning(location: LocationInfoResp) {
  // select a day
  // fetch planning
  // fetch tickets

  const workersPlannings = location.planning;
  let days = {};
  // merge per day
  for (let p of workersPlannings) {
    let [year, month, day] = convertOrdinalToDate(p.day[0], p.day[1]);
    let d = new CalendarDate(year, month, day);
    if (!!days[d.toString()]) {
      days[d.toString()].workers.push({
        startTime: p.startTime,
        endTime: p.endTime,
        enabled: p.enabled,
      });
    } else {
      days[d.toString()] = {
        workers: [{ startTime: p.startTime, endTime: p.endTime, enabled: p.enabled }],
      };
    }
  }
  for (let d in days) {
    days[d]["start"] = Math.min(...days[d].workers.map((p) => p.startTime));
    days[d]["end"] = Math.max(...days[d].workers.map((p) => p.endTime));
    days[d]["status"] = "full";
  }
  return days;
}
