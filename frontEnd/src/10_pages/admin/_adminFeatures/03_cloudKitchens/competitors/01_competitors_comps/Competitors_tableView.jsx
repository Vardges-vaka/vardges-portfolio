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
  Files_Icon,
  Images_Icon,
  Street_Icon,
  Contact_Icon,
  Notes_Icon,
  Ratings_Icon,
  SocialMedia_Icon,
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
  const files_Icon = Files_Icon();
  const images_Icon = SocialMedia_Icon();
  // hhh
  const street_Icon = Contact_Icon();
  const notes_Icon = Ratings_Icon();

  // ==== Price Range column icon====
  const priceRange_img = (
    <img
      src={priceRange_Icon}
      alt=""
      aria-hidden="true"
      className="Competitors_tableView_thIcon"
    />
  );

  // ==== Cuisine Types column icon====
  const cuisine__img = (
    <img
      src={tags_Icon}
      alt=""
      aria-hidden="true"
      className="Competitors_tableView_thIcon"
    />
  );

  // ==== Menu column icon====
  const menu__img = (
    <img
      src={foodMenu_Icon}
      alt=""
      aria-hidden="true"
      className="Competitors_tableView_thIcon"
    />
  );

  // ==== Dishes column icon====
  const dishes__img = (
    <img
      src={dish_Icon}
      alt=""
      aria-hidden="true"
      className="Competitors_tableView_thIcon"
    />
  );

  // ==== Categories column icon====
  const categories__img = (
    <img
      src={category_Icon}
      alt=""
      aria-hidden="true"
      className="Competitors_tableView_thIcon"
    />
  );

  // ==== has dine in column icon====
  const dineIn__img = (
    <img
      src={dineIn_Icon}
      alt=""
      aria-hidden="true"
      className="Competitors_tableView_thIcon"
    />
  );

  // ==== has delivery column icon====
  const delivery__img = (
    <img
      src={isDelivery_Icon}
      alt=""
      aria-hidden="true"
      className="Competitors_tableView_thIcon"
    />
  );

  // ==== Competitors column icon====
  const compeats__img = (
    <img
      src={competitors_Icon}
      alt=""
      aria-hidden="true"
      className="Competitors_tableView_thIcon"
    />
  );

  // ==== Branches column icon====
  const branches__img = (
    <img
      src={branches_Icon}
      alt=""
      aria-hidden="true"
      className="Competitors_tableView_thIcon"
    />
  );

  const files__img = (
    <img
      src={files_Icon}
      alt=""
      aria-hidden="true"
      className="Competitors_tableView_thIcon"
    />
  );

  const socials__img = (
    <img
      src={images_Icon}
      alt=""
      aria-hidden="true"
      className="Competitors_tableView_thIcon"
    />
  );

  const contact__img = (
    <img
      src={street_Icon}
      alt=""
      aria-hidden="true"
      className="Competitors_tableView_thIcon"
    />
  );

  const reviews__img = (
    <img
      src={notes_Icon}
      alt=""
      aria-hidden="true"
      className="Competitors_tableView_thIcon"
    />
  );

  return (
    <div className="Competitors_tableView">
      <div className="Competitors_tableView_header">
        <h1 className="Competitors_tableView_title">
          {t ? t("tableView.title", "Competitors") : "Competitors"}
        </h1>
        <TemporaryTesting handler={handlers.temp} />
      </div>

      <div className="Competitors_tableView_tableScroll">
        <table className="Competitors_tableView_table">
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
                  files: files__img,
                  socials: socials__img,
                  contact: contact__img,
                  reviews: reviews__img,
                };
                const maybeIcon = iconByClass[header.className];
                const hoverLabel =
                  (header.title && String(header.title).trim()) ||
                  header.text ||
                  "";

                return (
                  <th
                    key={`h-${header.className}`}
                    scope="col"
                    className={`Competitors_tableView_th Competitors_tableView_th_${header.className}`}
                    {...(maybeIcon ? { "aria-label": hoverLabel } : {})}>
                    {maybeIcon ? (
                      <span className="Competitors_tableView_thHoverWrap">
                        <span className="Competitors_tableView_thIconSlot">
                          {maybeIcon}
                        </span>
                        <span
                          className="Competitors_tableView_thHoverLabel"
                          aria-hidden="true">
                          {hoverLabel}
                        </span>
                      </span>
                    ) : (
                      header.text || header.title || "\u00A0"
                    )}
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
