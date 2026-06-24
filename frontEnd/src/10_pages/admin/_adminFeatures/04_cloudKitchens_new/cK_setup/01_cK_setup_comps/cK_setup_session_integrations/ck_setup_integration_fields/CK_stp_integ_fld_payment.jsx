import {
  Input_date,
  Input_number,
  Input_text,
  Input_textArea,
  Select_static,
} from "../../../../../../../../01_components/_components.index.js";
import {
  INTEGRATION_PAYMENT_CYCLE_OPTIONS,
  INTEGRATION_PAYMENT_METHOD_OPTIONS,
  INTEGRATION_PAYMENT_STATUS_OPTIONS,
} from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import {
  PAYMENT_STATUSES,
  PAYMENT_METHODS,
} from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import "../../../_styles/cK_setup_session_integrations/ck_setup_integration_fields/cK_stp_integ_fld.css";

const toDateInputValue = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

const CK_stp_integ_fld_payment = ({ states, handlers }) => {
  const payment = states.values?.payment ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);
  const PAYMENT_STATUSES_OPTIONS = PAYMENT_STATUSES();
  const PAYMENT_METHODS_OPTIONS = PAYMENT_METHODS();
  return (
    <section className="cK_stp_integ_fld cK_stp_integ_fld--payment">
      <div className="cK_stp_integ_fld__row">
        <Select_static
          labelProps={{ isActive: true, message: "Billing cycle" }}
          options={INTEGRATION_PAYMENT_CYCLE_OPTIONS}
          placeholder="Pick one…"
          value={payment.cycle ?? ""}
          onChange={set("payment.cycle")}
        />
        <Select_static
          optionsType="leftIcon"
          labelProps={{ isActive: true, message: "Payment status" }}
          options={PAYMENT_STATUSES_OPTIONS}
          placeholder="Pick one…"
          value={payment.status ?? ""}
          onChange={set("payment.status")}
        />
        <Select_static
          optionsType="leftIcon"
          labelProps={{ isActive: true, message: "Payment method" }}
          options={PAYMENT_METHODS_OPTIONS}
          placeholder="Pick one…"
          value={payment.method ?? ""}
          onChange={set("payment.method")}
        />
      </div>

      <div className="cK_stp_integ_fld__row">
        <Input_number
          labelProps={{ isActive: true, message: "Amount" }}
          value={payment.amount ?? ""}
          onChange={set("payment.amount")}
          placeholder="0"
          min={0}
          step="0.01"
        />
        <Input_text
          labelProps={{ isActive: true, message: "Currency" }}
          value={payment.currency ?? "AED"}
          leftIconProps={{
            isActive: true,
            type: "lucide",
            lucidIcon: "DollarSign",
          }}
          onChange={set("payment.currency")}
          placeholder="AED"
          maxLength={8}
        />
      </div>

      <div className="cK_stp_integ_fld__row">
        <Input_date
          labelProps={{ isActive: true, message: "Last paid on" }}
          value={toDateInputValue(payment.lastPaidOn)}
          onChange={set("payment.lastPaidOn")}
        />
        <Input_date
          labelProps={{ isActive: true, message: "Next due on" }}
          value={toDateInputValue(payment.nextDueOn)}
          onChange={set("payment.nextDueOn")}
        />
      </div>

      <Input_textArea
        labelProps={{ isActive: true, message: "Payment notes" }}
        rows={2}
        value={payment.notes ?? ""}
        onChange={set("payment.notes")}
        placeholder="Invoicing notes, PO references, etc."
        maxLength={500}
        lengthProps={{ isActive: true }}
      />
    </section>
  );
};

export default CK_stp_integ_fld_payment;

const sample = {
  cycle: "",
  amount: 0,
  currency: "AED",
  method: "",
  status: "",
  lastPaidOn: "",
  nextDueOn: "",
  notes: "",
};
