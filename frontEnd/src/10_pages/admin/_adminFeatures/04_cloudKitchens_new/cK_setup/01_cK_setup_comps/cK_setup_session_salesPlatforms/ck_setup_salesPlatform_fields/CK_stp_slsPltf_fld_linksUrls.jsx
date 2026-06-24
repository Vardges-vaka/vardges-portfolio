import { Input_url } from "../../../../../../../../01_components/_components.index.js";
import "../../../_styles/cK_setup_session_salesPlatforms/ck_setup_salesPlatform_fields/cK_stp_slsPltf_fld.css";

const CK_stp_slsPltf_fld_linksUrls = ({ states, handlers }) => {
  const links = states.values?.links ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <section className="cK_stp_slsPltf_fld cK_stp_slsPltf_fld_linksUrls">
      <Input_url
        labelProps={{ isActive: true, message: "Website URL" }}
        value={links.websiteUrl ?? ""}
        onChange={set("links.websiteUrl")}
        placeholder="https://…"
      />

      <Input_url
        labelProps={{ isActive: true, message: "Partner portal URL" }}
        value={links.partnerPortalUrl ?? ""}
        onChange={set("links.partnerPortalUrl")}
        placeholder="https://…"
      />
    </section>
  );
};

export default CK_stp_slsPltf_fld_linksUrls;
