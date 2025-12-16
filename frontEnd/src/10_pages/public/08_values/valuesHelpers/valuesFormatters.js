export const filterValuesByProfile = (valuesData, currentProfile) => {
  if (!valuesData) return null;
  return valuesData;
};

export const getValueIcon = (iconName) => {
  const iconMap = {
    "shield-check": "ShieldCheck",
    layers: "Layers",
    "trending-up": "TrendingUp",
    target: "Target",
    "message-square": "MessageSquare",
    users: "Users",
  };
  return iconMap[iconName] || "Star";
};

