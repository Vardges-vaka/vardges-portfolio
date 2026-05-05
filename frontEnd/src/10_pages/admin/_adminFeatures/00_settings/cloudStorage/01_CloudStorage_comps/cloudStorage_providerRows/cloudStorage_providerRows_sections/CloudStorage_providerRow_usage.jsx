import "../../../_styles/CloudStorage_providerRow_usage.css";

const CloudStorage_providerRow_usage = ({ provider }) => {
  return (
    <>
      {" "}
      {provider.monitorLoading ? (
        <div className="usage-loading" aria-label="Loading usage">
          <span className="usage-loading-line" />
          <span className="usage-loading-bar" />
        </div>
      ) : provider.usageSummary?.hasData ? (
        <div
          className="usage-meter"
          title={`${provider.usageSummary.usedLabel} / ${provider.usageSummary.leftLabel}`}>
          <div className="usage-meter-copy">
            <span>{provider.usageSummary.usedLabel}</span>
            <span>{provider.usageSummary.leftLabel}</span>
          </div>
          <div className="usage-bar-track">
            <div
              className="usage-bar-fill"
              style={{
                width: `${provider.usageSummary.percentage.toFixed(1)}%`,
              }}
            />
          </div>
        </div>
      ) : (
        <span className="usage-empty">
          {provider.implemented ? "No data" : "N/A"}
        </span>
      )}
    </>
  );
};

export default CloudStorage_providerRow_usage;
