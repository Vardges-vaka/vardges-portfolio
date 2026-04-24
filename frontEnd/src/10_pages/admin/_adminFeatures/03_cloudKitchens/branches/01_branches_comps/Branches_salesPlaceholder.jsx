import { MoneyIcon } from "./Branches_icons/_branches_icons.index.js";
import "../_styles/branches_salesPlaceholder.css";

// Sales data block — lives below the two-column + bottom-strip in the detail
// view. Real analytics will land once we have SalesEntry CRUD (Phase 3).
const Branches_salesPlaceholder = ({ t }) => {
  return (
    <section className="branchesSales" role="status">
      <header className="branchesSales__header">
        <div className="branchesSales__iconWrap" aria-hidden="true">
          <MoneyIcon size={18} />
        </div>
        <h3 className="branchesSales__title">{t("sections.sales")}</h3>
      </header>
      <p className="branchesSales__body">{t("placeholders.salesDescription")}</p>
      <div className="branchesSales__grid" aria-hidden="true">
        <div className="branchesSales__kpi">
          <span className="branchesSales__kpiLabel">{t("placeholders.salesToday")}</span>
          <span className="branchesSales__kpiValue">—</span>
        </div>
        <div className="branchesSales__kpi">
          <span className="branchesSales__kpiLabel">{t("placeholders.salesWeek")}</span>
          <span className="branchesSales__kpiValue">—</span>
        </div>
        <div className="branchesSales__kpi">
          <span className="branchesSales__kpiLabel">{t("placeholders.salesMonth")}</span>
          <span className="branchesSales__kpiValue">—</span>
        </div>
        <div className="branchesSales__kpi">
          <span className="branchesSales__kpiLabel">{t("placeholders.ordersMonth")}</span>
          <span className="branchesSales__kpiValue">—</span>
        </div>
      </div>
    </section>
  );
};

export default Branches_salesPlaceholder;
