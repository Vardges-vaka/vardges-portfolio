import { Eye, Headset, KeyRound, Pencil, UserRound } from "lucide-react";
import { useMemo } from "react";
import {
  Modal,
  Files_multicolor_icon,
  KAM_multicolor_icon,
  Support_multicolor_icon,
  Payments_multicolor_icon,
  Login_credentials_multicolor_icon,
} from "../../../../../../../01_components/_components.index.js";
import {
  getIntegrationAccountLabel,
  getIntegrationDisplayName,
  getIntegrationListRowStats,
  getIntegrationNameInitials,
  INTEGRATION_LIST_TABLE_COLUMNS,
} from "../../02_cK_setup_hlpr/integrationListRow_hlpr.js";
import {
  INTEGRATION_KINDS,
  INTEGRATION_STATUSES,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import { useIntegrationListLogoUrls } from "../../03_cK_setup_hooks/cK_setup_integrations_hooks/useIntegrationListLogoUrls.js";
import CK_integListKamPopover from "./CK_integListKamPopover.jsx";
import CK_integListCredentialsPopover from "./CK_integListCredentialsPopover.jsx";
import CK_integListSupportPopover from "./CK_integListSupportPopover.jsx";
import "../../_styles/cK_setup_session_integrations/cK_setup_integrations_viewAll.css";

const ACTION_ICON_SIZE = 16;
const STAT_ICON_SIZE = 15;

const CK_integListCountCell = ({ value }) => (
  <span className="cK_setup_integrations_viewAll__count">{value}</span>
);

const CK_integListLogoCell = ({ name, logoSrc }) => {
  if (logoSrc) {
    return (
      <img
        className="cK_setup_integrations_viewAll__logoImg"
        src={logoSrc}
        alt={`${name} logo`}
        title={name}
      />
    );
  }

  return (
    <span
      className="cK_setup_integrations_viewAll__logoFallback"
      aria-hidden="true"
      title={`${name} logo`}>
      {getIntegrationNameInitials(name)}
    </span>
  );
};

const CK_integListKamStatCell = ({ value, isOpen, disabled, onToggle }) => {
  const statusLabel = `Key account manager: ${value > 0 ? "set" : "not set"}`;

  return (
    <button
      type="button"
      className={[
        "cK_setup_integrations_viewAll__stat",
        "cK_setup_integrations_viewAll__statBtn",
        value > 0 && "cK_setup_integrations_viewAll__stat--active",
        isOpen && "cK_setup_integrations_viewAll__statBtn--open",
      ]
        .filter(Boolean)
        .join(" ")}
      title={statusLabel}
      aria-label={statusLabel}
      aria-expanded={isOpen}
      onClick={onToggle}
      disabled={disabled}>
      <img
        src={KAM_multicolor_icon()}
        alt="KAM"
        className="cK_setup_integrations_viewAll_rowIcon"
      />
    </button>
  );
};

const CK_integListCredentialsStatCell = ({
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
        "cK_setup_integrations_viewAll__stat",
        "cK_setup_integrations_viewAll__statBtn",
        value > 0 && "cK_setup_integrations_viewAll__stat--active",
        isOpen && "cK_setup_integrations_viewAll__statBtn--open",
      ]
        .filter(Boolean)
        .join(" ")}
      title={statusLabel}
      aria-label={statusLabel}
      aria-expanded={isOpen}
      onClick={onToggle}
      disabled={disabled}>
      <img
        src={Login_credentials_multicolor_icon()}
        alt="Login credentials"
        className="cK_setup_integrations_viewAll_rowIcon"
      />
      <KeyRound size={STAT_ICON_SIZE} aria-hidden="true" />
      {value > 0 ? (
        <span
          className="cK_setup_integrations_viewAll__statCount"
          aria-hidden="true">
          {value}
        </span>
      ) : null}
    </button>
  );
};

