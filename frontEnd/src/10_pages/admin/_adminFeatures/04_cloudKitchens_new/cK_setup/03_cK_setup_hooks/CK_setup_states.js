import { useState, useRef } from "react";

export const useCK_setup_states = () => {
  const [activeSession, setActiveSession] = useState("brands");
  const [activeOperation, setActiveOperation] = useState("viewing");
  const [activeViewingType, setActiveViewingType] = useState("one");

  const [brands, setBrands] = useState([]);
  const [cuisineTags, setCuisineTags] = useState([]);
  const [salesPlatforms, setSalesPlatforms] = useState([]);
  const [channels, setChannels] = useState([]);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
  return {
    states: {
      activeSession,
      activeOperation,
      activeViewingType,
      brands,
      cuisineTags,
      salesPlatforms,
      channels,
      updateModalIsOpen,
      deleteModalIsOpen,
      imageModalIsOpen,
    },
    setters: {
      setActiveSession,
      setActiveOperation,
      setActiveViewingType,
      setBrands,
      setCuisineTags,
      setSalesPlatforms,
      setChannels,
      setUpdateModalIsOpen,
      setDeleteModalIsOpen,
      setImageModalIsOpen,
    },
    refs: {},
  };
};
