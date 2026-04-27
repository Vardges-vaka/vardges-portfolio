import { Modifiers_list_item } from "./modifiers_childComps/_modifiers_childComps.index.js";
import "../_styles/modifiers_list.css";

const Modifiers_list = ({
  modifiers,
  isLoading,
  error,
  onShowAddForm,
  onView,
  onEdit,
  t,
}) => (
  <div className="modifiersList">
    <div className="modifiersList__header">
      <h2 className="modifiersList__title">{t("title")}</h2>
      <button type="button" className="modifiersList__addBtn" onClick={onShowAddForm}>
        + {t("addModifier")}
      </button>
    </div>

    {error && <p className="modifiersList__error">{error}</p>}
    {isLoading && <p className="modifiersList__loading">{t("loading")}</p>}
    {!isLoading && modifiers.length === 0 && (
      <p className="modifiersList__empty">{t("empty.noModifiers")}</p>
    )}

    <div className="modifiersList__items">
      {modifiers.map((modifier) => (
        <Modifiers_list_item
          key={modifier._id}
          modifier={modifier}
          onView={onView}
          onEdit={onEdit}
          t={t}
        />
      ))}
    </div>
  </div>
);

export default Modifiers_list;
