import Branches_detail_sectionShell from "../../Branches_detail_sectionShell.jsx";
import Branches_location_mapPlaceholder from "../../Branches_location_mapPlaceholder.jsx";
import {
  LocationIcon,
  ListIcon,
  MapIcon,
} from "../../Branches_icons/_branches_icons.index.js";
import "../../../../_styles/branches_detail_section.css";
import "../../../../_styles/branches_detail_location.css";

// "Location" section. Subdoc shape: { address, coordinates: { lat, lng } }.
// Readonly view has its own list/map toggle (the big left-column map handles
// the primary visual — this inline toggle lets the user peek at a placeholder
// map mode without leaving the section).
const Branches_detailView_locationField = ({
  branch,
  draft,
  isEditing,
  isBulkEdit,
  isCollapsed,
  isEmpty,
  isSaving,
  fieldErrors,
  locationViewMode = "list",
  onEditStart,
  onDraftChange,
  onCancel,
  onSubmit,
  onToggleCollapse,
  onLocationViewToggle,
  t,
}) => {
  const dash = t("empty.noValue");
  const loc = branch?.location ?? {};
  const coords = loc?.coordinates ?? {};

  const addressErr = fieldErrors?.address;
  const latErr = fieldErrors?.["coordinates.lat"];
  const lngErr = fieldErrors?.["coordinates.lng"];

  const renderReadonly = () => (
    <>
      <div className="branchesDetailLocation__viewToggle" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={locationViewMode === "list"}
          className={
            "branchesDetailLocation__toggleBtn" +
            (locationViewMode === "list"
              ? " branchesDetailLocation__toggleBtn--active"
              : "")
          }
          onClick={() => onLocationViewToggle("list")}>
          <ListIcon size={14} /> {t("locationViewModes.list")}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={locationViewMode === "map"}
          className={
            "branchesDetailLocation__toggleBtn" +
            (locationViewMode === "map"
              ? " branchesDetailLocation__toggleBtn--active"
              : "")
          }
          onClick={() => onLocationViewToggle("map")}>
          <MapIcon size={14} /> {t("locationViewModes.map")}
        </button>
      </div>

      {locationViewMode === "list" ? (
        <dl className="branchesDetailSection__dl">
          <dt className="branchesDetailSection__dt">
            <span className="branchesDetailSection__dtIcon">
              <LocationIcon size={14} />
            </span>
            {t("fields.address")}
          </dt>
          <dd className="branchesDetailSection__dd">
            {loc.address || (
              <span className="branchesDetailSection__dd--empty">{dash}</span>
            )}
          </dd>
          <dt className="branchesDetailSection__dt">{t("fields.lat")}</dt>
          <dd className="branchesDetailSection__dd">
            {coords.lat ?? (
              <span className="branchesDetailSection__dd--empty">{dash}</span>
            )}
          </dd>
          <dt className="branchesDetailSection__dt">{t("fields.lng")}</dt>
          <dd className="branchesDetailSection__dd">
            {coords.lng ?? (
              <span className="branchesDetailSection__dd--empty">{dash}</span>
            )}
          </dd>
        </dl>
      ) : (
        <Branches_location_mapPlaceholder t={t} />
      )}
    </>
  );

  const renderEditable = () => (
    <>
      <div className="branchesDetailSection__field">
        <label className="branchesDetailSection__label">
          <span className="branchesDetailSection__labelIcon">
            <LocationIcon size={14} />
          </span>
          {t("fields.address")}
        </label>
        <input
          className={
            "branchesDetailSection__input" +
            (addressErr ? " branchesDetailSection__input--error" : "")
          }
          type="text"
          value={draft?.address ?? ""}
          onChange={(e) => onDraftChange("address", e.target.value)}
        />
        {addressErr && (
          <p className="branchesDetailSection__fieldError">
            {t(`validation.${addressErr}`, addressErr)}
          </p>
        )}
      </div>

      <div className="branchesDetailSection__grid">
        <div className="branchesDetailSection__field">
          <label className="branchesDetailSection__label">
            {t("fields.lat")}
          </label>
          <input
            className={
              "branchesDetailSection__input" +
              (latErr ? " branchesDetailSection__input--error" : "")
            }
            type="number"
            step="any"
            value={draft?.coordinates?.lat ?? ""}
            onChange={(e) => onDraftChange("coordinates.lat", e.target.value)}
          />
          {latErr && (
            <p className="branchesDetailSection__fieldError">
              {t(`validation.${latErr}`, latErr)}
            </p>
          )}
        </div>
        <div className="branchesDetailSection__field">
          <label className="branchesDetailSection__label">
            {t("fields.lng")}
          </label>
          <input
            className={
              "branchesDetailSection__input" +
              (lngErr ? " branchesDetailSection__input--error" : "")
            }
            type="number"
            step="any"
            value={draft?.coordinates?.lng ?? ""}
            onChange={(e) => onDraftChange("coordinates.lng", e.target.value)}
          />
          {lngErr && (
            <p className="branchesDetailSection__fieldError">
              {t(`validation.${lngErr}`, lngErr)}
            </p>
          )}
        </div>
      </div>
    </>
  );

  return (
    <Branches_detail_sectionShell
      rootClass="branchesDetailLocation"
      title={t("sections.location")}
      icon={<LocationIcon size={16} />}
      isEditing={isEditing}
      isBulkEdit={isBulkEdit}
      isCollapsed={isCollapsed}
      isEmpty={isEmpty}
      isSaving={isSaving}
      onEditStart={onEditStart}
      onDraftChange={onDraftChange}
      onCancel={onCancel}
      onSubmit={onSubmit}
      onToggleCollapse={onToggleCollapse}
      t={t}
      renderReadonly={renderReadonly}
      renderEditable={renderEditable}
    />
  );
};

export default Branches_detailView_locationField;
