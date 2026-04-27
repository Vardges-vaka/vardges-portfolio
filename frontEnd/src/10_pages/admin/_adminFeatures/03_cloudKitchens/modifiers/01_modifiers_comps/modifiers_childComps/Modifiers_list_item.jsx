import "../../_styles/modifiers_item.css";

const Modifiers_list_item = ({ modifier, onView, onEdit, t }) => {
  const isActive = modifier?.isActive !== false;
  const nameEn = modifier?.name?.en || t("empty.noValue");
  const typeLabel = t(`enums.type.${modifier?.type || "optional"}`);
  const optionCount = Array.isArray(modifier?.options) ? modifier.options.length : 0;

  return (
    <div className="modifiersListItem">
      <div className="modifiersListItem__main">
        <div className="modifiersListItem__nameBlock">
          <span className="modifiersListItem__name">{nameEn}</span>
          <span
            className={
              "modifiersListItem__badge" +
              (isActive
                ? " modifiersListItem__badge--active"
                : " modifiersListItem__badge--inactive")
            }
          >
            {isActive ? t("badges.active") : t("badges.inactive")}
          </span>
          <span className="modifiersListItem__badge modifiersListItem__badge--type">
            {typeLabel}
          </span>
        </div>
        <span className="modifiersListItem__meta">
          {optionCount} {t("sections.options").toLowerCase()}
        </span>
      </div>

      <div className="modifiersListItem__actions">
        <button
          type="button"
          className="modifiersListItem__btn modifiersListItem__btn--primary"
          onClick={() => onView(modifier._id)}
        >
          {t("actions.view")}
        </button>
        <button
          type="button"
          className="modifiersListItem__btn"
          onClick={() => onEdit(modifier._id)}
        >
          {t("actions.edit")}
        </button>
      </div>
    </div>
  );
};

export default Modifiers_list_item;
