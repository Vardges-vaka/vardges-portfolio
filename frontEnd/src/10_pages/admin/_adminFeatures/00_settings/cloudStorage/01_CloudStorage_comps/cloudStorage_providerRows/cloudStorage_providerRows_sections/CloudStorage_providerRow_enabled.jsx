import "../../../_styles/CloudStorage_providerRow_enabled.css";

const CloudStorage_providerRow_enabled = ({ provider, onToggleEnabled }) => {
  return (
    <>
      <div className="toggle-wrap">
        <label className="toggle">
          <input
            type="checkbox"
            checked={provider.enabled}
            onChange={onToggleEnabled}
          />
          <div className="toggle-track" />
          <div className="toggle-thumb" />
        </label>
      </div>
    </>
  );
};

export default CloudStorage_providerRow_enabled;
