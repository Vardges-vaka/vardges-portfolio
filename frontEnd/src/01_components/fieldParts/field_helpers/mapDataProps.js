const DATA_PROP_PREFIX = /^data_/;

const suffixToDataAttrSuffix = (suffix) =>
  suffix
    .replace(/_/g, "-")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();

export const mapDataProps = (props = {}) => {
  const dataAttributes = {};
  const rest = {};

  for (const [key, value] of Object.entries(props)) {
    if (!DATA_PROP_PREFIX.test(key)) {
      rest[key] = value;
      continue;
    }

    if (value == null) continue;

    const attrName = `data-${suffixToDataAttrSuffix(key.slice(5))}`;
    dataAttributes[attrName] =
      typeof value === "boolean" ? value : String(value);
  }

  return { dataAttributes, rest };
};

export default mapDataProps;
