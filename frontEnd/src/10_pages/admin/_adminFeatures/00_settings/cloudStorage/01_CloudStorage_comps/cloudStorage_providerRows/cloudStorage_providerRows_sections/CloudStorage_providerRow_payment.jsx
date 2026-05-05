import "../../../_styles/CloudStorage_providerRow_payment.css";

const CloudStorage_providerRow_payment = ({ provider }) => {
  return (
    <>
      {" "}
      {provider.monitorLoading ? (
        <span className="payment-loading" aria-label="Loading payment" />
      ) : provider.paymentSummary?.hasData ? (
        <span className="payment-amount">{provider.paymentSummary.label}</span>
      ) : (
        <span className="payment-empty">--</span>
      )}
    </>
  );
};

export default CloudStorage_providerRow_payment;
