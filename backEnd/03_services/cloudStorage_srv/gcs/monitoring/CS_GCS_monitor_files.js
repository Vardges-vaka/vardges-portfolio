import { gcs_resolveBucket } from "../../../../04_helpers/helpers.index.js";

const displayName = " | CS_GCS_monitor_files.js | ";

function formatSize(bytes) {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(1)} KB`;
  return `${bytes} B`;
}

function formatAgo(date) {
  const diffMs = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}wk ago`;
}

function classify(contentType = "") {
  const ct = contentType.toLowerCase();
  if (/^image\//.test(ct)) return "img";
  if (/^video\//.test(ct)) return "vid";
  if (/^audio\//.test(ct)) return "aud";
  if (/pdf|document|word|excel|sheet/.test(ct)) return "doc";
  return "oth";
}

export const CS_GCS_monitor_files = async (isDebug = false) => {
  isDebug && console.log(`${displayName}[STARTED]`);

  const resolved = gcs_resolveBucket();
  if (!resolved.ok) return { error: resolved.message };

  try {
    const [allFiles] = await resolved.bucket.getFiles({ maxResults: 100 });

    const mapped = allFiles.map((f) => ({
      type: classify(f.metadata.contentType),
      name: f.name,
      size: formatSize(Number(f.metadata.size || 0)),
      sizeBytes: Number(f.metadata.size || 0),
      ago: formatAgo(f.metadata.timeCreated),
      created: new Date(f.metadata.timeCreated).getTime(),
    }));

    const recent = [...mapped]
      .sort((a, b) => b.created - a.created)
      .slice(0, 5)
      .map(({ type, name, size, ago }) => ({ type, name, size, ago }));

    const largest = [...mapped]
      .sort((a, b) => b.sizeBytes - a.sizeBytes)
      .slice(0, 5)
      .map(({ type, name, size, ago }) => ({ type, name, size, ago }));

    const totalCount = mapped.length;
    const totalSizeBytes = mapped.reduce((sum, item) => sum + item.sizeBytes, 0);
    const total = mapped.length || 1;
    const counts = { img: 0, vid: 0, aud: 0, doc: 0, oth: 0 };
    mapped.forEach((f) => { counts[f.type] = (counts[f.type] || 0) + 1; });

    const typeBreakdown = {
      images: Math.round((counts.img / total) * 100),
      video:  Math.round((counts.vid / total) * 100),
      audio:  Math.round((counts.aud / total) * 100),
      docs:   Math.round((counts.doc / total) * 100),
      other:  Math.round((counts.oth / total) * 100),
    };

    return { totalCount, totalSizeBytes, recent, largest, typeBreakdown };
  } catch (error) {
    isDebug && console.error(`${displayName}[FAIL]`, error?.message);
    return { error: error?.message || String(error) };
  }
};
