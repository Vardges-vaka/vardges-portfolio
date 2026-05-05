import { IconPencil, IconCopy } from "../../_CloudStorage_comps.index.js";
import { LinkTo_Icon } from "../../../../../../../../01_components/components.index.js";

import "../../../_styles/cloudStorage_providerRow_url.css";

const CloudStorage_providerRow_url = ({
  provider,
  copied,
  urlEditing,
  setUrlValue,
  urlValue,
  handleSaveUrl,
  handleCancelUrl,
  setUrlEditing,
  handleCopyUrl,
}) => {
  const linkIcon = LinkTo_Icon();
  const linktoConsole = () => {
    window.open(provider.consoleUrl, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      {urlEditing ? (
        <div className="url-input-wrap">
          <input
            className="url-input"
            value={urlValue}
            placeholder="https://console.example.com/..."
            onChange={(e) => setUrlValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveUrl();
              if (e.key === "Escape") handleCancelUrl();
            }}
            autoFocus
          />
          <button className="url-save-btn" onClick={handleSaveUrl}>
            Save
          </button>
          <button className="url-cancel-btn" onClick={handleCancelUrl}>
            Cancel
          </button>
        </div>
      ) : !provider.consoleUrl ? (
        <div className="url-cell">
          <button className="url-add-btn" onClick={() => setUrlEditing(true)}>
            + Add URL
          </button>
        </div>
      ) : (
        <div className="url-cell">
          <button
            className="url-icon-btn url"
            onClick={linktoConsole}
            title="Click to open console in new tab">
            <img src={linkIcon} alt="Link to" className="link-to-url-icon" />
          </button>{" "}
          <button
            className="url-icon-btn"
            onClick={handleCopyUrl}
            title="Copy URL"
            style={{ position: "relative" }}>
            <IconCopy size={20} />
            <span className={`copy-tooltip${copied ? " show" : ""}`}>
              ✓ Copied
            </span>
          </button>
          <button
            className="url-icon-btn"
            onClick={() => setUrlEditing(true)}
            title="Edit URL">
            <IconPencil size={20} />
          </button>
        </div>
      )}
    </>
  );
};

export default CloudStorage_providerRow_url;
