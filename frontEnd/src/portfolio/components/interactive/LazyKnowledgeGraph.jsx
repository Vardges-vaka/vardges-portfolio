import { Suspense, lazy } from "react";
import PropTypes from "prop-types";

/**
 * Lazy boundary for the knowledge graph. The graph pulls in d3-force (a heavy
 * dependency) and is always below the fold, so we defer its chunk and render an
 * empty, correctly-sized stage as the fallback (no layout shift). Drop-in
 * replacement for KnowledgeGraph — same `variant` prop.
 */
const KnowledgeGraph = lazy(() => import("./KnowledgeGraph.jsx"));

const Fallback = () => (
  <div className="vp-kg" aria-hidden="true">
    <div className="vp-kg__stage" />
  </div>
);

const LazyKnowledgeGraph = ({ variant = "tech" }) => (
  <Suspense fallback={<Fallback />}>
    <KnowledgeGraph variant={variant} />
  </Suspense>
);

LazyKnowledgeGraph.propTypes = {
  variant: PropTypes.oneOf(["tech", "bar", "universe"]),
};

export default LazyKnowledgeGraph;
