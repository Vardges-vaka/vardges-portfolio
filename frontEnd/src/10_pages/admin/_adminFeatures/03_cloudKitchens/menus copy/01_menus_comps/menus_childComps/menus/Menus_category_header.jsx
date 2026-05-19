import "../../../_styles/menus_childComps/menus/menus_category_header.css";

const Menus_category_header = ({
  states,
  handlers,
  childProps,
  t,
  category,
}) => {
  // console.log("Menus_category_header states:", states);
  // console.log("Menus_category_header states.menu:", states.menu);

  return (
    <div className="menus_category_header">
      <aside className="menus_category_header_aside">
        <p className="menus_category_header_label">{category.name.label}</p>
        <p className="menus_category_header_menuItems">
          <span className="menus_category_header_menuItems_count">
            {category.menuItems.length}
          </span>
          <span className="menus_category_header_menuItems_label">
            Menu Items
          </span>
        </p>
      </aside>

      <div className="menus_category_header_timing">
        {category.activeTimings.isAlwaysActive ? (
          <p className="menus_category_header_alwaysActive">Always Active</p>
        ) : (
          <>
            {category.activeTimings.windows.map((window, i) => {
              return (
                <div key={i + 58}>
                  <p className="menus_category_header_windowLabel">
                    {window.label}
                  </p>
                  <span className="menus_category_header_windowTime_from">
                    {window.from}
                  </span>
                  -
                  <span className="menus_category_header_windowTime_to">
                    {window.to}
                  </span>
                </div>
              );
            })}
          </>
        )}
      </div>
      <aside className="menus_category_header_actions">
        <button className="menus_category_header_button edit">Edit</button>
        <button className="menus_category_header_button dropdown">
          DropDown
        </button>
      </aside>
    </div>
  );
};

export default Menus_category_header;
