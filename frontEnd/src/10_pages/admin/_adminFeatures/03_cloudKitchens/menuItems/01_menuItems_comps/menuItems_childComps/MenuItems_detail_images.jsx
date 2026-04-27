import "../../_styles/menuItems_detail_images.css";

const IMAGE_SLOTS = ["aggregators", "website", "google", "original", "icon"];

const MenuItems_detail_images = ({ t }) => (
  <div className="menuItemsDetailImages">
    <h3 className="menuItemsDetailImages__title">{t("sections.images")}</h3>
    <p className="menuItemsDetailImages__hint">{t("placeholders.imagesDescription")}</p>
    <div className="menuItemsDetailImages__slots">
      {IMAGE_SLOTS.map((slot) => (
        <div key={slot} className="menuItemsDetailImages__slot">
          <div className="menuItemsDetailImages__preview" />
          <span className="menuItemsDetailImages__label">{t(`channels.${slot}`) || slot}</span>
        </div>
      ))}
    </div>
  </div>
);

export default MenuItems_detail_images;
