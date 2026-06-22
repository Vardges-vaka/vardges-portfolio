/**
 * USE CASE: Generic file picker with drag-and-drop zone, optional preview, and upload progress.
 * Set `multiple` for multi-select; set `showPreviewPanel` for image thumbnails or file cards.
 */
import { forwardRef, useId, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Field_label,
  Field_hints,
  Field_icon,
} from "../fieldParts/_fieldParts.index.js";
import { INPUT_SIZE_TYPES } from "./input_helpers/inputSizeTypes.js";
import { normalizeLabelPosition } from "./input_helpers/inputLabelLayout.js";
import {
  deriveNameFromUrl,
  formatFileSize,
  getFileIconName,
  isImageMime,
  isImageUrl,
} from "./input_helpers/fileInputUtils.js";
import useFileInput from "./input_helpers/useFileInput.js";
import "../_styles/inputs/input_file.css";

const buildPreviewItem = ({
  file = null,
  url = "",
  name = "",
  index = 0,
  externalUrl = "",
}) => {
  const resolvedName = file?.name || name || deriveNameFromUrl(url || externalUrl);
  const mimeType = file?.type ?? "";
  const isImage = file ? isImageMime(mimeType) : isImageUrl(url || externalUrl);
  const previewUrl = isImage ? url : "";
  const linkUrl = externalUrl || (!file && url ? url : "");

  return {
    key: file
      ? `${file.name}-${file.size}-${file.lastModified}-${index}`
      : `${resolvedName}-${index}-${linkUrl || "preview"}`,
    name: resolvedName,
    size: file?.size,
    mimeType,
    isImage,
    previewUrl,
    linkUrl,
    icon: getFileIconName(mimeType, resolvedName),
    index,
  };
};

