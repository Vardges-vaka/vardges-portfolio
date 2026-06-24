import {
  Input_email,
  Input_text,
  Input_textArea,
  Input_tel,
  Input_workingHours,
} from "../../../../../../../../01_components/_components.index.js";
import "../../../_styles/cK_setup_session_salesPlatforms/ck_setup_salesPlatform_fields/cK_stp_slsPltf_fld.css";

const CK_stp_slsPltf_fld_kam = ({ states, handlers }) => {
  const kam = states.values?.kam ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <section className="cK_stp_slsPltf_fld cK_stp_slsPltf_fld--kam">
      <div className="cK_stp_slsPltf_fld__row">
        <Input_text
          labelProps={{ isActive: true, message: "KAM name" }}
          value={kam.name ?? ""}
          onChange={set("kam.name")}
          placeholder="Account manager name"
        />
        <Input_email
          labelProps={{ isActive: true, message: "KAM email" }}
          value={kam.email ?? ""}
          onChange={set("kam.email")}
          placeholder="name@platform.com"
        />
      </div>

      <div className="cK_stp_slsPltf_fld__row">
        <Input_tel
          kind="phone"
          labelProps={{ isActive: true, message: "KAM phone" }}
          hintsProps={{ isActive: false }}
          value={kam.phone ?? ""}
          onChange={set("kam.phone")}
        />
        <Input_tel
          kind="whatsApp"
          labelProps={{ isActive: true, message: "WhatsApp" }}
          hintsProps={{ isActive: false }}
          value={kam.whatsApp ?? ""}
          onChange={set("kam.whatsApp")}
        />
      </div>

      <div className="cK_stp_slsPltf_fld__row cK_stp_slsPltf_fld__row--hoursTelegram">
        <Input_workingHours
          labelProps={{ isActive: true, message: "Working hours" }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message: "Pick active days, then set open and close times.",
          }}
          value={kam.hours ?? ""}
          onChange={set("kam.hours")}
        />
        <Input_tel
          kind="telegram"
          labelProps={{ isActive: true, message: "Telegram" }}
          hintsProps={{ isActive: false }}
          defaultTelegramMode="username"
          value={kam.telegram ?? ""}
          onChange={set("kam.telegram")}
        />
      </div>

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

export default CK_stp_slsPltf_fld_kam;
