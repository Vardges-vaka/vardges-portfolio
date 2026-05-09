import { useMemo } from "react";
import "../../../_styles/competitors_table_row_profile.css";
import Competitors_logoModal from "./Competitors_logoModal.jsx";

const Competitors_table_row_profile = ({ competitor, states, handlers, t }) => {
  const src = competitor?.logo || null;
  const name = competitor?.name || "—";
  const competitorId = competitor?._id;

  const titleProfile = t
    ? t("tableRow.detailName", { defaultValue: "Competitor profile" })
    : "Competitor profile";
  const titleLogoPreview = t
    ? t("tableRow.detailLogo", { defaultValue: "Logo preview" })
    : "Logo preview";

  const h = handlers?.handleCompetitorTableAction;
  const openProfile = () => {
    if (!h) return;
    const e = {
      preventDefault: () => {},
      currentTarget: {
        dataset: {
          session: "view_profile",
          competitorId: competitorId,
          editing: "false",
        },
      },
    };
    h(e);
  };

  const openLogoEditor = () => {
    // Move into profile session, then open logo editor.
    openProfile();
    handlers?.handleStartUpdateField?.("logo");
  };

  const canShowModal = useMemo(() => !!src, [src]);
  const isLogoModalOpen =
    String(states?.logoModalCompetitorId ?? "") === String(competitorId ?? "");

  return (
    <div className="competitors_table_row_profile">
      <button
        type="button"
        className="competitors_table_row_profile__logoBtn"
        onClick={() => canShowModal && handlers?.handleOpenLogoModal?.(competitorId)}
        title={titleLogoPreview}
        aria-label={titleLogoPreview}
        disabled={!canShowModal}
      >
        {src ? (
          <>
            <img
              className="competitors_table_row_profile__logoImg"
              src={src}
              alt=""
              loading="lazy"
            />
            <span className="competitors_table_row_profile__magnifier" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="competitors_table_row_profile__magnifierSvg">
                <path
                  fill="currentColor"
                  d="M10 18a8 8 0 1 1 5.29-14.01A8 8 0 0 1 10 18zm0-2a6 6 0 1 0 0-12a6 6 0 0 0 0 12zm8.59 4L14.5 15.91l1.41-1.41L20 18.59L18.59 20z"
                />
              </svg>
            </span>
          </>
        ) : (
          <span className="competitors_table_row_profile__logoPlaceholder">—</span>
        )}
      </button>

      <button
        type="button"
        className="competitors_table_row_profile__nameBtn"
        onClick={openProfile}
        title={titleProfile}
        aria-label={titleProfile}
      >
        {name}
      </button>

      <Competitors_logoModal
        isOpen={isLogoModalOpen}
        competitorName={name}
        logoSrc={src}
        onClose={handlers?.handleCloseLogoModal}
        onUpdate={() => {
          handlers?.handleCloseLogoModal?.();
          openLogoEditor();
        }}
        t={t}
      />
    </div>
  );
};

export default Competitors_table_row_profile;

