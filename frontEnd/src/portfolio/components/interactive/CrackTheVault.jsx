import { useMemo, useState } from "react";
import { motion as Motion } from "framer-motion";
import { Lock, LockOpen, Eye, EyeOff, ShieldCheck, Zap } from "lucide-react";
import Reveal from "../Reveal.jsx";
import { usePortfolioLang } from "../../context/usePortfolio.js";

/**
 * Crack the Vault — type a password and watch a lite entropy model estimate
 * time-to-crack against four attacker tiers. Nothing is stored or sent. Beat the
 * GPU farm (≥ a century) and the vault opens. Pure client-side security toy.
 */

// attacker guess rates (guesses / second)
const TIERS = [
  { key: "throttled", rate: 10 },
  { key: "online", rate: 1e4 },
  { key: "gpu", rate: 1e10 },
  { key: "farm", rate: 1e12 },
];

const SECONDS = { minute: 60, hour: 3600, day: 86400, year: 31557600 };

const estimate = (pw) => {
  if (!pw) return { bits: 0, classes: 0, flags: [] };
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 33;
  const classes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter((r) => r.test(pw)).length;
  let bits = pw.length * Math.log2(pool || 1);

  const flags = [];
  // crude pattern penalties (zxcvbn-spirit, not a clone)
  if (/(.)\1{2,}/.test(pw)) { bits *= 0.7; flags.push("repeat"); }
  if (/(0123|1234|2345|3456|4567|5678|6789|abcd|qwer|asdf|zxcv)/i.test(pw)) { bits *= 0.6; flags.push("sequence"); }
  if (/^(password|admin|welcome|letmein|iloveyou|dragon|monkey|qwerty|vardges)/i.test(pw)) { bits *= 0.35; flags.push("common"); }
  if (/^[a-z]+\d{1,4}$/i.test(pw)) { bits *= 0.75; flags.push("wordnum"); }
  if (pw.length < 8) { bits *= 0.8; flags.push("short"); }
  return { bits: Math.max(0, bits), classes, flags };
};

const fmt = (seconds, t) => {
  if (seconds < 1) return t("game.vault.instant");
  if (seconds < SECONDS.minute) return `${Math.round(seconds)} ${t("game.vault.sec")}`;
  if (seconds < SECONDS.hour) return `${Math.round(seconds / SECONDS.minute)} ${t("game.vault.min")}`;
  if (seconds < SECONDS.day) return `${Math.round(seconds / SECONDS.hour)} ${t("game.vault.hr")}`;
  if (seconds < SECONDS.year) return `${Math.round(seconds / SECONDS.day)} ${t("game.vault.days")}`;
  const years = seconds / SECONDS.year;
  if (years < 1e3) return `${Math.round(years).toLocaleString()} ${t("game.vault.yrs")}`;
  if (years < 1e6) return `${Math.round(years / 1e3).toLocaleString()}k ${t("game.vault.yrs")}`;
  if (years < 1e9) return `${Math.round(years / 1e6).toLocaleString()}M ${t("game.vault.yrs")}`;
  return t("game.vault.forever");
};

const CrackTheVault = () => {
  const { t } = usePortfolioLang();
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);

  const { bits, flags } = useMemo(() => estimate(pw), [pw]);
  const guesses = Math.pow(2, bits) / 2;
  const farmSeconds = guesses / 1e12;
  const cracked = pw.length > 0 && farmSeconds > SECONDS.year * 100; // survives the farm a century
  const strengthPct = Math.min(100, Math.round((bits / 90) * 100));
  const strengthKey = bits < 28 ? "weak" : bits < 45 ? "fair" : bits < 70 ? "strong" : "fortress";

  return (
    <section className="vp-section vp-vault">
      <div className="vp-container">
        <Reveal>
          <p className="vp-kicker">{t("game.vault.kicker")}</p>
          <h2 className="vp-h2">{t("game.vault.title")}</h2>
          <p className="vp-sub">{t("game.vault.sub")}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="vp-vault__shell">
            <div className={`vp-vault__door ${cracked ? "is-open" : ""}`} aria-hidden="true">
              <Motion.span
                className="vp-vault__icon"
                animate={{ rotate: cracked ? -12 : 0, scale: cracked ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                {cracked ? <LockOpen size={30} /> : <Lock size={30} />}
              </Motion.span>
              <span className="vp-vault__ring" />
            </div>

            <div className="vp-vault__main">
              <div className="vp-vault__field">
                <input
                  type={show ? "text" : "password"}
                  className="vp-vault__input"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder={t("game.vault.placeholder")}
                  aria-label={t("game.vault.title")}
                  autoComplete="off"
                  spellCheck="false"
                  dir="ltr"
                />
                <button type="button" className="vp-vault__eye" onClick={() => setShow((s) => !s)} aria-label={show ? t("game.vault.hide") : t("game.vault.showpw")}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="vp-vault__meter">
                <Motion.span
                  className={`vp-vault__meter-fill vp-vault__meter-fill--${strengthKey}`}
                  animate={{ width: `${strengthPct}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="vp-vault__meta">
                <span className={`vp-vault__verdict vp-vault__verdict--${strengthKey}`}>
                  <ShieldCheck size={13} aria-hidden="true" /> {t(`game.vault.strength.${strengthKey}`)}
                </span>
                <span className="vp-vault__bits">{Math.round(bits)} {t("game.vault.bits")}</span>
              </div>

              <div className="vp-vault__tiers">
                {TIERS.map((tier) => (
                  <div className="vp-vault__tier" key={tier.key}>
                    <span className="vp-vault__tier-name">
                      <Zap size={12} aria-hidden="true" /> {t(`game.vault.tier.${tier.key}`)}
                    </span>
                    <span className="vp-vault__tier-time">{pw ? fmt(guesses / tier.rate, t) : "—"}</span>
                  </div>
                ))}
              </div>

              {flags.length > 0 && (
                <div className="vp-vault__flags">
                  {flags.map((f) => (
                    <span className="vp-vault__flag" key={f}>{t(`game.vault.flag.${f}`)}</span>
                  ))}
                </div>
              )}

              <p className="vp-vault__privacy">{cracked ? t("game.vault.win") : t("game.vault.privacy")}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CrackTheVault;
