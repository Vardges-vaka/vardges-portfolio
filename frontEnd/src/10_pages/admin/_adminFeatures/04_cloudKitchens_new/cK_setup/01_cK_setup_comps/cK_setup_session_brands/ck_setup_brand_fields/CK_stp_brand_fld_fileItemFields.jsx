import {
  Input_file,
  Input_text,
  Input_textArea,
  Select_static,
} from "../../../../../../../../01_components/_components.index.js";
import { FILES_USED_IN_OPTIONS } from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import {
  buildFilePreviewUrl,
  getFileItemUsedIn,
} from "../../../02_cK_setup_hlpr/brandFiles_hlpr.js";
import CK_stp_brand_fld_fileActions from "./CK_stp_brand_fld_fileActions.jsx";
import CK_stp_brand_fld_fileMediaPreview from "./CK_stp_brand_fld_fileMediaPreview.jsx";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_fileItemFields.css";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_fileMediaPreview.css";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_fileActions.css";

const CK_stp_brand_fld_fileItemFields = ({
  item,
  brandId = "",
  integrationId = "",
  onFieldChange,
  fileInput = null,
  resolveFileUrl,
  showMediaPreview = true,
  defaultTitle = "",
  defaultFormat = "",
}) => {
  const setField = (path) => (event) =>
    onFieldChange?.(path, event.target.value);

  const previewUrl =
    fileInput?.previewUrl ||
    buildFilePreviewUrl(item, resolveFileUrl);

  return (
    <div className="cK_stp_brand_fld_fileItemFields">
      {fileInput ? (
        <Input_file
          accept={fileInput.accept}
          labelProps={{ isActive: true, message: "File" }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message:
              fileInput.hint ||
              (item?.url
                ? "Upload a new file to replace this one."
                : "Upload the file for this entry."),
          }}
          showPreviewPanel
          previewUrl={fileInput.previewUrl || ""}
          previewFileName={fileInput.previewFileName || defaultTitle}
          simulateUpload
          onChange={fileInput.onChange}
        />
      ) : null}

      {previewUrl && showMediaPreview ? (
        <>
          <CK_stp_brand_fld_fileMediaPreview
            item={item}
            previewUrl={previewUrl}
            compact
            label={defaultTitle || item?.title || "File preview"}
          />
          <CK_stp_brand_fld_fileActions
            brandId={brandId}
            integrationId={integrationId}
            item={item}
            resolveFileUrl={resolveFileUrl}
            previewUrl={previewUrl}
          />
        </>
      ) : null}

      {previewUrl && !showMediaPreview ? (
        <CK_stp_brand_fld_fileActions
          brandId={brandId}
          integrationId={integrationId}
          item={item}
          resolveFileUrl={resolveFileUrl}
          previewUrl={previewUrl}
        />
      ) : null}

      <Input_text
        labelProps={{ isActive: true, message: "Title" }}
        value={item?.title || defaultTitle}
        onChange={setField("title")}
        placeholder={defaultTitle || "File title"}
      />

      <div className="cK_stp_brand_fld_fileItemFields__fieldRow">
        <Input_text
          labelProps={{ isActive: true, message: "Format" }}
          value={item?.format || defaultFormat}
          onChange={setField("format")}
          placeholder={defaultFormat || "pdf"}
        />
        <Input_text
          labelProps={{ isActive: true, message: "Size (KB)" }}
          value={item?.sizeIn_KB ?? ""}
          onChange={setField("sizeIn_KB")}
          placeholder="0"
        />
      </div>

      <Select_static
        labelProps={{ isActive: true, message: "Used in" }}
        options={FILES_USED_IN_OPTIONS}
        placeholder="Pick usage…"
        value={getFileItemUsedIn(item)}
        onChange={setField("usedIn")}
      />

      <Input_text
        labelProps={{ isActive: true, message: "Ref" }}
        value={item?.ref || ""}
        onChange={setField("ref")}
        placeholder="ObjectId or reference"
      />

      <Input_textArea
        labelProps={{ isActive: true, message: "Description" }}
        rows={2}
        value={item?.description?.value ?? ""}
        onChange={setField("description.value")}
        placeholder="Short description"
      />

      <div className="cK_stp_brand_fld_fileItemFields__fieldRow">
        <Input_text
          labelProps={{ isActive: true, message: "Description short" }}
          value={item?.description?.short ?? ""}
          onChange={setField("description.short")}
        />
        <Input_text
          labelProps={{ isActive: true, message: "Description long" }}
          value={item?.description?.long ?? ""}
          onChange={setField("description.long")}
        />
      </div>

      <Input_textArea
        labelProps={{ isActive: true, message: "Notes" }}
        rows={2}
        value={item?.notes ?? ""}
        onChange={setField("notes")}
        placeholder="Internal notes"
      />
    </div>
  );
};

export default CK_stp_brand_fld_fileItemFields;
