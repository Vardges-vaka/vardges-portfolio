import {
  Input_date,
  Input_textArea,
  Select_static,
} from "../../../../../../../../01_components/_components.index.js";
import { INTEGRATION_MAINTENANCE_STATUS_OPTIONS } from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import "../../../_styles/cK_setup_session_integrations/ck_setup_integration_fields/cK_stp_integ_fld.css";

const EMPTY_MAINTENANCE = {
  status: "",
  startsAt: "",
  endsAt: "",
  notes: "",
};

const toDateInputValue = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

const CK_stp_integ_fld_scheduledMaintenances = ({ states, handlers }) => {
  const items = states.values?.scheduledMaintenances ?? [];
  const isEditOpen = Boolean(states.isEditOpen);
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <section className="cK_stp_integ_fld cK_stp_integ_fld--scheduledMaintenances">
      <div className="cK_stp_integ_fld__cardHead">
        <h5 className="cK_stp_integ_fld__cardTitle">Scheduled maintenances</h5>
        {isEditOpen ? (
          <button
            type="button"
            className="cK_stp_integ_fld__ghostBtn"
            onClick={() =>
              handlers.onChange?.("scheduledMaintenances", [
                ...items,
                { ...EMPTY_MAINTENANCE },
              ])
            }>
            + Add window
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <p className="cK_stp_integ_fld__empty">No maintenance windows yet.</p>
      ) : (
        items.map((item, index) => (
          <div key={`maintenance-${index}`} className="cK_stp_integ_fld__card">
            {isEditOpen ? (
              <>
                <div className="cK_stp_integ_fld__cardHead">
                  <h5 className="cK_stp_integ_fld__cardTitle">
                    Window {index + 1}
                  </h5>
                  <button
                    type="button"
                    className="cK_stp_integ_fld__ghostBtn cK_stp_integ_fld__ghostBtn_danger"
                    onClick={() =>
                      handlers.onChange?.(
                        "scheduledMaintenances",
                        items.filter((_, i) => i !== index),
                      )
                    }>
                    Remove
                  </button>
                </div>

                <Select_static
                  labelProps={{ isActive: true, message: "Status" }}
                  options={INTEGRATION_MAINTENANCE_STATUS_OPTIONS}
                  placeholder="Pick one…"
                  value={item?.status ?? ""}
                  onChange={set(`scheduledMaintenances.${index}.status`)}
                />

                <div className="cK_stp_integ_fld__row">
                  <Input_date
                    labelProps={{ isActive: true, message: "Starts on" }}
                    value={toDateInputValue(item?.startsAt)}
                    onChange={set(`scheduledMaintenances.${index}.startsAt`)}
                  />
                  <Input_date
                    labelProps={{ isActive: true, message: "Ends on" }}
                    value={toDateInputValue(item?.endsAt)}
                    onChange={set(`scheduledMaintenances.${index}.endsAt`)}
                  />
                </div>

                <Input_textArea
                  labelProps={{ isActive: true, message: "Notes" }}
                  rows={2}
                  value={item?.notes ?? ""}
                  onChange={set(`scheduledMaintenances.${index}.notes`)}
                  maxLength={300}
                  lengthProps={{ isActive: true }}
                />
              </>
            ) : (
              <>
                <Select_static
                  disabled
                  labelProps={{ isActive: true, message: "Status" }}
                  options={INTEGRATION_MAINTENANCE_STATUS_OPTIONS}
                  value={item?.status ?? ""}
                />
                <div className="cK_stp_integ_fld__row">
                  <Input_date
                    disabled
                    labelProps={{ isActive: true, message: "Starts on" }}
                    value={toDateInputValue(item?.startsAt)}
                  />
                  <Input_date
                    disabled
                    labelProps={{ isActive: true, message: "Ends on" }}
                    value={toDateInputValue(item?.endsAt)}
                  />
                </div>
              </>
            )}
          </div>
        ))
      )}
    </section>
  );
};

export default CK_stp_integ_fld_scheduledMaintenances;
