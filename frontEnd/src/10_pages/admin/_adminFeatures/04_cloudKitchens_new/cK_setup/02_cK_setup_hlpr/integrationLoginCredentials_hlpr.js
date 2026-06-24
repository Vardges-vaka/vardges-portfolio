export {
  DFLT_SALES_PLATFORM_LOGIN_CREDENTIAL as DFLT_INTEGRATION_LOGIN_CREDENTIAL,
  LOGIN_TYPE_LABELS,
  LOGIN_CREDENTIAL_CARD_FIELDS,
  LOGIN_CREDENTIAL_CARD_PREVIEW_FIELDS,
  LOGIN_CREDENTIAL_COPYABLE_CARD_FIELDS,
  formatLoginCredentialDisplayValue,
  getLoginCredentialFieldValue,
  getLoginCredentialCardTitle,
  getLoginCredentialUsernameHref,
  getLoginCredentialPasswordHref,
  cloneLoginCredential,
  duplicateLoginCredential,
  copyLoginCredentialText,
  seedLoginCredentialsFromPlatform as seedLoginCredentialsFromIntegration,
  LOGIN_CREDENTIALS_PER_ROW,
  LOGIN_CREDENTIALS_SLOTS_PER_ROW,
  formatLoginCredentialTotalLabel,
  buildLoginCredentialGridRows,
  getLoginCredentialGridMeta,
} from "./salesPlatformLoginCredentials_hlpr.js";

/** Integration portal link for credential zoom / open actions. */
export const getIntegrationPortalUrl = (values = {}) => {
  const portal = String(values.links?.portalUrl ?? "").trim();
  if (portal) return portal;
  return String(values.links?.websiteUrl ?? "").trim();
};
