import { useCompetitors_sessions_competesWithBrands } from "../../../03_competitors_hooks/_competitors_hooks.index.js";
import { Competitors_confirmModal_competesWithBrands } from "../competitors_modals/_competitors_modals.index.js";
import {
  Competitors_tableView_competesWithBrands_header,
  Competitors_tableView_competesWithBrands_empty,
  Competitors_tableView_competesWithBrands_card,
  Competitors_tableView_competesWithBrands_addSection,
} from "./competitors_tableView_competesWithBrands/_competitors_tableView_competesWithBrands.index.js";

import "../../../_styles/competitors_tableView_competesWithBrands/competitors_tableView_competesWithBrands.css";

const Competitors_tableView_competesWithBrands = ({ states, handlers, t }) => {
  const {
    competesWithBrandsStates,
    competesWithBrandsCompProps,
  } = useCompetitors_sessions_competesWithBrands({
    states,
    handlers,
    t,
  });

  const {
    competitor,
    isEditing,
    text,
    resolvedCards,
  } = competesWithBrandsStates;

  const {
    confirmModal_props,
    C_T_CWB_header_props,
    C_T_CWB_empty_props,
    C_T_CWB_addSection_props,
    C_T_CWB_card_handlers,
  } = competesWithBrandsCompProps;

  if (!competitor) {
    return (
      <div className="Competitors_tableView_competesWithBrands">
        <h2 className="Competitors_tableView_competesWithBrands_noSelectTitle">
          {text.title}
        </h2>
        <p className="Competitors_tableView_competesWithBrands_noSelectHint">
          {text.noSelection}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="Competitors_tableView_competesWithBrands">
        <Competitors_tableView_competesWithBrands_header
          states={C_T_CWB_header_props.states}
          handlers={C_T_CWB_header_props.handlers}
        />

        <section
          className="Competitors_tableView_competesWithBrands_section"
          aria-label={text.title}>
          {resolvedCards.length === 0 ? (
            <Competitors_tableView_competesWithBrands_empty
              states={C_T_CWB_empty_props.states}
            />
          ) : (
            <ul
              className="Competitors_tableView_competesWithBrands_grid"
              role="list">
              {resolvedCards.map(({ row, other }) => (
                <Competitors_tableView_competesWithBrands_card
                  key={String(row.brand)}
                  states={{
                    row,
                    other,
                    text,
                    isEditing,
                  }}
                  handlers={C_T_CWB_card_handlers}
                />
              ))}
            </ul>
          )}
        </section>

        {isEditing && (
          <Competitors_tableView_competesWithBrands_addSection
            states={C_T_CWB_addSection_props.states}
            handlers={C_T_CWB_addSection_props.handlers}
          />
        )}
      </div>
      {isEditing && (
        <Competitors_confirmModal_competesWithBrands
          states={confirmModal_props.states}
          handlers={confirmModal_props.handlers}
        />
      )}
    </>
  );
};

export default Competitors_tableView_competesWithBrands;
