import Competitors_sections_controlBtn from "../Competitors_sections_controlBtn.jsx";

import "../../../../_styles/competitors_tableView_competesWithBrands/competitors_tableView_competesWithBrands_header.css";;

const Competitors_tableView_competesWithBrands_header = ({ states, handlers }) => {
  const { text, competitor, isEditing } = states;

  return (
    <div className="Competitors_tableView_competesWithBrands_header">
      <div className="Competitors_tableView_competesWithBrands_headerText">
        <h2 className="Competitors_tableView_competesWithBrands_title">
          {text.title}
        </h2>
        <p className="Competitors_tableView_competesWithBrands_subTitle">
          {competitor?.name || "—"}
        </p>
        <p className="Competitors_tableView_competesWithBrands_hint">
          {text.subtitle}
        </p>
      </div>
      <Competitors_sections_controlBtn
        isEditing={isEditing}
        onUpdate={() => handlers?.handleToggleEditingMode?.()}
        onCancel={() => handlers?.handleStopEditing?.()}
        onConfirm={handlers?.openConfirmSave}
        text={{
          updateLabel: text.updateLabel,
          editLabel: text.editLabel,
          cancelLabel: text.cancelLabel,
          confirmLabel: text.confirmLabel,
        }}
      />
    </div>
  );
};

export default Competitors_tableView_competesWithBrands_header;
