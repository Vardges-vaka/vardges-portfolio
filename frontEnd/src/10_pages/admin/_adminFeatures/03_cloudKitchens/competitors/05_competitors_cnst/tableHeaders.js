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
        ? t("tableheaders.cuisineTypes.title", "Cuisine Types")
        : "Cuisine Types",
    },

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
      text: t ? t("tableheaders.menu.text", "Menu") : "Menu",
      className: "menu",
      title: t ? t("tableheaders.menu.title", "Menu") : "Menu",
    },
    {
      text: t
        ? t("tableheaders.menuItemsQnt.text", "Menu items")
        : "Menu items",
      className: "menuItemsQnt",
      title: t
        ? t("tableheaders.menuItemsQnt.title", "Menu items")
        : "Menu items",
    },
    {
      text: t
        ? t("tableheaders.menuCategoriesQnt.text", "Menu categories")
        : "Menu categories",
      className: "menuCategoriesQnt",
      title: t
        ? t("tableheaders.menuCategoriesQnt.title", "Menu categories")
        : "Menu categories",
    },
    {
      text: t
        ? t("tableheaders.priceRange.text", "Price Range")
        : "Price Range",
      className: "priceRange",
      title: t
        ? t("tableheaders.priceRange.title", "Price Range")
        : "Price Range",
    },

    {
      text: t ? t("tableheaders.dineIn.text", "Dine-in") : "Dine-in",
      className: "dineIn",
      title: t
        ? t("tableheaders.dineIn.title", "Has dine-in available")
        : "Has dine-in available",
    },
    {
      text: t
        ? t("tableheaders.ownDeliveryDubai.text", "Own delivery DXB")
        : "Own delivery DXB",
      className: "ownDeliveryDubai",
      title: t
        ? t("tableheaders.ownDeliveryDubai.title", "Runs first-party delivery")
        : "Runs first-party delivery",
    },

    {
      text: t ? t("tableheaders.branches.text", "Branches") : "Branches",
      className: "branches",
      title: t ? t("tableheaders.branches.title", "Branches") : "Branches",
    },
    {
      text: t ? t("tableheaders.files.text", "Files") : "Files",
      className: "files",
      title: t
        ? t(
            "tableheaders.files.title",
            "Number of files attached to this competitor",
          )
        : "Number of files attached to this competitor",
    },
    {
      text: t ? t("tableheaders.socials.text", "Socials") : "Socials",
      className: "socials",
      title: t
        ? t(
            "tableheaders.socials.title",
            "Social profiles and links for this competitor",
          )
        : "Social profiles and links for this competitor",
    },
    {
      text: t ? t("tableheaders.contact.text", "Contact") : "Contact",
      className: "contact",
      title: t
        ? t("tableheaders.contact.title", "Contact details for this competitor")
        : "Contact details for this competitor",
    },
    {
      text: t
        ? t("tableheaders.reviews.text", "Ratings & reviews")
        : "Ratings & reviews",
      className: "reviews",
      title: t
        ? t(
            "tableheaders.reviews.title",
            "Average rating and review counts across platforms",
          )
        : "Average rating and review counts across platforms",
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
