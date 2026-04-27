import { FileIcon } from "../Brands_icons/_brands_icons.index.js";
import "../../_styles/brands_detail_files.css";

const Brands_detail_files = ({ t }) => (
  <div className="brandsDetailFiles">
    <FileIcon size={22} />
    <h3 className="brandsDetailFiles__title">{t("placeholders.filesTitle")}</h3>
    <p className="brandsDetailFiles__description">
      {t("placeholders.filesDescription")}
    </p>
  </div>
);

export default Brands_detail_files;
