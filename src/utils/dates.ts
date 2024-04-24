export type TimeAmPm = {
  hour: number;
  meridiem: string;
  minute: number;
};

export type Time24 = {
  hour: number;
  minute: number;
};

export type Time = {
  hour: number;
  minute: number;
  meridiem: string;
  time24: Time24;
};

export type DateValue = { year: number; month: number; day: number };

export function formatTo24Hour(timeObj: { hour: number; meridiem: string; minute: number }): {
  hour: number;
  minute: number;
} {
  let { hour, minute, meridiem } = timeObj;

  if (meridiem === "pm" && hour !== 12) {
    hour += 12;
  } else if (meridiem === "am" && hour === 12) {
    hour = 0;
  }

  return { hour, minute };
}

export function createTime(input: TimeAmPm): Time {
  return {
    hour: input.hour,
    minute: input.minute,
    meridiem: input.meridiem,
    time24: formatTo24Hour(input),
  };
}

export function getReadableDate(date: DateValue): string {
  return `${date.day}/${date.month}/${date.year}`;
}

// export function getReadableTime(time: Time): string {
//   return `${time.hour === 0 ? "00" : time.hour}:${time.minute === 0 ? "00" : time.minute} ${
//     time.meridiem
//   }`;
// }

export function getReadableTime(time: Time): string {
  const { hour, minute, meridiem } = time;
  const formattedHour = hour.toString().padStart(2, "0");
  const formattedMinute = minute.toString().padStart(2, "0");
  return `${formattedHour}:${formattedMinute} ${meridiem.toLowerCase()}`;
}

/** Month's are 0 indexed */
export function getNumberOfDaysInMonth(year: number, month: number) {
  // 0 is the last day of the previous month, so that's why we add +1 to a month here
  return new Date(year, month + 1, 0).getDate();
}
