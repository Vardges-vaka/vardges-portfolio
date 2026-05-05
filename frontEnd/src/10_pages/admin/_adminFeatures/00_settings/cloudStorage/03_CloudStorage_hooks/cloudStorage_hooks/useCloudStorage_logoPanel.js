import { useState, useRef, useEffect } from "react";

export const useCloudStorage_logoPanel = ({
  open,
  isUploading,
  onClose,
  onUploaded,
}) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Revoke old object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Reset state when panel closes
  useEffect(() => {
    if (!open) {
      setFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function handleFile(f) {
    if (!f) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  }

  function formatSize(bytes) {
    if (bytes > 1_048_576) return (bytes / 1_048_576).toFixed(1) + " MB";
    return (bytes / 1024).toFixed(0) + " KB";
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragOver(true);
  }
  function handleDragLeave() {
    setDragOver(false);
  }
  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }
  function handleInputChange(e) {
    const f = e.target.files[0];
    if (f) handleFile(f);
  }

  // Triggers the global confirm modal (no local async needed)
  function handleUploadClick() {
    if (!file || isUploading) return;
    onUploaded(file);
  }

  function handleClose() {
    onClose();
  }
  return {
    states: {
      file,
      previewUrl,
      dragOver,
      fileInputRef,
    },
    setters: {
      setFile,
      setPreviewUrl,
      setDragOver,
    },
    handlers: {
      handleFile,
      formatSize,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      handleInputChange,
      handleUploadClick,
      handleClose,
    },
  };
};
