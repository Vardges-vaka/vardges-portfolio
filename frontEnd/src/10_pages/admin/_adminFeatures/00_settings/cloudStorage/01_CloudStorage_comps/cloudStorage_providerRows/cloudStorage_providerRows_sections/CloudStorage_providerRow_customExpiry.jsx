import "../../../_styles/CloudStorage_providerRow_customExpiry.css";

const CloudStorage_providerRow_customExpiry = ({
  provider,
  onToggleExpiry,
}) => {
  return (
    <>
      {" "}
      <div className="expiry-wrap">
        <div
          className={`expiry-checkbox${provider.customExpiry ? " checked" : ""}`}
          onClick={onToggleExpiry}
          title="Toggle custom expiry"
        />
        <div className="expiry-info-btn">
          i
          <div className="expiry-tooltip">
            Allow requests with a custom signed-URL expiry time (e.g. large
            PDFs, videos).
          </div>
        </div>
      </div>
    </>
  );
};

export default CloudStorage_providerRow_customExpiry;
