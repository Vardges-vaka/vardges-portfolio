import "../../_styles/cK_setup_states/cK_setup_empty_channels.css";

const CK_setup_empty_channels = ({ states, handlers, childProps, t }) => {
  return (
    <div className="cK_setup_empty_channels">
      {/* <p>{states.message}</p> */}
      <h1>CK_setup_empty_channels</h1>
      <button onClick={handlers.handleAddnew}>Add new channel</button>
    </div>
  );
};

export default CK_setup_empty_channels;
