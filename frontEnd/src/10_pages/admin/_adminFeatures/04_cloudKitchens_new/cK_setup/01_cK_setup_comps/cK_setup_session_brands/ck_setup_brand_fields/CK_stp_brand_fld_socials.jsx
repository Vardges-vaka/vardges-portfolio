import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Card_social_active,
  Card_social_disabled,
  Card_social_none,
  Card_social_summary,
} from "../../../../../../../../01_components/_components.index.js";
import {
  Facebook_logo,
  Instagram_logo,
  LinkedIn_logo,
  TikTok_logo,
  X_logo,
  Youtube_logo,
  Other_logo
} from "../../../../../../../../00_assets/_assets.index.js";

import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/CK_stp_brand_fld_socials.css";

const CARD_WIDTH = 300;
const STACK_DECK_COUNT = 7;

const SOCIAL_NAME_OPTIONS = [
  { value: "instagram", label: "Instagram", icon: Instagram_logo },
  { value: "facebook", label: "Facebook", icon: Facebook_logo },
  { value: "tikTok", label: "TikTok", icon: TikTok_logo },
  { value: "linkedIn", label: "LinkedIn", icon: LinkedIn_logo },
  { value: "youtube", label: "YouTube", icon: Youtube_logo },
  { value: "twitter", label: "Twitter / X", icon: X_logo },
  { value: "other", label: "Other", icon: Other_logo },
];

const CORE_PLATFORM_OPTIONS = SOCIAL_NAME_OPTIONS.slice(0, 6);
const OTHER_PLATFORM_OPTION = SOCIAL_NAME_OPTIONS[6];
const CORE_PLATFORM_VALUES = new Set(
  CORE_PLATFORM_OPTIONS.map((option) => option.value),
);

const DEFAULT_DRAFT_SOCIAL = {
  isActive: true,
  link: "",
  consoleLink: "",
  notes: "",
  customName: "",
};

const SAMPLE_SOCIALS = [
  {
    isActive: true,
    link: "https://www.instagram.com/example",
    consoleLink: "https://www.instagram.com/example/console",
    name: "instagram",
    notes: "Example social account",
  },
  {
    isActive: true,
    link: "https://www.facebook.com/example",
    consoleLink: "https://www.facebook.com/example/console",
    name: "facebook",
    notes: "Example social account",
  },
  {
    isActive: true,
    link: "https://www.tiktok.com/@example",
    consoleLink: "https://www.tiktok.com/@example/console",
    name: "tikTok",
    notes: "Example social account",
  },
  {
    isActive: false,
    link: "https://www.linkedin.com/company/example",
    consoleLink: "https://www.linkedin.com/company/example/admin",
    name: "linkedIn",
    notes: "Disabled example account",
  },
  {
    isActive: false,
    link: "https://www.youtube.com/@example",
    consoleLink: "https://www.youtube.com/@example/console",
    name: "youtube",
    notes: "Disabled example account",
  },
  {
    isActive: true,
    link: "https://t.me/example",
    consoleLink: "https://t.me/example",
    name: "Telegram",
    notes: "Custom platform example",
  },
  {
    isActive: true,
    link: "https://t.me/example2",
    consoleLink: "https://t.me/example2",
    name: "WhatsApp",
    notes: "Second custom platform",
  },
  {
    isActive: false,
    link: "https://snapchat.com/example",
    consoleLink: "https://snapchat.com/example",
    name: "Snapchat",
    notes: "Disabled custom platform",
  },
];

const isCorePlatformName = (name) => CORE_PLATFORM_VALUES.has(name);

const hasNamedSocial = (item) => Boolean(item?.name?.trim());

const hasRealBackendSocials = (backendSocials) =>
  backendSocials.some(hasNamedSocial);

const getOtherDisplayLabel = (
  social,
  fallback = OTHER_PLATFORM_OPTION.label,
) => {
  if (!social) return fallback;
  if (social.name === "other") {
    return social.customName?.trim() || fallback;
  }
  if (!isCorePlatformName(social.name)) {
    return social.name || fallback;
  }
  return fallback;
};

const getSocialState = (socialEntry, cardKey, addingPlatforms) => {
  if (addingPlatforms[cardKey]) return "adding";
  if (!socialEntry?.data) return "none";
  return socialEntry.data.isActive ? "active" : "disabled";
};

