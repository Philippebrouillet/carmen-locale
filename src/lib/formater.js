import { languageTag } from "$lib/paraglide/runtime.js";

/** @param {Number} cents*/
export function displayPriceInDollars(cents) {
  if (cents == null || isNaN(cents) || cents === undefined) {
    return "0.00 €";
  }
  const dollars = Math.floor(cents / 100);
  const remainingCents = cents % 100;

  // Ensuring two decimal places for cents
  const formattedCents = remainingCents < 10 ? "0" + remainingCents : remainingCents;

  return `${dollars}.${formattedCents} €`;
}

/**
 *
 * @param {Date} date
 */
export function displayWaitingTime(date) {
  return date.toLocaleTimeString(languageTag(), { hour: "numeric", minute: "2-digit" });
}

/**
 *
 * @param {number} seconds
 */
export function displayDuration(seconds) {
  return displayDurationMs(seconds * 1000);
}

/**
 *
 * @param {number} milliseconds
 */
export function displayDurationMs(milliseconds) {
  // Define conversion constants
  const MS_IN_SECOND = 1000;
  const SECONDS_IN_MINUTE = 60;
  const MINUTES_IN_HOUR = 60;
  const HOURS_IN_DAY = 24;

  // Calculate days, hours, and minutes
  const days = Math.floor(
    milliseconds / (MS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY),
  );
  const hours = Math.floor(
    (milliseconds % (MS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY)) /
      (MS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR),
  );
  const minutes = Math.floor(
    (milliseconds % (MS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR)) /
      (MS_IN_SECOND * SECONDS_IN_MINUTE),
  );

  // Display the largest non-zero duration value
  if (days > 0) {
    return days + (days === 1 ? " day" : " days");
  } else if (hours > 0) {
    return hours + (hours === 1 ? " hour" : " hours");
  } else if (minutes >= 5) {
    return minutes + (minutes === 1 ? " minute" : " minutes");
  } else {
    // TODO : i18n
    return "moins de 5 minutes";
  }
}

/**
 *
 * @param {Date} date
 */
export function toUtcDate(date) {
  let y = date.getUTCFullYear();
  let d = getOrdinalDay(date);
  return [y, d];
}

/**
 *
 * @param {Date} date
 */
export function getOrdinalDay(date) {
  var start = new Date(date.getUTCFullYear(), 0, 0);
  var diff = date.getTime() - start.getTime();
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return day;
}

/**
 *
 * @param {number} year
 */
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 *
 * @param {number} year
 * @param {number} ordinal
 */
export function convertOrdinalToDate(year, ordinal) {
  // Days in each month for non-leap and leap years
  const daysInMonth = [
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], // Non-leap year
    [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], // Leap year
  ];

  // Determine if the given year is a leap year
  const leap = isLeapYear(year) ? 1 : 0;

  let month = 0;
  let day = ordinal;

  // Find the corresponding month and day
  while (day > daysInMonth[leap][month]) {
    day -= daysInMonth[leap][month];
    month++;
  }

  // Adjust month from zero-based to one-based
  month += 1;

  return [year, month, day];
}
