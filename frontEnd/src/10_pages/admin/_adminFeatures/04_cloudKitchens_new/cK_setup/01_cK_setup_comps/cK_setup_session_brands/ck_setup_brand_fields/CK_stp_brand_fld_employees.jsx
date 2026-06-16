import { useState } from "react";
import { Input_text } from "../../../../../../../../01_components/_components.index.js";
import { TAGLINE_INFO } from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import {
  RussianFlag,
  BritishFlag,
  ArabicFlag,
} from "../../../../../../../../00_assets/_assets.index.js";

import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_employees.css";

const CK_stp_brand_fld_employees = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  const tagline = v.tagline ?? {};
  const translations = tagline.translations ?? {};
  const description = v.description ?? {};
  const [show, setShow] = useState(false);
  return (
    <section className="cK_stp_brand_fld_employees">
      <h4 className="cK_setup_form_sectionTitle">CK_stp_brand_fld_employees</h4>
      {/* <Input_text
        labelProps={{
          isActive: true,
          message: "Russian:",
          iconProps: {
            isActive: true,
            position: "left",
            type: "svg",
            svg_src: RussianFlag,
            title: "Shown on your dashboard",
          },
        }}
        value={translations.ru ?? ""}
        onChange={set("tagline.translations.ru")}
        placeholder="Enter your Brand's tagline in Russian"
      /> */}
    </section>
  );
};

export default CK_stp_brand_fld_employees;
