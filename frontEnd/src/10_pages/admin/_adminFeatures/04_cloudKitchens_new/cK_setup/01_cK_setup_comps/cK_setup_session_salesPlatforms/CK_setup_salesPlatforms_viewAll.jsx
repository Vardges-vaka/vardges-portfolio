import {
  Eye,
  Headset,
  ImagePlus,
  KeyRound,
  Link2,
  Pencil,
  UserRound,
} from "lucide-react";
import { useMemo } from "react";
import {
  Input_image,
  Modal,
  Files_multicolor_icon,
  KAM_multicolor_icon,
  Support_multicolor_icon,
  Payments_multicolor_icon,
  Login_credentials_multicolor_icon,
} from "../../../../../../../01_components/_components.index.js";
import {
  getSalesPlatformDisplayName,
  getSalesPlatformListRowMetrics,
  getSalesPlatformListRowStats,
  hasSalesPlatformLogoUrl,
  SALES_PLATFORM_LIST_METRIC_COLUMN_KEYS,
  SALES_PLATFORM_LIST_TABLE_COLUMNS,
} from "../../02_cK_setup_hlpr/salesPlatformListRow_hlpr.js";
import { useSalesPlatformListLogoUrls } from "../../03_cK_setup_hooks/cK_setup_salesPlatforms_hooks/useSalesPlatformListLogoUrls.js";
import CK_slsPltfListKamPopover from "./CK_slsPltfListKamPopover.jsx";
import CK_slsPltfListLinksPopover from "./CK_slsPltfListLinksPopover.jsx";
import CK_slsPltfListCredentialsPopover from "./CK_slsPltfListCredentialsPopover.jsx";
import CK_slsPltfListSupportPopover from "./CK_slsPltfListSupportPopover.jsx";
import { CK_stp_slsPltf_fld_kam } from "./ck_setup_salesPlatform_fields/_ck_setup_salesPlatform_fields.index.js";
import CK_stp_slsPltf_fld_linksUrls from "./ck_setup_salesPlatform_fields/CK_stp_slsPltf_fld_linksUrls.jsx";
import "../../_styles/cK_setup_session_salesPlatforms/cK_setup_salesPlatforms_viewAll.css";

const ACTION_ICON_SIZE = 16;
const STAT_ICON_SIZE = 15;

const STAT_COLUMN_ICONS = {
  kam: UserRound,
  links: Link2,
  secrets: KeyRound,
  support: Headset,
};

const CK_slsPltfListLogoCell = ({
  name,
  logoSrc,
  showUploadBtn,
  onUploadClick,
  disabled,
}) => {
  if (logoSrc) {
    return (
      <span className="cK_setup_salesPlatforms_viewAll__logoSlot">
        <img
          className="cK_setup_salesPlatforms_viewAll__logoImg"
          src={logoSrc}
          alt={`${name} logo`}
        />
      </span>
    );
  }

  if (showUploadBtn) {
    return (
      <button
        type="button"
        className="cK_setup_salesPlatforms_viewAll__logoSlot cK_setup_salesPlatforms_viewAll__logoUploadBtn"
        title={`Upload logo for ${name}`}
        aria-label={`Upload logo for ${name}`}
        onClick={onUploadClick}
        disabled={disabled}>
        <ImagePlus
          className="cK_setup_salesPlatforms_viewAll__logoUploadIcon"
          strokeWidth={1.35}
          aria-hidden="true"
        />
      </button>
    );
  }

  return null;
};

const CK_slsPltfListKamStatCell = ({ value, isOpen, disabled, onToggle }) => {
  const statusLabel = `Key account manager: ${value}`;

  return (
    <button
      type="button"
      className={[
        "cK_setup_salesPlatforms_viewAll__stat",
        "cK_setup_salesPlatforms_viewAll__statBtn",
        value > 0 && "cK_setup_salesPlatforms_viewAll__stat--active",
        isOpen && "cK_setup_salesPlatforms_viewAll__statBtn--open",
      ]
        .filter(Boolean)
        .join(" ")}
      title={statusLabel}
      aria-label={statusLabel}
      aria-expanded={isOpen}
      onClick={onToggle}
      disabled={disabled}>
      <UserRound size={STAT_ICON_SIZE} aria-hidden="true" />
    </button>
  );
};

