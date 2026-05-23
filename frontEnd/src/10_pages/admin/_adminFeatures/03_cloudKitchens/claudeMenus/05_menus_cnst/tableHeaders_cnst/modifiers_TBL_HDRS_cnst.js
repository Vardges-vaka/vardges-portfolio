const MODIFIERS_TBL_HDRS = () => {
  return [
    //! 1) index +1
    { label: "#", className: "index", title: "#" },
    //! 2) modifier.availableInMenuItems
    {
      label: "Menu Items",
      className: "ownerType",
      title: "Used by Menu Items",
    },
    //! 3) modifier.title.label
    { label: "Name", className: "name", title: "Menu Item Name" },
    //! 4) modifier.description.short
    {
      label: "Description",
      className: "description",
      title: "Menu Item Selling Price",
    },
    //! 5) modifier.options.option.images.main || No Options Added
    { label: "Options", className: "options", title: "Modifier Options" },
    //! 6) modifier.ownerType
    { label: "Owner", className: "ownerType", title: "Modifier Owner" },
    //! 7) modifier.activeTimings.isAlwaysActive || modifier.activeTimings.windows[0].label
    {
      label: "Active Timings",
      className: "activeTimings",
      title: "Modifier's Active Timings",
    },
    //! 8) modifier.isOptional
    {
      label: "Is Optional",
      className: "isOptional",
      title: "Is Modifier Optional or Mandatory",
    },
    //! 9) modifier.selectionMode
    {
      label: "Selection Mode",
      className: "selectionMode",
      title: "How many options can be selected",
    },
    //! 10) modifier.isFree
    {
      label: "Is Free",
      className: "isFree",
      title: "Is Modifier Free or Paid",
    },
    //! 11)Seperate Components
    { label: "Update", className: "update", title: "Update the Menu Item" },
    //! 12) Seperate Components
    { label: "View", className: "view", title: "View the Menu Item" },
    //! 13 Seperate Components
    { label: "Dropdown", className: "dropdown", title: "Quick Look" },
  ];
};

export default MODIFIERS_TBL_HDRS;

/*


    //! 1) index +1    
    { label: "#", className: "index", title: "#" },
    //! 2) modifier.availableInMenuItems
    { label: "Menu Items", className: "ownerType", title: "Used by Menu Items" },
    //! 3) modifier.title.label
    { label: "Name", className: "name", title: "Menu Item Name" },
    //! 4) modifier.description.short
    { label: "Description", className: "description", title: "Menu Item Selling Price", },
    //! 5) modifier.options.option.images.main || No Options Added
    { label: "Options", className: "options", title: "Modifier Options" },
    //! 6) modifier.ownerType
    { label: "Owner", className: "ownerType", title: "Modifier Owner" },
    //! 7) modifier.activeTimings.isAlwaysActive || modifier.activeTimings.windows[0].label 
    { label: "Active Timings", className: "activeTimings", title: "Modifier's Active Timings", },
    //! 8) modifier.isOptional
    { label: "Is Optional", className: "isOptional", title: "Is Modifier Optional or Mandatory", },
    //! 9) modifier.selectionMode
    { label: "Selection Mode", className: "selectionMode", title: "How many options can be selected", },
    //! 10) modifier.isFree
    { label: "Is Free", className: "isFree", title: "Is Modifier Free or Paid", },
    //! 11)Seperate Components
    { label: "Update", className: "update", title: "Update the Menu Item" },
    //! 12) Seperate Components
    { label: "View", className: "view", title: "View the Menu Item" },
    //! 13 Seperate Components
    { label: "Dropdown", className: "dropdown", title: "Quick Look", },


*/

/*
const MOCK_MODIFIER_6 = {
  _id: "1.1.6",
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  title: {
    label: "Modifier 6",
  },
  description: {
    short: "Sixth modifier summary.",
    long: "Details about the sixth modifier and its capabilities.",
  },
  isOptional: false,
  selectionMode: MODIFIER_SELECTION_MODES[1],
  isFree: false,
  options: [
    { option: { ...MOCK_OPTION_3 }, displayOrder: 0 },
    { option: { ...MOCK_OPTION_5 }, displayOrder: 1 },
    { option: { ...MOCK_OPTION_8 }, displayOrder: 2 },
  ],
  isActive: true,
  activeTimings: sampleOfIsActiveTimings_1,
  displayOrder: 6,
  isDeleted: false,
  deletedAt: null,
  availableInMenuItems: [
    "Fluffy Pancakes",
    "Italian Gelato",
    "Molten Chocolate Fondant",
    "New York Cheesecake",
    "Panna Cotta",
    "Sweet Vareniki with Cherries",
  ],
  createdBy: "Vardges",
  updatedBy: "Boutros",
};
*/
