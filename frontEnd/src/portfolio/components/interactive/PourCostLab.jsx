import { useMemo, useState } from "react";
import { motion as Motion } from "framer-motion";
import { Calculator } from "lucide-react";
import PropTypes from "prop-types";
import Reveal from "../Reveal.jsx";
import { usePortfolioLang } from "../../context/usePortfolio.js";

/**
 * Pour-Cost Lab — the real consultancy maths, as a toy. Enter the numbers and
 * see cost-per-pour, pour-cost %, profit and margin live, with a verdict. A soft
 * proof that this bartender thinks like an operator.
 */
const Field = ({ id, label, value, suffix, onChange }) => (
  <label className="vp-pour__field" htmlFor={id}>
    <span>{label}</span>
    <span className="vp-pour__input-wrap">
      <input id={id} type="number" min="0" inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} dir="ltr" />
      {suffix && <span className="vp-pour__suffix">{suffix}</span>}
    </span>
  </label>
);

Field.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  suffix: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const PourCostLab = () => {
  const { t } = usePortfolioLang();
  const [bottlePrice, setBottlePrice] = useState("90");
  const [bottleSize, setBottleSize] = useState("700");
  const [pourSize, setPourSize] = useState("45");
  const [sellPrice, setSellPrice] = useState("48");

  const r = useMemo(() => {
    const bp = parseFloat(bottlePrice) || 0;
    const bs = parseFloat(bottleSize) || 1;
    const ps = parseFloat(pourSize) || 0;
    const sp = parseFloat(sellPrice) || 0;
    const costPerPour = bp * (ps / bs);
    const pourCostPct = sp > 0 ? (costPerPour / sp) * 100 : 0;
    const profit = sp - costPerPour;
    const marginPct = sp > 0 ? (profit / sp) * 100 : 0;
    const verdict = pourCostPct === 0 ? "good" : pourCostPct <= 18 ? "great" : pourCostPct <= 25 ? "good" : "high";
    return { costPerPour, pourCostPct, profit, marginPct, verdict };
  }, [bottlePrice, bottleSize, pourSize, sellPrice]);

  const fmt = (n) => (Number.isFinite(n) ? n.toFixed(2) : "0.00");

  return (
    <section className="vp-section vp-pour">
      <div className="vp-container">
        <Reveal>
          <p className="vp-kicker">{t("game.pour.kicker")}</p>
          <h2 className="vp-h2 vp-h2--serif">{t("game.pour.title")}</h2>
          <p className="vp-sub">{t("game.pour.sub")}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="vp-pour__shell">
            <div className="vp-pour__inputs">
              <Field id="vp-pour-bp" label={t("game.pour.bottlePrice")} value={bottlePrice} onChange={setBottlePrice} />
              <Field id="vp-pour-bs" label={t("game.pour.bottleSize")} value={bottleSize} suffix="ml" onChange={setBottleSize} />
              <Field id="vp-pour-ps" label={t("game.pour.pourSize")} value={pourSize} suffix="ml" onChange={setPourSize} />
              <Field id="vp-pour-sp" label={t("game.pour.sellPrice")} value={sellPrice} onChange={setSellPrice} />
            </div>

            <div className="vp-pour__out">
              <div className="vp-pour__big">
                <span className="vp-pour__big-label">{t("game.pour.pourCost")}</span>
                <Motion.span key={Math.round(r.pourCostPct)} className={`vp-pour__big-val vp-pour__big-val--${r.verdict}`} initial={{ scale: 0.9, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}>
                  {r.pourCostPct.toFixed(1)}%
                </Motion.span>
                <span className={`vp-pour__verdict vp-pour__verdict--${r.verdict}`}>{t(`game.pour.verdict.${r.verdict}`)}</span>
              </div>
              <div className="vp-pour__rows">
                <div className="vp-pour__row"><span>{t("game.pour.costPerPour")}</span><strong>{fmt(r.costPerPour)}</strong></div>
                <div className="vp-pour__row"><span>{t("game.pour.profit")}</span><strong>{fmt(r.profit)}</strong></div>
                <div className="vp-pour__row"><span>{t("game.pour.margin")}</span><strong>{r.marginPct.toFixed(0)}%</strong></div>
              </div>
              <p className="vp-pour__note"><Calculator size={13} aria-hidden="true" /> {t("game.pour.note")}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PourCostLab;
