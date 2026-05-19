import "../../_styles/menus_stateComps/menus_empty_modifierOptions.css";

const Menus_empty_modifierOptions = ({ states }) => {
  return (
    <div className="menus_empty_modifierOptions">
      <p>{states.message}</p>
    </div>
  );
};

export default Menus_empty_modifierOptions;
