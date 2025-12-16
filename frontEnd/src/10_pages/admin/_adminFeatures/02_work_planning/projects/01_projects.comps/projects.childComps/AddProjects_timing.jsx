import "../../00_styles/addProjects_timing.css";

const AddProjects_timing = ({ states, handlers }) => {
  return (
    <div className="AddProjects_timing">
      <div className="AddProjects_timing_content">
        <div className="AddProjects_timing_content_item">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={states.addingProject_config.timing.startDate}
            onChange={handlers.handleConfig_Timing_change}
          />
        </div>
      </div>
      <div className="AddProjects_timing_content">
        <div className="AddProjects_timing_content_item">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={states.addingProject_config.timing.endDate}
            onChange={handlers.handleConfig_Timing_change}
            disabled={!states.addingProject_config.timing.isOngoing}
          />
        </div>
      </div>
      <div className="AddProjects_timing_content">
        <div className="AddProjects_timing_content_item">
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={states.addingProject_config.timing.deadline}
            onChange={handlers.handleConfig_Timing_change}
            disabled={!states.addingProject_config.timing.isDeadline}
          />
        </div>
      </div>
    </div>
  );
};

export default AddProjects_timing;
