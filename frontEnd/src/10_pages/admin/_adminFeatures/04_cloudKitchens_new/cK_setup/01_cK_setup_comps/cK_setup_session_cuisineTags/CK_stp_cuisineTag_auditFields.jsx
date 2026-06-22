import {
  formatAuditDate,
  hasAuditUserName,
  isCuisineTagDeleted,
  resolveAuditUserName,
} from "../../02_cK_setup_hlpr/cuisineTagAudit_hlpr.js";
import "../../_styles/cK_setup_session_cuisineTags/ck_setup_cuisineTag_fields/cK_stp_cuisineTag_auditFields.css";

const CK_stp_cuisineTag_auditFields = ({ tag }) => {
  const isDeleted = isCuisineTagDeleted(tag);

  const items = [`Created by ${resolveAuditUserName(tag?.createdBy)}`];

  if (hasAuditUserName(tag?.updatedBy)) {
    items.push(`Updated by ${resolveAuditUserName(tag?.updatedBy)}`);
  }

  if (isDeleted) {
    items.push("Deleted");
    if (hasAuditUserName(tag?.deletedBy)) {
      items.push(`Deleted by ${resolveAuditUserName(tag?.deletedBy)}`);
    }
    const deletedAt = formatAuditDate(tag?.deletedAt);
    if (deletedAt !== "—") items.push(deletedAt);
    if (tag?.deletedReason) items.push(tag.deletedReason);
  }

  return (
    <p className="cK_stp_cuisineTag_auditFields">
      {items.map((text, index) => (
        <span key={`${text}-${index}`} className="cK_stp_cuisineTag_auditFields__item">
          {index > 0 ? (
            <span className="cK_stp_cuisineTag_auditFields__sep" aria-hidden="true">
              ·
            </span>
          ) : null}
          {text}
        </span>
      ))}
    </p>
  );
};

export default CK_stp_cuisineTag_auditFields;
