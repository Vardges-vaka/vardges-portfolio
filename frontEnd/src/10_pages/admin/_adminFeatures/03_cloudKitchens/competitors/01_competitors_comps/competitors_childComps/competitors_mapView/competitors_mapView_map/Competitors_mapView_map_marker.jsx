import { useEffect, useRef } from "react";
import { useGoogleMap } from "@react-google-maps/api";
import { useCompetitors_map_marker } from "../../../../03_competitors_hooks/Competitors_mapView_hooks/_Competitors_mapView_hooks.index.js";

const createInfoWindowContent = ({
  name,
  addressLine,
  labels,
  handlers,
  state,
}) => {
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

  const infoBtn = document.createElement("button");
  infoBtn.type = "button";
  infoBtn.className = "Competitors_mapView_popupBtn";
  infoBtn.textContent = labels.viewInfo;
  infoBtn.addEventListener("click", handlers.onViewInfo);

  const radiusBtn = document.createElement("button");
  radiusBtn.type = "button";
  radiusBtn.className = "Competitors_mapView_popupBtn Competitors_mapView_popupBtnSecondary";
  radiusBtn.textContent = state.isRadiusOn ? labels.hideRadius : labels.showRadius;
  radiusBtn.addEventListener("click", handlers.onToggleRadius);

  const polyBtn = document.createElement("button");
  polyBtn.type = "button";
  polyBtn.className = "Competitors_mapView_popupBtn Competitors_mapView_popupBtnSecondary";
  polyBtn.textContent = state.isPolygonOn ? labels.hidePolygon : labels.showPolygon;
  polyBtn.addEventListener("click", handlers.onTogglePolygon);

  actions.appendChild(infoBtn);
  actions.appendChild(polyBtn);
  actions.appendChild(radiusBtn);
  root.appendChild(title);
  root.appendChild(addr);
  root.appendChild(actions);

  return root;
};

const Competitors_mapView_map_marker = ({
  t,
  markerKey,
  competitorId,
  lat,
  lng,
  competitor,
  summary,
  activeMarkerKey,
  onClick,
  onCloseClick,
  onViewCompetitorInfo,
  onToggleRadius,
  onTogglePolygon,
  isRadiusOn,
  isPolygonOn,
}) => {
  const map = useGoogleMap();
  const handlersRef = useRef({
    onClick,
    onCloseClick,
    onViewCompetitorInfo,
    onToggleRadius,
    onTogglePolygon,
  });
  handlersRef.current = {
    onClick,
    onCloseClick,
    onViewCompetitorInfo,
    onToggleRadius,
    onTogglePolygon,
  };

  const markerRef = useCompetitors_map_marker({
    map,
    lat,
    lng,
    id: markerKey,
    title: summary?.name,
    logoSrc: competitor?.logo,
    onClick,
  });

  useEffect(() => {
    const marker = markerRef.current;
    if (!map || !marker) return;

    let infoWindow = null;

    if (activeMarkerKey === markerKey) {
      const labels = {
        viewInfo: t
          ? t("mapView.popupViewInfo", { defaultValue: "View info" })
          : "View info",
        showRadius: t
          ? t("mapView.popupShowRadius", { defaultValue: "Show radius" })
          : "Show radius",
        hideRadius: t
          ? t("mapView.popupHideRadius", { defaultValue: "Hide radius" })
          : "Hide radius",
        showPolygon: t
          ? t("mapView.popupShowPolygon", { defaultValue: "Show polygon" })
          : "Show polygon",
        hidePolygon: t
          ? t("mapView.popupHidePolygon", { defaultValue: "Hide polygon" })
          : "Hide polygon",
      };

      const content = createInfoWindowContent({
        name: summary?.name,
        addressLine: summary?.addressLine,
        labels,
        handlers: {
          onViewInfo: () => handlersRef.current.onViewCompetitorInfo?.(),
          onToggleRadius: () => handlersRef.current.onToggleRadius?.(competitorId),
          onTogglePolygon: () => handlersRef.current.onTogglePolygon?.(competitorId),
        },
        state: { isRadiusOn: !!isRadiusOn, isPolygonOn: !!isPolygonOn },
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
  }, [map, markerRef, markerKey, activeMarkerKey, summary, t, competitorId, isRadiusOn, isPolygonOn]);

  return null;
};

export default Competitors_mapView_map_marker;

