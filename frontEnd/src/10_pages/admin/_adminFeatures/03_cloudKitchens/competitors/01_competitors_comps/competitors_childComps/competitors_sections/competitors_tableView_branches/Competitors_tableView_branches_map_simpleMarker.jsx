import { useEffect, useRef } from "react";
import { useGoogleMap } from "@react-google-maps/api";
import { getBranchColor } from "../../../../02_competitors_helpers/_competitors_helpers.index.js";

const createPopupContent = ({ name, addressLine, labels, handlers }) => {
  const root = document.createElement("div");
  root.className = "Competitors_mapView_popup";

  const title = document.createElement("p");
  title.className = "Competitors_mapView_popupName";
  title.textContent = name || "—";

  const addr = document.createElement("p");
  addr.className = "Competitors_mapView_popupAddr";
  addr.textContent = addressLine || "—";

  const actions = document.createElement("div");
  actions.className = "Competitors_mapView_popupActions";

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "Competitors_mapView_popupBtn";
  editBtn.textContent = labels.edit;
  editBtn.addEventListener("click", handlers.onEdit);

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className =
    "Competitors_mapView_popupBtn Competitors_mapView_popupBtnSecondary";
  removeBtn.textContent = labels.remove;
  removeBtn.addEventListener("click", handlers.onRemove);

  actions.appendChild(editBtn);
  actions.appendChild(removeBtn);
  root.appendChild(title);
  root.appendChild(addr);
  root.appendChild(actions);

  return root;
};

const Competitors_tableView_branches_map_simpleMarker = ({
  t,
  markerKey,
  lat,
  lng,
  pinColor,
  summary,
  activeMarkerKey,
  isDraggable,
  disablePopup,
  onClick,
  onCloseClick,
  onEdit,
  onRemove,
  onDragEnd,
}) => {
  const map = useGoogleMap();
  const markerRef = useRef(null);
  const pinElRef = useRef(null);
  const handlersRef = useRef({ onClick, onCloseClick, onEdit, onRemove, onDragEnd });
  handlersRef.current = { onClick, onCloseClick, onEdit, onRemove, onDragEnd };

  useEffect(() => {
    if (!map || lat == null || lng == null) return;

    const AdvancedMarkerElement = window.google?.maps?.marker?.AdvancedMarkerElement;
    if (!AdvancedMarkerElement) return;

    const wrap = document.createElement("div");
    wrap.className = "Competitors_tableView_branches_mapPin";
    wrap.style.setProperty(
      "--branch-pin-color",
      pinColor || getBranchColor(markerKey),
    );
    // No tabindex/role on content — AdvancedMarkerElement does not support focusable children.
    pinElRef.current = wrap;

    const marker = new AdvancedMarkerElement({
      map,
      position: { lat, lng },
      title: summary?.addressLine || summary?.name || "Branch",
      content: wrap,
      gmpClickable: true,
      gmpDraggable: !!isDraggable,
    });
    markerRef.current = marker;

    const onGmpClick = () => handlersRef.current.onClick?.();
    let clickListener = null;
    if (typeof marker.addListener === "function") {
      clickListener = marker.addListener("gmp-click", onGmpClick);
    }

    let dragListener = null;
    if (isDraggable && typeof marker.addListener === "function") {
      dragListener = marker.addListener("dragend", () => {
        const pos = marker.position;
        if (!pos) return;
        const nextLat = typeof pos.lat === "function" ? pos.lat() : pos.lat;
        const nextLng = typeof pos.lng === "function" ? pos.lng() : pos.lng;
        handlersRef.current.onDragEnd?.(nextLat, nextLng);
      });
    }

    return () => {
      if (clickListener) google.maps.event.removeListener(clickListener);
      if (dragListener) google.maps.event.removeListener(dragListener);
      marker.map = null;
      markerRef.current = null;
      pinElRef.current = null;
    };
  }, [map, markerKey, pinColor, summary?.addressLine, summary?.name, isDraggable]);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker || lat == null || lng == null) return;
    marker.position = { lat, lng };
  }, [lat, lng]);

  useEffect(() => {
    const marker = markerRef.current;
    if (marker) marker.gmpDraggable = !!isDraggable;
  }, [isDraggable]);

  useEffect(() => {
    const el = pinElRef.current;
    if (!el) return;
    el.classList.toggle(
      "Competitors_tableView_branches_mapPin--active",
      activeMarkerKey === markerKey,
    );
    el.classList.toggle(
      "Competitors_tableView_branches_mapPin--draggable",
      !!isDraggable,
    );
  }, [activeMarkerKey, markerKey, isDraggable]);

  useEffect(() => {
    const marker = markerRef.current;
    if (!map || !marker) return;

    let infoWindow = null;

    if (activeMarkerKey === markerKey && !isDraggable && !disablePopup) {
      const labels = {
        edit: t
          ? t("branchesTableSession.popupEdit", { defaultValue: "Edit" })
          : "Edit",
        remove: t
          ? t("branchesTableSession.popupRemove", { defaultValue: "Remove" })
          : "Remove",
      };

      const content = createPopupContent({
        name: summary?.name,
        addressLine: summary?.addressLine,
        labels,
        handlers: {
          onEdit: () => handlersRef.current.onEdit?.(),
          onRemove: () => handlersRef.current.onRemove?.(),
        },
      });

      infoWindow = new google.maps.InfoWindow({ content });
      infoWindow.addListener("closeclick", () => {
        handlersRef.current.onCloseClick?.();
      });
      infoWindow.open({ map, anchor: marker });
    }

    return () => {
      if (infoWindow) {
        google.maps.event.clearInstanceListeners(infoWindow);
        infoWindow.close();
      }
    };
  }, [map, markerKey, activeMarkerKey, summary, t, isDraggable, disablePopup]);

  return null;
};

export default Competitors_tableView_branches_map_simpleMarker;
