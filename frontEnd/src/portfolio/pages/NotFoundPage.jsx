import { Link } from "react-router-dom";
import { Home, Code2, Martini } from "lucide-react";
import { usePortfolioLang } from "../context/usePortfolio.js";
import Magnetic from "../components/Magnetic.jsx";

// Branded 404 — keeps the visual language and routes the visitor back in.
const NotFoundPage = () => {
  const { t } = usePortfolioLang();
  return (
    <main className="vp-page vp-page--home vp-404" id="vp-main" tabIndex={-1}>
      <div className="vp-404__inner">
        <p className="vp-404__code" aria-hidden="true">
          4<span className="vp-404__zero">0</span>4
        </p>
        <h1 className="vp-h1 vp-404__title">{t("notFound.title")}</h1>
        <p className="vp-sub vp-404__sub">{t("notFound.sub")}</p>
        <div className="vp-btn-row vp-404__row">
          <Magnetic>
            <Link className="vp-btn vp-btn--primary" to="/">
              <Home size={16} aria-hidden="true" />
              {t("notFound.home")}
            </Link>
          </Magnetic>
          <Magnetic>
            <Link className="vp-btn vp-btn--ghost" to="/tech">
              <Code2 size={16} aria-hidden="true" />
              {t("nav.tech")}
            </Link>
          </Magnetic>
          <Magnetic>
            <Link className="vp-btn vp-btn--ghost" to="/bar">
              <Martini size={16} aria-hidden="true" />
              {t("nav.bar")}
            </Link>
          </Magnetic>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
