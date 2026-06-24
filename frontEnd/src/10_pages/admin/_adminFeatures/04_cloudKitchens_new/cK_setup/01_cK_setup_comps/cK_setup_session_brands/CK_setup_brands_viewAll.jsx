import { Eye, Pencil } from "lucide-react";
import { Modal } from "../../../../../../../01_components/_components.index.js";
import {
  BRAND_LIST_TABLE_COLUMNS,
  getBrandDisplayName,
  getBrandListRowStats,
  getBrandNameInitials,
} from "../../02_cK_setup_hlpr/brandListRow_hlpr.js";
import { useBrandListLogoUrls } from "../../03_cK_setup_hooks/cK_setup_brands_hooks/useBrandListLogoUrls.js";
import "../../_styles/cK_setup_session_brands/cK_setup_brands_viewAll.css";

const ACTION_ICON_SIZE = 16;

const CK_brandListCountCell = ({ value }) => (
  <span className="cK_setup_brands_viewAll__count">{value}</span>
);

const CK_brandListLogoCell = ({ name, logoUrl }) => {
  if (logoUrl) {
    return (
      <img
        className="cK_setup_brands_viewAll__logoImg"
        src={logoUrl}
        alt={`${name} logo`}
      />
    );
  }

  return (
    <span
      className="cK_setup_brands_viewAll__logoFallback"
      aria-hidden="true"
      title={`${name} logo`}>
      {getBrandNameInitials(name)}
    </span>
  );
};

const CK_setup_brands_viewAll = ({ states, handlers }) => {
  const brands = states?.brands ?? [];
  const deleteModalOpen = states?.deleteModalOpen;
  const isSaving = states?.isSaving;
  const { resolveBrandLogoUrl } = useBrandListLogoUrls(brands);

  return (
    <>
      <div className="cK_setup_brands_viewAll">
        {brands.length === 0 ? (
          <p className="cK_setup_brands_viewAll__empty">No brands found yet.</p>
        ) : (
          <div className="cK_setup_brands_viewAll__tableWrap">
            <table className="cK_setup_brands_viewAll__table">
              <thead className="cK_setup_brands_viewAll__head">
                <tr className="cK_setup_brands_viewAll__headRow">
                  {BRAND_LIST_TABLE_COLUMNS.map((column) => (
                    <th
                      key={column.key}
                      className={[
                        "cK_setup_brands_viewAll__headCell",
                        column.align === "center" &&
                          "cK_setup_brands_viewAll__headCell--center",
                        column.align === "right" &&
                          "cK_setup_brands_viewAll__headCell--right",
                        column.key === "index" &&
                          "cK_setup_brands_viewAll__headCell--index",
                        column.key === "logo" &&
                          "cK_setup_brands_viewAll__headCell--logo",
                        column.key === "name" &&
                          "cK_setup_brands_viewAll__headCell--name",
                        column.key === "actions" &&
                          "cK_setup_brands_viewAll__headCell--actions",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      scope="col">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="cK_setup_brands_viewAll__body">
                {brands.map((brand, index) => {
                  const name = getBrandDisplayName(brand);
                  const stats = getBrandListRowStats(brand);
                  const logoUrl = resolveBrandLogoUrl(brand);

                  return (
                    <tr key={brand._id} className="cK_setup_brands_viewAll__row">
                      <td className="cK_setup_brands_viewAll__cell cK_setup_brands_viewAll__cell--index">
                        {index + 1}
                      </td>

                      <td className="cK_setup_brands_viewAll__cell cK_setup_brands_viewAll__cell--logo">
                        <CK_brandListLogoCell name={name} logoUrl={logoUrl} />
                      </td>

                      <td className="cK_setup_brands_viewAll__cell cK_setup_brands_viewAll__cell--name">
                        <span className="cK_setup_brands_viewAll__name">{name}</span>
                      </td>

                      <td className="cK_setup_brands_viewAll__cell cK_setup_brands_viewAll__cell--count">
                        <CK_brandListCountCell value={stats.files} />
                      </td>

                      <td className="cK_setup_brands_viewAll__cell cK_setup_brands_viewAll__cell--count">
                        <CK_brandListCountCell value={stats.employees} />
                      </td>

                      <td className="cK_setup_brands_viewAll__cell cK_setup_brands_viewAll__cell--count">
                        <CK_brandListCountCell value={stats.socials} />
                      </td>

                      <td className="cK_setup_brands_viewAll__cell cK_setup_brands_viewAll__cell--count">
                        <CK_brandListCountCell value={stats.integrations} />
                      </td>

                      <td className="cK_setup_brands_viewAll__cell cK_setup_brands_viewAll__cell--count">
                        <CK_brandListCountCell value={stats.branches} />
                      </td>

                      <td className="cK_setup_brands_viewAll__cell cK_setup_brands_viewAll__cell--count">
                        <CK_brandListCountCell value={stats.menus} />
                      </td>

                      <td className="cK_setup_brands_viewAll__cell cK_setup_brands_viewAll__cell--count">
                        <CK_brandListCountCell value={stats.competitors} />
                      </td>

                      <td className="cK_setup_brands_viewAll__cell cK_setup_brands_viewAll__cell--count">
                        <CK_brandListCountCell value={stats.equipments} />
                      </td>

                      <td className="cK_setup_brands_viewAll__cell cK_setup_brands_viewAll__cell--count">
                        <CK_brandListCountCell value={stats.siblings} />
                      </td>

                      <td className="cK_setup_brands_viewAll__cell cK_setup_brands_viewAll__cell--actions">
                        <div className="cK_setup_brands_viewAll__actions">
                          <button
                            type="button"
                            className="cK_setup_brands_viewAll__actionBtn"
                            title="View"
                            aria-label={`View ${name}`}
                            onClick={() => handlers?.onView?.(brand)}
                            disabled={isSaving}>
                            <Eye size={ACTION_ICON_SIZE} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className="cK_setup_brands_viewAll__actionBtn"
                            title="Update"
                            aria-label={`Update ${name}`}
                            onClick={() => handlers?.onUpdate?.(brand)}
                            disabled={isSaving}>
                            <Pencil size={ACTION_ICON_SIZE} aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={deleteModalOpen}
        title="Delete brand"
        onCancel={handlers.onDeleteCancel}
        onConfirm={handlers.onDeleteConfirm}
        withFooter
        danger
        footerLabels={{
          cancelLabel: "Cancel",
          confirmLabel: "Delete",
        }}>
        <div className="cK_setup_brands_viewAll__deleteModalBody">
          <p>
            Are you sure you want to delete{" "}
            <strong>{handlers.brandDisplayName?.() || "this brand"}</strong>?
            This action cannot be undone.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default CK_setup_brands_viewAll;
