/**
 * Local-calendar ranges for the map info panel (daily / Mon–Sun week / calendar month).
 * End dates are end-of-day for inclusive display.
 */

const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const endOfDay = (d) => {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
};

/** Monday = start, Sunday = end (local week). */
const mondayOfWeekContaining = (ref) => {
  const d = startOfDay(ref);
  const day = d.getDay(); // 0 Sun … 6 Sat
  const daysFromMonday = (day + 6) % 7;
  d.setDate(d.getDate() - daysFromMonday);
  return d;
};

const sundayOfWeekContaining = (ref) => {
  const mon = mondayOfWeekContaining(ref);
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  return endOfDay(sun);
};

const firstDayOfMonth = (ref) => {
  const d = new Date(ref.getFullYear(), ref.getMonth(), 1);
  return startOfDay(d);
};

const lastDayOfMonth = (ref) => {
  const d = new Date(ref.getFullYear(), ref.getMonth() + 1, 0);
  return endOfDay(d);
};

/**
 * @param {"daily"|"weekly"|"monthly"} period
 * @param {Date} [refDate]
 * @returns {{ start: Date, end: Date, period: string }}
 */
export const getBranches_mapSummaryRange = (period, refDate = new Date()) => {
  const ref = new Date(refDate);
  if (period === "weekly") {
    return {
      period,
      start: mondayOfWeekContaining(ref),
      end: sundayOfWeekContaining(ref),
    };
  }
  if (period === "monthly") {
    return {
      period,
      start: firstDayOfMonth(ref),
      end: lastDayOfMonth(ref),
    };
  }
  return {
    period: "daily",
    start: startOfDay(ref),
    end: endOfDay(ref),
  };
};

export const formatBranches_mapSummaryRange = (start, end, locale) => {
  const opt = { year: "numeric", month: "short", day: "numeric" };
  const a = start.toLocaleDateString(locale, opt);
  const b = end.toLocaleDateString(locale, opt);
  if (a === b) return a;
  return `${a} – ${b}`;
};
