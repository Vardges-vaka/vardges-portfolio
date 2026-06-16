import { useEffect, useRef, useState } from "react";
import { Shuffle, Copy, Check } from "lucide-react";
import Reveal from "../Reveal.jsx";
import { usePortfolioLang } from "../../context/usePortfolio.js";

/**
 * Hash Forge — type anything and watch it hash live across SHA-1/256/512 (real
 * crypto via SubtleCrypto, all in-browser). "Flip a bit" shows the avalanche
 * effect: change one character, the entire digest scrambles. A visceral lesson
 * in one-way functions. Nothing leaves the page.
 */
const ALGOS = ["SHA-1", "SHA-256", "SHA-512"];

const toHex = (buf) =>
  [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");

const HashForge = () => {
  const { t } = usePortfolioLang();
  const [text, setText] = useState("vardges");
  const [hashes, setHashes] = useState({});
  const [copied, setCopied] = useState(null);
  const prevRef = useRef({});

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!window.crypto?.subtle) return;
      const data = new TextEncoder().encode(text);
      const out = {};
      const bufs = await Promise.all(ALGOS.map((algo) => window.crypto.subtle.digest(algo, data)));
      ALGOS.forEach((algo, i) => {
        out[algo] = toHex(bufs[i]);
      });
      if (!cancelled) {
        prevRef.current = hashes;
        setHashes(out);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const flipBit = () => {
    if (!text) {
      setText("a");
      return;
    }
    const i = Math.floor(Math.random() * text.length);
    const c = text.charCodeAt(i);
    const flipped = String.fromCharCode(c ^ 1); // flip the lowest bit
    setText(text.slice(0, i) + flipped + text.slice(i + 1));
  };

  const copy = (algo) => {
    navigator.clipboard?.writeText(hashes[algo] || "");
    setCopied(algo);
    setTimeout(() => setCopied(null), 1200);
  };

  // render hash with changed nibbles highlighted (avalanche)
  const renderHash = (algo) => {
    const cur = hashes[algo] || "";
    const prev = prevRef.current[algo] || "";
    return [...cur].map((ch, i) => (
      <span key={i} className={prev && prev[i] !== ch ? "vp-forge__nib vp-forge__nib--changed" : "vp-forge__nib"}>
        {ch}
      </span>
    ));
  };

  return (
    <section className="vp-section vp-forge">
      <div className="vp-container">
        <Reveal>
          <p className="vp-kicker">{t("game.forge.kicker")}</p>
          <h2 className="vp-h2">{t("game.forge.title")}</h2>
          <p className="vp-sub">{t("game.forge.sub")}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="vp-forge__shell">
            <div className="vp-forge__field">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t("game.forge.placeholder")}
                aria-label={t("game.forge.title")}
                dir="ltr"
                spellCheck="false"
              />
              <button type="button" className="vp-forge__flip" onClick={flipBit} title={t("game.forge.flip")}>
                <Shuffle size={15} aria-hidden="true" /> {t("game.forge.flip")}
              </button>
            </div>

            <div className="vp-forge__hashes">
              {ALGOS.map((algo) => (
                <div className="vp-forge__hash" key={algo}>
                  <div className="vp-forge__hash-head">
                    <span className="vp-forge__algo">{algo}</span>
                    <button type="button" className="vp-forge__copy" onClick={() => copy(algo)} aria-label={t("game.forge.copy")}>
                      {copied === algo ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  </div>
                  <code className="vp-forge__digest" dir="ltr">{renderHash(algo)}</code>
                </div>
              ))}
            </div>
            <p className="vp-forge__note">{t("game.forge.note")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HashForge;
