import { useCallback } from "react";

export const useAdminDashboard_handlers = ({
  states,
  setters,
  translations,
  navigate,
  isDebug,
}) => {
  const onClickSideBarItem = useCallback(
    (item) => {
      setters.setSubSection(item.path);
      const newPath = `/${translations.language}/admin/dashboard/${states.section}/${item.path}`;
      navigate(newPath);

      isDebug && console.log("onClickSideBarItem: newPath -> ", newPath);
    },
    [setters.setSubSection, states.section, navigate, translations.language]
  );

  const isActive = useCallback(
    (item) => {
      isDebug && console.log("isActive: item -> ", item);
      return states.sideBaritems?.find(
        (item) => item.path === states.original_subSection
      )?.path === item.path
        ? "active"
        : "";
    },
    [states.sideBaritems, states.original_subSection]
  );

  const handleDefaultsubSection = useCallback(() => {
    const defaultSection = states.original_section
      ? states.original_section
      : "settings";
    const defaultSubsection = states.sideBaritems?.find(
      (item) => item.isDefault === true
    );
    isDebug &&
      console.log(
        "handleDefaultsubSection: defaultSubsection -> ",
        defaultSubsection
      );
    setters.setDefaultSubSection(defaultSubsection?.path);
    navigate(
      `/${translations.language}/admin/dashboard/${defaultSection}/${defaultSubsection?.path}`
    );
  }, [
    states.original_section,
    states.sideBaritems,
    setters.setDefaultSubSection,
    navigate,
    translations.language,
  ]);

  const handleDefaultsection = useCallback(() => {
    setters.setSection("settings");
    navigate(`/${translations.language}/admin/dashboard/settings`);
    handleDefaultsubSection();
    isDebug && console.log("handleDefaultsection: settings");
  }, [
    setters.setSection,
    navigate,
    translations.language,
    handleDefaultsubSection,
  ]);

  const handleInitialMount = (section, subSection) => {
    setters.setSection(section);
    setters.setSubSection(subSection);
    const defaultSubsection = states.sideBaritems?.find(
      (item) => item.isDefault === true
    );
    setters.setDefaultSubSection(defaultSubsection?.path);
    isDebug &&
      console.log(
        "handleInitialMount: defaultSubsection -> ",
        defaultSubsection
      );
  };

  const handleSectionChange = useCallback(
    (section, subSection) => {
      isDebug && console.log("handleSectionChange: section -> ", section);
      isDebug && console.log("handleSectionChange: subSection -> ", subSection);
      if (!section) {
        handleDefaultsection();
      } else {
        setters.setSection(section);
      }
      if (!subSection) {
        handleDefaultsubSection();
      } else {
        setters.setSubSection(subSection);
      }
    },
    [
      handleDefaultsection,
      handleDefaultsubSection,
      setters.setSection,
      setters.setSubSection,
    ]
  );

  return {
    handlers: {
      onClickSideBarItem,
      isActive,
      handleDefaultsection,
      handleDefaultsubSection,
      handleInitialMount,
      handleSectionChange,
    },
  };
};
