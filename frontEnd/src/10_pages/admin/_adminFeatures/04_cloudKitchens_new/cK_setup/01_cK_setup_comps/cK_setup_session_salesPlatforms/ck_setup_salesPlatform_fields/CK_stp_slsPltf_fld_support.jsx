const CK_stp_slsPltf_fld_support = ({ states }) => {
  const count = (states.values?.support ?? []).length;
  return (
    <section className="cK_setup_form_section">
      <p className="cK_setup_form_muted">
        {count} support contact{count === 1 ? "" : "s"} on file. Full support
        editor coming soon.
      </p>
    </section>
  );
};

export default CK_stp_slsPltf_fld_support;
