const MENU_ITEMS_TBL_HDRS = () => {
  return [
    { label: "#", className: "index", title: "#" },
    { label: "Image", className: "image", title: "Menu Item Image" },
    { label: "Category", className: "category", title: "Menu Item Category" },
    { label: "Name", className: "name", title: "Menu Item Name" },
    { label: "Price", className: "price", title: "Menu Item Selling Price" },
    { label: "Cost", className: "cost", title: "Menu Item Cost" },
    {
      label: "Prep Time",
      className: "preparationTimeMin",
      title: "Menu Item Preparation Time",
    },
    { label: "Owner", className: "ownerType", title: "Menu Item Owner" },
    {
      label: "Nutrition",
      className: "nutrition",
      title: "Menu Item Nutrition",
    },
    {
      label: "Dietary Tags",
      className: "dietaryTags",
      title: "Menu Item Dietary Tags",
    },
    {
      label: "Allergens",
      className: "allergens",
      title: "Menu Item Allergens",
    },
    {
      label: "Modifiers ?",
      className: "modifiers",
      title: "Does Menu Item has modifiers",
    },
    {
      label: "Mirrored",
      className: "mirroredWithOtherMenuItems",
      title: "Menu Item Mirrored With Other Menu Items",
    },
    {
      label: "Competes",
      className: "competesWithOtherMenuItems",
      title: "Menu Item Competes With Other Menu Items",
    },
    { label: "Update", className: "update", title: "Update the Menu Item" },
    { label: "View", className: "view", title: "View the Menu Item" },
    {
      label: "Dropdown",
      className: "dropdown",
      title: "Dropdown the Menu Item",
    },
  ];
};

export default MENU_ITEMS_TBL_HDRS;
