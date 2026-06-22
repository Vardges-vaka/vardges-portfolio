import { Search } from "lucide-react";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_cuisineTags.css";

const CK_stp_brand_fld_cuisineTagsHeaderAside = ({
  total = 0,
  isSearchOpen = false,
  onToggleSearch,
}) => (
  <div className="cK_stp_brand_fld_cuisineTags__headerTools">
    <span className="cK_stp_brand_fld_cuisineTags__total">
      <strong>{total}</strong>
      <span className="cK_stp_brand_fld_cuisineTags__totalLabel">tags</span>
    </span>
    <button
      type="button"
      className={
        "cK_stp_brand_fld_cuisineTags__searchBtn" +
        (isSearchOpen ? " cK_stp_brand_fld_cuisineTags__searchBtn--active" : "")
      }
      aria-label={isSearchOpen ? "Hide search" : "Show search"}
      aria-pressed={isSearchOpen}
      title={isSearchOpen ? "Hide search" : "Search tags"}
      onClick={onToggleSearch}>
      <Search size={16} aria-hidden="true" />
    </button>
  </div>
);

export default CK_stp_brand_fld_cuisineTagsHeaderAside;
