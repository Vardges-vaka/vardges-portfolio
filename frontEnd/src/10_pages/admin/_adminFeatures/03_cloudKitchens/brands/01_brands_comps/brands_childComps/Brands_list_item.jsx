import "../../_styles/brands_item.css";
import {
  getBrandDisplayName,
  getBrandTagline,
} from "../../02_brands_helpers/_brands_helpers.index.js";

const Brands_list_item = ({
  brand,
  onView,
  onEdit,
  onAddLogo,
  onAddFiles,
  t,
}) => {
  const isActive = brand?.isActive !== false;
  const name = getBrandDisplayName(brand);
  const tagline = getBrandTagline(brand) || t("empty.noValue");

  return (
    <div className="brandsListItem">
      <div className="brandsListItem_main">
        <div className="brandsListItem_nameBlock">
          <span className="brandsListItem_name">{name}</span>
          <span
            className={
              "brandsListItem_badge" +
              (isActive
                ? " brandsListItem_badge--active"
                : " brandsListItem_badge--inactive")
            }>
            {isActive ? t("badges.active") : t("badges.inactive")}
          </span>
        </div>
        <span className="brandsListItem_tagline">{tagline}</span>
      </div>

      <div className="brandsListItem_actions">
        <button
          type="button"
          className="brandsListItem_btn brandsListItem_btn--primary"
          onClick={() => onView(brand._id)}>
          {t("actions.view")}
        </button>
        <button
          type="button"
          className="brandsListItem_btn"
          onClick={() => onEdit(brand._id)}>
          {t("actions.edit")}
        </button>
        <button
          type="button"
          className="brandsListItem_btn"
          onClick={() => onAddLogo(brand._id)}
          title={t("viewModes.comingSoon")}>
          {t("actions.addLogo")}
        </button>
        <button
          type="button"
          className="brandsListItem_btn"
          onClick={() => onAddFiles(brand._id)}
          title={t("viewModes.comingSoon")}>
          {t("actions.addFiles")}
        </button>
      </div>
    </div>
  );
};

export default Brands_list_item;
