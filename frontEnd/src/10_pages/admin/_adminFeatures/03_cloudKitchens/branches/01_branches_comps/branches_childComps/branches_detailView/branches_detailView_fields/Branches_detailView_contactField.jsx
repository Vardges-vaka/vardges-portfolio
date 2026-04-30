import Branches_detail_sectionShell from "../../Branches_detail_sectionShell.jsx";
import {
  PhoneIcon,
  WhatsAppIcon,
  TelegramIcon,
  EmailIcon,
  ManagerIcon,
} from "../../Branches_icons/_branches_icons.index.js";
import "../../../../_styles/branches_detail_section.css";
import "../../../../_styles/branches_detail_contact.css";

// "Contact" section. Subdoc shape:
//   { ourSupport: { phone, whatsApp, telegram, email },
//     manager:    { name, phone, whatsApp, telegram, email } }
//
// Readonly mode adds click-through launcher buttons next to each populated row:
//   phone    → tel:<digits>
//   whatsApp → https://wa.me/<digits>
//   telegram → https://t.me/<handleOrDigits>
//   email    → mailto:<email>

const digitsOnly = (v) => (v || "").replace(/[^\d+]/g, "").replace(/^\+?/, "");
const stripAt = (v) => (v || "").replace(/^@/, "").trim();

const LAUNCHERS = {
  phone: {
    href: (v) => `tel:+${digitsOnly(v)}`,
    Icon: PhoneIcon,
    ariaKey: "contactActions.call",
  },
  whatsApp: {
    href: (v) => `https://wa.me/${digitsOnly(v)}`,
    Icon: WhatsAppIcon,
    ariaKey: "contactActions.whatsApp",
  },
  telegram: {
    href: (v) => {
      const s = stripAt(v);
      // If the value contains non-digit chars, treat it as a username.
      return /^\+?\d+$/.test(s)
        ? `https://t.me/+${digitsOnly(s)}`
        : `https://t.me/${s}`;
    },
    Icon: TelegramIcon,
    ariaKey: "contactActions.telegram",
  },
  email: {
    href: (v) => `mailto:${(v || "").trim()}`,
    Icon: EmailIcon,
    ariaKey: "contactActions.email",
  },
};

