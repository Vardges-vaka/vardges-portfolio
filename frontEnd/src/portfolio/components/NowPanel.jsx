import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { usePortfolioLang } from "../context/usePortfolio.js";

/**
 * NowPanel — a live "currently" strip: a real Dubai clock (ticking) plus a few
 * status lines. Makes a static portfolio feel like a person with a pulse.
 */
const NowPanel = () => {
  const { t, lang } = usePortfolioLang();
  const [time, setTime] = useState("");

  useEffect(() => {
    let fmt;
    try {
      fmt = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Dubai",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    } catch {
      fmt = null;
    }
    const tick = () => setTime(fmt ? fmt.format(new Date()) : "");
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lang]);

  const statuses = t("home.now.statuses");

  return (
    <div className="vp-now">
      <span className="vp-now__time" dir="ltr">
        <Clock size={14} aria-hidden="true" />
        {time}
        <span className="vp-now__tz">{t("home.now.tz")}</span>
      </span>
      <span className="vp-now__divider" aria-hidden="true" />
      <ul className="vp-now__statuses">
        {(Array.isArray(statuses) ? statuses : []).map((s, i) => (
          <li key={s} style={{ "--d": `${i * 0.12}s` }}>
            <span className="vp-now__dot" aria-hidden="true" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NowPanel;
