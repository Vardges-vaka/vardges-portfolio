import { useEffect } from "react";

/** Close dropdown when clicking outside the wrap element. */
export const useSelectClickOutside = (isOpen, wrapRef, onClose) => {
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen, wrapRef, onClose]);
};

export default useSelectClickOutside;
