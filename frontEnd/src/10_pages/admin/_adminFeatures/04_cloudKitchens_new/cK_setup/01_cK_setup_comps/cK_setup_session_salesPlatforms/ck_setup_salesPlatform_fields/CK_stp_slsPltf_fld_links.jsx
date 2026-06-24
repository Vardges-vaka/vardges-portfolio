import { useMemo } from "react";
import {
  Input_image,
  Input_text,
  Input_url,
} from "../../../../../../../../01_components/_components.index.js";
import {
  getSalesPlatformNameInitials,
  hasSalesPlatformLogoUrl,
} from "../../../02_cK_setup_hlpr/salesPlatformListRow_hlpr.js";
import { useSalesPlatformLogoReadUrl } from "../../../03_cK_setup_hooks/cK_setup_salesPlatforms_hooks/useSalesPlatformLogoReadUrl.js";
import "../../../_styles/cK_setup_session_salesPlatforms/ck_setup_salesPlatform_fields/cK_stp_slsPltf_fld.css";

const EMPTY_OTHER_LINK = { label: "", link: "" };

const CK_stp_slsPltf_fld_links = ({ salesPlatformId, states, handlers }) => {
  const links = states.values?.links ?? {};
  const otherLinks = links.other ?? [];
  const isEditOpen = Boolean(states.isEditOpen);
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  const { resolveLogoUrl } = useSalesPlatformLogoReadUrl(
    salesPlatformId,
    links.logoUrl,
    { enabled: Boolean(salesPlatformId && hasSalesPlatformLogoUrl({ links })) },
  );

  const logoPreviewUrl = useMemo(
    () => resolveLogoUrl(links.logoUrl),
    [links.logoUrl, resolveLogoUrl],
  );

  const logoFallbackInitials = getSalesPlatformNameInitials(states.values?.name ?? "");

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      handlers.onChange?.("links._pendingLogoFile", null);
      handlers.onChange?.("links.logoUrl", "");
      return;
    }

    handlers.onChange?.("links._pendingLogoFile", file);
    handlers.onChange?.("links.logoUrl", URL.createObjectURL(file));
  };

  return (
    <section className="cK_stp_slsPltf_fld cK_stp_slsPltf_fld_links">
      <div className="cK_stp_slsPltf_fld_links__layout">
        <div className="cK_stp_slsPltf_fld_links__logoCol">
          {isEditOpen ? (
            <Input_image
              labelProps={{ isActive: true, message: "Platform logo" }}
              hintsProps={{
                isActive: true,
                type: "hint",
                message: links.logoUrl
                  ? "Upload a new image to replace the current logo."
                  : "Upload the platform logo.",
              }}
              showPreviewPanel
              previewPanelLabel="Logo preview"
              previewUrl={logoPreviewUrl}
              simulateUpload
              onChange={handleLogoChange}
            />
          ) : (
            <div className="cK_stp_slsPltf_fld_links__logoVisual">
              {logoPreviewUrl ? (
                <img
                  className="cK_stp_slsPltf_fld_links__logoImg"
                  src={logoPreviewUrl}
                  alt={`${states.values?.name || "Platform"} logo`}
                />
              ) : (
                <span
                  className="cK_stp_slsPltf_fld_links__logoFallback"
                  aria-hidden="true">
                  {logoFallbackInitials}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="cK_stp_slsPltf_fld_links__fieldsCol">
          <Input_url
            labelProps={{ isActive: true, message: "Website URL" }}
            value={links.websiteUrl ?? ""}
            onChange={set("links.websiteUrl")}
            placeholder="https://…"
            readOnly={!isEditOpen}
            hintsProps={{ isActive: isEditOpen }}
          />

          <Input_url
            labelProps={{ isActive: true, message: "Partner portal URL" }}
            value={links.partnerPortalUrl ?? ""}
            onChange={set("links.partnerPortalUrl")}
            placeholder="https://…"
            readOnly={!isEditOpen}
            hintsProps={{ isActive: isEditOpen }}
          />

          <div className="cK_stp_slsPltf_fld__list">
            <div className="cK_stp_slsPltf_fld__cardHead">
              <h5 className="cK_stp_slsPltf_fld__cardTitle">Other links</h5>
              {isEditOpen ? (
                <button
                  type="button"
                  className="cK_stp_slsPltf_fld__ghostBtn"
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
              <p className="cK_stp_slsPltf_fld__empty">No extra links yet.</p>
            ) : (
              otherLinks.map((item, index) => (
                <div
                  key={`other-link-${index}`}
                  className="cK_stp_slsPltf_fld__card">
                  {isEditOpen ? (
                    <>
                      <div className="cK_stp_slsPltf_fld__cardHead">
                        <h5 className="cK_stp_slsPltf_fld__cardTitle">
                          Link {index + 1}
                        </h5>
                        <button
                          type="button"
                          className="cK_stp_slsPltf_fld__ghostBtn cK_stp_slsPltf_fld__ghostBtn_danger"
                          onClick={() =>
                            handlers.onChange?.(
                              "links.other",
                              otherLinks.filter((_, i) => i !== index),
                            )
                          }>
                          Remove
                        </button>
                      </div>

                      <div className="cK_stp_slsPltf_fld__row">
                        <Input_text
                          labelProps={{ isActive: true, message: "Label" }}
                          value={item?.label ?? ""}
                          onChange={set(`links.other.${index}.label`)}
                          placeholder="e.g. Help centre"
                        />
                        <Input_url
                          labelProps={{ isActive: true, message: "URL" }}
                          value={item?.link ?? ""}
                          onChange={set(`links.other.${index}.link`)}
                          placeholder="https://…"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="cK_stp_slsPltf_fld_links__readRow">
                      <span className="cK_stp_slsPltf_fld_links__readLabel">
                        {item?.label?.trim?.() || `Link ${index + 1}`}
                      </span>
                      <Input_url
                        readOnly
                        hintsProps={{ isActive: false }}
                        value={item?.link ?? ""}
                        sizeType="sm"
                      />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CK_stp_slsPltf_fld_links;
