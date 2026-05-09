import {
  PriceRange_Icon,
  Branches_Icon,
  FoodMenu_Icon,
  Competitors_Icon,
  Category_Icon,
  DineIn_Icon,
  Dish_Icon,
  Tags_Icon,
  IsDelivery_Icon,
} from "../../../../../../01_components/components.index.js";
import "../_styles/competitors_tableView.css";
import TemporaryTesting from "./TemporaryTesting.jsx";
import { Competitors_table_rows_provider } from "./competitors_childComps/_competitors_childComps.index.js";
import { TABLE_HEADERS } from "../05_competitors_cnst/_competitors_cnst.index.js";

const Competitors_tableView = ({ states, handlers, compProps, t }) => {
  if (states.session !== "view_competitors_table") return null;
  const { Competitors_table_rows_provider_props } = compProps;
  const tableHeaders = t ? TABLE_HEADERS(t) : TABLE_HEADERS();

  const priceRange_Icon = PriceRange_Icon();
  const branches_Icon = Branches_Icon();
  const foodMenu_Icon = FoodMenu_Icon();
  const competitors_Icon = Competitors_Icon();
  const category_Icon = Category_Icon();
  const dineIn_Icon = DineIn_Icon();
  const dish_Icon = Dish_Icon();
  const tags_Icon = Tags_Icon();
  const isDelivery_Icon = IsDelivery_Icon();

  // ==== Price Range column icon====
  const priceRange_img = (
    <img
      src={priceRange_Icon}
      alt="Price Range"
      title="Price Range"
      aria-label="Price Range"
      className="competitors_tableView__thIcon"
    />
  );

  // ==== Cuisine Types column icon====
  const cuisine__img = (
    <img
      src={tags_Icon}
      alt="Cuisine Types"
      title="Cuisine Types"
      aria-label="Cuisine Types"
      className="competitors_tableView__thIcon"
    />
  );

  // ==== Menu column icon====
  const menu__img = (
    <img
      src={foodMenu_Icon}
      alt="Menu"
      title="Menu"
      aria-label="Menu"
      className="competitors_tableView__thIcon"
    />
  );

  // ==== Dishes column icon====
  const dishes__img = (
    <img
      src={dish_Icon}
      alt="Dish"
      title="Dish"
      aria-label="Dish"
      className="competitors_tableView__thIcon"
    />
  );

  // ==== Categories column icon====
  const categories__img = (
    <img
      src={category_Icon}
      alt="Category"
      title="Category"
      aria-label="Category"
      className="competitors_tableView__thIcon"
    />
  );

  // ==== has dine in column icon====
  const dineIn__img = (
    <img
      src={dineIn_Icon}
      alt="Dine-in"
      title="Dine-in"
      aria-label="Dine-in"
      className="competitors_tableView__thIcon"
    />
  );

  // ==== has delivery column icon====
  const delivery__img = (
    <img
      src={isDelivery_Icon}
      alt="Delivery"
      title="Delivery"
      aria-label="Delivery"
      className="competitors_tableView__thIcon"
    />
  );

  // ==== Competitors column icon====
  const compeats__img = (
    <img
      src={competitors_Icon}
      alt="Price Range"
      title="Price Range"
      aria-label="Price Range"
      className="competitors_tableView__thIcon"
    />
  );

  // ==== Branches column icon====
  const branches__img = (
    <img
      src={branches_Icon}
      alt="Price Range"
      title="Price Range"
      aria-label="Price Range"
      className="competitors_tableView__thIcon"
    />
  );

  return (
    <div className="competitors_tableView">
      <div className="competitors_tableView__header">
        <h1 className="competitors_tableView__title">
          {t ? t("tableView.title", "Competitors") : "Competitors"}
        </h1>
        <TemporaryTesting handler={handlers.temp} />
      </div>

      <div className="competitors_tableView__tableScroll">
        <table className="competitors_tableView__table">
          <thead>
            <tr>
              {tableHeaders.map((header) => {
                const iconByClass = {
                  cuisineTypes: cuisine__img,
                  priceRange: priceRange_img,
                  dineIn: dineIn__img,
                  menu: menu__img,
                  menuItemsQnt: dishes__img,
                  menuCategoriesQnt: categories__img,
                  ownDeliveryDubai: delivery__img,
                  competesWithBrands: compeats__img,
                  branches: branches__img,
                };
                const maybeIcon = iconByClass[header.className];

                return (
                  <th
                    key={`h-${header.className}`}
                    className={`competitors_tableView__th competitors_tableView__th--${header.className}`}
                    title={header.title || undefined}
                    aria-hidden={header.spacer ? true : undefined}>
                    {header.spacer ? "\u00A0" : maybeIcon || header.text}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {states.competitors.map((competitor, rowIndex) => (
              <Competitors_table_rows_provider
                key={competitor._id}
                rowIndex={rowIndex}
                competitor={competitor}
                states={Competitors_table_rows_provider_props.states}
                handlers={Competitors_table_rows_provider_props.handlers}
                t={Competitors_table_rows_provider_props.t}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Competitors_tableView;
