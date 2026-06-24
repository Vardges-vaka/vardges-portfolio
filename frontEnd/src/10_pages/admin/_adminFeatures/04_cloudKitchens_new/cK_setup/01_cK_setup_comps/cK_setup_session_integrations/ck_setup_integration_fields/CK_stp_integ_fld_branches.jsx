import { Input_text } from "../../../../../../../../01_components/_components.index.js";
import "../../../_styles/cK_setup_session_integrations/ck_setup_integration_fields/cK_stp_integ_fld.css";

const CK_stp_integ_fld_branches = ({ states, handlers }) => {
  const ids = (states.values?.branches ?? []).join(", ");

  return (
    <section className="cK_stp_integ_fld cK_stp_integ_fld--branches">
      <Input_text
        labelProps={{ isActive: true, message: "Branch IDs (comma-separated)" }}
        hintsProps={{
          isActive: true,
          type: "hint",
          message: "Read-only relation preview. Full relation editor coming soon.",
        }}
        value={ids}
        readOnly={!states.isEditOpen}
        onChange={(e) =>
          handlers.onChange?.(
            "branches",
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          )
        }
        placeholder="MongoDB ObjectId list"
      />
    </section>
  );
};

export default CK_stp_integ_fld_branches;
