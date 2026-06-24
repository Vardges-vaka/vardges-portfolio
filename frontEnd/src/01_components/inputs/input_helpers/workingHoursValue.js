export const WORKING_HOURS_WEEKDAYS = [
  { id: "sun", label: "Sun" },
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
];

const DAY_ORDER = WORKING_HOURS_WEEKDAYS.map((day) => day.id);

const LABEL_TO_ID = Object.fromEntries(
  WORKING_HOURS_WEEKDAYS.flatMap((day) => [
    [day.label.toLowerCase(), day.id],
    [day.id, day.id],
  ]),
);

export const normalizeTimePart = (value = "") => {
  const match = String(value).trim().match(/^(\d{1,2}):(\d{2})/);
  if (!match) return "";

  const hours = Math.min(23, Math.max(0, Number(match[1])));
  const minutes = Math.min(59, Math.max(0, Number(match[2])));
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

const resolveDayId = (token = "") => {
  const key = String(token).trim().toLowerCase().slice(0, 3);
  return LABEL_TO_ID[key] || "";
};

const expandDayRange = (fromId, toId) => {
  const start = DAY_ORDER.indexOf(fromId);
  const end = DAY_ORDER.indexOf(toId);
  if (start === -1 || end === -1) return [];

  if (start <= end) {
    return DAY_ORDER.slice(start, end + 1);
  }

  return [...DAY_ORDER.slice(start), ...DAY_ORDER.slice(0, end + 1)];
};

const parseDaysFromText = (text = "") => {
  const normalized = String(text).replace(/[–—]/g, "-").trim();
  if (!normalized) return [];

  const rangeMatch = normalized.match(
    /\b(sun|mon|tue|wed|thu|fri|sat)\s*-\s*(sun|mon|tue|wed|thu|fri|sat)\b/i,
  );

  if (rangeMatch) {
    return expandDayRange(
      resolveDayId(rangeMatch[1]),
      resolveDayId(rangeMatch[2]),
    );
  }

  const found = [];
  for (const day of WORKING_HOURS_WEEKDAYS) {
    if (new RegExp(`\\b${day.label}\\b`, "i").test(normalized)) {
      found.push(day.id);
    }
  }

  return DAY_ORDER.filter((id) => found.includes(id));
};

const stripTimeSegments = (text = "") =>
  String(text)
    .replace(
      /\d{1,2}:\d{2}\s*(?:[–\-—]|to)\s*\d{1,2}:\d{2}/gi,
      "",
    )
    .replace(/\d{1,2}:\d{2}/g, "")
    .replace(/,\s*,/g, ",")
    .replace(/^,\s*|\s*,$/g, "")
    .trim();

export const parseWorkingHoursValue = (raw = "") => {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed) {
    return { days: [], open: "", close: "" };
  }

  let open = "";
  let close = "";

  const rangeMatch = trimmed.match(
    /(\d{1,2}:\d{2})\s*(?:[–\-—]|to)\s*(\d{1,2}:\d{2})/i,
  );

  if (rangeMatch) {
    open = normalizeTimePart(rangeMatch[1]);
    close = normalizeTimePart(rangeMatch[2]);
  } else {
    const commaParts = trimmed.split(",").map((part) => part.trim()).filter(Boolean);
    const lastPart = commaParts[commaParts.length - 1] ?? trimmed;
    const singleTime = lastPart.match(/^(\d{1,2}:\d{2})/);

    if (singleTime) {
      open = normalizeTimePart(singleTime[1]);
    }
  }

  const days = parseDaysFromText(stripTimeSegments(trimmed));

  return { days, open, close };
};

export const formatWorkingHoursDayLabel = (dayIds = []) => {
  const sorted = DAY_ORDER.filter((id) => dayIds.includes(id));
  if (!sorted.length) return "";

  const spans = [];
  let rangeStart = sorted[0];
  let previousIndex = DAY_ORDER.indexOf(sorted[0]);

  const pushRange = (startId, endId) => {
    const startLabel =
      WORKING_HOURS_WEEKDAYS.find((day) => day.id === startId)?.label || startId;
    const endLabel =
      WORKING_HOURS_WEEKDAYS.find((day) => day.id === endId)?.label || endId;
    spans.push(startId === endId ? startLabel : `${startLabel}–${endLabel}`);
  };

  for (let i = 1; i < sorted.length; i += 1) {
    const currentIndex = DAY_ORDER.indexOf(sorted[i]);
    if (currentIndex === previousIndex + 1) {
      previousIndex = currentIndex;
      continue;
    }

    const rangeEnd = sorted[i - 1];
    pushRange(rangeStart, rangeEnd);
    rangeStart = sorted[i];
    previousIndex = currentIndex;
  }

  pushRange(rangeStart, sorted[sorted.length - 1]);
  return spans.join(", ");
};

const joinDayAndTime = (dayLabel, timeLabel) => {
  if (dayLabel && timeLabel) return `${dayLabel}, ${timeLabel}`;
  return dayLabel || timeLabel || "";
};

export const formatWorkingHoursValue = ({ days = [], open = "", close = "" } = {}) => {
  const dayLabel = formatWorkingHoursDayLabel(days);
  const openTime = normalizeTimePart(open);
  const closeTime = normalizeTimePart(close);

  if (openTime && closeTime) {
    return joinDayAndTime(dayLabel, `${openTime}–${closeTime}`);
  }

  if (openTime) {
    return joinDayAndTime(dayLabel, openTime);
  }

  if (closeTime) {
    return joinDayAndTime(dayLabel, closeTime);
  }

  return dayLabel;
};
