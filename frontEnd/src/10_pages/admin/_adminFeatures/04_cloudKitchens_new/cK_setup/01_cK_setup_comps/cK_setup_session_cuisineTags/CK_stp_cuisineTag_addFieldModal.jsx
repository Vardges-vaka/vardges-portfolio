import { useId, useMemo, useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import {
  Modal,
  Select_static,
  Select_multi,
  Input_textArea,
} from "../../../../../../../01_components/_components.index.js";
import {
  AGGREGATOR_PLATFORMS,
  CUISINE_TAG_SOURCE_OPTIONS,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import { CUISINE_TAG_SOURCE_ICONS } from "../tempIcons/_.index.js";
import "../../_styles/cK_setup_session_cuisineTags/cK_stp_cuisineTag_addFieldModal.css";

const svgLeftIcon = (src) => (src ? { type: "svg", svg_src: src } : null);

const FIELD_TITLES = {
  description: "Add description",
  source: "Add source",
  platforms: "Add platforms",
  platformsEdit: "Edit platforms",
};

const CK_stp_cuisineTag_addFieldModal = ({
  isOpen,
  field,
  tagLabel,
  draft,
  onDraftChange,
  onCancel,
  onConfirm,
}) => {
  const formId = useId();
  const [selectMenuOpen, setSelectMenuOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) setSelectMenuOpen(false);
  }, [isOpen]);

  useEffect(() => {
    setSelectMenuOpen(false);
  }, [field]);

  const sourceOptions = useMemo(
    () =>
      CUISINE_TAG_SOURCE_OPTIONS.map((src) => ({
        value: src.value,
        label: src.label,
        leftIcon: svgLeftIcon(CUISINE_TAG_SOURCE_ICONS[src.value]),
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

  const selectedPlatforms = Array.isArray(draft) ? draft : [];

  const selectedPlatformItems = useMemo(() => {
    const values = Array.isArray(draft) ? draft : [];
    return values
      .map((value) => AGGREGATOR_PLATFORMS.find((p) => p.value === value))
      .filter(Boolean);
  }, [draft]);

  const showSelectMenuSpacer = field === "source" || field === "platforms";

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm?.();
  };

  const handlePlatformsChange = (e) => {
    const raw = e.target.value ?? "";
    const next = raw
      ? raw
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
    onDraftChange?.(next);
  };

  const removePlatform = useCallback(
    (platformValue) => {
      onDraftChange?.(
        selectedPlatforms.filter((value) => value !== platformValue),
      );
    },
    [onDraftChange, selectedPlatforms],
  );

  const modalTitle =
    field === "platforms" && selectedPlatforms.length > 0
      ? FIELD_TITLES.platformsEdit
      : FIELD_TITLES[field] ?? "Add field";

  const isConfirmDisabled =
    field === "description"
      ? !String(draft ?? "").trim()
      : field === "source"
        ? !String(draft ?? "").trim()
        : false;

  const dialogClassName =
    "modal_dialogForm cK_stp_cuisineTag_addFieldModal_dialog";

  if (!field) return null;

  return (
    <Modal
      isOpen={isOpen}
      title={`${modalTitle} — ${tagLabel || "Tag"}`}
      onCancel={onCancel}
      onConfirm={onConfirm}
      withFooter
      dialogClassName={dialogClassName}
      formId={formId}
      footerLabels={{ confirmLabel: "Save" }}
      footerStates={{ isConfirmDisabled }}>
      <form
        id={formId}
        className="modal_bodyForm cK_stp_cuisineTag_addFieldModal_form"
        onSubmit={handleSubmit}>
        {field === "description" ? (
          <Input_textArea
            labelProps={{ isActive: true, message: "Description" }}
            placeholder="Describe this cuisine tag…"
            value={draft ?? ""}
            onChange={(e) => onDraftChange?.(e.target.value)}
            rows={5}
            maxLength={500}
            lengthProps={{ isActive: true }}
          />
        ) : null}

        {field === "source" ? (
          <Select_static
            optionsType="leftIcon"
            labelProps={{ isActive: true, message: "Source" }}
            options={sourceOptions}
            placeholder="Pick source…"
            value={draft ?? ""}
            onChange={(e) => onDraftChange?.(e.target.value)}
            onOpenChange={setSelectMenuOpen}
            required
          />
        ) : null}

        {field === "platforms" ? (
          <div className="cK_stp_cuisineTag_addFieldModal__platformsField">
            <Select_multi
              optionsType="leftIcon"
              labelProps={{ isActive: true, message: "Platforms" }}
              options={platformOptions}
              placeholder="Pick platforms…"
              emptySummary="No platforms selected"
              value={selectedPlatforms}
              onChange={handlePlatformsChange}
              onOpenChange={setSelectMenuOpen}
            />

            {selectedPlatformItems.length > 0 ? (
              <div
                className="cK_stp_cuisineTag_addFieldModal__platformIcons"
                aria-label="Selected platforms">
                {selectedPlatformItems.map((platform) => (
                  <div
                    key={platform.value}
                    className="cK_stp_cuisineTag_addFieldModal__platformChip">
                    {platform.logo ? (
                      <img
                        className="cK_stp_cuisineTag_addFieldModal__platformIcon"
                        src={platform.logo}
                        alt=""
                        aria-hidden="true"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <span
                        className="cK_stp_cuisineTag_addFieldModal__platformIconMissing"
                        aria-hidden="true">
                        ?
                      </span>
                    )}
                    <button
                      type="button"
                      className="cK_stp_cuisineTag_addFieldModal__platformChipRemove"
                      aria-label={`Remove ${platform.label}`}
                      title={`Remove ${platform.label}`}
                      onClick={() => removePlatform(platform.value)}>
                      <X size={14} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {showSelectMenuSpacer ? (
          <div
            className={`cK_stp_cuisineTag_addFieldModal__menuSpacer${
              selectMenuOpen
                ? " cK_stp_cuisineTag_addFieldModal__menuSpacer--open"
                : ""
            }`}
            aria-hidden="true"
          />
        ) : null}
      </form>
    </Modal>
  );
};

export default CK_stp_cuisineTag_addFieldModal;
