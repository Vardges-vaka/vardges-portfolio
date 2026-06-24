import {
  Input_email,
  Input_text,
  Input_tel,
  Input_workingHours,
} from "../../../../../../../../01_components/_components.index.js";

const CK_stp_slsPltf_fld_supportContactEdit = ({
  index,
  item,
  disabled,
  onChange,
  onSave,
  onCancel,
  isSaving,
}) => {
  const set = (name) => (e) => onChange?.(name, e.target.value);

  return (
    <div className="cK_stp_slsPltf_fld_supportContacts__editPanel">
      <Input_text
        labelProps={{ isActive: true, message: "Label" }}
        value={item?.label ?? ""}
        onChange={set(`support.${index}.label`)}
        placeholder="e.g. general, billing, technical"
        disabled={disabled}
      />

      <div className="cK_stp_slsPltf_fld__row">
        <Input_email
          labelProps={{ isActive: true, message: "Email" }}
          value={item?.email ?? ""}
          onChange={set(`support.${index}.email`)}
          placeholder="support@platform.com"
          disabled={disabled}
        />
        <Input_tel
          kind="phone"
          labelProps={{ isActive: true, message: "Phone" }}
          hintsProps={{ isActive: false }}
          value={item?.phone ?? ""}
          onChange={set(`support.${index}.phone`)}
          disabled={disabled}
        />
      </div>

      <div className="cK_stp_slsPltf_fld__row">
        <Input_tel
          kind="whatsApp"
          labelProps={{ isActive: true, message: "WhatsApp" }}
          hintsProps={{ isActive: false }}
          value={item?.whatsApp ?? ""}
          onChange={set(`support.${index}.whatsApp`)}
          disabled={disabled}
        />
        <Input_workingHours
          labelProps={{ isActive: true, message: "Hours" }}
          value={item?.hours ?? ""}
          onChange={set(`support.${index}.hours`)}
          disabled={disabled}
        />
      </div>

      <div className="cK_stp_slsPltf_fld_supportContacts__editActions">
        <button
          type="button"
          className="cK_stp_slsPltf_fld__ghostBtn"
          onClick={onCancel}
          disabled={disabled || isSaving}>
          Cancel
        </button>
        <button
          type="button"
          className="cK_stp_slsPltf_fld__ghostBtn"
          onClick={onSave}
          disabled={disabled || isSaving}>
          {isSaving ? "Saving…" : "Save contact"}
        </button>
      </div>
    </div>
  );
};

export default CK_stp_slsPltf_fld_supportContactEdit;
