import { calendar_data } from "./manualAdToBsConverter.js";

const BASE_AD = { year: 1944, month: 1, day: 1 };
const BASE_BS = { year: 2000, month: 9, day: 17 };

// days in AD (normal + leap year)
const adMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeap(adYear) {
  return (adYear % 4 === 0 && adYear % 100 !== 0) || (adYear % 400 === 0);
}

function countDaysAD(year, month, day) {
  let total = 0;

  // count full years
  for (let y = BASE_AD.year; y < year; y++) {
    total += isLeap(y) ? 366 : 365;
  }

  // count full months
  for (let m = 1; m < month; m++) {
    total += adMonthDays[m - 1];
    if (m === 2 && isLeap(year)) total += 1;
  }

  // count days
  total += day - BASE_AD.day;

  return total;
}

export function adToBs(year, month, day) {
  let days = countDaysAD(year, month, day);

  let bsYear = BASE_BS.year;
  let bsMonth = BASE_BS.month;
  let bsDay = BASE_BS.day;

  while (days > 0) {
    const monthDays = calendar_data[bsYear][bsMonth - 1];

    bsDay++;
    if (bsDay > monthDays) {
      bsMonth++;
      bsDay = 1;
    }
    if (bsMonth > 12) {
      bsYear++;
      bsMonth = 1;
    }

    days--;
  }

  return `${bsYear}-${String(bsMonth).padStart(2, "0")}-${String(bsDay).padStart(2, "0")}`;
}
