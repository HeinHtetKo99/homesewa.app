export const BOOKING_TIMEZONE = "Asia/Kolkata";

/** Latest local time (HH:mm) when each shift can still be booked on the start date. */
const SHIFT_END_TIMES: Record<string, string> = {
  Morning: "12:00",
  Day: "18:00",
  Afternoon: "17:00",
  Night: "22:00",
};

function formatInTimezone(
  date: Date,
  options: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: BOOKING_TIMEZONE,
    ...options,
  }).format(date);
}

/** YYYY-MM-DD in Chennai. */
export function getBookingToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: BOOKING_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** HH:mm (24h) in Chennai, suitable for `<input type="time">`. */
export function getBookingNowTime(now = new Date()): string {
  return formatInTimezone(now, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/** Parse YYYY-MM-DD + HH:mm as an instant (Chennai is fixed UTC+5:30). */
export function parseBookingDateTime(date: string, time = "00:00"): number {
  return new Date(`${date}T${time}:00+05:30`).getTime();
}

export function isShiftUnavailable(
  shift: string,
  startDate: string,
  now = new Date(),
): boolean {
  const today = getBookingToday(now);
  if (startDate !== today) return false;

  const endTime = SHIFT_END_TIMES[shift];
  if (!endTime) return false;

  return now.getTime() >= parseBookingDateTime(startDate, endTime);
}

export function getAvailableShifts(
  startDate: string,
  now = new Date(),
): readonly string[] {
  const shifts = Object.keys(SHIFT_END_TIMES);
  if (!startDate) return shifts;
  return shifts.filter((shift) => !isShiftUnavailable(shift, startDate, now));
}

export type BookingScheduleInput = {
  startDate: string;
  deadlineDate?: string;
  deadlineTime?: string;
  shift: string;
};

export function bookingScheduleValidationError(
  input: BookingScheduleInput,
  now = new Date(),
): string | null {
  const today = getBookingToday(now);

  if (input.startDate && input.startDate < today) {
    return "Starting date cannot be in the past.";
  }

  if (
    input.startDate &&
    input.shift &&
    isShiftUnavailable(input.shift, input.startDate, now)
  ) {
    return `The ${input.shift} shift is no longer available for that date. Please choose a future date or another shift.`;
  }

  if (input.deadlineDate) {
    if (input.deadlineDate < today) {
      return "Deadline date cannot be in the past.";
    }

    if (input.startDate && input.deadlineDate < input.startDate) {
      return "Deadline cannot be before the starting date.";
    }

    const deadlineTime = input.deadlineTime || "23:59";
    if (now.getTime() >= parseBookingDateTime(input.deadlineDate, deadlineTime)) {
      return "Deadline cannot be in the past.";
    }
  }

  return null;
}
