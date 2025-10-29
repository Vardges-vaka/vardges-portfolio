import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_calendar.config.js";
import { useCalendar } from "./02_calendar.hooks/_calendar.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { Calendar_YYY } from "./01_calendar.comps/_calendar.comps.index.js";
import "./00_styles/calendar.css";

const Calendar = () => {
  return (
    <div className="Calendar">
      <h1>Calendar</h1>
    </div>
  );
};

Calendar.displayName = "Calendar";

export default Calendar;
