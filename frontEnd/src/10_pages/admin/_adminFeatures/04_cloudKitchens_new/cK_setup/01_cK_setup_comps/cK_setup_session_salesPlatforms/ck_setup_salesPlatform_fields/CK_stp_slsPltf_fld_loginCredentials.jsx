const CK_stp_slsPltf_fld_loginCredentials = ({ states }) => {
  const count = (states.values?.loginCredentials ?? []).length;
  return (
    <section className="cK_setup_form_section">
      <p className="cK_setup_form_muted">
        {count} credential record{count === 1 ? "" : "s"} on file. Full
        credential editor coming soon.
      </p>
    </section>
  );
};

export default CK_stp_slsPltf_fld_loginCredentials;
