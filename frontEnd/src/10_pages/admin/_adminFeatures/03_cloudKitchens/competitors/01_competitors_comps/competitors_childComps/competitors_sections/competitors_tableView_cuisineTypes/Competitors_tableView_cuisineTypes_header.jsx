import Competitors_sections_controlBtn from "../Competitors_sections_controlBtn.jsx";

import "../../../../_styles/competitors_tableView_cuisineTypes/competitors_tableView_cuisineTypes_header.css";

const Competitors_tableView_cuisineTypes_header = ({ states, handlers }) => {
  return (
    <div className="Competitors_tableView_cuisineTypes_header">
      <div>
        <h2 className="Competitors_tableView_cuisineTypes_title">
          {states.text.title}
        </h2>
        <p className="Competitors_tableView_cuisineTypes_subTitle">
          {states.competitor?.name || "—"}
        </p>
        <p className="Competitors_tableView_cuisineTypes_hint">
          {states.isEditing
            ? states.text.subtitleEdit
            : states.text.subtitleView}
        </p>
      </div>
      <p
        className="Competitors_tableView_cuisineTypes_countBadge"
        aria-live="polite">
        {states.text.selectedSummary}
      </p>
      <Competitors_sections_controlBtn
        isEditing={states.isEditing}
        onUpdate={() => handlers?.handleToggleEditingMode?.()}
        onCancel={() => handlers?.handleStopEditing?.()}
        onConfirm={handlers?.handleSave}
        text={{
          updateLabel: states.text.updateLabel,
          editLabel: states.text.editLabel,
          cancelLabel: states.text.cancelLabel,
          confirmLabel: states.text.confirmLabel,
        }}
      />
    </div>
  );
};

export default Competitors_tableView_cuisineTypes_header;