const Input_file = forwardRef(function Input_file(
  {
    labelProps = {},
    hintsProps = {},

    className,
    baseStyle = true,
    sizeType = "md",

    id: idProp,
    disabled,
    required,
    name,
    accept = "",
    multiple = false,
    maxFiles = null,
    maxSizeBytes = null,
    dropzoneText,
    browseText = "click to browse",
    acceptHint = "",
    showPreviewPanel = false,
    previewPanelLabel = "Preview",
    previewFileName = "",

    file,
    files,
    previewUrl,
    previewUrls,
    uploadProgress,
    simulateUpload = false,
    simulateUploadMs = 1400,
    onChange,
    onUpload,

    ...inputProps
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hintId = `${id}-hint`;

  const {
    inputRef,
    resolvedFile,
    resolvedFiles,
    resolvedPreviewUrl,
    resolvedPreviewUrls,
    resolvedProgress,
    dragOver,
    uploadStatus,
    validationMessage,
    handleInputChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    openPicker,
    clearAll,
    removeFileAt,
  } = useFileInput({
    multiple,
    file,
    files,
    previewUrl,
    previewUrls,
    uploadProgress,
    onChange,
    onUpload,
    simulateUpload,
    simulateUploadMs,
    maxSizeBytes,
    maxFiles,
    accept,
    disabled,
  });

  const setRef = (node) => {
    inputRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  const hasSelection = multiple
    ? resolvedFiles.length > 0
    : Boolean(resolvedFile);

  const previewItems = useMemo(() => {
    if (multiple) {
      return resolvedFiles.map((item, index) =>
        buildPreviewItem({
          file: item,
          url: resolvedPreviewUrls[index] ?? "",
          index,
        }),
      );
    }

    if (resolvedFile) {
      return [
        buildPreviewItem({
          file: resolvedFile,
          url: resolvedPreviewUrl,
          index: 0,
        }),
      ];
    }

    if (previewUrl) {
      return [
        buildPreviewItem({
          url: isImageUrl(previewUrl) ? previewUrl : "",
          externalUrl: previewUrl,
          name: previewFileName || deriveNameFromUrl(previewUrl),
          index: 0,
        }),
      ];
    }

    return [];
  }, [
    multiple,
    previewFileName,
    previewUrl,
    resolvedFile,
    resolvedFiles,
    resolvedPreviewUrl,
    resolvedPreviewUrls,
  ]);

  const showPreviewContent =
    showPreviewPanel &&
    previewItems.some(
      (item) => item.previewUrl || item.linkUrl || item.name,
    );

  const showProgress =
    hasSelection &&
    (uploadStatus === "uploading" ||
      uploadStatus === "done" ||
      resolvedProgress > 0);

  const resolvedHints = useMemo(() => {
    if (validationMessage) {
      return {
        isActive: true,
        type: "error",
        message: validationMessage,
        ...hintsProps,
      };
    }

    if (uploadStatus === "done" && !hintsProps.isActive) {
      return {
        isActive: true,
        type: "success",
        message: multiple ? "Files ready." : "File ready.",
      };
    }

    return hintsProps;
  }, [validationMessage, uploadStatus, hintsProps, multiple]);

  const describedBy = resolvedHints.isActive ? hintId : undefined;

  const labelPosition = normalizeLabelPosition(labelProps.position);
  const inlinePosition = labelProps.inlinePosition ?? "before";
  const isLabelActive = Boolean(labelProps.isActive && labelProps.message);
  const isInlineLabel = isLabelActive && labelPosition === "inline";

  const resolvedDropzoneText =
    dropzoneText ?? (multiple ? "Drag files here or" : "Drag a file here or");

  const filledDropzoneText = multiple
    ? "Drop more files or"
    : "Drop a new file or";

  const filledBrowseText = multiple ? "click to add more" : "click to replace";

  const rootClass = [
    baseStyle && "input_file",
    baseStyle && `input_file--${sizeType}`,
    multiple && "input_file--multiple",
    isInlineLabel && "input_file--labelInline",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const dropzoneClass = [
    "input_file__dropzone",
    dragOver && "input_file__dropzone--dragOver",
    disabled && "input_file__dropzone--disabled",
    validationMessage && "input_file__dropzone--error",
    uploadStatus === "done" && "input_file__dropzone--done",
  ]
    .filter(Boolean)
    .join(" ");

  const sharedSize = { sizeType };

  const labelElement = isLabelActive ? (
    <Field_label
      baseStyle
      {...sharedSize}
      {...labelProps}
      htmlFor={id}
      required={required ?? labelProps.required}
      position={labelPosition}
      inlinePosition={inlinePosition}
      textPosition={labelProps.textPosition ?? "left"}
    />
  ) : null;

  const progressLabel =
    uploadStatus === "uploading"
      ? `Uploading… ${resolvedProgress}%`
      : uploadStatus === "done"
        ? "Upload complete"
        : resolvedProgress > 0
          ? `${resolvedProgress}%`
          : "";

  const renderPreviewCard = (item) => (
    <div key={item.key} className="input_file__previewCard">
      <div className="input_file__previewPanelFrame">
        {item.previewUrl ? (
          <img
            src={item.previewUrl}
            alt={item.name ? `${item.name} preview` : "File preview"}
            className="input_file__previewPanelImage"
          />
        ) : (
          <div className="input_file__previewFileCard">
            <Field_icon
              baseStyle
              {...sharedSize}
              isActive
              type="lucide"
              lucidIcon={item.icon}
              decorative
              className="input_file__previewFileIcon"
            />
            <span className="input_file__previewFileName">{item.name}</span>
            {item.size != null ? (
              <span className="input_file__previewFileSize">
                {formatFileSize(item.size)}
              </span>
            ) : null}
            {item.linkUrl ? (
              <a
                href={item.linkUrl}
                className="input_file__previewFileLink"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}>
                Open file
              </a>
            ) : null}
          </div>
        )}
      </div>

      {multiple ? (
        <div className="input_file__previewCardMeta">
          <span className="input_file__previewCardName">{item.name}</span>
          <button
            type="button"
            className="input_file__previewCardRemove"
            disabled={disabled}
            aria-label={`Remove ${item.name}`}
            title={`Remove ${item.name}`}
            onClick={(event) => removeFileAt(item.index, event)}>
            <Field_icon
              baseStyle
              {...sharedSize}
              isActive
              type="lucide"
              lucidIcon="X"
              decorative
            />
          </button>
        </div>
      ) : null}
    </div>
  );

  const dropzone = (
    <div
      className={dropzoneClass}
      onClick={openPicker}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-describedby={describedBy}
      onKeyDown={(event) => {
        if (disabled) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPicker();
        }
      }}>
      <input
        ref={setRef}
        id={id}
        type="file"
        name={name}
        className="input_file__nativeInput"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        required={required && !hasSelection}
        aria-invalid={
          resolvedHints.isActive && resolvedHints.type === "error"
            ? true
            : undefined
        }
        onChange={handleInputChange}
        {...inputProps}
      />

      {hasSelection ? (
        <div className="input_file__dropzoneFilled">
          <Field_icon
            baseStyle
            {...sharedSize}
            isActive
            type="lucide"
            lucidIcon={multiple ? "Files" : "RefreshCw"}
            decorative
            className="input_file__replaceIcon"
          />
          <p className="input_file__emptyText">
            {filledDropzoneText}
            <br />
            <strong>{filledBrowseText}</strong>
          </p>
          {multiple ? (
            <p className="input_file__acceptHint">
              {resolvedFiles.length} selected
              {maxFiles != null ? ` · max ${maxFiles}` : ""}
            </p>
          ) : null}
          <button
            type="button"
            className="input_file__removeBtn input_file__removeBtn--inline"
            disabled={disabled}
            aria-label={multiple ? "Remove all files" : "Remove file"}
            title={multiple ? "Remove all files" : "Remove file"}
            onClick={(event) => {
              event.stopPropagation();
              clearAll(event);
            }}>
            <Field_icon
              baseStyle
              {...sharedSize}
              isActive
              type="lucide"
              lucidIcon="X"
              decorative
            />
          </button>
        </div>
      ) : (
        <>
          <Field_icon
            baseStyle
            {...sharedSize}
            isActive
            type="lucide"
            lucidIcon="Upload"
            decorative
            className="input_file__emptyIcon"
          />
          <p className="input_file__emptyText">
            {resolvedDropzoneText}
            <br />
            <strong>{browseText}</strong>
          </p>
          {acceptHint ? (
            <p className="input_file__acceptHint">
              {acceptHint}
              {multiple && maxFiles != null ? ` · up to ${maxFiles} files` : ""}
            </p>
          ) : null}
        </>
      )}
    </div>
  );

  const previewPanel = showPreviewContent ? (
    <div className="input_file__previewPanel">
      <div className="input_file__previewPanelHeader">
        <span className="input_file__previewPanelLabel">{previewPanelLabel}</span>
        {multiple ? (
          <span className="input_file__previewPanelName">
            {previewItems.length} file{previewItems.length === 1 ? "" : "s"}
          </span>
        ) : previewItems[0]?.name ? (
          <span className="input_file__previewPanelName">{previewItems[0].name}</span>
        ) : null}
      </div>
      <div
        className={[
          "input_file__previewPanelGrid",
          previewItems.length === 1 && "input_file__previewPanelGrid--single",
        ]
          .filter(Boolean)
          .join(" ")}>
        {previewItems.map(renderPreviewCard)}
      </div>
    </div>
  ) : null;

  const metaItems = multiple
    ? resolvedFiles.map((item, index) => ({
        key: `${item.name}-${item.size}-${item.lastModified}-${index}`,
        name: item.name,
        size: item.size,
        icon: getFileIconName(item.type, item.name),
        index,
      }))
    : resolvedFile
      ? [
          {
            key: `${resolvedFile.name}-${resolvedFile.size}-${resolvedFile.lastModified}`,
            name: resolvedFile.name,
            size: resolvedFile.size,
            icon: getFileIconName(resolvedFile.type, resolvedFile.name),
            index: 0,
          },
        ]
      : [];

  const metaPanel =
    metaItems.length > 0 ? (
      <div className="input_file__meta">
        {metaItems.map((item) => (
          <div key={item.key} className="input_file__fileRow">
            <Field_icon
              baseStyle
              {...sharedSize}
              isActive
              type="lucide"
              lucidIcon={item.icon}
              decorative
              className="input_file__fileRowIcon"
            />
            <span className="input_file__fileName">{item.name}</span>
            <span className="input_file__fileSize">
              {formatFileSize(item.size)}
            </span>
            {multiple ? (
              <button
                type="button"
                className="input_file__fileRemove"
                disabled={disabled}
                aria-label={`Remove ${item.name}`}
                title={`Remove ${item.name}`}
                onClick={(event) => removeFileAt(item.index, event)}>
                <Field_icon
                  baseStyle
                  {...sharedSize}
                  isActive
                  type="lucide"
                  lucidIcon="X"
                  decorative
                />
              </button>
            ) : null}
          </div>
        ))}

        {showProgress ? (
          <div className="input_file__progressWrap">
            <div
              className="input_file__progressTrack"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={resolvedProgress}
              aria-label="Upload progress">
              <div
                className="input_file__progressBar"
                style={{ width: `${resolvedProgress}%` }}
              />
            </div>
            {progressLabel ? (
              <span className="input_file__progressLabel">{progressLabel}</span>
            ) : null}
          </div>
        ) : null}
      </div>
    ) : null;

  const hintsElement = (
    <Field_hints
      baseStyle
      id={hintId}
      {...sharedSize}
      {...resolvedHints}
      textPosition={resolvedHints.textPosition ?? "left"}
    />
  );

  return (
    <div className={rootClass}>
      {labelPosition === "top" ? labelElement : null}
      {dropzone}
      {previewPanel}
      {metaPanel}
      {labelPosition === "bottom" ? labelElement : null}
      {hintsElement}
    </div>
  );
});

Input_file.propTypes = {
  labelProps: PropTypes.object,
  hintsProps: PropTypes.object,
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  sizeType: PropTypes.oneOf(INPUT_SIZE_TYPES),
  id: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  maxFiles: PropTypes.number,
  maxSizeBytes: PropTypes.number,
  dropzoneText: PropTypes.string,
  browseText: PropTypes.string,
  acceptHint: PropTypes.string,
  showPreviewPanel: PropTypes.bool,
  previewPanelLabel: PropTypes.string,
  previewFileName: PropTypes.string,
  file: PropTypes.object,
  files: PropTypes.arrayOf(PropTypes.object),
  previewUrl: PropTypes.string,
  previewUrls: PropTypes.arrayOf(PropTypes.string),
  uploadProgress: PropTypes.number,
  simulateUpload: PropTypes.bool,
  simulateUploadMs: PropTypes.number,
  onChange: PropTypes.func,
  onUpload: PropTypes.func,
};

Input_file.displayName = "Input_file";

export default Input_file;
