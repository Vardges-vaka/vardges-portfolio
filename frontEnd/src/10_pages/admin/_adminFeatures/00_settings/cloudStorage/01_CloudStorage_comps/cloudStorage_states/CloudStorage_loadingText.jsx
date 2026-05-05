import "../../_styles/cloudStorage_loadingText.css";

const CloudStorage_loadingText = ({ t, loading }) => {
  if (!loading) return null;
  return (
    <p className="cloudStorage_loadingText" aria-live="polite">
      {t("loading")}
    </p>
  );
};

CloudStorage_loadingText.displayName = "CloudStorage_loadingText";

export default CloudStorage_loadingText;
