const TemporaryTesting = ({ handler }) => {
  return null;
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

  return (
    <div className="temporaryTesting">
      {sessions.map((session) => (
        <button
          key={session.value}
          type="button"
          onClick={handler}
          data-value={session.value}>
          {session.label}
        </button>
      ))}
    </div>
  );
};

export default TemporaryTesting;
