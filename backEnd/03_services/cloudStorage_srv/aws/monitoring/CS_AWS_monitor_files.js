import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import path from "path";
import { s3_resolveClient } from "../../../../04_helpers/helpers.index.js";

const displayName = " | CS_AWS_monitor_files.js | ";

function formatSize(bytes) {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(1)} KB`;
  return `${bytes} B`;
}

function formatAgo(date) {
  const diffMs = Date.now() - new Date(date).getTime();
  const mins   = Math.floor(diffMs / 60_000);
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7)   return `${days}d ago`;
  return `${Math.floor(days / 7)}wk ago`;
}

const IMG_EXT = new Set(['.jpg','.jpeg','.png','.gif','.webp','.svg','.avif','.bmp','.ico']);
const VID_EXT = new Set(['.mp4','.mov','.avi','.mkv','.webm']);
const AUD_EXT = new Set(['.mp3','.wav','.ogg','.flac','.aac']);
const DOC_EXT = new Set(['.pdf','.doc','.docx','.xls','.xlsx','.ppt','.pptx']);

function classify(key) {
  const ext = path.extname(key).toLowerCase();
  if (IMG_EXT.has(ext)) return 'img';
  if (VID_EXT.has(ext)) return 'vid';
  if (AUD_EXT.has(ext)) return 'aud';
  if (DOC_EXT.has(ext)) return 'doc';
  return 'oth';
}

export const CS_AWS_monitor_files = async (isDebug = false) => {
  isDebug && console.log(`${displayName}[STARTED]`);
  const resolved = s3_resolveClient();
  if (!resolved.ok) return { error: resolved.message };

  try {
    const response = await resolved.client.send(
      new ListObjectsV2Command({ Bucket: resolved.bucket, MaxKeys: 100 })
    );

    const items = (response.Contents ?? []).map((obj) => ({
      type:      classify(obj.Key),
      name:      obj.Key,
      size:      formatSize(obj.Size ?? 0),
      sizeBytes: obj.Size ?? 0,
      ago:       formatAgo(obj.LastModified),
      created:   new Date(obj.LastModified).getTime(),
    }));

    const recent = [...items]
      .sort((a, b) => b.created - a.created)
      .slice(0, 5)
      .map(({ type, name, size, ago }) => ({ type, name, size, ago }));

    const largest = [...items]
      .sort((a, b) => b.sizeBytes - a.sizeBytes)
      .slice(0, 5)
      .map(({ type, name, size, ago }) => ({ type, name, size, ago }));

    const totalCount = items.length;
    const totalSizeBytes = items.reduce((sum, item) => sum + item.sizeBytes, 0);
    const total = items.length || 1;
    const counts = { img: 0, vid: 0, aud: 0, doc: 0, oth: 0 };
    items.forEach((f) => { counts[f.type] = (counts[f.type] || 0) + 1; });

    return {
      totalCount,
      totalSizeBytes,
      recent,
      largest,
      typeBreakdown: {
        images: Math.round((counts.img / total) * 100),
        video:  Math.round((counts.vid / total) * 100),
        audio:  Math.round((counts.aud / total) * 100),
        docs:   Math.round((counts.doc / total) * 100),
        other:  Math.round((counts.oth / total) * 100),
      },
    };
  } catch (error) {
    isDebug && console.error(`${displayName}[FAIL]`, error?.message);
    return { error: error?.message || String(error) };
  }
};
