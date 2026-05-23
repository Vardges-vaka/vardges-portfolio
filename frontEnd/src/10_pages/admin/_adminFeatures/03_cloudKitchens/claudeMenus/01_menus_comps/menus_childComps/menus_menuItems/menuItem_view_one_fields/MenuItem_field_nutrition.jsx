import "../../../../_styles/menus_childComps/menus_menuItems/menuItem_view_one_fields/menuItem_field_nutrition.css";
import { Pencil } from "lucide-react";

const MenuItem_field_nutrition = ({
  states,
  handlers,
  childProps,
  t,
  menuItem,
}) => {
  if (!menuItem || !menuItem.nutrition) return null;
  const { nutrition } = menuItem;
  /*
    nutrition: {
    source: NUTRITION_SOURCES[1],
    calories: 180,
    protein: 3,
    carbs: 5,
    fat: 8,
    lastCalculatedAt: nutrition_lastCalculatedAt_samples[1],
  },
  */
  return (
    <div className="menuItem_field_nutrition">
      <div className="menuItem_field_nutrition_label">
        <label>Nutrition</label>
        <div className="menuItem_field_nutrition_controlls">
          <button title="Edit">
            <Pencil size={20} />
          </button>
        </div>
      </div>
      <div className="menuItem_field_nutrition_versions">
        <div className="menuItem_field_nutrition_version source">
          <label htmlFor="source">Source</label>
          <input
            type="text"
            name="source"
            id="source"
            value={nutrition.source}
            className="menuItem_field_nutrition_input"
            onChange={() => console.log("onchange", e)}
            readOnly={true}
          />
        </div>
        <div className="menuItem_field_nutrition_version lastCalculatedAt">
          <label htmlFor="lastCalculatedAt">Calculated At</label>
          <input
            type="text"
            name="lastCalculatedAt"
            id="lastCalculatedAt"
            value={nutrition.lastCalculatedAt}
            className="menuItem_field_nutrition_input"
            onChange={() => console.log("onchange", e)}
            readOnly={true}
          />
        </div>
        <div className="menuItem_field_nutrition_version calories">
          <label htmlFor="calories">calories</label>
          <input
            type="number"
            name="calories"
            id="calories"
            value={nutrition.calories}
            className="menuItem_field_nutrition_input"
            readOnly={true}
          />
        </div>
        <div className="menuItem_field_nutrition_version protein">
          <label htmlFor="protein">Protein</label>
          <input
            type="number"
            name="protein"
            id="protein"
            value={nutrition.protein}
            className="menuItem_field_nutrition_input"
            readOnly={true}
          />
        </div>
        <div className="menuItem_field_nutrition_version carbs">
          <label htmlFor="carbs">Carbs</label>
          <input
            type="number"
            name="carbs"
            id="carbs"
            value={nutrition.carbs}
            className="menuItem_field_nutrition_input"
            onChange={() => console.log("onchange", e)}
            readOnly={true}
          />
        </div>
        <div className="menuItem_field_nutrition_version fat">
          <label htmlFor="fat">Fat</label>
          <input
            type="number"
            name="fat"
            id="fat"
            value={nutrition.fat}
            className="menuItem_field_nutrition_input"
            onChange={() => console.log("onchange", e)}
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItem_field_nutrition;
