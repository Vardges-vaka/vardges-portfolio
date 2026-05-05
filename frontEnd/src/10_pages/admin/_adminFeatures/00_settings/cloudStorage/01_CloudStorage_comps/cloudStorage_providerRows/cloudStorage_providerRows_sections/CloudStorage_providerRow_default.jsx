import "../../../_styles/CloudStorage_providerRow_default.css";

const CloudStorage_providerRow_default = ({ provider, onSetDefault }) => {
  return (
    <>
      <div className="default-radio-wrap">
        <div
          className={`default-radio${provider.isDefault ? " active" : ""}`}
          onClick={onSetDefault}
          title="Set as default"
        />
      </div>
    </>
  );
};

export default CloudStorage_providerRow_default;
