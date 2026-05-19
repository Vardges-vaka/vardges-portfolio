const MENU_TBL_HDRS = () => {
  return [
    { label: "#", className: "number", title: "#" },
    { label: "Label", className: "label", title: "Menu Label" },
    { label: "Status", className: "status", title: "Is Menu Active ?" },
    {
      label: "Description",
      className: "description",
      title: "Menu description",
    },
    { label: "Who Owns", className: "ownerType", title: "Who Owns the Menu ?" },
    {
      label: "Categories",
      className: "categories",
      title: "Number of Categories in the menu.",
    },
    {
      label: "Dishes",
      className: "dishes",
      title: "Number of Menu Items in the menu.",
    },
    {
      label: "Modifiers",
      className: "modifiers",
      title: "Number of Modifiers in the menu.",
    },
    {
      label: "Options",
      className: "options",
      title: "Number of Options in the menu.",
    },
    {
      label: "Today's Sales",
      className: "ownerType",
      title: "Who Owns the Menu ?",
    },
    // { label: "Monthly Sales", className: "ownerType", title: "Who Owns the Menu ?" },
    {
      label: "Created By",
      className: "ownerType",
      title: "Who Owns the Menu ?",
    },
    {
      label: "Created At",
      className: "ownerType",
      title: "Who Owns the Menu ?",
    },
    {
      label: "Updated By",
      className: "ownerType",
      title: "Who Owns the Menu ?",
    },
    {
      label: "Updated At",
      className: "ownerType",
      title: "Who Owns the Menu ?",
    },
    // { label: "Sales", className: "ownerType", title: "Who Owns the Menu ?" },

    { label: "Update", className: "update", title: "Update the Menu" },
    { label: "View", className: "view", title: "View the Menu" },
    { label: "Dropdown", className: "dropdown", title: "Dropdown the Menu" },

    /*
                  <td className="menus_view_all_table_rows_provider_cell">
                {rowIndex + 1}
              </td>
    
    */
  ];
};

export default MENU_TBL_HDRS;
