import { useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, AlertTriangle, Check, X, RotateCcw, Trophy } from "lucide-react";
import Reveal from "../Reveal.jsx";
import { usePortfolioLang } from "../../context/usePortfolio.js";
import { PHISH_EMAILS } from "../../data/phishing.js";

/**
 * "Spot the phish" — a small playable security beat. Judge each email as
 * phishing or legitimate; the red flags reveal after you answer.
 */
const PhishGame = () => {
  const { t } = usePortfolioLang();
  const [i, setI] = useState(0);
  const [choice, setChoice] = useState(null); // boolean guess (true = phish) or null
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const total = PHISH_EMAILS.length;
  const email = PHISH_EMAILS[i];
  const answered = choice !== null;
  const correct = answered && choice === email.isPhish;

  // screen-reader announcement for the verdict / final score
  const announce = done
    ? `${t("game.finishTitle")} ${score} / ${total}`
    : answered
      ? `${correct ? t("game.correct") : t("game.wrong")} — ${email.isPhish ? t("game.wasPhish") : t("game.wasLegit")}`
      : "";

  const answer = (guess) => {
    if (answered) return;
    setChoice(guess);
    if (guess === email.isPhish) setScore((s) => s + 1);
  };
  const next = () => {
    if (i + 1 >= total) setDone(true);
    else {
      setI((v) => v + 1);
      setChoice(null);
    }
  };
  const restart = () => {
    setI(0);
    setChoice(null);
    setScore(0);
    setDone(false);
  };

  return (
    <section className="vp-section vp-phish">
      <div className="vp-container">
        <Reveal>
          <p className="vp-kicker">{t("game.kicker")}</p>
          <h2 className="vp-h2">{t("game.title")}</h2>
          <p className="vp-sub">{t("game.sub")}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="vp-phish__shell">
            <p className="vp-sr-only" role="status" aria-live="polite">{announce}</p>
            {!done && (
              <div className="vp-phish__bar">
                <span className="vp-phish__count">{i + 1} / {total}</span>
                <span className="vp-phish__score">
                  <Trophy size={14} aria-hidden="true" /> {score}
                </span>
                <span className="vp-phish__progress" aria-hidden="true">
                  <span style={{ width: `${((i + (answered ? 1 : 0)) / total) * 100}%` }} />
                </span>
              </div>
            )}

            <AnimatePresence mode="wait">
              {done ? (
                <Motion.div key="done" className="vp-phish__done"
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <span className="vp-phish__trophy"><Trophy size={40} aria-hidden="true" /></span>
                  <h3>{t("game.finishTitle")}</h3>
                  <p className="vp-phish__final">{score} / {total}</p>
                  <p className="vp-sub">{t("game.finishSub")}</p>
                  <button type="button" className="vp-btn vp-btn--ghost" onClick={restart}>
                    <RotateCcw size={15} aria-hidden="true" /> {t("game.again")}
                  </button>
                </Motion.div>
              ) : (
                <Motion.div key={email.id} className="vp-phish__round"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  {/* the email */}
                  <div className={`vp-mail ${answered ? (email.isPhish ? "is-phish" : "is-legit") : ""}`} dir="ltr">
                    <div className="vp-mail__head">
                      <span className="vp-mail__avatar" aria-hidden="true">{email.sender[0]}</span>
                      <div className="vp-mail__from">
                        <span className="vp-mail__name">{email.sender}</span>
                        <span className="vp-mail__addr">&lt;{email.address}&gt;</span>
                      </div>
                    </div>
                    <p className="vp-mail__subject">{email.subject}</p>
                    <p className="vp-mail__body">{email.body}</p>
                  </div>

                  {!answered ? (
                    <div className="vp-phish__actions">
                      <button type="button" className="vp-btn vp-phish__btn vp-phish__btn--phish" onClick={() => answer(true)}>
                        <ShieldAlert size={16} aria-hidden="true" /> {t("game.phish")}
                      </button>
                      <button type="button" className="vp-btn vp-phish__btn vp-phish__btn--legit" onClick={() => answer(false)}>
                        <ShieldCheck size={16} aria-hidden="true" /> {t("game.legit")}
                      </button>
                    </div>
                  ) : (
                    <Motion.div className="vp-phish__reveal" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.35 }}>
                      <p className={`vp-phish__verdict ${correct ? "is-right" : "is-wrong"}`}>
                        {correct ? <Check size={16} /> : <X size={16} />}
                        {correct ? t("game.correct") : t("game.wrong")} — {email.isPhish ? t("game.wasPhish") : t("game.wasLegit")}
                      </p>
                      <p className="vp-phish__flags-title">
                        <AlertTriangle size={14} aria-hidden="true" /> {t("game.flagsTitle")}
                      </p>
                      <ul className="vp-phish__flags">
                        {email.flags.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <button type="button" className="vp-btn vp-btn--primary" onClick={next}>
                        {i + 1 >= total ? t("game.seeScore") : t("game.next")}
                      </button>
                    </Motion.div>
                  )}
                </Motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PhishGame;
