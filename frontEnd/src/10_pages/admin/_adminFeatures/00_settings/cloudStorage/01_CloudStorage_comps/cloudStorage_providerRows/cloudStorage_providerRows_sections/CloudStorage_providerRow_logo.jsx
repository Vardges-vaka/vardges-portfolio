import { IconPencil, IconArrowUp } from "../../_CloudStorage_comps.index.js";

import "../../../_styles/cloudStorage_providerRow_logo.css";

const CloudStorage_providerRow_logo = ({ provider, onToggleUpload }) => {
  return (
    <>
      {provider.hasLogo ? (
        <div className="logo-img-wrap" onClick={onToggleUpload}>
          <div
            className="logo-img"
            style={{
              background: `linear-gradient(135deg, ${provider.logoColor}22, ${provider.logoColor}44)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {provider.logoUrl ? (
              <img
                src={provider.logoUrl}
                alt={`${provider.name} logo`}
                style={{
                  width: 40,
                  height: 40,
                  objectFit: "contain",
                  borderRadius: 4,
                }}
              />
            ) : (
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill={provider.logoColor}>
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
              </svg>
            )}
          </div>
          <div className="logo-update-overlay">
            <IconPencil size={18} />
          </div>
        </div>
      ) : (
        <button
          className="logo-add-btn"
          onClick={onToggleUpload}
          title="Add logo">
          <IconArrowUp size={16} />
          Add
        </button>
      )}
    </>
  );
};

export default CloudStorage_providerRow_logo;
