import {
  Input_text,
  Input_url,
} from "../../../../../../../../01_components/_components.index.js";
import "../../../_styles/cK_setup_session_integrations/ck_setup_integration_fields/cK_stp_integ_fld.css";

const EMPTY_OTHER_LINK = { label: "", url: "" };

const CK_stp_integ_fld_links = ({ states, handlers }) => {
  const links = states.values?.links ?? {};
  const otherLinks = links.other ?? [];
  const isEditOpen = Boolean(states.isEditOpen);
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <section className="cK_stp_integ_fld cK_stp_integ_fld--links">
      <Input_url
        labelProps={{ isActive: true, message: "Website URL" }}
        value={links.websiteUrl ?? ""}
        onChange={set("links.websiteUrl")}
        placeholder="https://…"
        readOnly={!isEditOpen}
        hintsProps={{ isActive: isEditOpen }}
      />

      <Input_url
        labelProps={{ isActive: true, message: "Portal URL" }}
        value={links.portalUrl ?? ""}
        onChange={set("links.portalUrl")}
        placeholder="https://…"
        readOnly={!isEditOpen}
        hintsProps={{ isActive: isEditOpen }}
      />

      <div className="cK_stp_integ_fld__list">
        <div className="cK_stp_integ_fld__cardHead">
          <h5 className="cK_stp_integ_fld__cardTitle">Other links</h5>
          {isEditOpen ? (
            <button
              type="button"
              className="cK_stp_integ_fld__ghostBtn"
              onClick={() =>
                handlers.onChange?.("links.other", [
                  ...otherLinks,
                  { ...EMPTY_OTHER_LINK },
                ])
              }>
              + Add link
            </button>
          ) : null}
        </div>

        {otherLinks.length === 0 ? (
          <p className="cK_stp_integ_fld__empty">No extra links yet.</p>
        ) : (
          otherLinks.map((item, index) => (
            <div key={`other-link-${index}`} className="cK_stp_integ_fld__card">
              {isEditOpen ? (
                <>
                  <div className="cK_stp_integ_fld__cardHead">
                    <h5 className="cK_stp_integ_fld__cardTitle">
                      Link {index + 1}
                    </h5>
                    <button
                      type="button"
                      className="cK_stp_integ_fld__ghostBtn cK_stp_integ_fld__ghostBtn_danger"
                      onClick={() =>
                        handlers.onChange?.(
                          "links.other",
                          otherLinks.filter((_, i) => i !== index),
                        )
                      }>
                      Remove
                    </button>
                  </div>
                  <div className="cK_stp_integ_fld__row">
                    <Input_text
                      labelProps={{ isActive: true, message: "Label" }}
                      value={item?.label ?? ""}
                      onChange={set(`links.other.${index}.label`)}
                      placeholder="e.g. Help centre"
                    />
                    <Input_url
                      labelProps={{ isActive: true, message: "URL" }}
                      value={item?.url ?? ""}
                      onChange={set(`links.other.${index}.url`)}
                      placeholder="https://…"
                    />
                  </div>
                </>
              ) : (
                <div className="cK_stp_integ_fld__row">
                  <Input_text
                    readOnly
                    labelProps={{
                      isActive: true,
                      message: item?.label?.trim?.() || `Link ${index + 1}`,
                    }}
                    value={item?.label ?? ""}
                  />
                  <Input_url
                    readOnly
                    hintsProps={{ isActive: false }}
                    value={item?.url ?? ""}
                    sizeType="sm"
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CK_stp_integ_fld_links;
