import { useState, useRef, useCallback, useEffect } from "react";
import {
  validateFile,
  validateFiles,
  createObjectPreviewUrl,
  revokeObjectPreviewUrl,
  runSimulatedUpload,
  mergeUniqueFiles,
  buildImagePreviewUrls,
  isImageMime,
} from "./fileInputUtils.js";

const revokePreviewList = (urls = []) => {
  urls.forEach((url) => revokeObjectPreviewUrl(url));
};

export const useFileInput = ({
  multiple = false,
  file: controlledFile,
  files: controlledFiles,
  previewUrl: controlledPreviewUrl,
  previewUrls: controlledPreviewUrls,
  uploadProgress: controlledProgress,
  onChange,
  onUpload,
  simulateUpload = false,
  simulateUploadMs = 1400,
  maxSizeBytes = null,
  maxFiles = null,
  accept = "",
  disabled = false,
}) => {
  const inputRef = useRef(null);
  const [internalFile, setInternalFile] = useState(null);
  const [internalFiles, setInternalFiles] = useState([]);
  const [internalPreviewUrl, setInternalPreviewUrl] = useState("");
  const [internalPreviewUrls, setInternalPreviewUrls] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [internalProgress, setInternalProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [validationMessage, setValidationMessage] = useState("");

  const isFileControlled = !multiple && controlledFile !== undefined;
  const isFilesControlled = multiple && controlledFiles !== undefined;

  const resolvedFile = isFileControlled ? controlledFile : internalFile;
  const resolvedFiles = isFilesControlled ? controlledFiles : internalFiles;
  const resolvedProgress =
    controlledProgress !== undefined ? controlledProgress : internalProgress;

  const setPreviewSafely = useCallback((nextUrl) => {
    setInternalPreviewUrl((prev) => {
      if (prev && prev !== nextUrl) revokeObjectPreviewUrl(prev);
      return nextUrl;
    });
  }, []);

  const setPreviewListSafely = useCallback((nextUrls) => {
    setInternalPreviewUrls((prev) => {
      revokePreviewList(prev);
      return nextUrls;
    });
  }, []);

  useEffect(() => {
    if (multiple || controlledPreviewUrl !== undefined) return;

    if (controlledFile !== undefined) {
      setPreviewSafely(
        controlledFile && isImageMime(controlledFile.type)
          ? createObjectPreviewUrl(controlledFile)
          : "",
      );
    }
  }, [controlledFile, controlledPreviewUrl, multiple, setPreviewSafely]);

  useEffect(() => {
    if (!multiple || controlledPreviewUrls !== undefined) return;

    if (controlledFiles !== undefined) {
      setPreviewListSafely(buildImagePreviewUrls(controlledFiles));
    }
  }, [controlledFiles, controlledPreviewUrls, multiple, setPreviewListSafely]);

  const resolvedPreviewUrl =
    controlledPreviewUrl ?? internalPreviewUrl ?? "";

  const resolvedPreviewUrls = controlledPreviewUrls ?? internalPreviewUrls ?? [];

  useEffect(
    () => () => {
      revokeObjectPreviewUrl(internalPreviewUrl);
      revokePreviewList(internalPreviewUrls);
    },
    [internalPreviewUrl, internalPreviewUrls],
  );

  const fireChange = useCallback(
    (nextValue) => {
      const list = multiple
        ? Array.isArray(nextValue)
          ? nextValue
          : []
        : nextValue
          ? [nextValue]
          : [];

      onChange?.({
        target: {
          files: list,
          value: multiple ? "" : (list[0]?.name ?? ""),
        },
        currentTarget: {
          files: list,
          value: multiple ? "" : (list[0]?.name ?? ""),
        },
      });
    },
    [multiple, onChange],
  );

  const startUpload = useCallback(
    async (filesToUpload) => {
      const list = Array.isArray(filesToUpload)
        ? filesToUpload
        : filesToUpload
          ? [filesToUpload]
          : [];

      if (!list.length || disabled) return;

      setUploadStatus("uploading");
      setInternalProgress(0);

      try {
        if (onUpload) {
          for (const item of list) {
            await onUpload(item, {
              onProgress: (value) => setInternalProgress(value),
            });
          }
        } else if (simulateUpload) {
          await runSimulatedUpload(setInternalProgress, simulateUploadMs);
        } else {
          setInternalProgress(100);
        }

        setUploadStatus("done");
      } catch {
        setUploadStatus("error");
        setValidationMessage("Upload failed. Try again.");
      }
    },
    [disabled, onUpload, simulateUpload, simulateUploadMs],
  );

  const applySingleFile = useCallback(
    (file) => {
      if (disabled || !file) return;

      const validation = validateFile(file, { maxSizeBytes, accept });

      if (!validation.isValid) {
        if (inputRef.current) inputRef.current.value = "";
        setValidationMessage(validation.message);
        setUploadStatus("error");
        return;
      }

      setValidationMessage("");
      setUploadStatus("idle");
      setInternalProgress(0);

      if (!isFileControlled) {
        setInternalFile(file);
      }

      if (controlledPreviewUrl === undefined) {
        setPreviewSafely(
          isImageMime(file.type) ? createObjectPreviewUrl(file) : "",
        );
      }

      fireChange(file);
      startUpload(file);
    },
    [
      disabled,
      maxSizeBytes,
      accept,
      isFileControlled,
      controlledPreviewUrl,
      fireChange,
      setPreviewSafely,
      startUpload,
    ],
  );

  const applyMultipleFiles = useCallback(
    (incomingFiles, { append = true } = {}) => {
      if (disabled) return;

      const picked = Array.from(incomingFiles ?? []);
      if (!picked.length) return;

      const base = append ? resolvedFiles : [];
      const roomLeft =
        maxFiles != null ? Math.max(0, maxFiles - base.length) : picked.length;

      if (maxFiles != null && roomLeft === 0) {
        setValidationMessage(`You can upload at most ${maxFiles} files.`);
        setUploadStatus("error");
        return;
      }

      const slice = maxFiles != null ? picked.slice(0, roomLeft) : picked;

      const { accepted, message } = validateFiles(slice, {
        maxSizeBytes,
        accept,
        maxFiles: maxFiles != null ? roomLeft : null,
      });

      if (!accepted.length) {
        if (inputRef.current) inputRef.current.value = "";
        setValidationMessage(message || "No valid files were added.");
        setUploadStatus("error");
        return;
      }

      setValidationMessage(message || "");
      setUploadStatus("idle");
      setInternalProgress(0);

      const nextFiles = append ? mergeUniqueFiles(base, accepted) : accepted;

      if (!isFilesControlled) {
        setInternalFiles(nextFiles);
      }

      if (controlledPreviewUrls === undefined) {
        setPreviewListSafely(buildImagePreviewUrls(nextFiles));
      }

      fireChange(nextFiles);
      startUpload(accepted);
    },
    [
      disabled,
      resolvedFiles,
      maxFiles,
      maxSizeBytes,
      accept,
      isFilesControlled,
      controlledPreviewUrls,
      fireChange,
      setPreviewListSafely,
      startUpload,
    ],
  );

  const handleInputChange = useCallback(
    (event) => {
      const picked = Array.from(event.target.files ?? []);
      if (inputRef.current) inputRef.current.value = "";

      if (multiple) {
        applyMultipleFiles(picked, { append: true });
        return;
      }

      applySingleFile(picked[0] ?? null);
    },
    [multiple, applyMultipleFiles, applySingleFile],
  );

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      setDragOver(false);
      if (disabled) return;

      const dropped = Array.from(event.dataTransfer.files ?? []);

      if (multiple) {
        applyMultipleFiles(dropped, { append: true });
        return;
      }

      applySingleFile(dropped[0] ?? null);
    },
    [disabled, multiple, applyMultipleFiles, applySingleFile],
  );

  const handleDragOver = useCallback(
    (event) => {
      event.preventDefault();
      if (disabled) return;
      setDragOver(true);
    },
    [disabled],
  );

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setDragOver(false);
  }, []);

  const openPicker = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  const clearAll = useCallback(
    (event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      if (disabled) return;

      if (inputRef.current) inputRef.current.value = "";

      if (multiple) {
        if (!isFilesControlled) {
          setInternalFiles([]);
        }
        if (controlledPreviewUrls === undefined) {
          setPreviewListSafely([]);
        }
        fireChange([]);
      } else {
        if (!isFileControlled) {
          setInternalFile(null);
        }
        if (controlledPreviewUrl === undefined) {
          setPreviewSafely("");
        }
        fireChange(null);
      }

      setInternalProgress(0);
      setUploadStatus("idle");
      setValidationMessage("");
    },
    [
      disabled,
      multiple,
      isFilesControlled,
      isFileControlled,
      controlledPreviewUrl,
      controlledPreviewUrls,
      fireChange,
      setPreviewSafely,
      setPreviewListSafely,
    ],
  );

  const removeFileAt = useCallback(
    (index, event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      if (disabled || !multiple) return;

      const nextFiles = resolvedFiles.filter((_, itemIndex) => itemIndex !== index);

      if (!isFilesControlled) {
        setInternalFiles(nextFiles);
      }

      if (controlledPreviewUrls === undefined) {
        setPreviewListSafely(buildImagePreviewUrls(nextFiles));
      }

      if (inputRef.current && !nextFiles.length) {
        inputRef.current.value = "";
      }

      setInternalProgress(0);
      setUploadStatus("idle");
      fireChange(nextFiles);
    },
    [
      disabled,
      multiple,
      resolvedFiles,
      isFilesControlled,
      controlledPreviewUrls,
      fireChange,
      setPreviewListSafely,
    ],
  );

  return {
    inputRef,
    multiple,
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
  };
};

export default useFileInput;
