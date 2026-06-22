import { useState } from "react";
import {
  CUISINE_TYPES,
  AGGREGATOR_PLATFORMS,
  CUISINE_TAG_SOURCE_OPTIONS,
} from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import { CUISINE_TAG_SOURCE_ICONS } from "../../tempIcons/_.index.js";
import { isCuisineTagDeleted } from "../../../02_cK_setup_hlpr/cuisineTagAudit_hlpr.js";
import CK_stp_cuisineTag_platformIconStack from "../../cK_setup_shared/CK_stp_cuisineTag_platformIconStack.jsx";
import { Toggler } from "../../../../../../../../01_components/_components.index.js";
import { Trash2, Eye, Pencil, Plus, CirclePlus } from "lucide-react";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_cuisineTagRow.css";

const ICON_SIZE_PX = 50;
const ACTION_ICON_SIZE_PX = 16;
const ADD_FIELD_ICON_SIZE_PX = 28;
const DESC_MAX_LEN = 250;

const truncateDescription = (text, maxLen = DESC_MAX_LEN) => {
  if (!text || text.length <= maxLen) {
    return { preview: text, isTruncated: false };
  }

  return {
    preview: `${text.slice(0, maxLen).trimEnd()}…`,
    isTruncated: true,
  };
};

const kindMeta = (kind) =>
  CUISINE_TYPES.find((ct) => ct.value === kind) || {
    label: kind || "Missing kind",
    logo: null,
  };

const sourceMeta = (source) => {
  const option = CUISINE_TAG_SOURCE_OPTIONS.find((s) => s.value === source);
  return {
    label: option?.label || source || "Missing source",
    icon: source ? CUISINE_TAG_SOURCE_ICONS[source] : null,
  };
};

const resolvePlatforms = (platforms = []) => {
  if (!Array.isArray(platforms)) return [];
  return platforms
    .map((value) => AGGREGATOR_PLATFORMS.find((p) => p.value === value))
    .filter(Boolean);
};

const MissingIcon = ({ title = "Missing" }) => (
  <span
    className="cK_stp_brand_cuisineTagRow__missingIcon"
    title={title}
    aria-label={title}>
    ?
  </span>
);

const AddFieldIconBtn = ({ label, onClick, variant = "add" }) => {
  const Icon = variant === "more" ? CirclePlus : Plus;

  return (
    <button
      type="button"
      className={
        "cK_stp_brand_cuisineTagRow__addFieldIconBtn" +
        (variant === "more"
          ? " cK_stp_brand_cuisineTagRow__addFieldIconBtn--more"
          : "")
      }
      aria-label={label}
      title={label}
      onClick={onClick}>
      <Icon size={ADD_FIELD_ICON_SIZE_PX} aria-hidden="true" />
    </button>
  );
};

