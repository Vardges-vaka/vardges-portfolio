export const formatDate = (date) => {
  if (!date) return "—";

  const then = new Date(date);
  if (Number.isNaN(then.getTime())) return "—";

  const now = new Date();
  const diffMs = now.getTime() - then.getTime();

  const MS_MINUTE = 60 * 1000;
  const MS_HOUR = 60 * MS_MINUTE;
  const MS_DAY = 24 * MS_HOUR;

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const WEEKDAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getOrdinalDay = (day) => {
    const mod100 = day % 100;
    if (mod100 >= 11 && mod100 <= 13) return `${day}th`;
    const mod10 = day % 10;
    if (mod10 === 1) return `${day}st`;
    if (mod10 === 2) return `${day}nd`;
    if (mod10 === 3) return `${day}rd`;
    return `${day}th`;
  };

  const formatTime = (d) =>
    d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const formatDateOnly = (d) =>
    `${getOrdinalDay(d.getDate())} of ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`;

  // Future or same instant — show full stamp
  if (diffMs <= 0) {
    return `${formatDateOnly(then)}, at ${formatTime(then)}`;
  }

  // Within 1 hour
  if (diffMs < MS_HOUR) {
    const minutes = Math.max(1, Math.floor(diffMs / MS_MINUTE));
    return `Today, ${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  // Within 2 hours
  if (diffMs < 2 * MS_HOUR) {
    const minutesAfterHour = Math.floor((diffMs % MS_HOUR) / MS_MINUTE);
    if (minutesAfterHour === 0) {
      return "Today, 1 hour ago";
    }
    return `Today, 1 hour and ${minutesAfterHour} minute${minutesAfterHour === 1 ? "" : "s"} ago`;
  }

  // Within 12 hours
  if (diffMs < 12 * MS_HOUR) {
    const hours = Math.floor(diffMs / MS_HOUR);
    return `Today, ${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  // Within 24 hours
  if (diffMs < MS_DAY) {
    return `Today, at ${formatTime(then)}`;
  }

  // Within 48 hours
  if (diffMs < 2 * MS_DAY) {
    return `Yesterday, at ${formatTime(then)}`;
  }

  // Within 7 days
  if (diffMs < 7 * MS_DAY) {
    return `last ${WEEKDAYS[then.getDay()]}, at ${formatTime(then)}`;
  }

  // Older than 7 days but still in current month or previous calendar month
  const startOfPreviousMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1,
  );

  if (then >= startOfPreviousMonth) {
    return `${formatDateOnly(then)}, at ${formatTime(then)}`;
  }

  // Before the previous calendar month
  return formatDateOnly(then);
};
