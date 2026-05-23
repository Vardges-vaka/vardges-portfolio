/* ============================================================================
   formatDate — human-friendly relative dates.

   Examples:
     • diff < 1h          → "Today, 12 minutes ago"
     • diff < 12h         → "Today, 3 hours ago"
     • same day           → "Today, at 9:14 AM"
     • previous day       → "Yesterday, at 9:14 AM"
     • within 7 days      → "last Tuesday, at 9:14 AM"
     • within prev month  → "12th of March, 2026, at 9:14 AM"
     • older              → "12th of March, 2024"

   Falsy / unparseable input → "—"
============================================================================ */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

const ordinal = (day) => {
  const mod100 = day % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${day}th`;
  const mod10 = day % 10;
  if (mod10 === 1) return `${day}st`;
  if (mod10 === 2) return `${day}nd`;
  if (mod10 === 3) return `${day}rd`;
  return `${day}th`;
};

const formatTime = (d) =>
  d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

const formatDateOnly = (d) =>
  `${ordinal(d.getDate())} of ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`;

export const formatDate = (date) => {
  if (!date) return "—";
  const then = new Date(date);
  if (Number.isNaN(then.getTime())) return "—";
  const now = new Date();
  const diffMs = now.getTime() - then.getTime();

  const MS_MINUTE = 60 * 1000;
  const MS_HOUR = 60 * MS_MINUTE;
  const MS_DAY = 24 * MS_HOUR;

  if (diffMs <= 0) return `${formatDateOnly(then)}, at ${formatTime(then)}`;

  if (diffMs < MS_HOUR) {
    const m = Math.max(1, Math.floor(diffMs / MS_MINUTE));
    return `Today, ${m} minute${m === 1 ? "" : "s"} ago`;
  }
  if (diffMs < 2 * MS_HOUR) {
    const m = Math.floor((diffMs % MS_HOUR) / MS_MINUTE);
    if (m === 0) return "Today, 1 hour ago";
    return `Today, 1 hour and ${m} minute${m === 1 ? "" : "s"} ago`;
  }
  if (diffMs < 12 * MS_HOUR) {
    const h = Math.floor(diffMs / MS_HOUR);
    return `Today, ${h} hour${h === 1 ? "" : "s"} ago`;
  }
  if (diffMs < MS_DAY) return `Today, at ${formatTime(then)}`;
  if (diffMs < 2 * MS_DAY) return `Yesterday, at ${formatTime(then)}`;
  if (diffMs < 7 * MS_DAY) return `last ${WEEKDAYS[then.getDay()]}, at ${formatTime(then)}`;

  const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  if (then >= startOfPrevMonth) return `${formatDateOnly(then)}, at ${formatTime(then)}`;
  return formatDateOnly(then);
};
