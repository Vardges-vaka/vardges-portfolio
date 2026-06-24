import { Plus } from "lucide-react";
import { formatSupportContactTotalLabel } from "../../../02_cK_setup_hlpr/salesPlatformSupportContacts_hlpr.js";

const CK_stp_slsPltf_fld_supportContactControlsCard = ({
  total,
  disabled,
  canShowMore,
  canShowAll,
  canShowLess,
  onAdd,
  onShowMore,
  onShowAll,
  onShowLess,
}) => {
  const totalLabel = formatSupportContactTotalLabel(total);

  return (
    <article className="cK_stp_slsPltf_fld_supportContacts__card cK_stp_slsPltf_fld_supportContacts__card--controls">
      <div className="cK_stp_slsPltf_fld_supportContacts__controlsBody">
        <p className="cK_stp_slsPltf_fld_supportContacts__controlsTotal">
          {totalLabel}
        </p>

        <button
          type="button"
          className="cK_stp_slsPltf_fld_supportContacts__controlsBtn cK_stp_slsPltf_fld_supportContacts__controlsBtn--primary"
          onClick={onAdd}
          disabled={disabled}>
          <Plus size={14} aria-hidden="true" />
          Add contact
        </button>

        <button
          type="button"
          className="cK_stp_slsPltf_fld_supportContacts__controlsBtn"
          onClick={onShowMore}
          disabled={disabled || !canShowMore}>
          Show more
        </button>

        <button
          type="button"
          className="cK_stp_slsPltf_fld_supportContacts__controlsBtn"
          onClick={onShowAll}
          disabled={disabled || !canShowAll}>
          Show all
        </button>

        {canShowLess ? (
          <button
            type="button"
            className="cK_stp_slsPltf_fld_supportContacts__controlsBtn"
            onClick={onShowLess}
            disabled={disabled}>
            Show less
          </button>
        ) : null}
      </div>
    </article>
  );
};

export default CK_stp_slsPltf_fld_supportContactControlsCard;
