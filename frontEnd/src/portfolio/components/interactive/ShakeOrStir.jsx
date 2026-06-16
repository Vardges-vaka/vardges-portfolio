import { useMemo, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { Check, X, RotateCcw, Wind, Waves } from "lucide-react";
import Reveal from "../Reveal.jsx";
import { usePortfolioLang } from "../../context/usePortfolio.js";

/**
 * Shake or Stir? — a rapid technique quiz. Citrus/juice/egg → shaken; all-spirit
 * → stirred. Cocktail names stay original; the framing is translated.
 */
const DRINKS = [
  { name: "Old Fashioned", t: "stir" },
  { name: "Negroni", t: "stir" },
  { name: "Manhattan", t: "stir" },
  { name: "Dry Martini", t: "stir" },
  { name: "Sazerac", t: "stir" },
  { name: "Boulevardier", t: "stir" },
  { name: "Rob Roy", t: "stir" },
  { name: "Vieux Carré", t: "stir" },
  { name: "Margarita", t: "shake" },
  { name: "Daiquiri", t: "shake" },
  { name: "Whiskey Sour", t: "shake" },
  { name: "Cosmopolitan", t: "shake" },
  { name: "Espresso Martini", t: "shake" },
  { name: "Sidecar", t: "shake" },
  { name: "Aviation", t: "shake" },
  { name: "Clover Club", t: "shake" },
];

const pickDrink = (exclude) => {
  let d = DRINKS[Math.floor(Math.random() * DRINKS.length)];
  while (d.name === exclude) d = DRINKS[Math.floor(Math.random() * DRINKS.length)];
  return d;
};

const ShakeOrStir = () => {
  const { t } = usePortfolioLang();
  const [drink, setDrink] = useState(pickDrink);
  const [choice, setChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [played, setPlayed] = useState(0);
  const [streak, setStreak] = useState(0);

  const answered = choice !== null;
  const correct = answered && choice === drink.t;

  const rankKey = useMemo(() => {
    const acc = played ? score / played : 0;
    if (played < 4) return null;
    if (acc >= 0.9) return "maestro";
    if (acc >= 0.7) return "head";
    if (acc >= 0.5) return "bartender";
    return "barback";
  }, [score, played]);

  const answer = (g) => {
    if (answered) return;
    setChoice(g);
    setPlayed((p) => p + 1);
    if (g === drink.t) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };
  const next = () => {
    setDrink((d) => pickDrink(d.name));
    setChoice(null);
  };
  const restart = () => {
    setScore(0);
    setPlayed(0);
    setStreak(0);
    next();
  };

  return (
    <section className="vp-section vp-shake">
      <div className="vp-container">
        <Reveal>
          <p className="vp-kicker">{t("game.shake.kicker")}</p>
          <h2 className="vp-h2 vp-h2--serif">{t("game.shake.title")}</h2>
          <p className="vp-sub">{t("game.shake.sub")}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="vp-shake__shell">
            <div className="vp-shake__bar">
              <span className="vp-shake__score">{score}/{played}</span>
              {streak > 1 && <span className="vp-shake__streak">🔥 {streak}</span>}
              {rankKey && <span className="vp-shake__rank">{t(`game.shake.rank.${rankKey}`)}</span>}
            </div>

            <AnimatePresence mode="wait">
              <Motion.div
                key={drink.name + played}
                className="vp-shake__round"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <p className="vp-shake__drink">{drink.name}</p>

                <div className="vp-shake__choices">
                  <button
                    type="button"
                    className={`vp-shake__btn ${answered && drink.t === "shake" ? "right" : ""} ${answered && choice === "shake" && drink.t !== "shake" ? "wrong" : ""}`}
                    onClick={() => answer("shake")}
                    disabled={answered}
                  >
                    <Wind size={20} aria-hidden="true" />
                    {t("game.shake.shaken")}
                  </button>
                  <button
                    type="button"
                    className={`vp-shake__btn ${answered && drink.t === "stir" ? "right" : ""} ${answered && choice === "stir" && drink.t !== "stir" ? "wrong" : ""}`}
                    onClick={() => answer("stir")}
                    disabled={answered}
                  >
                    <Waves size={20} aria-hidden="true" />
                    {t("game.shake.stirred")}
                  </button>
                </div>

                {answered && (
                  <Motion.div className="vp-shake__reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <span className={`vp-shake__verdict ${correct ? "is-right" : "is-wrong"}`}>
                      {correct ? <Check size={15} /> : <X size={15} />}
                      {correct ? t("game.shake.correct") : t("game.shake.wrong")}
                    </span>
                    <button type="button" className="vp-btn vp-btn--gold" onClick={next}>{t("game.shake.next")}</button>
                  </Motion.div>
                )}
              </Motion.div>
            </AnimatePresence>

            {played >= 4 && (
              <button type="button" className="vp-shake__restart" onClick={restart}>
                <RotateCcw size={13} aria-hidden="true" /> {t("game.shake.restart")}
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ShakeOrStir;
