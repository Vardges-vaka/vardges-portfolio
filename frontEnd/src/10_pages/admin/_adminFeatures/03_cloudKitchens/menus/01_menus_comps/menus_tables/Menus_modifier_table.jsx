import { MODIFIERS_TBL_HDRS } from "../../05_menus_cnst/_menus_cnst.index.js";
import "../../_styles/menus_childComps/menus_modifiers/menus_modifier_table.css";

const Menus_modifier_table = ({
  states,
  handlers,
  childProps,
  t,
  modifiers,
}) => {
  // console.log("menus_modifier_table states:", states);
  // console.log("menus_modifier_table states.modifiers:", states.modifiers);
  const modifiersTableHeaders = MODIFIERS_TBL_HDRS();

  const getAvailableTags = (items) => {
    let value = "";
    let count = items.length;

    if (count > 0) {
      value = items[0];
    }
    return { value, count };
  };

  const getOptionPreview = (options = []) => {
    const preview = options.slice(0, 2);
    const remaining = Math.max(0, options.length - 2);
    return { preview, remaining };
  };

  const getActiveTimingsSummary = (activeTimings) => {
    if (!activeTimings) {
      return { mode: "empty" };
    }
    if (activeTimings.isAlwaysActive) {
      return { mode: "always" };
    }
    const windows = activeTimings.windows ?? [];
    if (windows.length === 0) {
      return { mode: "unscheduled" };
    }
    const hasMoreThanTwo = windows.length > 2;
    return {
      mode: "windows",
      windows,
      preview: hasMoreThanTwo ? windows.slice(0, 1) : windows,
      extraWindows: hasMoreThanTwo ? windows.slice(1) : [],
      remaining: hasMoreThanTwo ? windows.length - 1 : 0,
    };
  };

  const buildWindowTooltip = (window) =>
    `${window.label} · ${window.from} – ${window.to}`;
  return (
    <div className="menus_modifier_table">
      <table className="menus_modifier_table">
        <thead>
          <tr>
            {modifiersTableHeaders.map((header) => {
              return (
                <th
                  key={`menus_modifier_table_header ${header.label}`}
                  scope="col"
                  className={`menus_modifier_table_header ${header.className}`}
                  title={header.title}>
                  {header.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {modifiers?.map((modifier, rowIndex) => {
            const menuItems = getAvailableTags(modifier.availableInMenuItems);
            const { preview: optionPreview, remaining: remainingOptions } =
              getOptionPreview(modifier.options);
            const activeTimingsSummary = getActiveTimingsSummary(
              modifier.activeTimings,
            );
            return (
              <tr
                className="menus_modifier_table_rows_provider"
                key={modifier._id}>
                <td className="menus_modifier_table_rows_provider_cell">
                  {rowIndex + 1}
                </td>
                <td className="menus_modifier_table_rows_provider_cell modifiers">
                  <div>
                    {menuItems?.value ? (
                      <>
                        {" "}
                        <span>{menuItems.value}</span>
                        {menuItems.count > 1 && (
                          <span
                            style={{ fontWeight: "bold", marginLeft: "10px" }}>
                            {menuItems.count + 1}
                          </span>
                        )}
                      </>
                    ) : (
                      <button className="menus_modifier_table_row btn">
                        Assign Menu Items
                      </button>
                    )}
                  </div>
                </td>
                <td className="menus_modifier_table_rows_provider_cell label">
                  {modifier.title.label}
                </td>
                <td className="menus_modifier_table_rows_provider_cell description">
                  {modifier.description.short}
                </td>
                <td className="menus_modifier_table_rows_provider_cell image">
                  {optionPreview.length === 0 && !remainingOptions ? (
                    <span className="menus_modifier_table_optionsStack_empty">
                      —
                    </span>
                  ) : (
                    <div
                      className="menus_modifier_table_optionsStack"
                      title={
                        modifier.options?.length
                          ? `${modifier.options.length} option(s)`
                          : undefined
                      }>
                      {optionPreview.map((OPTION) => (
                        <button
                          key={OPTION._id ?? OPTION.option?._id}
                          type="button"
                          className="menus_modifier_table_row btn">
                          <img
                            src={OPTION.option.images.main}
                            alt={OPTION.option.name.label}
                            className="menus_modifier_table_row image"
                          />
                        </button>
                      ))}
                      {remainingOptions > 0 && (
                        <button
                          type="button"
                          className="menus_modifier_table_row btn menus_modifier_table_row_btn--more"
                          aria-label={`${remainingOptions} more option(s)`}>
                          <span className="menus_modifier_table_row_moreLabel">
                            +{remainingOptions}
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </td>
                <td className="menus_modifier_table_rows_provider_cell ownerType">
                  {modifier.ownerType}
                </td>
                <td className="menus_modifier_table_rows_provider_cell activeTimings">
                  {activeTimingsSummary.mode === "empty" && (
                    <span className="menus_modifier_table_activeTimings_empty">
                      —
                    </span>
                  )}
                  {activeTimingsSummary.mode === "unscheduled" && (
                    <span className="menus_modifier_table_activeTimings_unscheduled">
                      No schedule
                    </span>
                  )}
                  {activeTimingsSummary.mode === "always" && (
                    <span
                      className="menus_modifier_table_activeTimings_always"
                      title="Always active — available all day">
                      Always Active
                    </span>
                  )}
                  {activeTimingsSummary.mode === "windows" && (
                    <div
                      className={`menus_modifier_table_activeTimings${
                        activeTimingsSummary.remaining > 0
                          ? " menus_modifier_table_activeTimings--collapsed"
                          : ""
                      }`}>
                      <ul className="menus_modifier_table_activeTimings_list">
                        {activeTimingsSummary.preview.map((window) => (
                          <li
                            key={`${window.label}-${window.from}-${window.to}`}
                            className="menus_modifier_table_activeTimings_item"
                            title={buildWindowTooltip(window)}>
                            <span className="menus_modifier_table_activeTimings_range">
                              {window.from}–{window.to}
                            </span>
                          </li>
                        ))}
                        {activeTimingsSummary.extraWindows?.map((window) => (
                          <li
                            key={`extra-${window.label}-${window.from}-${window.to}`}
                            className="menus_modifier_table_activeTimings_item menus_modifier_table_activeTimings_item--extra"
                            title={buildWindowTooltip(window)}>
                            <span className="menus_modifier_table_activeTimings_range">
                              {window.from}–{window.to}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {activeTimingsSummary.remaining > 0 && (
                        <span className="menus_modifier_table_activeTimings_badge">
                          +{activeTimingsSummary.remaining}
                        </span>
                      )}
                    </div>
                  )}
                </td>
                <td className="menus_modifier_table_rows_provider_cell isOptional">
                  {modifier.isOptional ? "Optional" : "Mandatory"}
                </td>
                <td className="menus_modifier_table_rows_provider_cell selectionMode">
                  {modifier.selectionMode}
                </td>
                <td className="menus_modifier_table_rows_provider_cell isFree">
                  {modifier.isFree ? "Free" : "Paid"}
                </td>
                <td className="menus_modifier_table_rows_provider_cell">
                  <button className="menus_modifier_table_rows_provider_cell_button">
                    Update
                  </button>
                </td>
                <td className="menus_modifier_table_rows_provider_cell">
                  <button className="menus_modifier_table_rows_provider_cell_button">
                    View
                  </button>
                </td>
                <td className="menus_modifier_table_rows_provider_cell">
                  <button className="menus_modifier_table_rows_provider_cell_button">
                    Dropdown
                  </button>
                </td>
              </tr>
            );
          })}

          {/* 
    //! 1) index +1    
    { label: "#", className: "index", title: "#" },
    //! 2) modifier.availableInMenuItems
    { label: "Menu Items", className: "ownerType", title: "Used by Menu Items" },
    //! 3) modifier.title.label
    { label: "Name", className: "name", title: "Menu Item Name" },
    //! 4) modifier.description.short
    { label: "Description", className: "description", title: "Menu Item Selling Price", },
    //! 5) modifier.options.option.images.main || No Options Added
    { label: "Options", className: "options", title: "Modifier Options" },
    //! 6) modifier.ownerType
    { label: "Owner", className: "ownerType", title: "Modifier Owner" },
    //! 7) modifier.activeTimings.isAlwaysActive || modifier.activeTimings.windows[0].label 
    { label: "Active Timings", className: "activeTimings", title: "Modifier's Active Timings", },
    //! 8) modifier.isOptional
    { label: "Is Optional", className: "isOptional", title: "Is Modifier Optional or Mandatory", },
    //! 9) modifier.selectionMode
    { label: "Selection Mode", className: "selectionMode", title: "How many options can be selected", },
    //! 10) modifier.isFree
    { label: "Is Free", className: "isFree", title: "Is Modifier Free or Paid", },
         //! 11)Seperate Components
    { label: "Update", className: "update", title: "Update the Menu Item" },
    //! 12) Seperate Components
    { label: "View", className: "view", title: "View the Menu Item" },
    //! 13 Seperate Components
    { label: "Dropdown", className: "dropdown", title: "Quick Look", },
          */}
        </tbody>
      </table>
    </div>
  );
};

export default Menus_modifier_table;