const CK_slsPltfListLinksStatCell = ({ value, isOpen, disabled, onToggle }) => {
  const statusLabel = `Links: ${value}`;

  return (
    <button
      type="button"
      className={[
        "cK_setup_salesPlatforms_viewAll__stat",
        "cK_setup_salesPlatforms_viewAll__statBtn",
        value > 0 && "cK_setup_salesPlatforms_viewAll__stat--active",
        isOpen && "cK_setup_salesPlatforms_viewAll__statBtn--open",
      ]
        .filter(Boolean)
        .join(" ")}
      title={statusLabel}
      aria-label={statusLabel}
      aria-expanded={isOpen}
      onClick={onToggle}
      disabled={disabled}>
      <Link2 size={STAT_ICON_SIZE} aria-hidden="true" />
    </button>
  );
};

const CK_slsPltfListCredentialsStatCell = ({
  value,
  isOpen,
  disabled,
  onToggle,
}) => {
  const statusLabel = `Login credentials: ${value}`;

  return (
    <button
      type="button"
      className={[
        "cK_setup_salesPlatforms_viewAll__stat",
        "cK_setup_salesPlatforms_viewAll__statBtn",
        value > 0 && "cK_setup_salesPlatforms_viewAll__stat--active",
        isOpen && "cK_setup_salesPlatforms_viewAll__statBtn--open",
      ]
        .filter(Boolean)
        .join(" ")}
      title={statusLabel}
      aria-label={statusLabel}
      aria-expanded={isOpen}
      onClick={onToggle}
      disabled={disabled}>
      <KeyRound size={STAT_ICON_SIZE} aria-hidden="true" />
      {value > 0 ? (
        <span
          className="cK_setup_salesPlatforms_viewAll__statCount"
          aria-hidden="true">
          {value}
        </span>
      ) : null}
    </button>
  );
};

const CK_slsPltfListSupportStatCell = ({
  value,
  isOpen,
  disabled,
  onToggle,
}) => {
  const statusLabel = `Support contacts: ${value}`;

  return (
    <button
      type="button"
      className={[
        "cK_setup_salesPlatforms_viewAll__stat",
        "cK_setup_salesPlatforms_viewAll__statBtn",
        value > 0 && "cK_setup_salesPlatforms_viewAll__stat--active",
        isOpen && "cK_setup_salesPlatforms_viewAll__statBtn--open",
      ]
        .filter(Boolean)
        .join(" ")}
      title={statusLabel}
      aria-label={statusLabel}
      aria-expanded={isOpen}
      onClick={onToggle}
      disabled={disabled}>
      {/* <img src={Support_multicolor_icon()} alt="Support" /> */}
      <Headset size={STAT_ICON_SIZE} aria-hidden="true" />
      {value > 0 ? (
        <span
          className="cK_setup_salesPlatforms_viewAll__statCount"
          aria-hidden="true">
          {value}
        </span>
      ) : null}
    </button>
  );
};

