import { Plus } from "lucide-react";
import { formatLoginCredentialTotalLabel } from "../../../02_cK_setup_hlpr/integrationLoginCredentials_hlpr.js";

const CK_stp_integ_fld_loginCredentialControlsCard = ({
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
  const totalLabel = formatLoginCredentialTotalLabel(total);

  return (
    <article className="cK_stp_integ_fld_loginCredentials__card cK_stp_integ_fld_loginCredentials__card--controls">
      <div className="cK_stp_integ_fld_loginCredentials__controlsBody">
        <p className="cK_stp_integ_fld_loginCredentials__controlsTotal">
          {totalLabel}
        </p>

        <button
          type="button"
          className="cK_stp_integ_fld_loginCredentials__controlsBtn cK_stp_integ_fld_loginCredentials__controlsBtn--primary"
          onClick={onAdd}
          disabled={disabled}>
          <Plus size={14} aria-hidden="true" />
          Add credential
        </button>

        <button
          type="button"
          className="cK_stp_integ_fld_loginCredentials__controlsBtn"
          onClick={onShowMore}
          disabled={disabled || !canShowMore}>
          Show more
        </button>

        <button
          type="button"
          className="cK_stp_integ_fld_loginCredentials__controlsBtn"
          onClick={onShowAll}
          disabled={disabled || !canShowAll}>
          Show all
        </button>

        {canShowLess ? (
          <button
            type="button"
            className="cK_stp_integ_fld_loginCredentials__controlsBtn"
            onClick={onShowLess}
            disabled={disabled}>
            Show less
          </button>
        ) : null}
      </div>
    </article>
  );
};

export default CK_stp_integ_fld_loginCredentialControlsCard;
