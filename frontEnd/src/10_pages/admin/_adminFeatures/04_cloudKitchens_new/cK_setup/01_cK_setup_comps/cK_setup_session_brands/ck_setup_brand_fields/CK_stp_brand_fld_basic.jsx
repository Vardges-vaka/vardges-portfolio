import { useState } from "react";
import {
  Input_text,
  Input_textArea,
  Select_static,
} from "../../../../../../../../01_components/_components.index.js";
import {
  TAGLINE_INFO,
  PRICE_RANGE_OPTIONS,
} from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import {
  RussianFlag,
  BritishFlag,
  ArabicFlag,
} from "../../../../../../../../00_assets/_assets.index.js";

import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_basic.css";

const CK_stp_brand_fld_basic = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);
  const [taglineTranslations, setTaglineTranslations] = useState(false);
  const PRICE_OPTIONS = PRICE_RANGE_OPTIONS();
  const showTransl = () => {
    return (
      <>
        <span>
          <span
            className="CK_stp_brand_fld_basic_taglineHint"
            onClick={() => setTaglineTranslations(!taglineTranslations)}>
            Click here
          </span>
          to see translations.
        </span>
      </>
    );
  };
  const aa = showTransl();
  const tagline = v.tagline ?? {};
  const translations = tagline.translations ?? {};
  const description = v.description ?? {};
  return (
    <section className="cK_setup_form_section">
      <h4 className="cK_setup_form_sectionTitle">Basics</h4>
      <Input_text
        required={true}
        labelProps={{
          isActive: true,
          message: "Brand name",
        }}
        value={v.name ?? ""}
        onChange={set("name")}
        placeholder="Enter your Brand's name"
        data_field_name="name"
        maxLength={50}
        lengthProps={{ isActive: true }}
      />
      <Input_text
        labelProps={{
          isActive: true,
          message: "Tagline",
        }}
        hintsProps={{
          isActive: true,
          type: "hint",
          message: aa,
        }}
        value={tagline.value ?? ""}
        onChange={set("tagline.value")}
        placeholder="Enter your Brand's Tagline"
        maxLength={100}
        lengthProps={{ isActive: true }}
      />
      {taglineTranslations && (
        <>
          <div className="cK_setup_form_row">
            <Input_text
              labelProps={{
                isActive: true,
                message: "English:",
                iconProps: {
                  isActive: true,
                  position: "left",
                  type: "svg",
                  svg_src: BritishFlag,
                  title: "Shown on your dashboard",
                },
              }}
              value={translations.en ?? ""}
              onChange={set("tagline.translations.en")}
              placeholder="Enter your Brand's tagline in English"
            />

            <Input_text
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
            />
            <Input_text
              labelProps={{
                isActive: true,
                message: "Arabic:",
                iconProps: {
                  isActive: true,
                  position: "left",
                  type: "svg",
                  svg_src: ArabicFlag,
                  title: "Shown on your dashboard",
                },
              }}
              value={translations.ar ?? ""}
              onChange={set("tagline.translations.ar")}
              placeholder="Enter your Brand's tagline in Arabic"
            />
          </div>
          <button
            type="button"
            className="cK_setup_form_ghostBtn"
            onClick={() => setTaglineTranslations(!taglineTranslations)}>
            {" "}
            {taglineTranslations
              ? "Hide Tagline Translations"
              : "Show Tagline Translations"}
          </button>
        </>
      )}
      {/**/}{" "}
      <Input_textArea
        labelProps={{
          isActive: true,
          message: "Description",
        }}
        maxLength={500}
        lengthProps={{ isActive: true }}
        rows={2}
        placeholder="Enter your Brand's description in few words"
        value={description.value ?? ""}
        onChange={set("description.value")}
      />
      {/* Price Range */}
      <Select_static
        optionsType="leftIcon"
        labelProps={{ isActive: true, message: "Price range" }}
        options={PRICE_OPTIONS}
        placeholder="Pick one…"
        value={v.priceRange ?? ""}
        onChange={set("priceRange")}
      />
    </section>
  );
};

export default CK_stp_brand_fld_basic;
