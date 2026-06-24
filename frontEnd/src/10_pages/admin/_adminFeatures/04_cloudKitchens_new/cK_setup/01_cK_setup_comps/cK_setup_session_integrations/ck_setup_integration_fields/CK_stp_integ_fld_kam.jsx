import {
  Input_text,
  Input_textArea,
} from "../../../../../../../../01_components/_components.index.js";
import "../../../_styles/cK_setup_session_integrations/ck_setup_integration_fields/cK_stp_integ_fld.css";

const CK_stp_integ_fld_kam = ({ states, handlers }) => {
  const kam = states.values?.kam ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <section className="cK_stp_integ_fld cK_stp_integ_fld--kam">
      <div className="cK_stp_integ_fld__row">
        <Input_text
          labelProps={{ isActive: true, message: "KAM name" }}
          value={kam.name ?? ""}
          onChange={set("kam.name")}
          placeholder="Account manager name"
        />
        <Input_text
          type="email"
          labelProps={{ isActive: true, message: "KAM email" }}
          value={kam.email ?? ""}
          onChange={set("kam.email")}
          placeholder="name@vendor.com"
        />
      </div>

      <div className="cK_stp_integ_fld__row">
        <Input_text
          type="tel"
          labelProps={{ isActive: true, message: "KAM phone" }}
          value={kam.phone ?? ""}
          onChange={set("kam.phone")}
          placeholder="+971…"
        />
        <Input_text
          type="tel"
          labelProps={{ isActive: true, message: "WhatsApp" }}
          value={kam.whatsApp ?? ""}
          onChange={set("kam.whatsApp")}
          placeholder="+971…"
        />
        <Input_text
          labelProps={{ isActive: true, message: "Telegram" }}
          value={kam.telegram ?? ""}
          onChange={set("kam.telegram")}
          placeholder="@username"
        />
      </div>

      <Input_text
        labelProps={{ isActive: true, message: "Working hours" }}
        value={kam.hours ?? ""}
        onChange={set("kam.hours")}
        placeholder="e.g. Sun–Thu 9:00–18:00"
      />

      <Input_textArea
        labelProps={{ isActive: true, message: "Notes" }}
        rows={3}
        value={kam.notes ?? ""}
        onChange={set("kam.notes")}
        placeholder="Relationship notes, escalation paths, etc."
        maxLength={500}
        lengthProps={{ isActive: true }}
      />
    </section>
  );
};

export default CK_stp_integ_fld_kam;
