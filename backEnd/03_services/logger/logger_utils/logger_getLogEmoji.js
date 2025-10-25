export function getLogEmoji(level) {
  const emojiMap = {
    error: "🚨",
    warn: "⚠️",
    info: "📢",
    http: "🌐",
    debug: "🔍",
  };
  return emojiMap[level.replace(/\x1b\[[0-9;]*m/g, "")] || "📝";
}
