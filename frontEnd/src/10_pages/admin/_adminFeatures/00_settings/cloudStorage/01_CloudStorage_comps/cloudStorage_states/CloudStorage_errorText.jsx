import "../../_styles/cloudStorage_errorText.css";

const CloudStorage_errorText = ({ t, loading, error }) => {
  if (!error) return null;
  if (loading) return null;

  return (
    <p className="cloudStorage_errorText" role="alert">
      {t(error, { defaultValue: error })}
    </p>
  );
};

CloudStorage_errorText.displayName = "CloudStorage_errorText";

export default CloudStorage_errorText;
