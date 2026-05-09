import { useState, useRef } from "react";
import { MOCK_DATA_COMPETITORS } from "../05_competitors_cnst/MOCK_DATA.js";

export const useCompetitors_states = () => {
  const [session, setSession] = useState("view_competitors_table");
  const [isEditing, setIsEditing] = useState(false);
  const [updatingFields, setUpdatingFields] = useState([]);
  const [selectedCompetitor, setSelectedCompetitor] = useState(null);
  const [competitors, setCompetitors] = useState(MOCK_DATA_COMPETITORS);
  const [logoModalCompetitorId, setLogoModalCompetitorId] = useState(null);

  return {
    states: {
      session,
      isEditing,
      updatingFields,
      selectedCompetitor,
      competitors,
      logoModalCompetitorId,
    },
    setters: {
      setSession,
      setIsEditing,
      setUpdatingFields,
      setSelectedCompetitor,
      setCompetitors,
      setLogoModalCompetitorId,
    },
  };
};

export default useCompetitors_states;
