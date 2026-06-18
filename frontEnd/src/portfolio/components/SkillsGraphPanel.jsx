import { useState } from "react";
import PropTypes from "prop-types";
import { Network, Radar as RadarIcon, Layers } from "lucide-react";
import { usePortfolioLang } from "../context/usePortfolio.js";
import SkillsRadar from "./SkillsRadar.jsx";
import KnowledgeGraph from "./interactive/LazyKnowledgeGraph.jsx";

/**
 * One stage for the proficiency radar and the knowledge graph, switched in place
 * with a Graph / Radar / Both control. The graph is the hero (default); "Radar"
 * crossfades to the proficiency snapshot; "Both" floats the radar over the graph
 * as a faint watermark (pointer-events pass through to the graph beneath).
 * Layers share a grid cell so switching never shifts the page.
 */
const VIEWS = [
  { key: "graph", icon: Network },
  { key: "radar", icon: RadarIcon },
  { key: "both", icon: Layers },
];

const SkillsGraphPanel = ({ variant, radarData }) => {
  const { t } = usePortfolioLang();
  const [view, setView] = useState("graph");

  const caption =
    view === "graph" ? t("graph.sub") : view === "radar" ? t("skills.evidenceNote") : t("skills.connect.cap.both");

  return (
    <div className={`vp-sg vp-sg--${variant}`} data-view={view}>
      <div className="vp-sg__switch" role="tablist" aria-label={t("skills.connect.viewLabel")}>
        {VIEWS.map(({ key, icon }) => {
          const Icon = icon;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={view === key}
              className={`vp-sg__switch-btn ${view === key ? "is-on" : ""}`}
              onClick={() => setView(key)}
            >
              <Icon size={14} aria-hidden="true" />
              {t(`skills.connect.view.${key}`)}
            </button>
          );
        })}
      </div>

      <div className="vp-sg__stack">
        <div className="vp-sg__layer vp-sg__layer--radar" aria-hidden={view === "graph"}>
          <SkillsRadar data={radarData} variant={variant} />
        </div>
        <div className="vp-sg__layer vp-sg__layer--graph" aria-hidden={view === "radar"}>
          <KnowledgeGraph variant={variant} />
        </div>
      </div>

      <p className="vp-sg__caption" key={view}>
        {caption}
      </p>
    </div>
  );
};

SkillsGraphPanel.propTypes = {
  variant: PropTypes.oneOf(["tech", "bar"]).isRequired,
  radarData: PropTypes.object.isRequired,
};

export default SkillsGraphPanel;
