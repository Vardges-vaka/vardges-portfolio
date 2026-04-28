/**

 * Builds the DOM node passed to google.maps.InfoWindow({ content }).

 * Uses textContent only (no innerHTML) so branch fields stay safe for display.

 */

const textEl = (tag, className, text) => {
  const node = document.createElement(tag);

  node.className = className;

  node.textContent = text;

  return node;
};

const popupButton = (className, label, onClick, options = {}) => {
  const btn = document.createElement("button");

  btn.type = "button";

  btn.className = className;

  btn.textContent = label;

  if (options.disabled) {
    btn.disabled = true;

    if (options.title) btn.title = options.title;
  } else {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      onClick?.();
    });
  }

  return btn;
};

/**

 * @param {object} p

 * @param {string} p.branchName

 * @param {string} [p.branchAddress]

 * @param {{ viewBranch: string, viewBranchInfo: string, viewCoverage: string }} p.labels

 * @param {{ onViewBranch: function, onViewBranchInfo: function }} p.handlers

 * @param {{ disabledHint?: string }} [p.coverage]

 */

export const createBranches_mapView_infoWindowContent = ({
  branchName,

  branchAddress,

  labels,

  handlers,

  coverage = {},
}) => {
  const root = document.createElement("div");

  root.className = "branchesMapView__popup";

  root.appendChild(textEl("p", "branchesMapView__popupName", branchName));

  if (branchAddress) {
    root.appendChild(textEl("p", "branchesMapView__popupAddr", branchAddress));
  }

  const actions = document.createElement("div");

  actions.className = "branchesMapView__popupActions";

  actions.appendChild(
    popupButton(
      "branchesMapView__popupBtn",

      labels.viewBranch,

      handlers.onViewBranch,
    ),
  );

  actions.appendChild(
    popupButton(
      "branchesMapView__popupBtn branchesMapView__popupBtn--secondary",

      labels.viewBranchInfo,

      handlers.onViewBranchInfo,
    ),
  );

  actions.appendChild(
    popupButton(
      "branchesMapView__popupBtn branchesMapView__popupBtn--muted",

      labels.viewCoverage,

      null,

      { disabled: true, title: coverage.disabledHint ?? "" },
    ),
  );

  root.appendChild(actions);

  return root;
};
