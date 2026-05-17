import "../_styles/competitors_header.css";
import Competitors_viewToggle from "./Competitors_viewToggle.jsx";

const Competitors_header = ({ states, handlers, compProps, t }) => {
  const sessions = [
    {
      label: t
        ? t("header.sessions.profile", { defaultValue: "Profile" })
        : "Profile",
      value: "view_profile",
    },
    {
      label: t
        ? t("header.sessions.cuisineTypes", { defaultValue: "Cuisine Types" })
        : "Cuisine Types",
      value: "view_cuisineTypes",
    },
    {
      label: t
        ? t("header.sessions.priceRange", { defaultValue: "Price Range" })
        : "Price Range",
      value: "view_priceRange",
    },
    {
      label: t ? t("header.sessions.menu", { defaultValue: "Menu" }) : "Menu",
      value: "view_menu",
    },
    {
      label: t
        ? t("header.sessions.competesWithBrands", {
            defaultValue: "Competes With Brands",
          })
        : "Competes With Brands",
      value: "view_competesWithBrands",
    },
    {
      label: t
        ? t("header.sessions.branches", { defaultValue: "Branches" })
        : "Branches",
      value: "view_branches",
    },
    {
      label: t ? t("header.sessions.files", { defaultValue: "Files" }) : "Files",
      value: "view_files",
    },
    {
      label: t
        ? t("header.sessions.socials", { defaultValue: "Socials" })
        : "Socials",
      value: "view_socials",
    },
    {
      label: t
        ? t("header.sessions.contact", { defaultValue: "Contact" })
        : "Contact",
      value: "view_contact",
    },
    {
      label: t
        ? t("header.sessions.reviews", { defaultValue: "Ratings & reviews" })
        : "Ratings & reviews",
      value: "view_reviews",
    },
    {
      label: t
        ? t("header.sessions.fullView", { defaultValue: "Full View" })
        : "Full View",
      value: "view_competitor",
    },
    {
      label: t
        ? t("header.sessions.tableView", {
            defaultValue: "Our Competitors in a Table View",
          })
        : "Our Competitors in a Table View",
      value: "view_competitors_table",
    },
    {
      label: t
        ? t("header.sessions.mapView", { defaultValue: "Map View" })
        : "Map View",
      value: "view_competitors_map",
    },
  ];
  const { Competitors_viewToggle_props } = compProps;
  const currentTitle = sessions.find(
    (session) => session.value === states.session,
  )?.label;
  return (
    <div className="Competitors_header">
      <Competitors_viewToggle
        states={Competitors_viewToggle_props.states}
        handlers={Competitors_viewToggle_props.handlers}
        compProps={Competitors_viewToggle_props.compProps}
        t={Competitors_viewToggle_props.t}
      />

      <h1>
        {currentTitle}
        {states.isEditing
          ? t
            ? t("header.editingSuffix", { defaultValue: " Editing" })
            : " Editing"
          : ""}
        <button type="button" onClick={handlers.handleGoBack}>
          {t ? t("header.goBack", { defaultValue: "Go Back" }) : "Go Back"}
        </button>
      </h1>
    </div>
  );
};

export default Competitors_header;
