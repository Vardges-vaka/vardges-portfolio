import "../../_styles/cK_setup_states/cK_setup_empty_brand.css";

const CK_setup_empty_brand = ({ states, handlers, childProps, t }) => {
  return (
    <div className="cK_setup_empty_brand">
      {/* <p>{states.message}</p> */}
      <h1>CK_setup_empty_brand</h1>
      <button onClick={handlers.handleAddnew}>Add new brand</button>
    </div>
  );
};

export default CK_setup_empty_brand;
