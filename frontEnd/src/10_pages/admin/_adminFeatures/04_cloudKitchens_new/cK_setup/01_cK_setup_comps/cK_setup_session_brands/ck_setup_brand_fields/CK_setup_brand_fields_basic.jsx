import { Input_text } from "../../../../../../../../01_components/_components.index.js";
import { TAGLINE_INFO } from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import {
  RussianFlag,
  BritishFlag,
  ArabicFlag,
} from "../../../../../../../../00_assets/_assets.index.js";
import { useState } from "react";
const CK_setup_brand_fields_basic = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  const tagline = v.tagline ?? {};
  const translations = tagline.translations ?? {};
  const description = v.description ?? {};
  const [taglineTranslations, setTaglineTranslations] = useState(false);
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
      />
      <Input_text
        labelProps={{
          isActive: true,
          message: "Tagline",
        }}
        hintsProps={{
          isActive: true,
          type: "hint",
          message: TAGLINE_INFO,
        }}
        value={tagline.value ?? ""}
        onChange={set("tagline.value")}
        placeholder="Enter your Brand's Tagline"
      />
      <button
        type="button"
        className="cK_setup_form_ghostBtn"
        onClick={() => setTaglineTranslations(!taglineTranslations)}>
        {" "}
        {taglineTranslations
          ? "Hide Tagline Translations"
          : "Show Tagline Translations"}
      </button>
      {taglineTranslations && (
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
      )}

      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Description</span>
        <textarea
          className="cK_setup_form_input cK_setup_form_textarea"
          rows={2}
          value={description.value ?? ""}
          onChange={set("description.value")}
        />
      </label>
    </section>
  );
};

export default CK_setup_brand_fields_basic;
