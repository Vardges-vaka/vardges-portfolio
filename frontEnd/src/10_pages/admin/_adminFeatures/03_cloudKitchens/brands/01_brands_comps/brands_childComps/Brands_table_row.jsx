import { useRef, useEffect } from "react";
import { SECTION_KEYS } from "../../05_brands_cnst/_brands_cnst.index.js";
import { getBrandDisplayName } from "../../02_brands_helpers/_brands_helpers.index.js";
import "../../_styles/brands_table_row.css";

const hasAnyLogo = (brand) => {
  const logos = brand?.files?.logos;
  if (!logos || Array.isArray(logos)) return false;
  return ["png", "jpg", "svg", "highRes", "ico"].some((k) => !!logos[k]);
};

const SECTION_ORDER = [
  SECTION_KEYS.basic,
  SECTION_KEYS.files,
  SECTION_KEYS.socials,
  SECTION_KEYS.website,
  SECTION_KEYS.otherSocials,
  SECTION_KEYS.inventoryIntegrations,
  SECTION_KEYS.salesIntegration,
  SECTION_KEYS.legal,
  SECTION_KEYS.relations,
];

const EditIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const AssignIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ViewRowIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ImageAddIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const RelationCell = ({
  count,
  assignTitle,
  viewTitle,
  onAssign,
  onView,
  branchTip,
}) => (
  <div className="Brands_table_row_cellInner">
    <span className="Brands_table_row_count" title={branchTip || undefined}>
      {count}
    </span>
    <button
      type="button"
      className="Brands_table_row_miniBtn"
      title={assignTitle}
      onClick={onAssign}>
      <AssignIcon />
    </button>
    <button
      type="button"
      className="Brands_table_row_miniBtn"
      title={viewTitle}
      onClick={onView}>
      <ViewRowIcon />
    </button>
  </div>
);

