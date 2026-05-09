import "../_styles/competitors_header.css";
import Competitors_viewToggle from "./Competitors_viewToggle.jsx";

const Competitors_header = ({ states, handlers, compProps, t }) => {
  const sessions = [
    { label: "Profile", value: "view_profile" },
    { label: "Cuisine Types", value: "view_cuisineTypes" },
    { label: "Price Range", value: "view_priceRange" },
    { label: "Menu", value: "view_menu" },
    { label: "Competes With Brands", value: "view_competesWithBrands" },
    { label: "Branches", value: "view_branches" },
    { label: "Full View", value: "view_competitor" },
    {
      label: "Our Competitors in a Table View",
      value: "view_competitors_table",
    },
    { label: "Map View", value: "view_competitors_map" },
  ];
  const { Competitors_viewToggle_props } = compProps;
  const currentTitle = sessions.find(
    (session) => session.value === states.session,
  )?.label;
  return (
    <div className="competitors_header">
      <Competitors_viewToggle
        states={Competitors_viewToggle_props.states}
        handlers={Competitors_viewToggle_props.handlers}
        compProps={Competitors_viewToggle_props.compProps}
        t={Competitors_viewToggle_props.t}
      />

      <h1>
        {currentTitle}
        {states.isEditing ? " Editing" : ""}
        <button type="button" onClick={handlers.handleGoBack}>
          Go Back
        </button>
      </h1>
    </div>
  );
};

export default Competitors_header;
