import { Input_date } from "../../../../../../../../01_components/_components.index.js";
import "../../../_styles/cK_setup_session_integrations/ck_setup_integration_fields/cK_stp_integ_fld.css";

const toDateInputValue = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

const CK_stp_integ_fld_lifecycle = ({ states, handlers }) => {
  const lifecycle = states.values?.lifecycle ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <section className="cK_stp_integ_fld cK_stp_integ_fld--lifecycle">
      <div className="cK_stp_integ_fld__row cK_stp_integ_fld__row--lifecycleDates">
        <Input_date
          sizeType="sm"
          labelProps={{ isActive: true, message: "Started on" }}
          value={toDateInputValue(lifecycle.startAt)}
          onChange={set("lifecycle.startAt")}
        />
        <Input_date
          sizeType="sm"
          labelProps={{ isActive: true, message: "Restarted on" }}
          value={toDateInputValue(lifecycle.restartedAt)}
          onChange={set("lifecycle.restartedAt")}
        />
        <Input_date
          sizeType="sm"
          labelProps={{ isActive: true, message: "Ended on" }}
          value={toDateInputValue(lifecycle.endAt)}
          onChange={set("lifecycle.endAt")}
        />
      </div>
    </section>
  );
};

export default CK_stp_integ_fld_lifecycle;
