import { useRef, useEffect, useState } from "react";

export const useCloudStorage_MonitorPanel = ({
  open,
  provider,
  monitorLoading,
}) => {
  const ANIM_OPEN_MS = 520;
  const ANIM_CLOSE_MS = 420;
  const ANIM_EASING = "cubic-bezier(0.22, 1, 0.36, 1)"; // smooth "easeOut"

  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const loaderTimerRef = useRef(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (loaderTimerRef.current) clearTimeout(loaderTimerRef.current);

    if (!open) {
      setShowLoader(false);
      return;
    }

    setShowLoader(true);
    loaderTimerRef.current = setTimeout(() => setShowLoader(false), 2500);

    return () => {
      if (loaderTimerRef.current) clearTimeout(loaderTimerRef.current);
    };
  }, [open, provider.id]);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    if (open) {
      const h = inner.getBoundingClientRect().height;
      container.style.height = "0px";
      container.style.overflow = "hidden";
      container.style.willChange = "height";
      container.getBoundingClientRect(); // force reflow
      container.style.transition = `height ${ANIM_OPEN_MS}ms ${ANIM_EASING}`;
      container.style.height = h + "px";

      const onEnd = () => {
        container.style.height = "auto";
        container.style.overflow = "auto";
        container.style.transition = "";
        container.style.willChange = "";
        container.removeEventListener("transitionend", onEnd);
      };
      container.addEventListener("transitionend", onEnd);
    } else {
      const h = inner.getBoundingClientRect().height;
      container.style.overflow = "hidden";
      container.style.height = h + "px";
      container.style.transition = "";
      container.style.willChange = "height";
      container.getBoundingClientRect(); // force reflow
      container.style.transition = `height ${ANIM_CLOSE_MS}ms ${ANIM_EASING}`;
      container.style.height = "0px";

      const onEnd = () => {
        container.style.transition = "";
        container.style.willChange = "";
        container.removeEventListener("transitionend", onEnd);
      };
      container.addEventListener("transitionend", onEnd);
    }
  }, [open]);

  const shouldShowLoader = open && (monitorLoading || showLoader);

  return {
    states: {
      containerRef,
      innerRef,
      shouldShowLoader,
    },
  };
};
