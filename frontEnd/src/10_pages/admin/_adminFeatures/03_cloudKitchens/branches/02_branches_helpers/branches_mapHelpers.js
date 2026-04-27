const toNum = (v) => {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const branchHasCoords = (b) => {
  const lat = toNum(b?.location?.coordinates?.lat);
  const lng = toNum(b?.location?.coordinates?.lng);
  return (
    lat !== null &&
    lng !== null &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
};

export { branchHasCoords, toNum };
