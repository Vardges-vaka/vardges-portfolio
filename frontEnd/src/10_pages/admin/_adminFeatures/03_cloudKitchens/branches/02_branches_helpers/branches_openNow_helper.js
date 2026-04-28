// HH:mm (24h), aligned with branches_fieldValidators TIME_RE
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

const toMinutesFromMidnight = (hm) => {
  if (hm == null || typeof hm !== "string") return null;
  const t = hm.trim();
  if (!TIME_RE.test(t)) return null;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/**
 * Whether the branch is open at `now` using operations schedule (local time).
 * Inactive branches are always closed. 24h + active → open.
 * Overnight windows supported when closing time is before opening time on the clock.
 *
 * @param {object | undefined} ops operations subdoc
 * @param {Date} [now]
 * @returns {boolean}
 */
export const branchIsOpenNow = (ops, now = new Date()) => {
  if (!ops || ops.isActive === false) return false;
  if (ops.is24Hours) return true;

  const openM = toMinutesFromMidnight(ops.openingTime);
  const closeM = toMinutesFromMidnight(ops.closingTime);
  if (openM === null || closeM === null) return false;

  const nowM = now.getHours() * 60 + now.getMinutes();

  if (closeM > openM) {
    return nowM >= openM && nowM < closeM;
  }
  if (closeM < openM) {
    return nowM >= openM || nowM < closeM;
  }
  return false;
};

/**
 * Short hint for UI: next close while open, or next open while closed.
 * @returns {{ kind: 'inactive' } | { kind: '24h' } | { kind: 'noTimes' } | { kind: 'open', closesAt: string } | { kind: 'closed', opensAt: string, opensTomorrow: boolean }}
 */
export const getBranchScheduleHint = (ops, now = new Date()) => {
  if (!ops || ops.isActive === false) return { kind: "inactive" };
  if (ops.is24Hours) return { kind: "24h" };

  const openM = toMinutesFromMidnight(ops.openingTime);
  const closeM = toMinutesFromMidnight(ops.closingTime);
  const openStr = typeof ops.openingTime === "string" ? ops.openingTime.trim() : "";
  const closeStr = typeof ops.closingTime === "string" ? ops.closingTime.trim() : "";
  if (openM === null || closeM === null) return { kind: "noTimes" };

  const nowM = now.getHours() * 60 + now.getMinutes();
  const isOpen = branchIsOpenNow(ops, now);

  if (isOpen) {
    return { kind: "open", closesAt: closeStr };
  }

  if (closeM > openM) {
    const opensTomorrow = nowM >= closeM;
    return { kind: "closed", opensAt: openStr, opensTomorrow };
  }

  return { kind: "closed", opensAt: openStr, opensTomorrow: false };
};