const Brands_table_row = ({
  index,
  brand,
  branchesList,
  menusList,
  logoUrl,
  activeTooltip,
  onTooltipToggle,
  onUpdateAll,
  onUpdateSection,
  onViewAll,
  onGoToLogoView,
  onGoToLogoEdit,
  t,
}) => {
  const id = brand._id;
  const name = getBrandDisplayName(brand);
  const logoExists = hasAnyLogo(brand);
  const logoTooltipRef = useRef(null);

  const isLogoTooltipOpen =
    activeTooltip?.brandId === id && activeTooltip?.type === "logo";

  useEffect(() => {
    if (!isLogoTooltipOpen) return;
    const handleOutside = (e) => {
      if (
        logoTooltipRef.current &&
        !logoTooltipRef.current.contains(e.target)
      ) {
        onTooltipToggle(id, "logo");
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isLogoTooltipOpen, id, onTooltipToggle]);

  const branchCount = brand.branches?.length ?? 0;
  const employeeCount = brand.employees?.length ?? 0;
  const equipmentCount = brand.equipments?.length ?? 0;
  const competitorCount = brand.competitors?.length ?? 0;

  const assignedMenu = menusList?.find((m) => m._id === brand.menu);
  const menuName = assignedMenu?.name?.value || assignedMenu?.name || null;

  const branchNames =
    branchCount > 0
      ? (brand.branches || [])
          .map((bId) => {
            const b = branchesList?.find((bl) => bl._id === bId);
            return b?.name?.value || b?.name || bId;
          })
          .join(", ")
      : null;

  const isUpdateOpen =
    activeTooltip?.brandId === id && activeTooltip?.type === "update";
  const isViewOpen =
    activeTooltip?.brandId === id && activeTooltip?.type === "view";
  console.log("brand.branches", brand.branches);
  console.log("logoUrl", logoUrl);

  return (
    <tr className="Brands_table_row">
      <td className="Brands_table_row_num">{index + 1}</td>
      <td className="Brands_table_row_num">{name}</td>

      <td className="Brands_table_row_logo">
        {logoExists && logoUrl ? (
          <div className="Brands_table_row_logoWrap" ref={logoTooltipRef}>
            <button
              type="button"
              className="Brands_table_row_logoImgBtn"
              onClick={() => onGoToLogoView(id)}
              title={t("table.clickToReplace")}>
              <img
                className="Brands_table_row_logoImg"
                src={logoUrl}
                alt={name}
              />
            </button>
          </div>
        ) : logoExists ? (
          <div className="Brands_table_row_logoWrap">
            <div
              className="Brands_table_row_logoPlaceholder"
              title={t("table.logoUploaded")}>
              <ImageAddIcon />
            </div>
            <button
              type="button"
              className="Brands_table_row_logoEditBtn"
              title={t("actions.edit")}
              onClick={() => onGoToLogoEdit(id)}>
              <EditIcon />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="Brands_table_row_logoBtn"
            title={t("table.addLogo")}
            onClick={() => onGoToLogoEdit(id)}>
            <ImageAddIcon />
            <span className="Brands_table_row_logoBtnText">
              {t("table.addLogo")}
            </span>
          </button>
        )}
      </td>

      <td className="Brands_table_row_cell">
        <RelationCell
          count={branchCount}
          assignTitle={t("table.assign")}
          viewTitle={t("actions.view")}
          onAssign={() => onUpdateSection(id, SECTION_KEYS.relations)}
          onView={() => onViewAll(id)}
          branchTip={branchNames}
        />
      </td>

      <td className="Brands_table_row_cell">
        <RelationCell
          count={employeeCount}
          assignTitle={t("table.assign")}
          viewTitle={t("actions.view")}
          onAssign={() => onUpdateSection(id, SECTION_KEYS.relations)}
          onView={() => onViewAll(id)}
        />
      </td>

      <td className="Brands_table_row_cell">
        <RelationCell
          count={equipmentCount}
          assignTitle={t("table.assign")}
          viewTitle={t("actions.view")}
          onAssign={() => onUpdateSection(id, SECTION_KEYS.relations)}
          onView={() => onViewAll(id)}
        />
      </td>

      <td className="Brands_table_row_cell">
        <RelationCell
          count={competitorCount}
          assignTitle={t("table.assign")}
          viewTitle={t("actions.view")}
          onAssign={() => onUpdateSection(id, SECTION_KEYS.relations)}
          onView={() => onViewAll(id)}
        />
      </td>

      <td className="Brands_table_row_cell Brands_table_row_cell--menu">
        {menuName ? (
          <div className="Brands_table_row_cellInner Brands_table_row_cellInner--menu">
            <span className="Brands_table_row_menuName" title={menuName}>
              {menuName}
            </span>
            <button
              type="button"
              className="Brands_table_row_miniBtn"
              title={t("actions.view")}
              onClick={() => onViewAll(id)}>
              <ViewRowIcon />
            </button>
            <button
              type="button"
              className="Brands_table_row_miniBtn"
              title={t("table.change")}
              onClick={() => onUpdateSection(id, SECTION_KEYS.relations)}>
              <EditIcon />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="Brands_table_row_miniBtn Brands_table_row_miniBtn--assign"
            title={t("table.assign")}
            onClick={() => onUpdateSection(id, SECTION_KEYS.relations)}>
            <AssignIcon />
            <span className="Brands_table_row_miniBtnText">
              {t("table.assign")}
            </span>
          </button>
        )}
      </td>

      <td className="Brands_table_row_iconCell">
        <button
          type="button"
          className={
            "Brands_table_row_iconBtn" +
            (isUpdateOpen ? " Brands_table_row_iconBtn--active" : "")
          }
          title={t("actions.edit")}
          onClick={() => onTooltipToggle(id, "update")}>
          <EditIcon />
        </button>
        {isUpdateOpen && (
          <div className="Brands_table_row_tooltip">
            <button
              type="button"
              className="Brands_table_row_tooltipItem Brands_table_row_tooltipItem--all"
              onClick={() => onUpdateAll(id)}>
              {t("table.updateAll")}
            </button>
            <div className="Brands_table_row_tooltipDivider" />
            {SECTION_ORDER.map((sk) => (
              <button
                key={sk}
                type="button"
                className="Brands_table_row_tooltipItem"
                onClick={() => onUpdateSection(id, sk)}>
                {t(`sections.${sk}`)}
              </button>
            ))}
          </div>
        )}
      </td>

      <td className="Brands_table_row_iconCell">
        <button
          type="button"
          className={
            "Brands_table_row_iconBtn" +
            (isViewOpen ? " Brands_table_row_iconBtn--active" : "")
          }
          title={t("actions.view")}
          onClick={() => onTooltipToggle(id, "view")}>
          <EyeIcon />
        </button>
        {isViewOpen && (
          <div className="Brands_table_row_tooltip">
            <button
              type="button"
              className="Brands_table_row_tooltipItem Brands_table_row_tooltipItem--all"
              onClick={() => onViewAll(id)}>
              {t("table.viewAll")}
            </button>
            <div className="Brands_table_row_tooltipDivider" />
            {SECTION_ORDER.map((sk) => (
              <button
                key={sk}
                type="button"
                className="Brands_table_row_tooltipItem"
                onClick={() => onViewAll(id)}>
                {t(`sections.${sk}`)}
              </button>
            ))}
          </div>
        )}
      </td>
    </tr>
  );
};

export default Brands_table_row;
