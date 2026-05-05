const toFiniteNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const clampPercent = (value) => Math.min(100, Math.max(0, value));

const STORAGE_UNIT_BYTES = {
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
};

const formatStorageValue = (value, unit) => {
  if (value === null) return "";

  const digits = value >= 100 ? 0 : value >= 10 ? 1 : 2;
  const rounded = Number(value.toFixed(digits)).toLocaleString();
  return `${rounded} ${unit || ""}`.trim();
};

const formatByteSize = (bytes) => {
  if (bytes === null) return "";

  const units = [
    { label: "GB", bytes: STORAGE_UNIT_BYTES.GB },
    { label: "MB", bytes: STORAGE_UNIT_BYTES.MB },
    { label: "KB", bytes: STORAGE_UNIT_BYTES.KB },
  ];
  const unit = units.find((item) => bytes >= item.bytes) || units[2];
  const value = unit.bytes > 0 ? bytes / unit.bytes : 0;
  return formatStorageValue(value, unit.label);
};

const storageValueToBytes = (value, unit) => {
  if (value === null) return null;

  const multiplier = STORAGE_UNIT_BYTES[String(unit || "GB").toUpperCase()];
  return multiplier ? value * multiplier : null;
};

const formatFileCount = (count) =>
  `${count.toLocaleString()} ${count === 1 ? "file" : "files"}`;

const parseSizeLabelToBytes = (sizeLabel) => {
  if (!sizeLabel || typeof sizeLabel !== "string") return null;

  const match = sizeLabel.trim().match(/^([\d.,]+)\s*([KMGT]?B)$/i);
  if (!match) return null;

  const value = toFiniteNumber(match[1].replace(/,/g, ""));
  const multiplier = STORAGE_UNIT_BYTES[match[2].toUpperCase()];
  return value === null || !multiplier ? null : value * multiplier;
};

const getFilesFromMonitorLists = (files) => {
  const map = new Map();

  [...(files?.recent ?? []), ...(files?.largest ?? [])].forEach((file) => {
    if (!file?.name || map.has(file.name)) return;

    const sizeBytes = toFiniteNumber(file.sizeBytes) ?? parseSizeLabelToBytes(file.size);
    map.set(file.name, {
      ...file,
      sizeBytes: sizeBytes ?? 0,
    });
  });

  return [...map.values()];
};

const getDirectFilesSummary = (files) => {
  if (files?.error) return null;

  const totalCount = toFiniteNumber(files?.totalCount);
  const totalSizeBytes = toFiniteNumber(files?.totalSizeBytes);

  if (totalCount !== null && totalSizeBytes !== null) {
    return {
      count: Math.round(totalCount),
      sizeBytes: totalSizeBytes,
    };
  }

  const listedFiles = getFilesFromMonitorLists(files);
  if (!listedFiles.length) return null;

  return {
    count: listedFiles.length,
    sizeBytes: listedFiles.reduce((sum, file) => sum + (file.sizeBytes ?? 0), 0),
  };
};

export const getCloudStorageFilesSummary = (monitoring) => {
  const directFiles = getDirectFilesSummary(monitoring?.files);
  if (directFiles) {
    return {
      hasData: true,
      countLabel: formatFileCount(directFiles.count),
      sizeLabel: formatByteSize(directFiles.sizeBytes),
    };
  }

  const storage = monitoring?.storage;
  const files = toFiniteNumber(storage?.objects);
  const used = toFiniteNumber(storage?.used);
  const sizeBytes = storageValueToBytes(used, storage?.unit);

  if (storage?.error || files === null || sizeBytes === null) {
    return {
      hasData: false,
      countLabel: "",
      sizeLabel: "",
    };
  }

  return {
    hasData: true,
    countLabel: formatFileCount(Math.round(files)),
    sizeLabel: formatByteSize(sizeBytes),
  };
};

export const getCloudStorageUsageSummary = (monitoring) => {
  const storage = monitoring?.storage;
  const used = toFiniteNumber(storage?.used);
  const total = toFiniteNumber(storage?.total);
  const unit = storage?.unit || "GB";

  if (storage?.error || used === null || total === null) {
    return {
      hasData: false,
      percentage: 0,
      usedLabel: "",
      leftLabel: "",
    };
  }

  const left = Math.max(total - used, 0);
  const percentage = total > 0 ? clampPercent((used / total) * 100) : 0;

  return {
    hasData: true,
    percentage,
    usedLabel: `${formatStorageValue(used, unit)} used`,
    leftLabel: `${formatStorageValue(left, unit)} left`,
  };
};

export const getCloudStoragePaymentSummary = (monitoring) => {
  const amount = toFiniteNumber(monitoring?.cost?.total);

  if (monitoring?.cost?.error || amount === null) {
    return {
      hasData: false,
      amount: null,
      label: "",
    };
  }

  return {
    hasData: true,
    amount,
    label: `$${amount.toFixed(2)}`,
  };
};