const CK_setup_salesPlatforms_viewAll = ({ states, handlers }) => {
  const platforms = states?.salesPlatforms ?? [];
  const deleteModalOpen = states?.deleteModalOpen;
  const logoUploadModalOpen = states?.logoUploadModalOpen;
  const logoUploadPreviewUrl = states?.logoUploadPreviewUrl ?? "";
  const kamPopoverPlatform = states?.kamPopoverPlatform;
  const kamPopoverAnchorEl = states?.kamPopoverAnchorEl;
  const kamUpdateModalOpen = states?.kamUpdateModalOpen;
  const kamUpdateDraft = states?.kamUpdateDraft;
  const linksPopoverPlatform = states?.linksPopoverPlatform;
  const linksPopoverAnchorEl = states?.linksPopoverAnchorEl;
  const linksUpdateModalOpen = states?.linksUpdateModalOpen;
  const linksUpdateDraft = states?.linksUpdateDraft;
  const credentialsPopoverPlatform = states?.credentialsPopoverPlatform;
  const credentialsPopoverAnchorEl = states?.credentialsPopoverAnchorEl;
  const supportPopoverPlatform = states?.supportPopoverPlatform;
  const supportPopoverAnchorEl = states?.supportPopoverAnchorEl;
  const isSaving = states?.isSaving;
  const { resolveSalesPlatformLogoUrl } =
    useSalesPlatformListLogoUrls(platforms);

  const kamPopoverPlatformLive = useMemo(() => {
    if (!kamPopoverPlatform?._id) return null;
    return (
      platforms.find((item) => item._id === kamPopoverPlatform._id) ||
      kamPopoverPlatform
    );
  }, [platforms, kamPopoverPlatform]);

  const linksPopoverPlatformLive = useMemo(() => {
    if (!linksPopoverPlatform?._id) return null;
    return (
      platforms.find((item) => item._id === linksPopoverPlatform._id) ||
      linksPopoverPlatform
    );
  }, [platforms, linksPopoverPlatform]);

  const credentialsPopoverPlatformLive = useMemo(() => {
    if (!credentialsPopoverPlatform?._id) return null;
    return (
      platforms.find((item) => item._id === credentialsPopoverPlatform._id) ||
      credentialsPopoverPlatform
    );
  }, [platforms, credentialsPopoverPlatform]);

  const supportPopoverPlatformLive = useMemo(() => {
    if (!supportPopoverPlatform?._id) return null;
    return (
      platforms.find((item) => item._id === supportPopoverPlatform._id) ||
      supportPopoverPlatform
    );
  }, [platforms, supportPopoverPlatform]);

  return (
    <>
      <div className="cK_setup_salesPlatforms_viewAll">
        {platforms.length === 0 ? (
          <p className="cK_setup_salesPlatforms_viewAll__empty">
            No sales platforms found yet.
          </p>
        ) : (
          <div className="cK_setup_salesPlatforms_viewAll__tableWrap">
            <table className="cK_setup_salesPlatforms_viewAll__table">
              <thead className="cK_setup_salesPlatforms_viewAll__head">
                <tr className="cK_setup_salesPlatforms_viewAll__headRow">
                  {SALES_PLATFORM_LIST_TABLE_COLUMNS.map((column) => {
                    const StatIcon = column.iconKey
                      ? STAT_COLUMN_ICONS[column.iconKey]
                      : null;

                    return (
                      <th
                        key={column.key}
                        className={[
                          "cK_setup_salesPlatforms_viewAll__headCell",
                          column.align === "center" &&
                            "cK_setup_salesPlatforms_viewAll__headCell--center",
                          column.align === "right" &&
                            "cK_setup_salesPlatforms_viewAll__headCell--right",
                          column.key === "index" &&
                            "cK_setup_salesPlatforms_viewAll__headCell--index",
                          column.key === "logo" &&
                            "cK_setup_salesPlatforms_viewAll__headCell--logo",
                          column.key === "name" &&
                            "cK_setup_salesPlatforms_viewAll__headCell--name",
                          SALES_PLATFORM_LIST_METRIC_COLUMN_KEYS.includes(
                            column.key,
                          ) &&
                            "cK_setup_salesPlatforms_viewAll__headCell--metric",
                          column.iconKey &&
                            "cK_setup_salesPlatforms_viewAll__headCell--iconOnly",
                          column.key === "actions" &&
                            "cK_setup_salesPlatforms_viewAll__headCell--actions",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        scope="col"
                        title={column.title || column.label}
                        aria-label={column.title || column.label}>
                        {StatIcon ? (
                          <StatIcon size={STAT_ICON_SIZE} aria-hidden="true" />
                        ) : (
                          column.label
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="cK_setup_salesPlatforms_viewAll__body">
                {platforms.map((platform, index) => {
                  const name = getSalesPlatformDisplayName(platform);
                  const stats = getSalesPlatformListRowStats(platform);
                  const metrics = getSalesPlatformListRowMetrics(platform);
                  const logoSrc = resolveSalesPlatformLogoUrl(platform);

                  return (
                    <tr
                      key={platform._id}
                      className="cK_setup_salesPlatforms_viewAll__row">
                      <td className="cK_setup_salesPlatforms_viewAll__cell cK_setup_salesPlatforms_viewAll__cell--index">
                        {index + 1}
                      </td>

                      <td className="cK_setup_salesPlatforms_viewAll__cell cK_setup_salesPlatforms_viewAll__cell--logo">
                        <CK_slsPltfListLogoCell
                          name={name}
                          logoSrc={logoSrc}
                          showUploadBtn={!hasSalesPlatformLogoUrl(platform)}
                          onUploadClick={() =>
                            handlers?.onLogoUploadOpen?.(platform)
                          }
                          disabled={isSaving}
                        />
                      </td>

                      <td className="cK_setup_salesPlatforms_viewAll__cell cK_setup_salesPlatforms_viewAll__cell--name">
                        <span className="cK_setup_salesPlatforms_viewAll__name">
                          {name}
                        </span>
                      </td>

                      <td className="cK_setup_salesPlatforms_viewAll__cell cK_setup_salesPlatforms_viewAll__cell--metric">
                        <span className="cK_setup_salesPlatforms_viewAll__metricPlaceholder">
                          {metrics.avgMonthlySales}
                        </span>
                      </td>

                      <td className="cK_setup_salesPlatforms_viewAll__cell cK_setup_salesPlatforms_viewAll__cell--metric">
                        <span className="cK_setup_salesPlatforms_viewAll__metricPlaceholder">
                          {metrics.avgDailySales}
                        </span>
                      </td>

                      <td className="cK_setup_salesPlatforms_viewAll__cell cK_setup_salesPlatforms_viewAll__cell--metric">
                        <span className="cK_setup_salesPlatforms_viewAll__metricPlaceholder">
                          {metrics.sites}
                        </span>
                      </td>

                      <td className="cK_setup_salesPlatforms_viewAll__cell cK_setup_salesPlatforms_viewAll__cell--metric">
                        <span className="cK_setup_salesPlatforms_viewAll__metricPlaceholder">
                          {metrics.brands}
                        </span>
                      </td>

                      <td className="cK_setup_salesPlatforms_viewAll__cell cK_setup_salesPlatforms_viewAll__cell--stat">
                        <CK_slsPltfListKamStatCell
                          value={stats.kam}
                          isOpen={kamPopoverPlatform?._id === platform._id}
                          disabled={isSaving}
                          onToggle={(event) =>
                            handlers?.onKamPopoverToggle?.(platform, event)
                          }
                        />
                      </td>

                      <td className="cK_setup_salesPlatforms_viewAll__cell cK_setup_salesPlatforms_viewAll__cell--stat">
                        <CK_slsPltfListLinksStatCell
                          value={stats.links}
                          isOpen={linksPopoverPlatform?._id === platform._id}
                          disabled={isSaving}
                          onToggle={(event) =>
                            handlers?.onLinksPopoverToggle?.(platform, event)
                          }
                        />
                      </td>

                      <td className="cK_setup_salesPlatforms_viewAll__cell cK_setup_salesPlatforms_viewAll__cell--stat">
                        <CK_slsPltfListCredentialsStatCell
                          value={stats.secrets}
                          isOpen={
                            credentialsPopoverPlatform?._id === platform._id
                          }
                          disabled={isSaving}
                          onToggle={(event) =>
                            handlers?.onCredentialsPopoverToggle?.(
                              platform,
                              event,
                            )
                          }
                        />
                      </td>

                      <td className="cK_setup_salesPlatforms_viewAll__cell cK_setup_salesPlatforms_viewAll__cell--stat">
                        <CK_slsPltfListSupportStatCell
                          value={stats.support}
                          isOpen={supportPopoverPlatform?._id === platform._id}
                          disabled={isSaving}
                          onToggle={(event) =>
                            handlers?.onSupportPopoverToggle?.(platform, event)
                          }
                        />
                      </td>

                      <td className="cK_setup_salesPlatforms_viewAll__cell cK_setup_salesPlatforms_viewAll__cell--actions">
                        <div className="cK_setup_salesPlatforms_viewAll__actions">
                          <button
                            type="button"
                            className="cK_setup_salesPlatforms_viewAll__actionBtn"
                            title="View"
                            aria-label={`View ${name}`}
                            onClick={() => handlers?.onView?.(platform)}
                            disabled={isSaving}>
                            <Eye size={ACTION_ICON_SIZE} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className="cK_setup_salesPlatforms_viewAll__actionBtn"
                            title="Update"
                            aria-label={`Update ${name}`}
                            onClick={() => handlers?.onUpdate?.(platform)}
                            disabled={isSaving}>
                            <Pencil
                              size={ACTION_ICON_SIZE}
                              aria-hidden="true"
                            />
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

      {kamPopoverPlatformLive && kamPopoverAnchorEl ? (
        <CK_slsPltfListKamPopover
          platform={kamPopoverPlatformLive}
          anchorEl={kamPopoverAnchorEl}
          onClose={handlers.onKamPopoverClose}
          onUpdateClick={handlers.onKamUpdateOpen}
        />
      ) : null}

      {linksPopoverPlatformLive && linksPopoverAnchorEl ? (
        <CK_slsPltfListLinksPopover
          platform={linksPopoverPlatformLive}
          anchorEl={linksPopoverAnchorEl}
          onClose={handlers.onLinksPopoverClose}
          onUpdateClick={handlers.onLinksUpdateOpen}
        />
      ) : null}

      {credentialsPopoverPlatformLive && credentialsPopoverAnchorEl ? (
        <CK_slsPltfListCredentialsPopover
          platform={credentialsPopoverPlatformLive}
          anchorEl={credentialsPopoverAnchorEl}
          onClose={handlers.onCredentialsPopoverClose}
          onFetchDetails={handlers.onCredentialsPopoverFetch}
          onOpenCredentials={handlers.onOpenLoginCredentials}
        />
      ) : null}

      {supportPopoverPlatformLive && supportPopoverAnchorEl ? (
        <CK_slsPltfListSupportPopover
          platform={supportPopoverPlatformLive}
          anchorEl={supportPopoverAnchorEl}
          onClose={handlers.onSupportPopoverClose}
          onOpenSupport={handlers.onOpenSupportContacts}
        />
      ) : null}

      <Modal
        isOpen={kamUpdateModalOpen}
        title="Update key account manager"
        onCancel={handlers.onKamUpdateCancel}
        onConfirm={handlers.onKamUpdateConfirm}
        withFooter
        footerLabels={{
          cancelLabel: "Cancel",
          confirmLabel: isSaving ? "Saving..." : "Save KAM",
        }}
        footerStates={{
          isConfirmDisabled: isSaving,
          isCancelDisabled: isSaving,
        }}>
        <div className="cK_setup_salesPlatforms_viewAll__kamUpdateModalBody">
          <p className="cK_setup_salesPlatforms_viewAll__kamUpdateModalIntro">
            Update KAM details for{" "}
            <strong>
              {handlers.itemDisplayName?.() || "this sales platform"}
            </strong>
            .
          </p>
          <CK_stp_slsPltf_fld_kam
            states={{
              values: kamUpdateDraft ?? { kam: {} },
              isEditOpen: true,
            }}
            handlers={{ onChange: handlers.onKamUpdateChange }}
          />
        </div>
      </Modal>

      <Modal
        isOpen={linksUpdateModalOpen}
        title="Update platform links"
        onCancel={handlers.onLinksUpdateCancel}
        onConfirm={handlers.onLinksUpdateConfirm}
        withFooter
        footerLabels={{
          cancelLabel: "Cancel",
          confirmLabel: isSaving ? "Saving..." : "Save links",
        }}
        footerStates={{
          isConfirmDisabled: isSaving,
          isCancelDisabled: isSaving,
        }}>
        <div className="cK_setup_salesPlatforms_viewAll__linksUpdateModalBody">
          <p className="cK_setup_salesPlatforms_viewAll__linksUpdateModalIntro">
            Update links for{" "}
            <strong>
              {handlers.itemDisplayName?.() || "this sales platform"}
            </strong>
            .
          </p>
          <CK_stp_slsPltf_fld_linksUrls
            states={{
              values: linksUpdateDraft ?? { links: {} },
              isEditOpen: true,
            }}
            handlers={{ onChange: handlers.onLinksUpdateChange }}
          />
        </div>
      </Modal>

      <Modal
        isOpen={logoUploadModalOpen}
        title="Upload platform logo"
        onCancel={handlers.onLogoUploadCancel}
        onConfirm={handlers.onLogoUploadConfirm}
        withFooter
        footerLabels={{
          cancelLabel: "Cancel",
          confirmLabel: isSaving ? "Uploading..." : "Upload logo",
        }}
        footerStates={{
          isConfirmDisabled: isSaving || !logoUploadPreviewUrl,
          isCancelDisabled: isSaving,
        }}>
        <div className="cK_setup_salesPlatforms_viewAll__logoUploadModalBody">
          <p className="cK_setup_salesPlatforms_viewAll__logoUploadModalIntro">
            Upload a logo for{" "}
            <strong>
              {handlers.itemDisplayName?.() || "this sales platform"}
            </strong>
            .
          </p>
          <Input_image
            labelProps={{ isActive: true, message: "Platform logo" }}
            hintsProps={{
              isActive: true,
              type: "hint",
              message: "Choose an image file for the platform logo.",
            }}
            showPreviewPanel
            previewPanelLabel="Logo preview"
            previewUrl={logoUploadPreviewUrl}
            simulateUpload
            onChange={handlers.onLogoUploadFileChange}
          />
        </div>
      </Modal>

      <Modal
        isOpen={deleteModalOpen}
        title="Delete sales platform"
        onCancel={handlers.onDeleteCancel}
        onConfirm={handlers.onDeleteConfirm}
        withFooter
        danger
        footerLabels={{
          cancelLabel: "Cancel",
          confirmLabel: "Delete",
        }}>
        <div className="cK_setup_salesPlatforms_viewAll__deleteModalBody">
          <p>
            Are you sure you want to delete{" "}
            <strong>
              {handlers.itemDisplayName?.() || "this sales platform"}
            </strong>
            ? This action cannot be undone.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default CK_setup_salesPlatforms_viewAll;
