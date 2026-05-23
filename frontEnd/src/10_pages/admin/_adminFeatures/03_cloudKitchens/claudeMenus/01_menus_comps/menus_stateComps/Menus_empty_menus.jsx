import "../../_styles/menus_stateComps/menus_empty_menus.css";

const Menus_empty_menus = ({ states }) => {
  return <div className="menus_empty_menus">
    <p>{states.message}</p>
  </div>
};

export default Menus_empty_menus;