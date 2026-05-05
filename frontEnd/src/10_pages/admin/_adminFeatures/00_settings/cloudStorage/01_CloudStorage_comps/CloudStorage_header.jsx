import "../_styles/cloudStorage_header.css";

const CloudStorage_header = ({ t }) => {
  return (
    <div className="page-header">
      <h1 className="page-title">{t("title")}</h1>
      <p className="page-subtitle">{t("subtitle")}</p>
    </div>
  );
};

CloudStorage_header.displayName = "CloudStorage_header";

export default CloudStorage_header;