const CK_integListSupportStatCell = ({ value, isOpen, disabled, onToggle }) => {
  const statusLabel = `Support contacts: ${value}`;

  return (
    <button
      type="button"
      className={[
        "cK_setup_integrations_viewAll__stat",
        "cK_setup_integrations_viewAll__statBtn",
        value > 0 && "cK_setup_integrations_viewAll__stat--active",
        isOpen && "cK_setup_integrations_viewAll__statBtn--open",
      ]
        .filter(Boolean)
        .join(" ")}
      title={statusLabel}
      aria-label={statusLabel}
      aria-expanded={isOpen}
      onClick={onToggle}
      disabled={disabled}>
      <img
        src={Support_multicolor_icon()}
        alt="Support"
        className="cK_setup_integrations_viewAll_rowIcon"
      />
      <Headset size={STAT_ICON_SIZE} aria-hidden="true" />
      {value > 0 ? (
        <span
          className="cK_setup_integrations_viewAll__statCount"
          aria-hidden="true">
          {value}
        </span>
      ) : null}
    </button>
  );
};

const CK_setup_integrations_viewAll = ({ states, handlers }) => {
  const integrations = states?.integrations ?? [];
  const deleteModalOpen = states?.deleteModalOpen;
  const kamPopoverIntegration = states?.kamPopoverIntegration;
  const kamPopoverAnchorEl = states?.kamPopoverAnchorEl;
  const credentialsPopoverIntegration = states?.credentialsPopoverIntegration;
  const credentialsPopoverAnchorEl = states?.credentialsPopoverAnchorEl;
  const supportPopoverIntegration = states?.supportPopoverIntegration;
  const supportPopoverAnchorEl = states?.supportPopoverAnchorEl;
  const isSaving = states?.isSaving;
  const { resolveIntegrationLogoUrl } =
    useIntegrationListLogoUrls(integrations);
  const INTEGRATION_KINDS_OPTIONS = INTEGRATION_KINDS();
  const INTEGRATION_STATUSES_OPTIONS = INTEGRATION_STATUSES();

  const kamPopoverIntegrationLive = useMemo(() => {
    if (!kamPopoverIntegration?._id) return null;
    return (
      integrations.find((item) => item._id === kamPopoverIntegration._id) ||
      kamPopoverIntegration
    );
  }, [integrations, kamPopoverIntegration]);

  const credentialsPopoverIntegrationLive = useMemo(() => {
    if (!credentialsPopoverIntegration?._id) return null;
    return (
      integrations.find(
        (item) => item._id === credentialsPopoverIntegration._id,
      ) || credentialsPopoverIntegration
    );
  }, [integrations, credentialsPopoverIntegration]);

  const supportPopoverIntegrationLive = useMemo(() => {
    if (!supportPopoverIntegration?._id) return null;
    return (
      integrations.find((item) => item._id === supportPopoverIntegration._id) ||
      supportPopoverIntegration
    );
  }, [integrations, supportPopoverIntegration]);

  const renderIcon = (value, options) => {
    const option = options.find((option) => option.value === value);
    return (
      <img
        src={option?.leftIcon?.svg_src}
        alt={option.label}
        title={option.label}
        className={`cK_setup_integrations_viewAll__icon ${option.value === "other" ? "other" : ""}`}
      />
    );
  };

  return (
    <>
      <div className="cK_setup_integrations_viewAll">
        {integrations.length === 0 ? (
          <p className="cK_setup_integrations_viewAll__empty">
            No integrations found yet.
          </p>
        ) : (
          <div className="cK_setup_integrations_viewAll__tableWrap">
            <table className="cK_setup_integrations_viewAll__table">
              <thead className="cK_setup_integrations_viewAll__head">
                <tr className="cK_setup_integrations_viewAll__headRow">
                  {INTEGRATION_LIST_TABLE_COLUMNS.map((column, columnIndex) => {
                    return (
                      <th
                        key={`${column.key}-${columnIndex}`}
                        title={column.label}
                        className={[
                          "cK_setup_integrations_viewAll__headCell",
                          column.align === "center" &&
                            "cK_setup_integrations_viewAll__headCell--center",
                          column.align === "right" &&
                            "cK_setup_integrations_viewAll__headCell--right",
                          column.key === "index" &&
                            "cK_setup_integrations_viewAll__headCell--index",
                          column.key === "logo" &&
                            "cK_setup_integrations_viewAll__headCell--logo",
                          column.key === "name" &&
                            "cK_setup_integrations_viewAll__headCell--name",
                          (column.key === "loginCredentials" ||
                            column.key === "support") &&
                            "cK_setup_integrations_viewAll__headCell--stat",
                          column.key === "actions" &&
                            "cK_setup_integrations_viewAll__headCell--actions",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        scope="col">
                        {column.label}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="cK_setup_integrations_viewAll__body">
                {integrations.map((integration, index) => {
                  const name = getIntegrationDisplayName(integration);
                  const accountLabel = getIntegrationAccountLabel(integration);
                  const stats = getIntegrationListRowStats(integration);
                  const logoSrc = resolveIntegrationLogoUrl(integration);

                  return (
                    <tr
                      key={integration._id}
                      className="cK_setup_integrations_viewAll__row">
                      <td className="cK_setup_integrations_viewAll__cell cK_setup_integrations_viewAll__cell--index">
                        {index + 1}
                      </td>

                      <td className="cK_setup_integrations_viewAll__cell cK_setup_integrations_viewAll__cell--logo">
                        <CK_integListLogoCell
                          name={accountLabel}
                          logoSrc={logoSrc}
                        />
                        <span className="cK_setup_integrations_viewAll__name">
                          {name}
                        </span>
                      </td>

                      {/* <td className="cK_setup_integrations_viewAll__cell cK_setup_integrations_viewAll__cell--name">
                        <span className="cK_setup_integrations_viewAll__name">
                          {name}
                        </span>
                      </td> */}

                      <td className="cK_setup_integrations_viewAll__cell cK_setup_integrations_viewAll__cell--text">
                        {renderIcon(
                          integration.kind,
                          INTEGRATION_KINDS_OPTIONS,
                        )}
                      </td>

                      <td className="cK_setup_integrations_viewAll__cell cK_setup_integrations_viewAll__cell--text">
                        {renderIcon(
                          integration.status,
                          INTEGRATION_STATUSES_OPTIONS,
                        )}
                      </td>

                      <td className="cK_setup_integrations_viewAll__cell cK_setup_integrations_viewAll__cell--text">
                        <img
                          src={Payments_multicolor_icon()}
                          alt="Payments"
                          className="cK_setup_integrations_viewAll_rowIcon"
                        />
                      </td>

                      <td className="cK_setup_integrations_viewAll__cell cK_setup_integrations_viewAll__cell--stat">
                        <CK_integListCredentialsStatCell
                          value={stats.credentials}
                          isOpen={
                            credentialsPopoverIntegration?._id ===
                            integration._id
                          }
                          disabled={isSaving}
                          onToggle={(event) =>
                            handlers?.onCredentialsPopoverToggle?.(
                              integration,
                              event,
                            )
                          }
                        />
                      </td>

                      <td className="cK_setup_integrations_viewAll__cell cK_setup_integrations_viewAll__cell--stat">
                        <CK_integListSupportStatCell
                          value={stats.support}
                          isOpen={
                            supportPopoverIntegration?._id === integration._id
                          }
                          disabled={isSaving}
                          onToggle={(event) =>
                            handlers?.onSupportPopoverToggle?.(
                              integration,
                              event,
                            )
                          }
                        />
                      </td>
                      <td className="cK_setup_integrations_viewAll__cell cK_setup_integrations_viewAll__cell--stat">
                        <CK_integListKamStatCell
                          value={stats.kam}
                          isOpen={
                            kamPopoverIntegration?._id === integration._id
                          }
                          disabled={isSaving}
                          onToggle={(event) =>
                            handlers?.onKamPopoverToggle?.(integration, event)
                          }
                        />
                      </td>
                      <td className="cK_setup_integrations_viewAll__cell cK_setup_integrations_viewAll__cell--count">
                        {/* <CK_integListCountCell value={stats.files} /> */}
                        <img
                          src={Files_multicolor_icon()}
                          alt="Files"
                          className="cK_setup_integrations_viewAll_rowIcon"
                        />
                      </td>
                      <td className="cK_setup_integrations_viewAll__cell cK_setup_integrations_viewAll__cell--count">
                        <CK_integListCountCell value={stats.brands} />
                      </td>
                      <td className="cK_setup_integrations_viewAll__cell cK_setup_integrations_viewAll__cell--count">
                        <CK_integListCountCell value={stats.branches} />
                      </td>
                      <td className="cK_setup_integrations_viewAll__cell cK_setup_integrations_viewAll__cell--count">
                        <CK_integListCountCell value={stats.credentials} />
                      </td>
                      <td className="cK_setup_integrations_viewAll__cell cK_setup_integrations_viewAll__cell--count">
                        <CK_integListCountCell value={stats.support} />
                      </td>
                      <td className="cK_setup_integrations_viewAll__cell cK_setup_integrations_viewAll__cell--count">
                        <CK_integListCountCell value={stats.maintenances} />
                      </td>
                      <td className="cK_setup_integrations_viewAll__cell cK_setup_integrations_viewAll__cell--actions">
                        <div className="cK_setup_integrations_viewAll__actions">
                          <button
                            type="button"
                            className="cK_setup_integrations_viewAll__actionBtn"
                            title="View"
                            aria-label={`View ${name}`}
                            onClick={() => handlers?.onView?.(integration)}
                            disabled={isSaving}>
                            <Eye size={ACTION_ICON_SIZE} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className="cK_setup_integrations_viewAll__actionBtn"
                            title="Update"
                            aria-label={`Update ${name}`}
                            onClick={() => handlers?.onUpdate?.(integration)}
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

      {kamPopoverIntegrationLive && kamPopoverAnchorEl ? (
        <CK_integListKamPopover
          integration={kamPopoverIntegrationLive}
          anchorEl={kamPopoverAnchorEl}
          onClose={handlers.onKamPopoverClose}
          onOpenKam={handlers.onOpenKam}
        />
      ) : null}

      {credentialsPopoverIntegrationLive && credentialsPopoverAnchorEl ? (
        <CK_integListCredentialsPopover
          integration={credentialsPopoverIntegrationLive}
          anchorEl={credentialsPopoverAnchorEl}
          onClose={handlers.onCredentialsPopoverClose}
          onFetchDetails={handlers.onCredentialsPopoverFetch}
          onOpenCredentials={handlers.onOpenLoginCredentials}
        />
      ) : null}

      {supportPopoverIntegrationLive && supportPopoverAnchorEl ? (
        <CK_integListSupportPopover
          integration={supportPopoverIntegrationLive}
          anchorEl={supportPopoverAnchorEl}
          onClose={handlers.onSupportPopoverClose}
          onOpenSupport={handlers.onOpenSupportContacts}
        />
      ) : null}

      <Modal
        isOpen={deleteModalOpen}
        title="Delete integration"
        onCancel={handlers.onDeleteCancel}
        onConfirm={handlers.onDeleteConfirm}
        withFooter
        danger
        footerLabels={{
          cancelLabel: "Cancel",
          confirmLabel: "Delete",
        }}>
        <div className="cK_setup_integrations_viewAll__deleteModalBody">
          <p>
            Are you sure you want to delete{" "}
            <strong>
              {handlers.itemDisplayName?.() || "this integration"}
            </strong>
            ? This action cannot be undone.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default CK_setup_integrations_viewAll;