const getSocialForCorePlatform = (
  backendSocials,
  platformValue,
  sampleOverrides,
  useSampleFallback,
) => {
  const backendIndex = backendSocials.findIndex(
    (item) => item.name === platformValue,
  );
  if (backendIndex >= 0) {
    return {
      data: backendSocials[backendIndex],
      backendIndex,
      source: "backend",
    };
  }

  if (sampleOverrides[platformValue]) {
    return {
      data: {
        name: platformValue,
        ...DEFAULT_DRAFT_SOCIAL,
        ...sampleOverrides[platformValue],
      },
      backendIndex: -1,
      source: "draft",
    };
  }

  if (!useSampleFallback) return null;

  const sample = SAMPLE_SOCIALS.find((item) => item.name === platformValue);
  if (!sample) return null;

  return {
    data: sample,
    backendIndex: -1,
    source: "sample",
  };
};

const getAllOtherSocialEntries = (
  backendSocials,
  sampleOverrides,
  useSampleFallback,
) => {
  const entries = [];

  backendSocials.forEach((item, backendIndex) => {
    if (hasNamedSocial(item) && !isCorePlatformName(item.name)) {
      entries.push({
        data: item,
        backendIndex,
        source: "backend",
        cardKey: `other-backend-${backendIndex}`,
      });
    }
  });

  if (useSampleFallback && entries.length === 0) {
    SAMPLE_SOCIALS.forEach((item, sampleIndex) => {
      if (item?.name && !isCorePlatformName(item.name)) {
        entries.push({
          data: item,
          backendIndex: -1,
          source: "sample",
          cardKey: `other-sample-${sampleIndex}`,
        });
      }
    });
  }

  Object.entries(sampleOverrides).forEach(([key, draft]) => {
    if (!key.startsWith("other:")) return;
    entries.push({
      data: {
        name: "other",
        ...DEFAULT_DRAFT_SOCIAL,
        ...draft,
      },
      backendIndex: -1,
      source: "draft",
      cardKey: key,
    });
  });

  return entries;
};

const buildSocialCatalog = (backendSocials, sampleOverrides, addingPlatforms) => {
  const useSampleFallback = !hasRealBackendSocials(backendSocials);

  const coreSnapshots = CORE_PLATFORM_OPTIONS.map((option) => {
    const socialEntry = getSocialForCorePlatform(
      backendSocials,
      option.value,
      sampleOverrides,
      useSampleFallback,
    );
    const cardKey = `core-${option.value}`;
    const state = getSocialState(socialEntry, cardKey, addingPlatforms);

    return {
      option,
      socialEntry,
      state,
      cardKey,
      isOther: false,
      platformValue: option.value,
    };
  });

  const otherSnapshots = getAllOtherSocialEntries(
    backendSocials,
    sampleOverrides,
    useSampleFallback,
  ).map((entry) => {
    const state = getSocialState(entry, entry.cardKey, addingPlatforms);

    return {
      option: OTHER_PLATFORM_OPTION,
      socialEntry: entry,
      state,
      cardKey: entry.cardKey,
      isOther: true,
      platformValue: "other",
    };
  });

  let activeCount = 0;
  let disabledCount = 0;
  const missingLabels = [];

  coreSnapshots.forEach(({ option, state }) => {
    if (state === "active") activeCount += 1;
    else if (state === "disabled") disabledCount += 1;
    else if (state === "none") missingLabels.push(option.label);
  });

  otherSnapshots.forEach(({ state }) => {
    if (state === "active") activeCount += 1;
    else if (state === "disabled") disabledCount += 1;
  });

  return {
    coreSnapshots,
    otherSnapshots,
    stats: { activeCount, disabledCount, missingLabels },
  };
};

