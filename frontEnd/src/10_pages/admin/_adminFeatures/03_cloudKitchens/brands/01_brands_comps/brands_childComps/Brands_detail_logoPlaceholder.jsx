import { ImageIcon } from "../Brands_icons/_brands_icons.index.js";
import "../../_styles/brands_detail_logoPlaceholder.css";

const Brands_detail_logoPlaceholder = ({ t }) => (
  <div className="brandsDetailLogoPlaceholder">
    <ImageIcon size={22} />
    <h3 className="brandsDetailLogoPlaceholder__title">
      {t("placeholders.logoTitle")}
    </h3>
    <p className="brandsDetailLogoPlaceholder__description">
      {t("placeholders.logoDescription")}
    </p>
  </div>
);

export default Brands_detail_logoPlaceholder;
