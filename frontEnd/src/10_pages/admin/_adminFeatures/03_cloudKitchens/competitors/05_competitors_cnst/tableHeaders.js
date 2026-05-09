export const TABLE_HEADERS = (t = null) => {
  return [
    { text: "#", className: "number", title: "#" },

    {
      text: t ? t("tableheaders.profile.text", "Profile") : "Profile",
      className: "profile",
      title: t
        ? t("tableheaders.name.title", "Name of the Competitor")
        : "Name of the Competitor",
    },
    {
      text: t ? t("tableheaders.cuisine.text", "Cuisine") : "Cuisine",
      className: "cuisineTypes",
      title: t
        ? t(
            "tableheaders.cuisineTypes.title",
            "Cuisine Types of the Competitor",
          )
        : "Cuisine Types of the Competitor",
    },

    /* Fixed-width gap so price + menu columns don’t visually collide when both use --hug */
    {
      text: t
        ? t("tableheaders.competesWithBrands.text", "Competes With Brands")
        : "Competes With Brands",
      className: "competesWithBrands",
      title: t
        ? t(
            "tableheaders.competesWithBrands.title",
            "Competes With other Brands besides ours.",
          )
        : "Competes With other Brands besides ours.",
    },
    {
      text: "",
      className: "priceMenuGutter",
      title: "",
      spacer: true,
    },
    {
      text: t ? t("tableheaders.menu.text", "Menu") : "Menu",
      className: "menu",
      title: t
        ? t("tableheaders.menu.title", "Menu of the Competitor")
        : "Menu of the Competitor",
    },
    {
      text: t
        ? t("tableheaders.menuItemsQnt.text", "Menu items")
        : "Menu items",
      className: "menuItemsQnt",
      title: t
        ? t(
            "tableheaders.menuItemsQnt.title",
            "Number of items on the competitor menu",
          )
        : "Number of items on the competitor menu",
    },
    {
      text: t
        ? t("tableheaders.menuCategoriesQnt.text", "Menu categories")
        : "Menu categories",
      className: "menuCategoriesQnt",
      title: t
        ? t(
            "tableheaders.menuCategoriesQnt.title",
            "Number of categories on the competitor menu",
          )
        : "Number of categories on the competitor menu",
    },
    {
      text: t
        ? t("tableheaders.priceRange.text", "Price Range")
        : "Price Range",
      className: "priceRange",
      title: t
        ? t("tableheaders.priceRange.title", "Price Range of the Competitor")
        : "Price Range of the Competitor",
    },

    {
      text: t ? t("tableheaders.dineIn.text", "Dine-in") : "Dine-in",
      className: "dineIn",
      title: t
        ? t(
            "tableheaders.dineIn.title",
            "Has dine-in available in at least one branch",
          )
        : "Has dine-in available in at least one branch",
    },
    {
      text: t
        ? t("tableheaders.ownDeliveryDubai.text", "Own delivery DXB")
        : "Own delivery DXB",
      className: "ownDeliveryDubai",
      title: t
        ? t(
            "tableheaders.ownDeliveryDubai.title",
            "Runs first-party delivery in Dubai",
          )
        : "Runs first-party delivery in Dubai",
    },

    {
      text: t ? t("tableheaders.branches.text", "Branches") : "Branches",
      className: "branches",
      title: t
        ? t(
            "tableheaders.branches.title",
            "Total number of Branches the Competitor has.",
          )
        : "Total number of Branches the Competitor has.",
    },
    {
      text: t ? t("tableheaders.actions.edit", "Edit") : "Edit",
      className: "actionUpdate",
      title: t
        ? t("tableheaders.actions.editTitle", "Edit all sections")
        : "Edit all sections",
    },
    {
      text: t ? t("tableheaders.actions.overview", "View") : "View",
      className: "actionView",
      title: t
        ? t("tableheaders.actions.overviewTitle", "Open competitor overview")
        : "Open competitor overview",
    },
  ];
};
