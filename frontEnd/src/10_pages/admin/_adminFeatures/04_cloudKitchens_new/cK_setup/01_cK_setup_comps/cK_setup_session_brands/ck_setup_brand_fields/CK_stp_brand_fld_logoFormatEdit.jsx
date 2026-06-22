import { useCallback, useState } from "react";
import {
  Input_file,
  Input_text,
  Input_textArea,
  Select_static,
} from "../../../../../../../../01_components/_components.index.js";
import { FILES_USED_IN_OPTIONS } from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import {
  LOGO_FORMAT_SLOTS,
  buildLogoVariantTitle,
  countPresentLogoVariants,
  getFileItemUsedIn,
} from "../../../02_cK_setup_hlpr/brandFiles_hlpr.js";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_logoFormats.css";

const CK_stp_brand_fld_logoFormatEdit = ({
  logoVariantMap,
  onVariantChange,
  onVariantFieldChange,
}) => {
  const [expandedKeys, setExpandedKeys] = useState(() => new Set());
  const { present, total } = countPresentLogoVariants(logoVariantMap);

  const toggleExpanded = useCallback((slotKey) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(slotKey)) next.delete(slotKey);
      else next.add(slotKey);
      return next;
    });
  }, []);

  const setField = (slotKey, path) => (event) =>
    onVariantFieldChange?.(slotKey, path, event.target.value);

  return (
    <div className="cK_stp_brand_fld_logoFormats cK_stp_brand_fld_logoFormats--edit">
      <div className="cK_stp_brand_fld_logoFormats__header">
        <h5 className="cK_stp_brand_fld_logoFormats__title">Logo formats</h5>
        <span className="cK_stp_brand_fld_logoFormats__count">
          {present} / {total} uploaded
        </span>
      </div>

      <ul className="cK_stp_brand_fld_logoFormats__list">
        {LOGO_FORMAT_SLOTS.map((slot) => {
          const item = logoVariantMap[slot.key];
          const isPresent = Boolean(item?.url);
          const isOpen = expandedKeys.has(slot.key);
          const defaultTitle = buildLogoVariantTitle(slot.key);

          return (
            <li
              key={slot.key}
              className={[
                "cK_stp_brand_fld_logoFormats__row",
                "cK_stp_brand_fld_logoFormats__row--edit",
                isPresent
                  ? "cK_stp_brand_fld_logoFormats__row--present"
                  : "cK_stp_brand_fld_logoFormats__row--missing",
                isOpen && "cK_stp_brand_fld_logoFormats__row--open",
              ]
                .filter(Boolean)
                .join(" ")}>
              <button
                type="button"
                className="cK_stp_brand_fld_logoFormats__toggle"
                aria-expanded={isOpen}
                aria-label={`${isOpen ? "Collapse" : "Expand"} ${slot.label} fields`}
                onClick={() => toggleExpanded(slot.key)}>
                <span
                  className="cK_stp_brand_fld_logoFormats__chevron"
                  aria-hidden="true">
                  {isOpen ? "▼" : "▶"}
                </span>
              </button>

              <div className="cK_stp_brand_fld_logoFormats__summary">
                <span className="cK_stp_brand_fld_logoFormats__label">
                  {slot.label}
                </span>
                <span
                  className={[
                    "cK_stp_brand_fld_logoFormats__status",
                    isPresent
                      ? "cK_stp_brand_fld_logoFormats__status--present"
                      : "cK_stp_brand_fld_logoFormats__status--missing",
                  ].join(" ")}>
                  {isPresent ? "Present" : "Missing"}
                </span>
              </div>

              {isOpen ? (
                <div className="cK_stp_brand_fld_logoFormats__panel">
                  <Input_file
                    accept={slot.accept}
                    labelProps={{ isActive: true, message: "File" }}
                    hintsProps={{
                      isActive: true,
                      type: "hint",
                      message: isPresent
                        ? "Upload a new file to replace this format."
                        : "Upload the file for this logo format.",
                    }}
                    showPreviewPanel
                    previewUrl={item?.url || ""}
                    previewFileName={slot.label}
                    simulateUpload
                    onChange={(event) =>
                      onVariantChange?.(
                        slot.key,
                        event.target.files?.[0] ?? null,
                      )
                    }
                  />

                  <Input_text
                    labelProps={{ isActive: true, message: "Title" }}
                    value={item?.title || defaultTitle}
                    onChange={setField(slot.key, "title")}
                    placeholder={defaultTitle}
                  />

                  <div className="cK_stp_brand_fld_logoFormats__fieldRow">
                    <Input_text
                      labelProps={{ isActive: true, message: "Format" }}
                      value={item?.format || slot.key}
                      onChange={setField(slot.key, "format")}
                      placeholder={slot.key}
                    />
                    <Input_text
                      labelProps={{ isActive: true, message: "Size (KB)" }}
                      value={item?.sizeIn_KB ?? ""}
                      onChange={setField(slot.key, "sizeIn_KB")}
                      placeholder="0"
                    />
                  </div>

                  <Input_text
                    labelProps={{ isActive: true, message: "URL" }}
                    value={item?.url || ""}
                    onChange={setField(slot.key, "url")}
                    placeholder="https://…"
                  />

                  <Select_static
                    labelProps={{ isActive: true, message: "Used in" }}
                    options={FILES_USED_IN_OPTIONS}
                    placeholder="Pick usage…"
                    value={getFileItemUsedIn(item)}
                    onChange={setField(slot.key, "usedIn")}
                  />

                  <Input_text
                    labelProps={{ isActive: true, message: "Ref" }}
                    value={item?.ref || ""}
                    onChange={setField(slot.key, "ref")}
                    placeholder="ObjectId or reference"
                  />

                  <Input_textArea
                    labelProps={{
                      isActive: true,
                      message: "Description",
                    }}
                    rows={2}
                    value={item?.description?.value ?? ""}
                    onChange={setField(slot.key, "description.value")}
                    placeholder="Short description"
                  />

                  <div className="cK_stp_brand_fld_logoFormats__fieldRow">
                    <Input_text
                      labelProps={{ isActive: true, message: "Description short" }}
                      value={item?.description?.short ?? ""}
                      onChange={setField(slot.key, "description.short")}
                    />
                    <Input_text
                      labelProps={{ isActive: true, message: "Description long" }}
                      value={item?.description?.long ?? ""}
                      onChange={setField(slot.key, "description.long")}
                    />
                  </div>

                  <Input_textArea
                    labelProps={{ isActive: true, message: "Notes" }}
                    rows={2}
                    value={item?.notes ?? ""}
                    onChange={setField(slot.key, "notes")}
                    placeholder="Internal notes"
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CK_stp_brand_fld_logoFormatEdit;
