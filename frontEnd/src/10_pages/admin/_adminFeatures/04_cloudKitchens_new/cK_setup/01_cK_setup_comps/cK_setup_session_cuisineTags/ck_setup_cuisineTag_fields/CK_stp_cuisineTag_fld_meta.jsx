import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import {
  Select_static,
  Select_multi,
} from "../../../../../../../../01_components/_components.index.js";
import {
  CUISINE_TYPES,
  CUISINE_TAG_SOURCE_OPTIONS,
  AGGREGATOR_PLATFORMS,
} from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import "../../../_styles/cK_setup_session_cuisineTags/ck_setup_cuisineTag_fields/cK_stp_cuisineTag_fld_meta.css";

const svgLeftIcon = (src) => (src ? { type: "svg", svg_src: src } : null);

const CK_stp_cuisineTag_fld_meta = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);
  const [selectMenuOpen, setSelectMenuOpen] = useState(false);
  const selectOpenCountRef = useRef(0);

  useEffect(
    () => () => {
      selectOpenCountRef.current = 0;
    },
    [],
  );

  const handleSelectOpenChange = useCallback((isOpen) => {
    selectOpenCountRef.current = Math.max(
      0,
      selectOpenCountRef.current + (isOpen ? 1 : -1),
    );
    setSelectMenuOpen(selectOpenCountRef.current > 0);
  }, []);

  const selectedPlatforms = Array.isArray(v.platforms) ? v.platforms : [];

  const kindOptions = useMemo(
    () =>
      CUISINE_TYPES.map((ct) => ({
        value: ct.value,
        label: ct.label,
        leftIcon: svgLeftIcon(ct.logo),
      })),
    [],
  );

  const platformOptions = useMemo(
    () =>
      AGGREGATOR_PLATFORMS.map((platform) => ({
        value: platform.value,
        label: platform.label,
        leftIcon: svgLeftIcon(platform.logo),
      })),
    [],
  );

  const handlePlatformsChange = (e) => {
    const raw = e.target.value ?? "";
    const next = raw
      ? raw
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
    handlers.onChange?.("platforms", next);
  };

  return (
    <section className="cK_stp_cuisineTag_fld_meta">
      <div className="cK_stp_cuisineTag_fld_meta__row">
        <Select_static
          optionsType="leftIcon"
          labelProps={{ isActive: true, message: "Kind" }}
          options={kindOptions}
          placeholder="Pick kind…"
          value={v.kind ?? ""}
          onChange={set("kind")}
          onOpenChange={handleSelectOpenChange}
        />
        <Select_static
          labelProps={{ isActive: true, message: "Source" }}
          options={CUISINE_TAG_SOURCE_OPTIONS}
          placeholder="Pick source…"
          value={v.source ?? ""}
          onChange={set("source")}
          onOpenChange={handleSelectOpenChange}
        />
        <Select_multi
          optionsType="leftIcon"
          labelProps={{ isActive: true, message: "Platforms" }}
          options={platformOptions}
          placeholder="Pick platforms…"
          emptySummary="No platforms selected"
          value={selectedPlatforms}
          onChange={handlePlatformsChange}
          onOpenChange={handleSelectOpenChange}
        />
      </div>

      <div
        className={`cK_stp_cuisineTag_fld_meta__menuSpacer${
          selectMenuOpen ? " cK_stp_cuisineTag_fld_meta__menuSpacer--open" : ""
        }`}
        aria-hidden="true"
      />
    </section>
  );
};

export default CK_stp_cuisineTag_fld_meta;
