import {
  Input_email,
  Input_password,
  Input_text,
  Input_textArea,
  Input_tel,
  Select_static,
  Toggler,
} from "../../../../../../../../01_components/_components.index.js";

const LOGIN_TYPE_OPTIONS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
];

const CK_stp_slsPltf_fld_loginCredentialEdit = ({
  index,
  item,
  disabled,
  onChange,
  onSave,
  onCancel,
  isSaving,
}) => {
  const set = (name) => (e) => onChange?.(name, e.target.value);
  const setBool = (name) => (e) => onChange?.(name, e.target.checked);

  return (
    <div className="cK_stp_slsPltf_fld_loginCredentials__editPanel">
      <Input_text
        labelProps={{ isActive: true, message: "Label" }}
        value={item?.label ?? ""}
        onChange={set(`loginCredentials.${index}.label`)}
        placeholder='e.g. "Vardges main"'
        disabled={disabled}
      />

      <div className="cK_stp_slsPltf_fld__row">
        <Input_text
          labelProps={{ isActive: true, message: "Username" }}
          value={item?.username ?? ""}
          onChange={set(`loginCredentials.${index}.username`)}
          placeholder="Username"
          disabled={disabled}
        />
        <Input_password
          kind="AuthLogIn"
          labelProps={{ isActive: true, message: "Password" }}
          hintsProps={{ isActive: false }}
          value={item?.password ?? ""}
          onChange={set(`loginCredentials.${index}.password`)}
          placeholder="Password"
          disabled={disabled}
        />
      </div>

      <div className="cK_stp_slsPltf_fld__row">
        <Input_email
          labelProps={{ isActive: true, message: "Login email" }}
          value={item?.email ?? ""}
          onChange={set(`loginCredentials.${index}.email`)}
          placeholder="login@email.com"
          disabled={disabled}
        />
        <Input_tel
          kind="phone"
          labelProps={{ isActive: true, message: "Login phone" }}
          hintsProps={{ isActive: false }}
          value={item?.phone ?? ""}
          onChange={set(`loginCredentials.${index}.phone`)}
          disabled={disabled}
        />
      </div>

      <div className="cK_stp_slsPltf_fld__row">
        <Select_static
          labelProps={{ isActive: true, message: "Login type" }}
          options={LOGIN_TYPE_OPTIONS}
          placeholder="Pick login type…"
          value={item?.loginType ?? ""}
          onChange={set(`loginCredentials.${index}.loginType`)}
          disabled={disabled}
        />
        <Input_text
          labelProps={{ isActive: true, message: "Belongs to" }}
          value={item?.belongsTo?.name ?? ""}
          onChange={set(`loginCredentials.${index}.belongsTo.name`)}
          placeholder="Person or role name"
          disabled={disabled}
        />
      </div>

      <div className="cK_stp_slsPltf_fld__row cK_stp_slsPltf_fld__row--single">
        <Toggler
          labelProps={{
            isActive: true,
            message: "Requires OTP",
            position: "inline",
            inlinePosition: "after",
          }}
          checked={Boolean(item?.requiresOtp)}
          onChange={setBool(`loginCredentials.${index}.requiresOtp`)}
          disabled={disabled}
        />
      </div>

      <Input_textArea
        labelProps={{ isActive: true, message: "Notes" }}
        rows={2}
        value={item?.notes ?? ""}
        onChange={set(`loginCredentials.${index}.notes`)}
        placeholder="Access notes, 2FA details, etc."
        disabled={disabled}
      />

      <div className="cK_stp_slsPltf_fld_loginCredentials__editActions">
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
          {isSaving ? "Saving…" : "Save credential"}
        </button>
      </div>
    </div>
  );
};

export default CK_stp_slsPltf_fld_loginCredentialEdit;
