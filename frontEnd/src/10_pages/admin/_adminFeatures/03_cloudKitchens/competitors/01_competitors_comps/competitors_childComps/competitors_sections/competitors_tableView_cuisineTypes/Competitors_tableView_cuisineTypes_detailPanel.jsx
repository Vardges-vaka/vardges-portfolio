import "../../../../_styles/competitors_tableView_cuisineTypes/Competitors_tableView_cuisineTypes_detailPanel.css";
import CuisineTypesPlatformRow from "./CuisineTypesPlatformRow.jsx";

const Competitors_tableView_cuisineTypes_detailPanel = ({ states, t }) => {
  return (
    <div className="cuisineTypesDetailPanel">
      <h3 className="cuisineTypesDetailPanel__title">{states.detailHeading}</h3>
      {!states.detailModel && (
        <p className="cuisineTypesDetailPanel__empty">{states.detailEmpty}</p>
      )}
      {states.detailModel && (
        <div className="cuisineTypesDetailPanel__card">
          <dl className="cuisineTypesDetailPanel__dl">
            <dt className="cuisineTypesDetailPanel__dt">
              {states.labelHeading}
            </dt>
            <dd className="cuisineTypesDetailPanel__dd">
              {states.detailModel.meta.label}
            </dd>
            <dt className="cuisineTypesDetailPanel__dt">
              {states.descriptionHeading}
            </dt>
            <dd className="cuisineTypesDetailPanel__dd cuisineTypesDetailPanel__ddScroll">
              {states.detailModel.meta.description ||
                (t
                  ? t("cuisineTypes.noDescription", "No description.")
                  : "No description.")}
            </dd>
            <dt className="cuisineTypesDetailPanel__dt">
              {states.platformsHeading}
            </dt>
            <dd className="cuisineTypesDetailPanel__dd">
              {states.detailModel.kind === "legacy" ? (
                <span className="cuisineTypesDetailPanel__muted">
                  {states.legacyPlatformsNote}
                </span>
              ) : Array.isArray(states.detailModel.meta.platforms) &&
                states.detailModel.meta.platforms.length > 0 ? (
                <CuisineTypesPlatformRow
                  platformIds={states.detailModel.meta.platforms}
                  t={t}
                />
              ) : (
                <span className="cuisineTypesDetailPanel__muted">
                  {states.noPlatforms}
                </span>
              )}
            </dd>
          </dl>
        </div>
      )}
    </div>
  );
};

export default Competitors_tableView_cuisineTypes_detailPanel;
