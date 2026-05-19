import "../../../_styles/menus_childComps/menus_options/menus_option_view_one.css";

const Menus_option_view_one = ({ states, handlers, childProps, t }) => {
  console.log("Menus_option_view_one states:", states);
  console.log("Menus_option_view_one states.option:", states.option);
  return (
    <div className="menus_option_view_one">
      <h1>Menus_option_view_one</h1>
      <p>states.session: {states.session}</p>
      <p>states.ownerType: {states.ownerType}</p>
      <p>states.viewingType: {states.viewingType}</p>
      <p>states.isUpdating: {states.isUpdating ? "true" : "false"}</p>
      <p>
        states.updatingField:
        {!states.updatingField ? "Not Updating" : states.updatingField}
      </p>
    </div>
  );
};

export default Menus_option_view_one;
