import { Input_text } from "../../../../../../../../01_components/_components.index.js";
import "../../../_styles/cK_setup_session_integrations/ck_setup_integration_fields/cK_stp_integ_fld.css";

const EMPTY_SUPPORT_CONTACT = {
  label: "",
  email: "",
  phone: "",
  whatsApp: "",
  hours: "",
};

const CK_stp_integ_fld_support = ({ states, handlers }) => {
  const items = states.values?.support ?? [];
  const isEditOpen = Boolean(states.isEditOpen);
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <section className="cK_stp_integ_fld cK_stp_integ_fld--support">
      <div className="cK_stp_integ_fld__cardHead">
        <h5 className="cK_stp_integ_fld__cardTitle">Support contacts</h5>
        {isEditOpen ? (
          <button
            type="button"
            className="cK_stp_integ_fld__ghostBtn"
            onClick={() =>
              handlers.onChange?.("support", [
                ...items,
                { ...EMPTY_SUPPORT_CONTACT },
              ])
            }>
            + Add contact
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <p className="cK_stp_integ_fld__empty">No support contacts yet.</p>
      ) : (
        items.map((item, index) => (
          <div key={`support-${index}`} className="cK_stp_integ_fld__card">
            {isEditOpen ? (
              <>
                <div className="cK_stp_integ_fld__cardHead">
                  <h5 className="cK_stp_integ_fld__cardTitle">
                    Contact {index + 1}
                  </h5>
                  <button
                    type="button"
                    className="cK_stp_integ_fld__ghostBtn cK_stp_integ_fld__ghostBtn_danger"
                    onClick={() =>
                      handlers.onChange?.(
                        "support",
                        items.filter((_, i) => i !== index),
                      )
                    }>
                    Remove
                  </button>
                </div>

                <Input_text
                  labelProps={{ isActive: true, message: "Label" }}
                  value={item?.label ?? ""}
                  onChange={set(`support.${index}.label`)}
                  placeholder="e.g. Billing, Technical"
                />

                <div className="cK_stp_integ_fld__row">
                  <Input_text
                    type="email"
                    labelProps={{ isActive: true, message: "Email" }}
                    value={item?.email ?? ""}
                    onChange={set(`support.${index}.email`)}
                    placeholder="support@vendor.com"
                  />
                  <Input_text
                    type="tel"
                    labelProps={{ isActive: true, message: "Phone" }}
                    value={item?.phone ?? ""}
                    onChange={set(`support.${index}.phone`)}
                  />
                  <Input_text
                    type="tel"
                    labelProps={{ isActive: true, message: "WhatsApp" }}
                    value={item?.whatsApp ?? ""}
                    onChange={set(`support.${index}.whatsApp`)}
                  />
                </div>

                <Input_text
                  labelProps={{ isActive: true, message: "Hours" }}
                  value={item?.hours ?? ""}
                  onChange={set(`support.${index}.hours`)}
                  placeholder="e.g. 24/7 or Sun–Thu 9:00–18:00"
                />
              </>
            ) : (
              <>
                <Input_text
                  readOnly
                  labelProps={{
                    isActive: true,
                    message: item?.label?.trim?.() || `Contact ${index + 1}`,
                  }}
                  value={item?.label ?? ""}
                />
                <div className="cK_stp_integ_fld__row">
                  <Input_text
                    readOnly
                    type="email"
                    labelProps={{ isActive: true, message: "Email" }}
                    value={item?.email ?? "—"}
                  />
                  <Input_text
                    readOnly
                    type="tel"
                    labelProps={{ isActive: true, message: "Phone" }}
                    value={item?.phone ?? "—"}
                  />
                </div>
              </>
            )}
          </div>
        ))
      )}
    </section>
  );
};

export default CK_stp_integ_fld_support;
