/**
 * USE CASE: Image file picker with drag-and-drop zone, optional preview, and upload progress.
 * Set `multiple` for multi-select; set `showPreviewPanel` to show image previews below the dropzone.
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
import { formatFileSize } from "./input_helpers/fileInputUtils.js";
import useImageFileInput from "./input_helpers/useImageFileInput.js";
import "../_styles/inputs/input_image.css";

const Input_image = forwardRef(function Input_image(
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
    accept = "image/*",
    multiple = false,
    maxFiles = null,
    maxSizeBytes = null,
    dropzoneText,
    browseText = "click to browse",
    acceptHint = "PNG, JPG, WebP, GIF",
    showPreviewPanel = false,
    previewPanelLabel = "Preview",

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
  } = useImageFileInput({
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
      return resolvedFiles.map((item, index) => ({
        key: `${item.name}-${item.size}-${item.lastModified}-${index}`,
        name: item.name,
        size: item.size,
        url: resolvedPreviewUrls[index] ?? "",
        index,
      }));
    }

    if (!resolvedPreviewUrl) return [];

    return [
      {
        key: resolvedFile
          ? `${resolvedFile.name}-${resolvedFile.size}-${resolvedFile.lastModified}`
          : "preview-url",
        name: resolvedFile?.name ?? "",
        size: resolvedFile?.size,
        url: resolvedPreviewUrl,
        index: 0,
      },
    ];
  }, [
    multiple,
    resolvedFile,
    resolvedFiles,
    resolvedPreviewUrl,
    resolvedPreviewUrls,
  ]);

  const hasPreview = previewItems.some((item) => Boolean(item.url));

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
        message: multiple ? "Images ready." : "Image ready.",
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
    dropzoneText ??
    (multiple ? "Drag images here or" : "Drag an image here or");

  const filledDropzoneText = multiple
    ? "Drop more images or"
    : "Drop a new image or";

  const filledBrowseText = multiple ? "click to add more" : "click to replace";

  const rootClass = [
    baseStyle && "input_image",
    baseStyle && `input_image--${sizeType}`,
    multiple && "input_image--multiple",
    isInlineLabel && "input_image--labelInline",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const dropzoneClass = [
    "input_image__dropzone",
    dragOver && "input_image__dropzone--dragOver",
    disabled && "input_image__dropzone--disabled",
    validationMessage && "input_image__dropzone--error",
    uploadStatus === "done" && "input_image__dropzone--done",
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
        className="input_image__nativeInput"
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
        <div className="input_image__dropzoneFilled">
          <Field_icon
            baseStyle
            {...sharedSize}
            isActive
            type="lucide"
            lucidIcon={multiple ? "Images" : "RefreshCw"}
            decorative
            className="input_image__replaceIcon"
          />
          <p className="input_image__emptyText">
            {filledDropzoneText}
            <br />
            <strong>{filledBrowseText}</strong>
          </p>
          {multiple ? (
            <p className="input_image__acceptHint">
              {resolvedFiles.length} selected
              {maxFiles != null ? ` · max ${maxFiles}` : ""}
            </p>
          ) : null}
          <button
            type="button"
            className="input_image__removeBtn input_image__removeBtn--inline"
            disabled={disabled}
            aria-label={multiple ? "Remove all images" : "Remove image"}
            title={multiple ? "Remove all images" : "Remove image"}
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
            lucidIcon="ImageUp"
            decorative
            className="input_image__emptyIcon"
          />
          <p className="input_image__emptyText">
            {resolvedDropzoneText}
            <br />
            <strong>{browseText}</strong>
          </p>
          {acceptHint ? (
            <p className="input_image__acceptHint">
              {acceptHint}
              {multiple && maxFiles != null ? ` · up to ${maxFiles} files` : ""}
            </p>
          ) : null}
        </>
      )}
    </div>
  );

  const previewPanel =
    showPreviewPanel && hasPreview ? (
      <div className="input_image__previewPanel">
        <div className="input_image__previewPanelHeader">
          <span className="input_image__previewPanelLabel">
            {previewPanelLabel}
          </span>
          {multiple ? (
            <span className="input_image__previewPanelName">
              {previewItems.length} image{previewItems.length === 1 ? "" : "s"}
            </span>
          ) : previewItems[0]?.name ? (
            <span className="input_image__previewPanelName">
              {previewItems[0].name}
            </span>
          ) : null}
        </div>
        <div
          className={[
            "input_image__previewPanelGrid",
            previewItems.length === 1 && "input_image__previewPanelGrid--single",
          ]
            .filter(Boolean)
            .join(" ")}>
          {previewItems.map((item) => (
            <div key={item.key} className="input_image__previewCard">
              <div className="input_image__previewPanelFrame">
                <img
                  src={item.url}
                  alt={item.name ? `${item.name} preview` : "Image preview"}
                  className="input_image__previewPanelImage"
                />
              </div>
              {multiple ? (
                <div className="input_image__previewCardMeta">
                  <span className="input_image__previewCardName">{item.name}</span>
                  <button
                    type="button"
                    className="input_image__previewCardRemove"
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
          ))}
        </div>
      </div>
    ) : null;

  const metaItems = multiple
    ? resolvedFiles.map((item, index) => ({
        key: `${item.name}-${item.size}-${item.lastModified}-${index}`,
        name: item.name,
        size: item.size,
        index,
      }))
    : resolvedFile
      ? [
          {
            key: `${resolvedFile.name}-${resolvedFile.size}-${resolvedFile.lastModified}`,
            name: resolvedFile.name,
            size: resolvedFile.size,
            index: 0,
          },
        ]
      : [];

  const metaPanel =
    metaItems.length > 0 ? (
      <div className="input_image__meta">
        {metaItems.map((item) => (
          <div key={item.key} className="input_image__fileRow">
            <span className="input_image__fileName">{item.name}</span>
            <span className="input_image__fileSize">
              {formatFileSize(item.size)}
            </span>
            {multiple ? (
              <button
                type="button"
                className="input_image__fileRemove"
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
          <div className="input_image__progressWrap">
            <div
              className="input_image__progressTrack"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={resolvedProgress}
              aria-label="Upload progress">
              <div
                className="input_image__progressBar"
                style={{ width: `${resolvedProgress}%` }}
              />
            </div>
            {progressLabel ? (
              <span className="input_image__progressLabel">{progressLabel}</span>
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

Input_image.propTypes = {
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

Input_image.displayName = "Input_image";

export default Input_image;
