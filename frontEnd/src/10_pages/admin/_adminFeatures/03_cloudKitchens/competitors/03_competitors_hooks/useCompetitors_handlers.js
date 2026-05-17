import { useCallback } from "react";
import { VALID_SESSIONS } from "../05_competitors_cnst/_competitors_cnst.index";

export const useCompetitors_handlers = ({ states, setters, apiHelpers, t }) => {
  void apiHelpers;
  void t;
  const handleSetSession = useCallback(
    (e) => {
      const session = e.currentTarget.dataset.value;
      console.log("session:", session);
      if (VALID_SESSIONS.includes(session)) {
        setters.setSession(session);
      }
    },
    [setters],
  );

  const handleGoBack = useCallback(() => {
    setters.setSession("view_competitors_table");
    setters.setIsEditing(false);
    setters.setUpdatingFields([]);
  }, [setters]);

  const handleCompetitorTableAction = useCallback(
    (e) => {
      const session = e.currentTarget.dataset.session;
      const competitorId = e.currentTarget.dataset.competitorId;
      const editingRaw = e.currentTarget.dataset.editing;
      if (!VALID_SESSIONS.includes(session)) return;

      if (competitorId != null) {
        const row = states.competitors.find(
          (c) => String(c._id) === String(competitorId),
        );
        if (row) setters.setSelectedCompetitor(row);
      }

      if (editingRaw === "true") setters.setIsEditing(true);
      else if (editingRaw === "false") setters.setIsEditing(false);

      // When navigating via table row actions we start with "view mode".
      setters.setUpdatingFields([]);
      setters.setSession(session);
      e.preventDefault();
    },
    [setters, states.competitors],
  );

  const handleToggleEditingMode = useCallback(() => {
    setters.setIsEditing((prev) => {
      const next = !prev;
      if (!next) setters.setUpdatingFields([]);
      return next;
    });
  }, [setters]);

  const handleStartUpdateField = useCallback(
    (fieldKey) => {
      if (!fieldKey) return;
      setters.setIsEditing(true);
      setters.setUpdatingFields([String(fieldKey)]);
    },
    [setters],
  );

  const handleStopUpdateField = useCallback(() => {
    // Keep global edit mode on, only close the active field editor.
    setters.setUpdatingFields([]);
  }, [setters]);

  const handleStopEditing = useCallback(() => {
    setters.setIsEditing(false);
    setters.setUpdatingFields([]);
  }, [setters]);

  const handleOpenLogoModal = useCallback(
    (competitorId) => {
      if (competitorId == null) return;
      setters.setLogoModalCompetitorId(String(competitorId));
    },
    [setters],
  );

  const handleCloseLogoModal = useCallback(() => {
    setters.setLogoModalCompetitorId(null);
  }, [setters]);

  const handleCompetitorProfileTextSave = useCallback(
    ({ competitorId, name, description }) => {
      if (competitorId == null) return;

      setters.setCompetitors((prev) => {
        const next = (prev ?? []).map((c) => {
          if (String(c?._id) !== String(competitorId)) return c;
          return {
            ...c,
            name: name ?? "",
            description: description ?? "",
          };
        });
        return next;
      });

      // Keep selectedCompetitor in sync for immediate UI updates.
      setters.setSelectedCompetitor((prev) => {
        if (!prev || String(prev?._id) !== String(competitorId)) return prev;
        return { ...prev, name: name ?? "", description: description ?? "" };
      });

      // Exit edit mode after saving in mock mode.
      setters.setIsEditing(false);
      setters.setUpdatingFields([]);
    },
    [setters],
  );

  const handleCompetitorProfileLogoSave = useCallback(
    ({ competitorId, logoSrc }) => {
      if (competitorId == null) return;
      if (!logoSrc) return;

      setters.setCompetitors((prev) => {
        const next = (prev ?? []).map((c) => {
          if (String(c?._id) !== String(competitorId)) return c;
          return {
            ...c,
            logo: logoSrc,
          };
        });
        return next;
      });

      setters.setSelectedCompetitor((prev) => {
        if (!prev || String(prev?._id) !== String(competitorId)) return prev;
        return { ...prev, logo: logoSrc };
      });

      setters.setIsEditing(false);
      setters.setUpdatingFields([]);
    },
    [setters],
  );

  const handleCompetitorCuisineTypesSave = useCallback(
    ({ competitorId, cuisineTypes }) => {
      if (competitorId == null) return;
      if (!Array.isArray(cuisineTypes)) return;

      setters.setCompetitors((prev) => {
        const next = (prev ?? []).map((c) => {
          if (String(c?._id) !== String(competitorId)) return c;
          return { ...c, cuisineTypes };
        });
        const synced = next.find((c) => String(c?._id) === String(competitorId));
        if (synced) {
          setters.setSelectedCompetitor((sel) => {
            if (!sel || String(sel?._id) !== String(competitorId)) return sel;
            return synced;
          });
        }
        return next;
      });

      setters.setIsEditing(false);
      setters.setUpdatingFields([]);
    },
    [setters],
  );

  const handleCompetitorBranchesSave = useCallback(
    ({ competitorId, locations }) => {
      if (competitorId == null) return;
      if (!Array.isArray(locations)) return;

      setters.setCompetitors((prev) => {
        const next = (prev ?? []).map((c) => {
          if (String(c?._id) !== String(competitorId)) return c;
          return {
            ...c,
            branches: {
              ...(c.branches && typeof c.branches === "object" ? c.branches : {}),
              totalQnt: locations.length,
              locations,
            },
          };
        });
        const synced = next.find((c) => String(c?._id) === String(competitorId));
        if (synced) {
          setters.setSelectedCompetitor((sel) => {
            if (!sel || String(sel?._id) !== String(competitorId)) return sel;
            return synced;
          });
        }
        return next;
      });
    },
    [setters],
  );

  const handleCompetitorCompetesWithBrandsSave = useCallback(
    ({ competitorId, competesWithBrands }) => {
      if (competitorId == null) return;
      if (!Array.isArray(competesWithBrands)) return;

      setters.setCompetitors((prev) => {
        const next = (prev ?? []).map((c) => {
          if (String(c?._id) !== String(competitorId)) return c;
          return {
            ...c,
            competesWithBrands,
          };
        });
        return next;
      });

      setters.setSelectedCompetitor((prev) => {
        if (!prev || String(prev?._id) !== String(competitorId)) return prev;
        return { ...prev, competesWithBrands };
      });

      setters.setIsEditing(false);
      setters.setUpdatingFields([]);
    },
    [setters],
  );

  return {
    handlers: {
      handleSetSession,
      handleGoBack,
      handleCompetitorTableAction,
      handleToggleEditingMode,
      handleStartUpdateField,
      handleStopUpdateField,
      handleStopEditing,
      handleOpenLogoModal,
      handleCloseLogoModal,
      handleCompetitorProfileTextSave,
      handleCompetitorProfileLogoSave,
      handleCompetitorCuisineTypesSave,
      handleCompetitorCompetesWithBrandsSave,
      handleCompetitorBranchesSave,
    },
  };
};
