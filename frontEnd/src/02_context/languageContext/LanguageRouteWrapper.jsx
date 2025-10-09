import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { SUPPORTED_LANGUAGES } from "../../08_constances/_constances.index.js";
import PropTypes from "prop-types";

const LanguageRouteWrapper = ({ children }) => {
  const { lang } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (lang && !SUPPORTED_LANGUAGES.includes(lang)) {
      const cleanPath = location.pathname.replace(/^\/[^/]+/, "") || "/";
      navigate(cleanPath, { replace: true });
    }
  }, [lang, location.pathname, navigate]);

  return children;
};

LanguageRouteWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

LanguageRouteWrapper.displayName = "LanguageRouteWrapper";

export default LanguageRouteWrapper;
