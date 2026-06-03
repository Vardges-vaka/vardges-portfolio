import { useCallback } from "react";

export const useCK_setup_handlers = ({
  states,
  setters,
  refs,
  apiHelpers,
  t,
  TOAST,
  brands,
  channels,
  cuisineTags,
  salesPlatforms,
}) => {
  const handleSessionChange = useCallback(
    (session) => {
      console.log("session", session);
      setters.setActiveSession(session.value);
    },
    [setters.setActiveSession],
  );

  const handleInitialFetch = useCallback(
    async (session) => {
      switch (session) {
        case "brands":
          await brands.handlers.handleinitialfetch();
          break;
        case "cuisineTags":
          await cuisineTags.handlers.handleinitialfetch();
          break;
        case "salesPlatforms":
          await salesPlatforms.handlers.handleinitialfetch();
          break;
        case "channels":
          await channels.handlers.handleinitialfetch();
          break;
        default:
          break;
      }
    },
    [
      brands.handlers.handleinitialfetch,
      cuisineTags.handlers.handleinitialfetch,
      salesPlatforms.handlers.handleinitialfetch,
      channels.handlers.handleinitialfetch,
    ],
  );
  const handleAddNew = useCallback(async () => {
    console.log("handleAddNew");
    // let activeSession = brands.handlers;
    // if (activeSession === "brands") {
    //   activeSession = cuisineTags.handlers;
    // } else if (activeSession === "cuisineTags") {
    //   activeSession = salesPlatforms.handlers;
    // } else if (activeSession === "salesPlatforms") {
    //   activeSession = channels.handlers;
    // }
    // activeSession.handleAddnew();
    switch (states.activeSession) {
      case "brands":
        await brands.handlers.handleAddnew();
        break;
      case "cuisineTags":
        await cuisineTags.handlers.handleAddnew();
        break;
      case "salesPlatforms":
        await salesPlatforms.handlers.handleAddnew();
        break;
      case "channels":
        await channels.handlers.handleAddnew();
        break;
      default:
        break;
    }
  }, [
    brands.handlers.handleaddnew,
    cuisineTags.handlers.handleaddnew,
    salesPlatforms.handlers.handleaddnew,
    channels.handlers.handleaddnew,
    states.activeSession,
  ]);

  const initiateModalOpening = useCallback(
    (e) => {
      console.log("handleModalOnConfirm");
      const { operation } = e.currentTarget.dataset;
      console.log("initiateModalOpening operation", operation);
      if (operation === "update") {
        setters.setActiveOperation("update");
        setters.setUpdateModalIsOpen(true);
      } else if (operation === "delete") {
        setters.setActiveOperation("delete");
        setters.setDeleteModalIsOpen(true);
      } else if (operation === "image") {
        setters.setImageModalIsOpen(true);
      }
    },
    [
      setters.setUpdateModalIsOpen,
      setters.setDeleteModalIsOpen,
      setters.setImageModalIsOpen,
    ],
  );
  const handleModalOnConfirm = useCallback(
    (e) => {
      const { operation } = e.currentTarget.dataset;
      console.log("handleModalOnConfirm");
      if (operation === "update") {
        console.log("handleModalOnConfirm: UPDATED SOMETHING");
        setters.setUpdateModalIsOpen(true);
        TOAST.success({
          title: "Update Successful",
          message: `Update successful`,
        });
      } else if (operation === "delete") {
        console.log("handleModalOnConfirm: DELETED SOMETHING");
        setters.setDeleteModalIsOpen(true);
        TOAST.success({
          title: "Delete Successful",
          message: `Delete successful`,
        });
      } else if (operation === "image") {
        setters.setImageModalIsOpen(true);
        TOAST.success({
          title: "Image Uploaded",
          message: `Image uploaded successfully`,
        });
      }
      setters.setActiveOperation("viewing");
    },
    [
      setters.setUpdateModalIsOpen,
      setters.setDeleteModalIsOpen,
      setters.setImageModalIsOpen,
    ],
  );

  const handleModalOnCancel = useCallback(() => {
    console.log("handleModalOnCancel");
    console.log(
      "handleModalOnCancel states.activeOperation",
      states.activeOperation,
    );
    if (states.activeOperation === "update") {
      setters.setUpdateModalIsOpen(false);
    } else if (states.activeOperation === "delete") {
      setters.setDeleteModalIsOpen(false);
    } else {
      setters.setImageModalIsOpen(false);
    }
    setters.setActiveOperation("viewing");
  }, [
    setters.setUpdateModalIsOpen,
    setters.setDeleteModalIsOpen,
    setters.setImageModalIsOpen,
  ]);
  return {
    handlers: {
      handleSessionChange,
      handleInitialFetch,
      handleAddNew,
      handleModalOnConfirm,
      handleModalOnCancel,
      initiateModalOpening,
    },
  };
};
