import "../../_styles/cK_setup_session_cuisineTags/cK_setup_cuisineTags_viewAll.css";
import CK_stp_cuisineTag_catalogList from "./CK_stp_cuisineTag_catalogList.jsx";

const CK_setup_cuisineTags_viewAll = ({ states, handlers, t }) => {
  const cuisineTags = states?.cuisineTags ?? [];

  return (
    <div className="cK_setup_cuisineTags_viewAll">
      <CK_stp_cuisineTag_catalogList
        title="All cuisine tags"
        tags={cuisineTags}
        handlers={handlers}
        t={t}
        emptyMessage="No cuisine tags in the catalog yet."
      />
    </div>
  );
};

export default CK_setup_cuisineTags_viewAll;