const CK_stp_brand_cuisineTagRow = ({
  tag,
  index,
  mode = "catalog",
  onAdd,
  onRemove,
  onContinueBuilding,
  onDelete,
  onUpdate,
  onView,
  onToggleActive,
  isViewActive = false,
  isUpdateActive = false,
  allowFieldAdd = false,
  onAddField,
}) => {
  const kind = kindMeta(tag?.kind);
  const source = sourceMeta(tag?.source);
  const platforms = resolvePlatforms(tag?.platforms);
  const label = tag?.label?.trim?.() || "";
  const description = tag?.description?.trim?.() || "";
  const { preview: descriptionPreview, isTruncated: isDescriptionTruncated } =
    truncateDescription(description);
  const [platformExtraSlots, setPlatformExtraSlots] = useState(0);

  const handlePlatformOpenChange = (isOpen, { extraSlotCount = 0 } = {}) => {
    setPlatformExtraSlots(isOpen ? extraSlotCount : 0);
  };

  const hasDescription = Boolean(description);
  const hasPlatforms = platforms.length > 0;
  const hasSource = Boolean(source.icon);

  const openFieldAdd = (field) => () => onAddField?.(tag, field);
  const tagName = label || tag?.value || "tag";
  const canAddPlatforms = allowFieldAdd && Boolean(onAddField);
  const isAssigned = mode === "assigned";
  const isManage = mode === "manage";
  const isView = mode === "view";
  const isDeleted = isManage && isCuisineTagDeleted(tag);
  const actionLabel = isAssigned
    ? `Remove ${label || tag?.value || "tag"}`
    : `Add ${label || tag?.value || "tag"}`;

  return (
    <li
      className={
        "cK_stp_brand_cuisineTagRow" +
        (isAssigned ? " cK_stp_brand_cuisineTagRow--assigned" : "") +
        (isManage ? " cK_stp_brand_cuisineTagRow--manage" : "") +
        (isView ? " cK_stp_brand_cuisineTagRow--view" : "") +
        (isViewActive ? " cK_stp_brand_cuisineTagRow--viewing" : "") +
        (isUpdateActive ? " cK_stp_brand_cuisineTagRow--editing" : "") +
        (isDeleted ? " cK_stp_brand_cuisineTagRow--deleted" : "") +
        (isDescriptionTruncated ? " cK_stp_brand_cuisineTagRow--descTruncated" : "") +
        (platformExtraSlots > 0 ? " cK_stp_brand_cuisineTagRow--platformsOpen" : "")
      }
      style={{ "--cK_platformStack-extra-slots": platformExtraSlots }}>
      <span className="cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__index">
        {index}
      </span>

      <span
        className="cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__kind"
        title={kind.logo ? kind.label : "Missing kind"}>
        {kind.logo ? (
          <img
            className="cK_stp_brand_cuisineTagRow__icon"
            src={kind.logo}
            alt=""
            aria-hidden="true"
            width={ICON_SIZE_PX}
            height={ICON_SIZE_PX}
          />
        ) : (
          <MissingIcon title="Missing kind" />
        )}
      </span>

      <span className="cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__label">
        <span
          className={
            "cK_stp_brand_cuisineTagRow__labelText" +
            (!label ? " cK_stp_brand_cuisineTagRow__textMissing" : "")
          }
          title={label || tag?.value || "Missing label"}>
          {label || "?"}
        </span>
      </span>

      <span
        className={
          "cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__desc" +
          (!description ? " cK_stp_brand_cuisineTagRow__textMissing" : "")
        }
        title={description || "Missing description"}>
        {hasDescription ? (
          isDescriptionTruncated ? (
            <>
              <span className="cK_stp_brand_cuisineTagRow__descPreview">
                {descriptionPreview}
              </span>
              <span className="cK_stp_brand_cuisineTagRow__descFull">
                {description}
              </span>
            </>
          ) : (
            description
          )
        ) : allowFieldAdd && onAddField ? (
          <AddFieldIconBtn
            label={`Add description for ${tagName}`}
            onClick={openFieldAdd("description")}
          />
        ) : (
          "?"
        )}
      </span>

      <span className="cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__platforms">
        {hasPlatforms || canAddPlatforms ? (
          <CK_stp_cuisineTag_platformIconStack
            items={platforms.map((platform) => ({
              key: platform.value,
              src: platform.logo,
              label: platform.label,
            }))}
            canAdd={canAddPlatforms}
            onOpenChange={handlePlatformOpenChange}
            iconClassName="cK_stp_brand_cuisineTagRow__icon"
            missingIconClassName="cK_stp_brand_cuisineTagRow__missingIcon"
            addSlot={
              canAddPlatforms ? (
                <AddFieldIconBtn
                  variant={hasPlatforms ? "more" : "add"}
                  label={
                    hasPlatforms
                      ? `Add more platforms for ${tagName}`
                      : `Add platforms for ${tagName}`
                  }
                  onClick={openFieldAdd("platforms")}
                />
              ) : null
            }
          />
        ) : (
          <MissingIcon title="Missing platforms" />
        )}
      </span>

      <span
        className="cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__source"
        title={source.icon ? source.label : "Missing source"}>
        {hasSource ? (
          <img
            className="cK_stp_brand_cuisineTagRow__icon"
            src={source.icon}
            alt={source.label}
            width={ICON_SIZE_PX}
            height={ICON_SIZE_PX}
          />
        ) : allowFieldAdd && onAddField ? (
          <AddFieldIconBtn
            label={`Add source for ${tagName}`}
            onClick={openFieldAdd("source")}
          />
        ) : (
          <MissingIcon title="Missing source" />
        )}
      </span>

      {isManage ? (
        <span className="cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__active">
          <Toggler
            sizeType="lg"
            checked={tag?.isActive !== false}
            onChange={(e) => onToggleActive?.(tag, e.target.checked)}
            aria-label={`Toggle active state for ${tagName}`}
          />
        </span>
      ) : null}

      {!isView ? (
        <span className="cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__action">
          {isManage ? (
            <span className="cK_stp_brand_cuisineTagRow__actions">
              <button
                type="button"
                className={
                  "cK_stp_brand_cuisineTagRow__btn cK_stp_brand_cuisineTagRow__btn--update cK_stp_brand_cuisineTagRow__btn--icon" +
                  (isUpdateActive
                    ? " cK_stp_brand_cuisineTagRow__btn--updateActive"
                    : "")
                }
                aria-label={`Update ${label || tag?.value || "tag"}`}
                aria-pressed={isUpdateActive}
                title="Update"
                onClick={() => onUpdate?.(tag)}>
                <Pencil size={ACTION_ICON_SIZE_PX} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={
                  "cK_stp_brand_cuisineTagRow__btn cK_stp_brand_cuisineTagRow__btn--view cK_stp_brand_cuisineTagRow__btn--icon" +
                  (isViewActive
                    ? " cK_stp_brand_cuisineTagRow__btn--viewActive"
                    : "")
                }
                aria-label={`View ${label || tag?.value || "tag"}`}
                aria-pressed={isViewActive}
                title="View"
                onClick={() => onView?.(tag)}>
                <Eye size={ACTION_ICON_SIZE_PX} aria-hidden="true" />
              </button>
            </span>
          ) : (
            <button
              type="button"
              className={
                "cK_stp_brand_cuisineTagRow__btn" +
                (isAssigned
                  ? " cK_stp_brand_cuisineTagRow__btn--remove"
                  : " cK_stp_brand_cuisineTagRow__btn--add")
              }
              aria-label={actionLabel}
              onClick={() =>
                isAssigned ? onRemove?.(tag?._id) : onAdd?.(tag?._id)
              }>
              {isAssigned ? "Remove" : "Add"}
            </button>
          )}
        </span>
      ) : null}
    </li>
  );
};

export default CK_stp_brand_cuisineTagRow;
