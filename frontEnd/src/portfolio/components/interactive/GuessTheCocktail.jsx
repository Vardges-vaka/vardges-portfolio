import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { Check, X, Trophy, RotateCcw, Wine } from "lucide-react";
import Reveal from "../Reveal.jsx";
import { usePortfolioLang } from "../../context/usePortfolio.js";

/**
 * Guess the Cocktail — a blind-tasting quiz. Read the spec (ingredients + glass
 * + colour) and name the classic. Cocktail names/specs stay in their original
 * form (bar lingua franca); the framing is fully translated.
 */
const CLASSICS = [
  { id: "old-fashioned", name: "Old Fashioned", glass: "rocks", color: "#b5651d", spec: ["Bourbon", "Sugar", "Angostura bitters", "Orange peel"], fact: "The original ‘cock-tail’, defined in 1806." },
  { id: "negroni", name: "Negroni", glass: "rocks", color: "#a01f1f", spec: ["Gin", "Campari", "Sweet vermouth"], fact: "Equal parts, stirred — Count Negroni, 1919." },
  { id: "margarita", name: "Margarita", glass: "coupe", color: "#cfe08a", spec: ["Tequila", "Lime", "Triple sec"], fact: "Salt rim optional, the debate eternal." },
  { id: "daiquiri", name: "Daiquiri", glass: "coupe", color: "#eef3e6", spec: ["White rum", "Lime", "Sugar"], fact: "Hemingway took his doubled, no sugar." },
  { id: "mojito", name: "Mojito", glass: "highball", color: "#d6e8c2", spec: ["White rum", "Lime", "Mint", "Sugar", "Soda"], fact: "Cuba’s muddled icon." },
  { id: "martini", name: "Martini", glass: "martini", color: "#eef0e4", spec: ["Gin", "Dry vermouth"], fact: "Shaken or stirred is a whole personality." },
  { id: "manhattan", name: "Manhattan", glass: "coupe", color: "#7a1f1f", spec: ["Rye", "Sweet vermouth", "Angostura bitters"], fact: "The Old Fashioned’s city cousin." },
  { id: "espresso-martini", name: "Espresso Martini", glass: "martini", color: "#2e1a12", spec: ["Vodka", "Coffee liqueur", "Espresso"], fact: "Born from ‘wake me up, then…’." },
  { id: "whiskey-sour", name: "Whiskey Sour", glass: "rocks", color: "#e0a93b", spec: ["Bourbon", "Lemon", "Sugar", "Egg white"], fact: "The egg white builds that silky foam." },
  { id: "cosmopolitan", name: "Cosmopolitan", glass: "martini", color: "#d24b78", spec: ["Vodka", "Cointreau", "Cranberry", "Lime"], fact: "A ’90s legend." },
  { id: "aperol-spritz", name: "Aperol Spritz", glass: "wine", color: "#f0651f", spec: ["Aperol", "Prosecco", "Soda"], fact: "3-2-1 — the Venetian aperitivo." },
  { id: "mai-tai", name: "Mai Tai", glass: "rocks", color: "#c47a2c", spec: ["Rum", "Orange curaçao", "Orgeat", "Lime"], fact: "Trader Vic, 1944." },
];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const buildRound = () => {
  const answer = CLASSICS[Math.floor(Math.random() * CLASSICS.length)];
  const distractors = shuffle(CLASSICS.filter((c) => c.id !== answer.id)).slice(0, 3);
  return { answer, options: shuffle([answer, ...distractors]) };
};

const GuessTheCocktail = () => {
  const { t } = usePortfolioLang();
  const [round, setRound] = useState(buildRound);
  const [choice, setChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [played, setPlayed] = useState(0);

  const { answer, options } = round;
  const answered = choice !== null;
  const correct = answered && choice === answer.id;

  const pick = (id) => {
    if (answered) return;
    setChoice(id);
    setPlayed((p) => p + 1);
    if (id === answer.id) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };
  const next = useCallback(() => {
    setRound(buildRound());
    setChoice(null);
  }, []);
  const restart = () => {
    setScore(0);
    setStreak(0);
    setPlayed(0);
    next();
  };

  // Enter advances after answering
  useEffect(() => {
    if (!answered) return undefined;
    const onKey = (e) => {
      if (e.key === "Enter") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answered, next]);

  return (
    <section className="vp-section vp-guess">
      <div className="vp-container">
        <Reveal>
          <p className="vp-kicker">{t("game.guess.kicker")}</p>
          <h2 className="vp-h2 vp-h2--serif">{t("game.guess.title")}</h2>
          <p className="vp-sub">{t("game.guess.sub")}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="vp-guess__shell">
            <div className="vp-guess__bar">
              <span className="vp-guess__score"><Trophy size={14} aria-hidden="true" /> {score}/{played}</span>
              {streak > 1 && <span className="vp-guess__streak">🔥 {streak}</span>}
            </div>

            <AnimatePresence mode="wait">
              <Motion.div
                key={answer.id + played}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="vp-guess__clue">
                  <span className="vp-guess__glass" style={{ "--cocktail": answer.color }} aria-hidden="true">
                    <Wine size={34} />
                  </span>
                  <div className="vp-guess__spec">
                    <span className="vp-guess__spec-label">{t("game.guess.clue")}</span>
                    <ul className="vp-guess__ingredients" dir="ltr">
                      {answer.spec.map((ing) => (
                        <li key={ing}>{ing}</li>
                      ))}
                    </ul>
                    <span className="vp-guess__glasstype">{t(`game.guess.glass.${answer.glass}`)}</span>
                  </div>
                </div>

                <p className="vp-guess__question">{t("game.guess.question")}</p>

                <div className="vp-guess__options">
                  {options.map((opt) => {
                    const state = answered
                      ? opt.id === answer.id
                        ? "right"
                        : opt.id === choice
                          ? "wrong"
                          : "muted"
                      : "";
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`vp-guess__opt ${state}`}
                        onClick={() => pick(opt.id)}
                        disabled={answered}
                      >
                        {opt.name}
                        {answered && opt.id === answer.id && <Check size={15} aria-hidden="true" />}
                        {answered && opt.id === choice && opt.id !== answer.id && <X size={15} aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>

                {answered && (
                  <Motion.div
                    className="vp-guess__reveal"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className={`vp-guess__verdict ${correct ? "is-right" : "is-wrong"}`}>
                      {correct ? <Check size={16} /> : <X size={16} />}
                      {correct ? t("game.guess.correct") : t("game.guess.wrong")} — <strong>{answer.name}</strong>
                    </p>
                    <p className="vp-guess__fact">{answer.fact}</p>
                    <button type="button" className="vp-btn vp-btn--gold" onClick={next}>
                      {t("game.guess.next")}
                    </button>
                  </Motion.div>
                )}
              </Motion.div>
            </AnimatePresence>

            {played >= 5 && (
              <button type="button" className="vp-guess__restart" onClick={restart}>
                <RotateCcw size={13} aria-hidden="true" /> {t("game.guess.restart")}
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default GuessTheCocktail;
