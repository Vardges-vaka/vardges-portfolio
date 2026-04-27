import "../../_styles/brands_item.css";

const Brands_list_item = ({
  brand,
  onView,
  onEdit,
  onAddLogo,
  onAddFiles,
  t,
}) => {
  const isActive = brand?.isActive !== false;
  const tagline = brand?.tagline || t("empty.noValue");

  return (
    <div className="brandsListItem">
      <div className="brandsListItem__main">
        <div className="brandsListItem__nameBlock">
          <span className="brandsListItem__name">{brand.name}</span>
          <span
            className={
              "brandsListItem__badge" +
              (isActive
                ? " brandsListItem__badge--active"
                : " brandsListItem__badge--inactive")
            }
          >
            {isActive ? t("badges.active") : t("badges.inactive")}
          </span>
        </div>
        <span className="brandsListItem__tagline">{tagline}</span>
      </div>

      <div className="brandsListItem__actions">
        <button
          type="button"
          className="brandsListItem__btn brandsListItem__btn--primary"
          onClick={() => onView(brand._id)}
        >
          {t("actions.view")}
        </button>
        <button
          type="button"
          className="brandsListItem__btn"
          onClick={() => onEdit(brand._id)}
        >
          {t("actions.edit")}
        </button>
        <button
          type="button"
          className="brandsListItem__btn"
          onClick={() => onAddLogo(brand._id)}
          title={t("viewModes.comingSoon")}
        >
          {t("actions.addLogo")}
        </button>
        <button
          type="button"
          className="brandsListItem__btn"
          onClick={() => onAddFiles(brand._id)}
          title={t("viewModes.comingSoon")}
        >
          {t("actions.addFiles")}
        </button>
      </div>
    </div>
  );
};

export default Brands_list_item;
