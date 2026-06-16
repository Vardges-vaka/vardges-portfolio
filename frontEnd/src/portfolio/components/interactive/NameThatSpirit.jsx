import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { Check, X, Trophy, GraduationCap } from "lucide-react";
import Reveal from "../Reveal.jsx";
import { usePortfolioLang } from "../../context/usePortfolio.js";

/**
 * Name That Spirit — distillation trivia. Questions/answers stay in English
 * (industry lingua franca); the framing is translated. The "walking encyclopedia
 * of beverages" your reviews describe, as a game.
 */
const QUESTIONS = [
  { q: "Which grain is the backbone of most Scotch whisky?", a: "Barley", opts: ["Corn", "Rye", "Barley", "Wheat"] },
  { q: "Tequila must be distilled from which plant?", a: "Blue agave", opts: ["Sugarcane", "Blue agave", "Cactus", "Aloe"] },
  { q: "Gin's defining botanical is…", a: "Juniper", opts: ["Coriander", "Angelica", "Juniper", "Citrus peel"] },
  { q: "Which is traditionally aged using the solera system?", a: "Sherry", opts: ["Sherry", "Vodka", "Tequila blanco", "Gin"] },
  { q: "Bourbon's mash bill must be at least…", a: "51% corn", opts: ["51% corn", "51% rye", "70% wheat", "100% malt"] },
  { q: "Cognac can only be produced in…", a: "France", opts: ["Spain", "Italy", "France", "Portugal"] },
  { q: "Mezcal's smoky character comes from…", a: "Roasting agave in earthen pits", opts: ["Charred barrels", "Roasting agave in earthen pits", "Peat smoke", "Added liquid smoke"] },
  { q: "A Caipirinha is built on which spirit?", a: "Cachaça", opts: ["White rum", "Pisco", "Cachaça", "Tequila"] },
  { q: "Absinthe gets its anise punch chiefly from…", a: "Green anise & wormwood", opts: ["Fennel only", "Green anise & wormwood", "Star anise only", "Liquorice root"] },
  { q: "Rum is distilled primarily from…", a: "Sugarcane / molasses", opts: ["Grapes", "Barley", "Sugarcane / molasses", "Corn" ] },
];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const build = () => {
  const base = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
  return { ...base, options: shuffle(base.opts) };
};

const NameThatSpirit = () => {
  const { t } = usePortfolioLang();
  const [round, setRound] = useState(build);
  const [choice, setChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [played, setPlayed] = useState(0);
  const [streak, setStreak] = useState(0);

  const answered = choice !== null;
  const correct = answered && choice === round.a;

  const pick = (opt) => {
    if (answered) return;
    setChoice(opt);
    setPlayed((p) => p + 1);
    if (opt === round.a) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else setStreak(0);
  };
  const next = useCallback(() => {
    setRound(build());
    setChoice(null);
  }, []);

  useEffect(() => {
    if (!answered) return undefined;
    const onKey = (e) => e.key === "Enter" && next();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answered, next]);

  return (
    <section className="vp-section vp-spirit">
      <div className="vp-container">
        <Reveal>
          <p className="vp-kicker">{t("game.spirit.kicker")}</p>
          <h2 className="vp-h2 vp-h2--serif">{t("game.spirit.title")}</h2>
          <p className="vp-sub">{t("game.spirit.sub")}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="vp-spirit__shell">
            <div className="vp-spirit__bar">
              <span className="vp-spirit__score"><Trophy size={14} aria-hidden="true" /> {score}/{played}</span>
              {streak > 1 && <span className="vp-spirit__streak">🔥 {streak}</span>}
            </div>
            <AnimatePresence mode="wait">
              <Motion.div key={round.q + played} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                <p className="vp-spirit__q" dir="ltr">{round.q}</p>
                <div className="vp-spirit__options">
                  {round.options.map((opt) => {
                    const state = answered ? (opt === round.a ? "right" : opt === choice ? "wrong" : "muted") : "";
                    return (
                      <button key={opt} type="button" className={`vp-spirit__opt ${state}`} onClick={() => pick(opt)} disabled={answered} dir="ltr">
                        {opt}
                        {answered && opt === round.a && <Check size={15} aria-hidden="true" />}
                        {answered && opt === choice && opt !== round.a && <X size={15} aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
                {answered && (
                  <Motion.div className="vp-spirit__reveal" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <p className={`vp-spirit__verdict ${correct ? "is-right" : "is-wrong"}`}>
                      <GraduationCap size={15} aria-hidden="true" /> {correct ? t("game.spirit.correct") : t("game.spirit.wrong")}
                    </p>
                    <button type="button" className="vp-btn vp-btn--gold" onClick={next}>{t("game.spirit.next")}</button>
                  </Motion.div>
                )}
              </Motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default NameThatSpirit;
