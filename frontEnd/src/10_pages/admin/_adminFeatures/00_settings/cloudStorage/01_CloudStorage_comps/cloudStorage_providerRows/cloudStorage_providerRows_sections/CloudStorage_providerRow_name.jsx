import "../../../_styles/cloudStorage_providerRow_name.css";

const CloudStorage_providerRow_name = ({ provider }) => {
  return (
    <div className="provider-name-cell">
      <span className="provider-name">{provider.name}</span>
      {provider.isDefault && <span className="badge-default">Default</span>}
    </div>
  );
};

export default CloudStorage_providerRow_name;
