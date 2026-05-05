import "../../../_styles/cloudStorage_logoPanel_currentLogo.css";

const CloudStorage_logoPanel_currentLogo = ({ hasLogo, currentLogoUrl }) => {
  if (!hasLogo || !currentLogoUrl) return null;
  return (
    <div className="cloudStorage_logoPanel_currentLogoWrap">
      <div className="panel-title">Current Logo</div>
      <div className="cloudStorage_logoPanel_currentLogoBox">
        <img
          src={currentLogoUrl}
          alt="Current logo"
          className="cloudStorage_logoPanel_currentLogoImg"
        />
      </div>
    </div>
  );
};

export default CloudStorage_logoPanel_currentLogo;
