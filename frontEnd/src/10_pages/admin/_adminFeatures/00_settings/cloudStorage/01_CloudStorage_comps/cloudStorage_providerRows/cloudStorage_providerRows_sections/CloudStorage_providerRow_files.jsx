import "../../../_styles/cloudStorage_providerRow_files.css";

const CloudStorage_providerRow_files = ({ provider }) => {
  return (
    <>
      {provider.monitorLoading ? (
        <div className="files-loading" aria-label="Loading files">
          <span className="files-loading-count" />
          <span className="files-loading-size" />
        </div>
      ) : provider.filesSummary?.hasData ? (
        <div
          className="files-summary"
          title={`${provider.filesSummary.countLabel} / ${provider.filesSummary.sizeLabel}`}>
          <span className="files-summary-count">
            {provider.filesSummary.countLabel}
          </span>
          <span className="files-summary-size">
            {provider.filesSummary.sizeLabel}
          </span>
        </div>
      ) : (
        <span className="files-empty">
          {provider.implemented ? "No data" : "N/A"}
        </span>
      )}
    </>
  );
};

export default CloudStorage_providerRow_files;
