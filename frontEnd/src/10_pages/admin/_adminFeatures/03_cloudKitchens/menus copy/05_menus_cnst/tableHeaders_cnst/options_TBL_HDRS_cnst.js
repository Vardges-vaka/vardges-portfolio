const OPTIONS_TBL_HDRS = () => {
  return [
    { label: "#", className: "index", title: "#" },
    {
      label: "Image",
      className: "image",
      title: "Menu Item Modifier Option's Image",
    },
    { label: "Name", className: "name", title: "Menu Item Name" },
    { label: "Owner", className: "ownerType", title: "Modifier Owner" },
    {
      label: "Description",
      className: "description",
      title: "Menu Item Selling Price",
    },
    {
      label: "Modifiers",
      className: "modifiers",
      title: "Used by Menu Modifiers",
    },
    { label: "Price", className: "price", title: "Menu Item Selling Price" },
    { label: "Cost", className: "cost", title: "Menu Item Cost" },
    {
      label: "Is Free",
      className: "isFree",
      title: "Is Modifier Free or Paid",
    },
    {
      label: "Nutrition",
      className: "nutrition",
      title: "Menu Item Nutrition",
    },
    {
      label: "Recipe",
      className: "recipeFile",
      title: "Modifier Options Recipe Files",
    },
    {
      label: "TechCard",
      className: "techCardFile",
      title: "Modifier Options Technical Cards Files",
    },
    { label: "Update", className: "update", title: "Update the Menu Item" },
    { label: "View", className: "view", title: "View the Menu Item" },
    { label: "Dropdown", className: "dropdown", title: "Quick Look" },
  ];
};

export default OPTIONS_TBL_HDRS;

/*



    // !   1) index +1
    { label: "#", className: "index", title: "#" }, 
    // !   2) oprion.images.main || Add Images btn
    { label: "Image", className: "image", title: "Menu Item Modifier Option's Image", },
    // !   3) oprion.name.label
    { label: "Name", className: "name", title: "Menu Item Name" },
    // !   4) oprion.ownerType
    { label: "Owner", className: "ownerType", title: "Modifier Owner" },
    // !   5) oprion.description.short
    { label: "Description", className: "description", title: "Menu Item Selling Price", },
    // !   6) oprion.availableInModifiers
    { label: "Modifiers", className: "modifiers", title: "Used by Menu Modifiers", },
    // !   8) oprion.sellingPrice.gross
    { label: "Price", className: "price", title: "Menu Item Selling Price" },
    // !   9) oprion.cost.estimatedCost
    { label: "Cost", className: "cost", title: "Menu Item Cost" },
    // !   10) oprion.isFree
    { label: "Is Free", className: "isFree", title: "Is Modifier Free or Paid", },
    // !   11) oprion.nutrition.calories + kcal
    { label: "Nutrition", className: "nutrition", title: "Menu Item Nutrition", },
    // !   12) oprion.recipeFile btn
    { label: "Recipe", className: "recipeFile", title: "Modifier Options Recipe Files", },
    // !   13) oprion.techCardFile btn
    { label: "TechCard", className: "techCardFile", title: "Modifier Options Technical Cards Files", },
    // !   ) Seperate Components
    { label: "Update", className: "update", title: "Update the Menu Item" },
    // !   14) Seperate Components
    { label: "View", className: "view", title: "View the Menu Item" },
    // !   15) Seperate Components
    { label: "Dropdown", className: "dropdown", title: "Quick Look" },
*/
