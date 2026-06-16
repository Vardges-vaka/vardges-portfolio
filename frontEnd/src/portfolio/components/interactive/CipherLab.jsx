import { useMemo, useState } from "react";
import { motion as Motion } from "framer-motion";
import { Lock, LockOpen, RefreshCw } from "lucide-react";
import Reveal from "../Reveal.jsx";
import { usePortfolioLang } from "../../context/usePortfolio.js";

/**
 * Cipher Lab — a Caesar-cipher decoding bench where every hidden message is a
 * cocktail recipe (the two crafts, in one toy). Slide the wheel to find the
 * shift; when the plaintext resolves, the recipe unlocks. A frequency hint helps.
 */
const PLAINTEXTS = [
  "TWO OUNCES BOURBON, ONE SUGAR CUBE, TWO DASHES BITTERS, ORANGE PEEL.",
  "EQUAL PARTS GIN, CAMPARI AND SWEET VERMOUTH. STIR OVER ICE. ORANGE.",
  "WHITE RUM, LIME, MINT, SUGAR AND SODA. MUDDLE GENTLY, DO NOT BRUISE.",
  "RYE, SWEET VERMOUTH, A DASH OF BITTERS. STIR. CHERRY. THE MANHATTAN.",
];

const caesar = (str, shift) =>
  str.replace(/[a-z]/gi, (ch) => {
    const base = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + shift + 26) % 26) + base);
  });

const newPuzzle = () => {
  const plain = PLAINTEXTS[Math.floor(Math.random() * PLAINTEXTS.length)];
  const shift = 1 + Math.floor(Math.random() * 24);
  return { plain, cipher: caesar(plain, shift) };
};

const topLetter = (s) => {
  const counts = {};
  for (const ch of s.toUpperCase()) if (ch >= "A" && ch <= "Z") counts[ch] = (counts[ch] || 0) + 1;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "E";
};

const CipherLab = () => {
  const { t } = usePortfolioLang();
  const [puz, setPuz] = useState(newPuzzle);
  const [slider, setSlider] = useState(0);

  const decoded = useMemo(() => caesar(puz.cipher, slider), [puz.cipher, slider]);
  const solved = decoded === puz.plain;
  const hint = useMemo(() => topLetter(puz.cipher), [puz.cipher]);

  const reset = () => {
    setPuz(newPuzzle());
    setSlider(0);
  };

  return (
    <section className="vp-section vp-cipher">
      <div className="vp-container">
        <Reveal>
          <p className="vp-kicker">{t("game.cipher.kicker")}</p>
          <h2 className="vp-h2">{t("game.cipher.title")}</h2>
          <p className="vp-sub">{t("game.cipher.sub")}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="vp-cipher__shell">
            <div className="vp-cipher__line">
              <span className="vp-cipher__tag">{t("game.cipher.encrypted")}</span>
              <code className="vp-cipher__cipher" dir="ltr">{puz.cipher}</code>
            </div>

            <div className="vp-cipher__wheel">
              <label htmlFor="vp-cipher-shift">{t("game.cipher.shift")}: <strong>{slider}</strong></label>
              <input id="vp-cipher-shift" type="range" min="0" max="25" value={slider} onChange={(e) => setSlider(parseInt(e.target.value, 10))} />
              <span className="vp-cipher__hint">{t("game.cipher.hint", "most common letter")}: <strong>{hint}</strong> → E?</span>
            </div>

            <div className={`vp-cipher__line vp-cipher__out ${solved ? "is-solved" : ""}`}>
              <span className="vp-cipher__tag">
                {solved ? <LockOpen size={13} aria-hidden="true" /> : <Lock size={13} aria-hidden="true" />}
                {solved ? t("game.cipher.solved") : t("game.cipher.decoded")}
              </span>
              <Motion.code key={solved ? "s" : "u"} className="vp-cipher__plain" dir="ltr" animate={solved ? { scale: [1, 1.02, 1] } : {}}>
                {decoded}
              </Motion.code>
            </div>

            <button type="button" className="vp-cipher__new" onClick={reset}>
              <RefreshCw size={13} aria-hidden="true" /> {t("game.cipher.new")}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CipherLab;
