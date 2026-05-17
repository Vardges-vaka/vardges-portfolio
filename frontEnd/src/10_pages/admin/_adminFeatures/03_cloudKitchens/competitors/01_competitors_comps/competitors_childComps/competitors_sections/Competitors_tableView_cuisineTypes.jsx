import { useCompetitors_sessions_cuisineTypes } from "../../../03_competitors_hooks/_competitors_hooks.index.js";
import {
  Competitors_tableView_cuisineTypes_header,
  Competitors_tableView_cuisineTypes_catalogEdit,
  Competitors_tableView_cuisineTypes_detailPanel,
  Competitors_tableView_cuisineTypes_editHeader,
  Competitors_tableView_cuisineTypes_viewSelected,
  Competitors_tableView_cuisineTypes_draftPanel,
} from "./competitors_tableView_cuisineTypes/_competitors_tableView_cuisineTypes.index.js";
import { Competitors_confirmModal_cuisineTypes } from "../competitors_modals/_competitors_modals.index.js";

import "../../../_styles/competitors_tableView_cuisineTypes.css";

const Competitors_tableView_cuisineTypes = ({ states, handlers, t }) => {
  const { cuisineTypesStates, cuisineTypesHandlers, cuisineTypesCompProps } =
    useCompetitors_sessions_cuisineTypes({
      states,
      handlers,
      t,
    });
  const {
    C_T_C_header_props,
    C_T_C_draftPanel_props,
    C_T_C_editHeader_props,
    C_T_C_catalogEdit_props,
    C_T_C_viewSelected_props,
    C_T_C_detailPanel_props,
    C_T_C_modal_props,
  } = cuisineTypesCompProps;

  const { competitor, isEditing, text } = cuisineTypesStates;
  const { openConfirmSave } = cuisineTypesHandlers;

  if (!competitor) {
    return (
      <div className="Competitors_tableView_cuisineTypes">
        <div className="Competitors_tableView_cuisineTypes_topbar">
          <span className="Competitors_tableView_cuisineTypes_topbarSpacer" />
        </div>
        <h2 className="Competitors_tableView_cuisineTypes_title">
          {text.title}
        </h2>
        <p className="Competitors_tableView_cuisineTypes_hint">
          {text.noSelection}
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={
          "Competitors_tableView_cuisineTypes" +
          (isEditing ? " Competitors_tableView_cuisineTypes--editing" : "")
        }>
        <Competitors_tableView_cuisineTypes_header
          handlers={{ ...handlers, handleSave: openConfirmSave }}
          states={C_T_C_header_props.states}
        />

        {isEditing && (
          <Competitors_tableView_cuisineTypes_editHeader
            states={C_T_C_editHeader_props.states}
            handlers={C_T_C_editHeader_props.handlers}
            t={t}
          />
        )}

        {isEditing && (
          <Competitors_tableView_cuisineTypes_draftPanel
            states={C_T_C_draftPanel_props.states}
            handlers={C_T_C_draftPanel_props.handlers}
            t={t}
          />
        )}

        <div className="Competitors_tableView_cuisineTypes_body">
          {isEditing ? (
            <div className="Competitors_tableView_cuisineTypes_catalogShell">
              <Competitors_tableView_cuisineTypes_catalogEdit
                states={C_T_C_catalogEdit_props.states}
                handlers={C_T_C_catalogEdit_props.handlers}
                t={t}
              />
            </div>
          ) : (
            <Competitors_tableView_cuisineTypes_viewSelected
              states={C_T_C_viewSelected_props.states}
              handlers={C_T_C_viewSelected_props.handlers}
            />
          )}

          <aside
            className="Competitors_tableView_cuisineTypes_detail"
            aria-label={text.detailHeading}>
            <Competitors_tableView_cuisineTypes_detailPanel
              states={C_T_C_detailPanel_props.states}
              t={t}
            />
          </aside>
        </div>
      </div>
      {isEditing && (
        <Competitors_confirmModal_cuisineTypes
          states={C_T_C_modal_props.states}
          handlers={C_T_C_modal_props.handlers}
        />
      )}
    </>
  );
};

export default Competitors_tableView_cuisineTypes;
