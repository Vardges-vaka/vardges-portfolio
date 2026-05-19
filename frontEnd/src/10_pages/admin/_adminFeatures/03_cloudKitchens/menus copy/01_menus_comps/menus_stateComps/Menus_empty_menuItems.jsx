import "../../_styles/menus_stateComps/menus_empty_menuItems.css";

const Menus_empty_menuItems = ({ states }) => {
  return <div className="menus_empty_menuItems">
    <p>{states.message}</p>
  </div>
};

export default Menus_empty_menuItems;