const CK_stp_brand_fld_socials = ({ states, handlers }) => {
  const v = states.values ?? {};
  const backendSocials = v.socials ?? [];
  const [sampleOverrides, setSampleOverrides] = useState({});
  const [addingPlatforms, setAddingPlatforms] = useState({});
  const [viewMode, setViewMode] = useState("stack");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [deckMetrics, setDeckMetrics] = useState({ overlap: 215, spread: 215 });
  const deckRef = useRef(null);

  const { coreSnapshots, otherSnapshots, stats: socialStats } = useMemo(
    () => buildSocialCatalog(backendSocials, sampleOverrides, addingPlatforms),
    [backendSocials, sampleOverrides, addingPlatforms],
  );

  const gridSnapshots = useMemo(
    () => [...coreSnapshots, ...otherSnapshots],
    [coreSnapshots, otherSnapshots],
  );

  const updateDeckMetrics = useCallback(() => {
    const deckEl = deckRef.current;
    if (!deckEl) return;

    const deckWidth = deckEl.clientWidth;
    const totalCardsWidth = STACK_DECK_COUNT * CARD_WIDTH;

    if (deckWidth <= 0) return;

    if (deckWidth >= totalCardsWidth) {
      setDeckMetrics({ overlap: 0, spread: Math.round(CARD_WIDTH * 0.4) });
      return;
    }

    const overlap = (totalCardsWidth - deckWidth) / (STACK_DECK_COUNT - 1);
    const spread = Math.max(overlap, CARD_WIDTH * 0.55);

    setDeckMetrics({
      overlap: Math.max(0, Math.round(overlap)),
      spread: Math.round(spread),
    });
  }, []);

  useEffect(() => {
    if (viewMode !== "stack") return undefined;

    updateDeckMetrics();

    const deckEl = deckRef.current;
    if (!deckEl) return undefined;

    const observer = new ResizeObserver(updateDeckMetrics);
    observer.observe(deckEl);
    window.addEventListener("resize", updateDeckMetrics);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateDeckMetrics);
    };
  }, [updateDeckMetrics, viewMode]);

  const handleSocialFieldChange = useCallback(
    (cardKey, platformValue, backendIndex, field, value, isOther = false) => {
      if (backendIndex >= 0) {
        handlers.onChange?.(`socials.${backendIndex}.${field}`, value);
        return;
      }

      const draftName = isOther ? "other" : platformValue;

      setSampleOverrides((prev) => ({
        ...prev,
        [cardKey.startsWith("core-") ? platformValue : cardKey]: {
          ...(prev[cardKey.startsWith("core-") ? platformValue : cardKey] ??
            DEFAULT_DRAFT_SOCIAL),
          name: draftName,
          isActive: true,
          [field]: value,
        },
      }));
    },
    [handlers.onChange],
  );

  const handleNoneAdd = useCallback((cardKey) => {
    setAddingPlatforms((prev) => ({ ...prev, [cardKey]: true }));
  }, []);

  const handleNoneFieldChange = useCallback(
    (cardKey, platformValue, backendIndex, field, value, isOther = false) => {
      setAddingPlatforms((prev) => {
        if (!prev[cardKey]) return prev;
        const next = { ...prev };
        delete next[cardKey];
        return next;
      });

      handleSocialFieldChange(
        cardKey,
        platformValue,
        backendIndex,
        field,
        value,
        isOther,
      );
    },
    [handleSocialFieldChange],
  );

  const handleAddOtherDraft = useCallback(() => {
    const draftKey = `other:draft-${Date.now()}`;
    setAddingPlatforms((prev) => ({ ...prev, [draftKey]: true }));
    setViewMode("grid");
  }, []);

  const getDeckItemStyle = useCallback(
    (index) => {
      const style = {
        zIndex: hoveredIndex === index ? 50 : index + 1,
        marginLeft: index === 0 ? 0 : `-${deckMetrics.overlap}px`,
        transition:
          "transform 0.72s cubic-bezier(0.16, 1, 0.3, 1), filter 0.72s cubic-bezier(0.16, 1, 0.3, 1), z-index 0s",
      };

      if (hoveredIndex === null) {
        style.transform = "translate3d(0, 0, 0)";
        return style;
      }

      const spread = deckMetrics.spread;

      if (index < hoveredIndex) {
        style.transform = `translate3d(-${spread}px, 0, 0)`;
      } else if (index > hoveredIndex) {
        style.transform = `translate3d(${spread}px, 0, 0)`;
      } else {
        style.transform = "translate3d(0, 0, 0)";
        style.filter = "drop-shadow(0 18px 36px rgba(0, 0, 0, 0.34))";
      }

      return style;
    },
    [deckMetrics.overlap, deckMetrics.spread, hoveredIndex],
  );

  const renderSocialCard = (snapshot) => {
    const {
      option,
      socialEntry,
      state,
      cardKey,
      isOther,
      platformValue,
    } = snapshot;
    const social = socialEntry?.data;
    const displayLabel = isOther
      ? getOtherDisplayLabel(social)
      : option.label;

    if (state === "active") {
      return (
        <Card_social_active
          label={displayLabel}
          link={social.link ?? ""}
          notes={social.notes ?? ""}
          consoleLink={social.consoleLink ?? ""}
          backgroundImage={option.icon}
          isActive={!!social.isActive}
          onActiveChange={(value) =>
            handleSocialFieldChange(
              cardKey,
              platformValue,
              socialEntry.backendIndex,
              "isActive",
              value,
              isOther,
            )
          }
          onFieldChange={(field, value) =>
            handleSocialFieldChange(
              cardKey,
              platformValue,
              socialEntry.backendIndex,
              field,
              value,
              isOther,
            )
          }
        />
      );
    }

    if (state === "disabled") {
      return (
        <Card_social_disabled
          label={displayLabel}
          link={social.link ?? ""}
          notes={social.notes ?? ""}
          consoleLink={social.consoleLink ?? ""}
          backgroundImage={option.icon}
          onActiveChange={(value) =>
            handleSocialFieldChange(
              cardKey,
              platformValue,
              socialEntry.backendIndex,
              "isActive",
              value,
              isOther,
            )
          }
        />
      );
    }

    return (
      <Card_social_none
        platformValue={platformValue}
        label={isOther ? OTHER_PLATFORM_OPTION.label : option.label}
        icon={option.icon}
        customName={social?.customName ?? ""}
        link={social?.link ?? ""}
        notes={social?.notes ?? ""}
        consoleLink={social?.consoleLink ?? ""}
        isAdding={state === "adding"}
        showNameInput={isOther}
        onAdd={() => handleNoneAdd(cardKey)}
        onFieldChange={(field, value) =>
          handleNoneFieldChange(
            cardKey,
            platformValue,
            socialEntry?.backendIndex ?? -1,
            field,
            value,
            isOther,
          )
        }
      />
    );
  };

  return (
    <section className="cK_stp_brand_fld_socials">
      <div className="cK_setup_form_sectionHead">
        <h4 className="cK_setup_form_sectionTitle">Socials</h4>
        <div className="cK_stp_brand_fld_socials__headActions">
          {viewMode === "grid" ? (
            <button
              type="button"
              className="cK_setup_form_ghostBtn"
              onClick={() => setViewMode("stack")}>
              Show stack
            </button>
          ) : null}
          <button
            type="button"
            className="cK_setup_form_ghostBtn"
            onClick={handlers.onAddSocial ?? handleAddOtherDraft}>
            + Add social
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="cK_stp_brand_fld_socials__grid">
          {gridSnapshots.map((snapshot) => (
            <div
              key={snapshot.cardKey}
              className="cK_stp_brand_fld_socials__gridItem">
              {renderSocialCard(snapshot)}
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={deckRef}
          className="cK_stp_brand_fld_socials__deck"
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            "--cK_social-deck-overlap": `${deckMetrics.overlap}px`,
            "--cK_social-deck-spread": `${deckMetrics.spread}px`,
          }}>
          {coreSnapshots.map((snapshot, index) => (
            <div
              key={snapshot.cardKey}
              className="cK_stp_brand_fld_socials__deckItem"
              style={getDeckItemStyle(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onFocusCapture={() => setHoveredIndex(index)}>
              {renderSocialCard(snapshot)}
            </div>
          ))}

          <div
            className="cK_stp_brand_fld_socials__deckItem cK_stp_brand_fld_socials__deckItem--summary"
            style={getDeckItemStyle(CORE_PLATFORM_OPTIONS.length)}
            onMouseEnter={() => setHoveredIndex(CORE_PLATFORM_OPTIONS.length)}
            onFocusCapture={() =>
              setHoveredIndex(CORE_PLATFORM_OPTIONS.length)
            }>
            <Card_social_summary
              activeCount={socialStats.activeCount}
              disabledCount={socialStats.disabledCount}
              missingLabels={socialStats.missingLabels}
              otherCount={otherSnapshots.length}
              onShowAll={() => setViewMode("grid")}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default CK_stp_brand_fld_socials;