const ActionLaunch = ({ kind, value, t }) => {
  if (!value) return null;
  const spec = LAUNCHERS[kind];
  if (!spec) return null;
  const { Icon } = spec;
  return (
    <a
      className="branchesDetailSection__actionLink"
      href={spec.href(value)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t(spec.ariaKey)} ${value}`}
      title={value}>
      <Icon size={14} />
    </a>
  );
};

const FIELD_META = {
  phone: { label: "fields.phone", Icon: PhoneIcon, type: "tel" },
  whatsApp: { label: "fields.whatsApp", Icon: WhatsAppIcon, type: "tel" },
  telegram: { label: "fields.telegram", Icon: TelegramIcon, type: "text" },
  email: { label: "fields.email", Icon: EmailIcon, type: "email" },
};

const Branches_detailView_contactField = ({
  branch,
  draft,
  isEditing,
  isBulkEdit,
  isCollapsed,
  isEmpty,
  isSaving,
  fieldErrors,
  onEditStart,
  onDraftChange,
  onCancel,
  onSubmit,
  onToggleCollapse,
  t,
}) => {
  const dash = t("empty.noValue");
  const contact = branch?.contact ?? {};
  const ourSupport = contact?.ourSupport ?? {};
  const manager = contact?.manager ?? {};

  const Field = ({ party, fieldKey, value }) => {
    const { label, Icon } = FIELD_META[fieldKey];
    return (
      <>
        <dt className="branchesDetailSection__dt">
          <span className="branchesDetailSection__dtIcon">
            <Icon size={14} />
          </span>
          {t(label)}
        </dt>
        <dd className="branchesDetailSection__dd">
          {value ? (
            <>
              <span>{value}</span>
              <ActionLaunch kind={fieldKey} value={value} t={t} />
            </>
          ) : (
            <span className="branchesDetailSection__dd--empty">{dash}</span>
          )}
        </dd>
      </>
    );
  };

  const InputForKey = ({ party, fieldKey }) => {
    const path = `${party}.${fieldKey}`;
    const err = fieldErrors?.[path];
    const { label, Icon, type } = FIELD_META[fieldKey];
    return (
      <div className="branchesDetailSection__field">
        <label className="branchesDetailSection__label">
          <span className="branchesDetailSection__labelIcon">
            <Icon size={14} />
          </span>
          {t(label)}
        </label>
        <input
          className={
            "branchesDetailSection__input" +
            (err ? " branchesDetailSection__input--error" : "")
          }
          type={type}
          value={draft?.[party]?.[fieldKey] ?? ""}
          onChange={(e) => onDraftChange(path, e.target.value)}
        />
        {err && (
          <p className="branchesDetailSection__fieldError">
            {t(`validation.${err}`, err)}
          </p>
        )}
      </div>
    );
  };

  const renderReadonly = () => (
    <div className="branchesDetailContact__readonly">
      <h4 className="branchesDetailSection__subTitle">
        {t("fields.ourSupport")}
      </h4>
      <dl className="branchesDetailSection__dl">
        <Field party="ourSupport" fieldKey="phone" value={ourSupport.phone} />
        <Field
          party="ourSupport"
          fieldKey="whatsApp"
          value={ourSupport.whatsApp}
        />
        <Field
          party="ourSupport"
          fieldKey="telegram"
          value={ourSupport.telegram}
        />
        <Field party="ourSupport" fieldKey="email" value={ourSupport.email} />
      </dl>

      <h4 className="branchesDetailSection__subTitle">
        <ManagerIcon size={14} /> {t("fields.manager")}
      </h4>
      <dl className="branchesDetailSection__dl">
        <dt className="branchesDetailSection__dt">{t("fields.name")}</dt>
        <dd className="branchesDetailSection__dd">
          {manager.name || (
            <span className="branchesDetailSection__dd--empty">{dash}</span>
          )}
        </dd>
        <Field party="manager" fieldKey="phone" value={manager.phone} />
        <Field party="manager" fieldKey="whatsApp" value={manager.whatsApp} />
        <Field party="manager" fieldKey="telegram" value={manager.telegram} />
        <Field party="manager" fieldKey="email" value={manager.email} />
      </dl>
    </div>
  );

  const renderEditable = () => (
    <>
      <h4 className="branchesDetailSection__subTitle">
        {t("fields.ourSupport")}
      </h4>
      <div className="branchesDetailSection__grid">
        <InputForKey party="ourSupport" fieldKey="phone" />
        <InputForKey party="ourSupport" fieldKey="whatsApp" />
        <InputForKey party="ourSupport" fieldKey="telegram" />
        <InputForKey party="ourSupport" fieldKey="email" />
      </div>

      <h4 className="branchesDetailSection__subTitle">
        <ManagerIcon size={14} /> {t("fields.manager")}
      </h4>
      <div className="branchesDetailSection__grid">
        <div className="branchesDetailSection__field">
          <label className="branchesDetailSection__label">
            <span className="branchesDetailSection__labelIcon">
              <ManagerIcon size={14} />
            </span>
            {t("fields.name")}
          </label>
          <input
            className={
              "branchesDetailSection__input" +
              (fieldErrors?.["manager.name"]
                ? " branchesDetailSection__input--error"
                : "")
            }
            type="text"
            value={draft?.manager?.name ?? ""}
            onChange={(e) => onDraftChange("manager.name", e.target.value)}
          />
          {fieldErrors?.["manager.name"] && (
            <p className="branchesDetailSection__fieldError">
              {t(
                `validation.${fieldErrors["manager.name"]}`,
                fieldErrors["manager.name"],
              )}
            </p>
          )}
        </div>
        <InputForKey party="manager" fieldKey="phone" />
        <InputForKey party="manager" fieldKey="whatsApp" />
        <InputForKey party="manager" fieldKey="telegram" />
        <InputForKey party="manager" fieldKey="email" />
      </div>
    </>
  );

  return (
    <Branches_detail_sectionShell
      rootClass="branchesDetailContact"
      title={t("sections.contact")}
      icon={<PhoneIcon size={16} />}
      isEditing={isEditing}
      isBulkEdit={isBulkEdit}
      isCollapsed={isCollapsed}
      isEmpty={isEmpty}
      isSaving={isSaving}
      onEditStart={onEditStart}
      onDraftChange={onDraftChange}
      onCancel={onCancel}
      onSubmit={onSubmit}
      onToggleCollapse={onToggleCollapse}
      t={t}
      renderReadonly={renderReadonly}
      renderEditable={renderEditable}
    />
  );
};

export default Branches_detailView_contactField;
