import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Check,
  Copy,
  ExternalLink,
  KeyRound,
  LoaderCircle,
  LogIn,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import {
  copyCredentialsListText,
  CREDENTIALS_LIST_SECRET_FIELDS,
  formatCredentialsListHeaderCount,
  getCredentialsListSafeSummary,
  getCredentialsListSecretFieldValue,
} from "../../02_cK_setup_hlpr/salesPlatformCredentialsList_hlpr.js";
import { getSalesPlatformDisplayName } from "../../02_cK_setup_hlpr/salesPlatformListRow_hlpr.js";
import "../../_styles/cK_setup_session_salesPlatforms/cK_slsPltfListCredentialsPopover.css";

const ROW_ICON_SIZE = 14;
const ACTION_ICON_SIZE = 13;
const SUMMARY_ICON_SIZE = 13;

const SUMMARY_ICONS = {
  loginType: LogIn,
  belongsTo: UserRound,
  requiresOtp: ShieldCheck,
};

const copyKey = (credentialIndex, fieldKey) => `${credentialIndex}:${fieldKey}`;

const CK_slsPltfListCredentialsPopover = ({
  platform,
  anchorEl,
  onClose,
  onOpenCredentials,
  onFetchDetails,
}) => {
  const rootRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0, arrowLeft: "50%" });
  const [arrowAbove, setArrowAbove] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [detailPlatform, setDetailPlatform] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const listCredentials = platform?.loginCredentials ?? [];
  const platformName = getSalesPlatformDisplayName(platform);
  const partnerPortalUrl =
    detailPlatform?.links?.partnerPortalUrl ??
    platform?.links?.partnerPortalUrl ??
    "";
  const credentials =
    detailPlatform?.loginCredentials?.length > 0
      ? detailPlatform.loginCredentials
      : listCredentials;
  const headerCount = formatCredentialsListHeaderCount(credentials.length);

  useEffect(() => {
    if (!platform?._id || !onFetchDetails) return undefined;

    let cancelled = false;
    setIsLoadingDetails(true);
    setDetailsError("");

    onFetchDetails(platform._id)
      .then((data) => {
        if (cancelled) return;
        if (data) setDetailPlatform(data);
        else setDetailsError("Could not load credential details");
      })
      .catch(() => {
        if (!cancelled) setDetailsError("Could not load credential details");
      })
      .finally(() => {
        if (!cancelled) setIsLoadingDetails(false);
      });

    return () => {
      cancelled = true;
    };
  }, [onFetchDetails, platform?._id]);

  useLayoutEffect(() => {
    if (!anchorEl || !platform) return undefined;

    const placePopover = () => {
      if (!anchorEl || !rootRef.current) return;

      const anchorRect = anchorEl.getBoundingClientRect();
      const popoverRect = rootRef.current.getBoundingClientRect();
      const gap = 10;
      let top = anchorRect.top - popoverRect.height - gap;
      let above = true;

      if (top < 8) {
        top = anchorRect.bottom + gap;
        above = false;
      }

      let left = anchorRect.left + anchorRect.width / 2 - popoverRect.width / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - popoverRect.width - 8));

      const anchorCenter = anchorRect.left + anchorRect.width / 2;
      const arrowLeft = Math.max(16, Math.min(anchorCenter - left, popoverRect.width - 16));

      setArrowAbove(above);
      setPos({ top, left, arrowLeft: `${arrowLeft}px` });
    };

    placePopover();
    const raf = requestAnimationFrame(placePopover);
    const onScrollResize = () => placePopover();

    window.addEventListener("resize", onScrollResize);
    window.addEventListener("scroll", onScrollResize, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onScrollResize);
      window.removeEventListener("scroll", onScrollResize, true);
    };
  }, [anchorEl, credentials.length, isLoadingDetails, platform]);

  useEffect(() => {
    if (!anchorEl || !platform) return undefined;

    const onPointerDown = (event) => {
      const el = rootRef.current;
      if (!el) return;
      if (el.contains(event.target)) return;
      if (anchorEl?.contains(event.target)) return;
      onClose?.();
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [anchorEl, onClose, platform]);

  const handleCopy = async (fieldKey, value) => {
    if (!value || value === "-") return;

    try {
      await copyCredentialsListText(value);
      setCopiedKey(fieldKey);
      setTimeout(() => {
        setCopiedKey((current) => (current === fieldKey ? null : current));
      }, 1600);
    } catch {
      setCopiedKey(null);
    }
  };

  if (!anchorEl || !platform) return null;

  const node = (
    <div
      ref={rootRef}
      className={[
        "cK_slsPltfListCredentialsPopover",
        arrowAbove && "cK_slsPltfListCredentialsPopover--flip",
      ]
        .filter(Boolean)
        .join(" ")}
      role="dialog"
      aria-modal="false"
      aria-label={`Login credentials for ${platformName}`}
      style={{ top: pos.top, left: pos.left }}>
      <span
        className="cK_slsPltfListCredentialsPopover__arrow"
        style={{ left: pos.arrowLeft }}
        aria-hidden="true"
      />

      <div className="cK_slsPltfListCredentialsPopover__header">
        <span className="cK_slsPltfListCredentialsPopover__title">
          {headerCount} — {platformName}
        </span>
        <button
          type="button"
          className="cK_slsPltfListCredentialsPopover__closeBtn"
          onClick={onClose}
          aria-label="Close login credentials">
          ×
        </button>
      </div>

      {credentials.length === 0 ? (
        <p className="cK_slsPltfListCredentialsPopover__empty">
          No login credentials saved yet.
        </p>
      ) : (
        <div className="cK_slsPltfListCredentialsPopover__groups">
          {credentials.map((item, index) => {
            const summary = getCredentialsListSafeSummary(item, index);

            return (
              <section
                key={`credential-group-${index}`}
                className="cK_slsPltfListCredentialsPopover__group">
                <h6 className="cK_slsPltfListCredentialsPopover__groupTitle">
                  <KeyRound size={SUMMARY_ICON_SIZE} aria-hidden="true" />
                  {summary.title}
                </h6>

                <ul className="cK_slsPltfListCredentialsPopover__rows">
                  {[
                    { key: "loginType", label: "Login type", value: summary.loginType },
                    { key: "belongsTo", label: "Belongs to", value: summary.belongsTo },
                    { key: "requiresOtp", label: "Requires OTP", value: summary.requiresOtp },
                  ].map((row) => {
                    const RowIcon = SUMMARY_ICONS[row.key];
                    const isEmpty = row.value === "-";

                    return (
                      <li key={row.key} className="cK_slsPltfListCredentialsPopover__row">
                        <span
                          className="cK_slsPltfListCredentialsPopover__rowIcon"
                          title={row.label}
                          aria-label={row.label}>
                          {RowIcon ? (
                            <RowIcon size={ROW_ICON_SIZE} aria-hidden="true" />
                          ) : null}
                        </span>
                        <span
                          className={[
                            "cK_slsPltfListCredentialsPopover__rowValue",
                            isEmpty && "cK_slsPltfListCredentialsPopover__rowValue--empty",
                          ]
                            .filter(Boolean)
                            .join(" ")}>
                          {row.value}
                        </span>
                      </li>
                    );
                  })}

                  {isLoadingDetails ? (
                    <li className="cK_slsPltfListCredentialsPopover__row cK_slsPltfListCredentialsPopover__row--status">
                      <LoaderCircle
                        size={ROW_ICON_SIZE}
                        className="cK_slsPltfListCredentialsPopover__spinner"
                        aria-hidden="true"
                      />
                      <span className="cK_slsPltfListCredentialsPopover__rowValue">
                        Loading secret fields…
                      </span>
                    </li>
                  ) : null}

                  {!isLoadingDetails && detailsError ? (
                    <li className="cK_slsPltfListCredentialsPopover__row cK_slsPltfListCredentialsPopover__row--status">
                      <span className="cK_slsPltfListCredentialsPopover__rowValue cK_slsPltfListCredentialsPopover__rowValue--empty">
                        {detailsError}
                      </span>
                    </li>
                  ) : null}

                  {!isLoadingDetails && !detailsError
                    ? CREDENTIALS_LIST_SECRET_FIELDS.map((field) => {
                        const fieldState = getCredentialsListSecretFieldValue(
                          item,
                          field,
                          partnerPortalUrl,
                        );
                        const fieldCopyKey = copyKey(index, field.key);
                        const isCopied = copiedKey === fieldCopyKey;

                        return (
                          <li
                            key={field.key}
                            className="cK_slsPltfListCredentialsPopover__row">
                            <span
                              className="cK_slsPltfListCredentialsPopover__rowIcon"
                              title={field.label}
                              aria-label={field.label}>
                              <KeyRound size={ROW_ICON_SIZE} aria-hidden="true" />
                            </span>
                            <span
                              className={[
                                "cK_slsPltfListCredentialsPopover__rowValue",
                                !fieldState.hasValue &&
                                  "cK_slsPltfListCredentialsPopover__rowValue--empty",
                              ]
                                .filter(Boolean)
                                .join(" ")}>
                              {fieldState.displayValue}
                            </span>
                            <button
                              type="button"
                              className={[
                                "cK_slsPltfListCredentialsPopover__actionBtn",
                                isCopied &&
                                  "cK_slsPltfListCredentialsPopover__actionBtn--copied",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              title={isCopied ? "Copied" : `Copy ${field.label}`}
                              aria-label={isCopied ? "Copied" : `Copy ${field.label}`}
                              onClick={() =>
                                handleCopy(
                                  fieldCopyKey,
                                  String(fieldState.rawValue ?? "").trim(),
                                )
                              }
                              disabled={!fieldState.hasValue || !field.copyable}>
                              {isCopied ? (
                                <Check size={ACTION_ICON_SIZE} aria-hidden="true" />
                              ) : (
                                <Copy size={ACTION_ICON_SIZE} aria-hidden="true" />
                              )}
                            </button>
                            {fieldState.href ? (
                              <a
                                className="cK_slsPltfListCredentialsPopover__actionBtn cK_slsPltfListCredentialsPopover__actionLink"
                                href={fieldState.href}
                                title={`Open ${field.label}`}
                                aria-label={`Open ${field.label}`}
                                target="_blank"
                                rel="noreferrer">
                                <ExternalLink size={ACTION_ICON_SIZE} aria-hidden="true" />
                              </a>
                            ) : (
                              <span
                                className="cK_slsPltfListCredentialsPopover__actionBtn cK_slsPltfListCredentialsPopover__actionBtn--disabled"
                                aria-hidden="true">
                                <ExternalLink size={ACTION_ICON_SIZE} />
                              </span>
                            )}
                          </li>
                        );
                      })
                    : null}
                </ul>
              </section>
            );
          })}
        </div>
      )}

      <div className="cK_slsPltfListCredentialsPopover__footer">
        <button
          type="button"
          className="cK_slsPltfListCredentialsPopover__openBtn"
          onClick={() => onOpenCredentials?.(platform)}>
          Open credentials
        </button>
      </div>
    </div>
  );

  return createPortal(node, document.body);
};

export default CK_slsPltfListCredentialsPopover;
