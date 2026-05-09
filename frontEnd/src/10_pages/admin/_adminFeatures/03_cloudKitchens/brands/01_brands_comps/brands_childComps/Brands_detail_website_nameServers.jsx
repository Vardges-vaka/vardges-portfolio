import "../../_styles/brands_detail_website_sub.css";

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const Brands_detail_website_nameServers = ({
  draft,
  fieldErrors = {},
  onDraftChange,
  t,
}) => {
  const nameServers = draft?.nameServers ?? [];

  const handleAddNameServer = () => {
    onDraftChange("nameServers", [...nameServers, ""]);
  };

  const handleRemoveNameServer = (index) => {
    onDraftChange(
      "nameServers",
      nameServers.filter((_, i) => i !== index),
    );
  };

  const handleNameServerChange = (index, value) => {
    const updated = [...nameServers];
    updated[index] = value;
    onDraftChange("nameServers", updated);
  };

  return (
    <div className="brandsDetailWebsiteSub_section">
      <div className="brandsDetailWebsiteSub_header">
        <h4 className="brandsDetailWebsiteSub_title">
          {t("sections.nameServers")}
        </h4>
        <button
          type="button"
          className="brandsDetailWebsiteSub_addBtn"
          onClick={handleAddNameServer}>
          {t("actions.addNameServer")}
        </button>
      </div>

      {nameServers.length === 0 ? (
        <p className="brandsDetailWebsiteSub_empty">
          {t("empty.noNameServers")}
        </p>
      ) : (
        <div className="brandsDetailWebsiteSub_array">
          {nameServers.map((ns, index) => (
            <div key={index} className="brandsDetailWebsiteSub_arrayRow">
              <input
                className="brandsDetailWebsiteSub_input"
                type="text"
                value={ns ?? ""}
                onChange={(e) => handleNameServerChange(index, e.target.value)}
                placeholder={t("fields.nameServerPlaceholder")}
              />
              <button
                type="button"
                className="brandsDetailWebsiteSub_removeBtn"
                onClick={() => handleRemoveNameServer(index)}>
                {t("actions.remove")}
              </button>
              {fieldErrors?.[`nameServers[${index}]`] && (
                <small className="brandsDetailWebsiteSub_error">
                  {errorText(t, fieldErrors[`nameServers[${index}]`])}
                </small>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Brands_detail_website_nameServers;
