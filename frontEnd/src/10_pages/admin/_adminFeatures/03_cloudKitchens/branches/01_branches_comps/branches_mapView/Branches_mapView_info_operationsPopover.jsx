import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
  branchIsOpenNow,
  getBranchScheduleHint,
} from "../../02_branches_helpers/_branches_helpers.index.js";

import "../../_styles/branches_mapView_info.css";

const empty = (v) => v == null || v === "";

const formatTime = (v) => (empty(v) ? null : v);

const Branches_mapView_info_operationsPopover = ({ t, ops, anchorEl, onClose }) => {
  const rootRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0, arrowLeft: "50%" });
  const [arrowAbove, setArrowAbove] = useState(false);

  const title = t("mapView.opsPopoverTitle");
  const openNow = branchIsOpenNow(ops);
  const hint = getBranchScheduleHint(ops, new Date());

  const hintText = (() => {
    if (hint.kind === "inactive") return null;
    if (hint.kind === "24h") return null;
    if (hint.kind === "noTimes") return t("mapView.opsPopoverNoHours");
    if (hint.kind === "open") return t("mapView.opsPopoverClosesAt", { time: hint.closesAt });
    if (hint.opensTomorrow) return t("mapView.opsPopoverOpensAtTomorrow", { time: hint.opensAt });
    return t("mapView.opsPopoverOpensAt", { time: hint.opensAt });
  })();

  useLayoutEffect(() => {
    if (!anchorEl) return;

    const placePopover = () => {
      if (!anchorEl || !rootRef.current) return;
      const ar = anchorEl.getBoundingClientRect();
      const pr = rootRef.current.getBoundingClientRect();
      const gap = 10;
      let top = ar.bottom + gap;
      let above = false;
      if (top + pr.height > window.innerHeight - 8) {
        top = ar.top - pr.height - gap;
        above = true;
      }
      let left = ar.left + ar.width / 2 - pr.width / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - pr.width - 8));
      const anchorCenter = ar.left + ar.width / 2;
      const arrowOffset = anchorCenter - left;
      const arrowLeft = Math.max(16, Math.min(arrowOffset, pr.width - 16));
      setArrowAbove(above);
      setPos({ top, left, arrowLeft: `${arrowLeft}px` });
    };

    placePopover();
    const raf = requestAnimationFrame(placePopover);
    const onScrollResize = () => placePopover();
    window.addEventListener("resize", onScrollResize);
    window.addEventListener("scroll", onScrollResize, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onScrollResize);
      window.removeEventListener("scroll", onScrollResize, true);
    };
  }, [anchorEl, ops]);

  useEffect(() => {
    const onPointerDown = (e) => {
      const el = rootRef.current;
      if (!el) return;
      if (el.contains(e.target)) return;
      if (anchorEl?.contains(e.target)) return;
      onClose();
    };
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [anchorEl, onClose]);

  if (!anchorEl) return null;

  const hoursLine = [formatTime(ops?.openingTime), formatTime(ops?.closingTime)].filter(Boolean).join(" – ");

  const node = (
    <div
      ref={rootRef}
      className={
        "branchesMapViewInfo__contactPopover branchesMapViewInfo__operationsPopover" +
        (arrowAbove ? " branchesMapViewInfo__contactPopover--flip" : "")
      }
      role="dialog"
      aria-modal="false"
      aria-label={title}
      style={{ top: pos.top, left: pos.left }}>
      <span className="branchesMapViewInfo__contactPopoverArrow" style={{ left: pos.arrowLeft }} aria-hidden />
      <div className="branchesMapViewInfo__contactPopoverHeader">
        <span className="branchesMapViewInfo__contactPopoverTitle">{title}</span>
        <button
          type="button"
          className="branchesMapViewInfo__contactPopoverClose"
          onClick={onClose}
          aria-label={t("mapView.contactPopoverClose")}>
          ×
        </button>
      </div>
      <div className="branchesMapViewInfo__opsPopoverBody">
        {hint.kind === "inactive" ? (
          <p className="branchesMapViewInfo__opsPopoverMuted">{t("mapView.opsPopoverInactive")}</p>
        ) : (
          <>
            <dl className="branchesMapViewInfo__opsPopoverDl">
              <div className="branchesMapViewInfo__opsPopoverRow">
                <dt className="branchesMapViewInfo__opsPopoverDt">{t("mapView.infoOperatingNow")}</dt>
                <dd className="branchesMapViewInfo__opsPopoverDd">
                  <span
                    className={
                      "branchesMapViewInfo__opsPopoverPill" +
                      (openNow ? " branchesMapViewInfo__opsPopoverPill--on" : " branchesMapViewInfo__opsPopoverPill--off")
                    }>
                    {openNow ? t("badges.open") : t("badges.closed")}
                  </span>
                </dd>
              </div>
              <div className="branchesMapViewInfo__opsPopoverRow">
                <dt className="branchesMapViewInfo__opsPopoverDt">{t("fields.is24Hours")}</dt>
                <dd className="branchesMapViewInfo__opsPopoverDd">
                  {ops?.is24Hours ? t("badges.yes") : t("badges.no")}
                </dd>
              </div>
              {!ops?.is24Hours ? (
                <div className="branchesMapViewInfo__opsPopoverRow">
                  <dt className="branchesMapViewInfo__opsPopoverDt">
                    {t("fields.openingTime")} / {t("fields.closingTime")}
                  </dt>
                  <dd className="branchesMapViewInfo__opsPopoverDd">
                    {hoursLine || t("empty.noValue")}
                  </dd>
                </div>
              ) : null}
            </dl>
            {hintText ? <p className="branchesMapViewInfo__opsPopoverHint">{hintText}</p> : null}
          </>
        )}
      </div>
    </div>
  );

  return createPortal(node, document.body);
};

export default Branches_mapView_info_operationsPopover;
