import { useState } from "react";
import { Input_text } from "../../../../../../../../01_components/_components.index.js";
import { TAGLINE_INFO } from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import {
  RussianFlag,
  BritishFlag,
  ArabicFlag,
} from "../../../../../../../../00_assets/_assets.index.js";

import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_cuisineTags.css";

const CK_stp_brand_fld_cuisineTags = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  const tagline = v.tagline ?? {};
  const translations = tagline.translations ?? {};
  const description = v.description ?? {};
  const [show, setShow] = useState(false);
  /*
  const PLATFORMS = [
  "talabat",
  "deliveroo",
  "noon",
  "careem",
  "keeta",
  "restHero",
];

const CUISINE_TYPES = [
  "cuisine",
  "category",
  "dietary",
  "mealType",
  "dessert",
  "beverage",
  "other",
];

  const CUISINE_TAG_SOURCES = ["scraped", "KAM", "manual", "other"];
  */
  return (
    <section className="cK_stp_brand_fld_cuisineTags">
      <h4 className="cK_setup_form_sectionTitle">
        CK_stp_brand_fld_cuisineTags
      </h4>
      {/* 
    value: "",
    label: "",
    description: "",
    platforms: [
      "",
    ],
    kind: "",
    source: "",
      /> */}
    </section>
  );
};

export default CK_stp_brand_fld_cuisineTags;
