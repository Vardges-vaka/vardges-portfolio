import "../../_styles/menus_stateComps/menus_empty_modifiers.css";

const Menus_empty_modifiers = ({ states }) => {
  return <div className="menus_empty_modifiers">
    <p>{states.message}</p>
  </div>
};

export default Menus_empty_modifiers;