import { useCloudStorage_MonitorPanel } from "../../03_CloudStorage_hooks/_CloudStorage_hooks.index.js";
import { CloudStorage_MonitorLoader } from "../_CloudStorage_comps.index.js";
import {
  CloudStorage_StorageSection,
  CloudStorage_OperationsSection,
  CloudStorage_NetworkSection,
  CloudStorage_CostSection,
  CloudStorage_FilesSection,
} from "./cloudStorage_MonitorPanel_sections/_cloudStorage_MonitorPanel_sections.index.js";
import "../../_styles/cloudStorage_monitorPanel.css";
import "../../_styles/cloudStorage_monitorShared.css";

const CloudStorage_MonitorPanel = ({
  open,
  provider,
  onCopyKey,
  monitorLoading,
}) => {
  const { states } = useCloudStorage_MonitorPanel({
    open,
    provider,
    monitorLoading,
  });

  return (
    <tr className="panel-row">
      <td
        colSpan={11}
        style={{
          padding: 0,
          borderTop: open
            ? "2px solid var(--monitoring-border)"
            : "2px solid transparent",
          transition: "border-color 0.3s",
        }}>
        <div
          ref={states.containerRef}
          style={{ height: 0, overflow: "hidden" }}>
          <div ref={states.innerRef}>
            <div className="monitoring-panel">
              <div className="monitor-header">
                <div className="monitor-title">
                  {provider.name} — Cloud Storage Monitor
                </div>
                <div
                  className={`live-dot${provider.implemented ? "" : " offline"}`}
                />
                <div className="live-label">
                  {provider.implemented ? "Live" : "Not connected"}
                </div>
              </div>

              <div
                className="monitor-sections"
                aria-busy={states.shouldShowLoader}>
                {states.shouldShowLoader ? (
                  <CloudStorage_MonitorLoader />
                ) : provider.implemented && provider.monitoring ? (
                  <>
                    <CloudStorage_StorageSection
                      data={provider.monitoring.storage}
                    />
                    <CloudStorage_OperationsSection
                      data={provider.monitoring.ops}
                    />
                    <CloudStorage_NetworkSection
                      data={provider.monitoring.network}
                    />
                    <CloudStorage_CostSection data={provider.monitoring.cost} />
                    <CloudStorage_FilesSection
                      data={provider.monitoring.files}
                      onCopyKey={onCopyKey}
                    />
                  </>
                ) : (
                  <div className="not-impl-banner">
                    {provider.implemented
                      ? "No monitoring data available yet."
                      : "This provider is not yet implemented. Monitoring data unavailable."}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CloudStorage_MonitorPanel;
