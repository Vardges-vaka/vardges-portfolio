import { useState } from "react";
import {
  Input_text,
  Input_date,
  City_Icon,
  Country_Icon,
  Emirate_Icon,
} from "../../../../../../../../01_components/_components.index.js";
// import {} from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
// import {} from "../../../../../../../../00_assets/_assets.index.js";

import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_registeredIn.css";
const dateInput = (v) => {
  if (!v) return "";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
};
const CK_stp_brand_fld_registeredIn = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);
  const setBool = (name) => (e) => handlers.onChange?.(name, e.target.checked);
  const reg = v.registeredIn ?? {};
  return (
    <section className="cK_setup_form_section">
      <h4 className="cK_setup_form_sectionTitle">Registered in</h4>
      {/* <div className="cK_setup_form_row">
        <Input_text
          labelProps={{
            isActive: true,
            message: "Country:",
            iconProps: {
              isActive: true,
              position: "left",
              type: "svg",
              svg_src: Country_Icon(),
              title: "Shown on your dashboard",
            },
          }}
          value={reg.country ?? ""}
          onChange={set("registeredIn.country")}
          placeholder="Enter Country"
        />
        <Input_text
          labelProps={{
            isActive: true,
            message: "City:",
            iconProps: {
              isActive: true,
              position: "left",
              type: "svg",
              svg_src: City_Icon(),
              title: "Shown on your dashboard",
            },
          }}
          value={reg.city ?? ""}
          onChange={set("registeredIn.city")}
          placeholder="Enter City"
        />

        <Input_text
          labelProps={{
            isActive: true,
            message: "Emirate:",
            iconProps: {
              isActive: true,
              position: "left",
              type: "svg",
              svg_src: Emirate_Icon(),
              title: "Shown on your dashboard",
            },
          }}
          value={reg.emirate ?? ""}
          onChange={set("registeredIn.emirate")}
          placeholder="Enter Emirate"
        />
      </div> */}
      <Input_text
        labelProps={{
          isActive: true,
          message: "Country:",
          iconProps: {
            isActive: true,
            position: "left",
            type: "svg",
            svg_src: Country_Icon(),
            title: "Shown on your dashboard",
          },
        }}
        value={reg.country ?? ""}
        onChange={set("registeredIn.country")}
        placeholder="Enter Country"
      />
      <Input_text
        labelProps={{
          isActive: true,
          message: "City:",
          iconProps: {
            isActive: true,
            position: "left",
            type: "svg",
            svg_src: City_Icon(),
            title: "Shown on your dashboard",
          },
        }}
        value={reg.city ?? ""}
        onChange={set("registeredIn.city")}
        placeholder="Enter City"
      />

      <Input_text
        labelProps={{
          isActive: true,
          message: "Emirate:",
          iconProps: {
            isActive: true,
            position: "left",
            type: "svg",
            svg_src: Emirate_Icon(),
            title: "Shown on your dashboard",
          },
        }}
        value={reg.emirate ?? ""}
        onChange={set("registeredIn.emirate")}
        placeholder="Enter Emirate"
      />
      <Input_date
        labelProps={{
          isActive: true,
          message: "Date of registration:",
          iconProps: {
            isActive: true,
            position: "left",
            type: "lucide",
            lucidIcon: "CalendarClock",
            title: "Pick date",
          },
        }}
        value={dateInput(reg.dateOfRegistration)}
        onChange={set("registeredIn.dateOfRegistration")}
      />
      <div className="cK_setup_form_checks">
        <label className="cK_setup_form_check">
          <input
            type="checkbox"
            checked={!!reg.hasTradeLicense}
            onChange={setBool("registeredIn.hasTradeLicense")}
          />
          Trade licence
        </label>
        <label className="cK_setup_form_check">
          <input
            type="checkbox"
            checked={!!reg.hasVATCertificate}
            onChange={setBool("registeredIn.hasVATCertificate")}
          />
          VAT certificate
        </label>
        <label className="cK_setup_form_check">
          <input
            type="checkbox"
            checked={!!reg.hasTradeMark}
            onChange={setBool("registeredIn.hasTradeMark")}
          />
          Trademark
        </label>
      </div>
    </section>
  );
};

export default CK_stp_brand_fld_registeredIn;
