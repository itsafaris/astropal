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
