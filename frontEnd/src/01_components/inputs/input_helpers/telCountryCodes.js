import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from "../countryCodes.js";

export { COUNTRY_CODES, DEFAULT_COUNTRY_CODE as DEFAULT_TEL_COUNTRY_CODE };

export const findCountryByCode = (
  code,
  list = COUNTRY_CODES,
  fallbackCode = DEFAULT_COUNTRY_CODE,
) =>
  list.find((item) => item.code === code) ??
  list.find((item) => item.code === fallbackCode) ??
  list[0];
