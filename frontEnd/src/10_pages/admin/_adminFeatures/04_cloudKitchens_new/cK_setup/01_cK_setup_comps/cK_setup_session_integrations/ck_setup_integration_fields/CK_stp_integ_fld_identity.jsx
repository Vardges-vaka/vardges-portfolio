import { useState } from "react";
import {
  Input_text,
  Input_textArea,
  Select_static,
  Input_date,
  Input_url,
} from "../../../../../../../../01_components/_components.index.js";
import {
  INTEGRATION_KINDS,
  INTEGRATION_STATUSES,
} from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import "../../../_styles/cK_setup_session_integrations/ck_setup_integration_fields/cK_stp_integ_fld.css";

const EMPTY_OTHER_LINK = { label: "", url: "" };

const toDateInputValue = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

const IdentityLifecycleBlock = ({ lifecycle = {}, readOnly, setField }) => (
  <div className="cK_stp_integ_fld__subsection">
    <div className="cK_stp_integ_fld__row cK_stp_integ_fld__row--lifecycleDates">
      <Input_date
        sizeType="sm"
        labelProps={{ isActive: true, message: "Started on" }}
        value={toDateInputValue(lifecycle.startAt)}
        onChange={setField("lifecycle.startAt")}
        readOnly={readOnly}
      />
      <Input_date
        sizeType="sm"
        labelProps={{ isActive: true, message: "Restarted on" }}
        value={toDateInputValue(lifecycle.restartedAt)}
        onChange={setField("lifecycle.restartedAt")}
        readOnly={readOnly}
      />
      <Input_date
        sizeType="sm"
        labelProps={{ isActive: true, message: "Ended on" }}
        value={toDateInputValue(lifecycle.endAt)}
        onChange={setField("lifecycle.endAt")}
        readOnly={readOnly}
      />
    </div>
  </div>
);

const IdentityLinksBlock = ({ links = {}, readOnly, setField, onPatch }) => {
  const otherLinks = links.other ?? [];

  return (
    <div className="cK_stp_integ_fld__subsection">
      <Input_url
        labelProps={{ isActive: true, message: "Website URL" }}
        value={links.websiteUrl ?? ""}
        onChange={setField("links.websiteUrl")}
        placeholder="https://…"
        readOnly={readOnly}
        hintsProps={{ isActive: !readOnly }}
      />

      <Input_url
        labelProps={{ isActive: true, message: "Portal URL" }}
        value={links.portalUrl ?? ""}
        onChange={setField("links.portalUrl")}
        placeholder="https://…"
        readOnly={readOnly}
        hintsProps={{ isActive: !readOnly }}
      />

      <div className="cK_stp_integ_fld__list">
        <div className="cK_stp_integ_fld__cardHead">
          {!readOnly ? (
            <button
              type="button"
              className="cK_stp_integ_fld__ghostBtn"
              onClick={() =>
                onPatch("links.other", [...otherLinks, { ...EMPTY_OTHER_LINK }])
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
              {!readOnly ? (
                <>
                  <div className="cK_stp_integ_fld__cardHead">
                    <h5 className="cK_stp_integ_fld__cardTitle">
                      Link {index + 1}
                    </h5>
                    <button
                      type="button"
                      className="cK_stp_integ_fld__ghostBtn cK_stp_integ_fld__ghostBtn_danger"
                      onClick={() =>
                        onPatch(
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
                      onChange={setField(`links.other.${index}.label`)}
                      placeholder="e.g. Help centre"
                      readOnly={readOnly}
                    />
                    <Input_url
                      labelProps={{ isActive: true, message: "URL" }}
                      value={item?.url ?? ""}
                      onChange={setField(`links.other.${index}.url`)}
                      placeholder="https://…"
                      readOnly={readOnly}
                    />
                  </div>
                </>
              ) : (
                <Input_url
                  readOnly
                  labelProps={{
                    isActive: true,
                    message: item?.label?.trim?.() || `Link ${index + 1}`,
                  }}
                  hintsProps={{ isActive: false }}
                  value={item?.url ?? ""}
                  sizeType="sm"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const CK_stp_integ_fld_identity = ({ states, handlers, disabled = false }) => {
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  const v = states.values ?? {};
  const readOnly = Boolean(disabled);

  const patch = (name, value) => handlers.onChange?.(name, value);
  const setField = (name) => (e) => patch(name, e?.target?.value);

  return (
    <section className="cK_stp_integ_fld cK_stp_integ_fld--identity">
      <Input_text
        labelProps={{ isActive: true, message: "Label" }}
        value={v.accountLabel ?? ""}
        onChange={setField("accountLabel")}
        placeholder="e.g. Supy — Vkusno entity"
        maxLength={120}
        lengthProps={{ isActive: true }}
        readOnly={readOnly}
      />

      <Input_text
        required
        labelProps={{ isActive: true, message: "Provider" }}
        value={v.provider ?? ""}
        onChange={setField("provider")}
        placeholder="e.g. Supy, Sapaad, GrabTech"
        maxLength={80}
        lengthProps={{ isActive: true }}
        readOnly={readOnly}
      />

      <Input_textArea
        labelProps={{ isActive: true, message: "Description" }}
        rows={3}
        value={v.description ?? ""}
        onChange={setField("description")}
        placeholder="What this integration is used for"
        maxLength={500}
        readOnly={readOnly}
        lengthProps={{ isActive: true }}
      />

      {!isNotesOpen && (
        <button
          type="button"
          className="cK_stp_integ_fld__ghostBtn"
          onClick={() => setIsNotesOpen((open) => !open)}>
          {isNotesOpen ? "Hide notes" : "Show notes"}
        </button>
      )}

      {isNotesOpen ? (
        <>
          <Input_textArea
            labelProps={{ isActive: true, message: "Notes" }}
            rows={3}
            value={v.notes ?? ""}
            onChange={setField("notes")}
            placeholder="Internal notes about this integration"
            maxLength={1000}
            readOnly={readOnly}
            lengthProps={{ isActive: true }}
          />
          <button
            type="button"
            className="cK_stp_integ_fld__ghostBtn"
            onClick={() => setIsNotesOpen((open) => !open)}>
            {isNotesOpen ? "Hide notes" : "Show notes"}
          </button>
        </>
      ) : null}

      <div className="cK_stp_integ_fld__row">
        <Select_static
          optionsType="leftIcon"
          labelProps={{ isActive: true, message: "Kind" }}
          options={INTEGRATION_KINDS()}
          placeholder="Pick one…"
          value={v.kind ?? ""}
          onChange={setField("kind")}
          readOnly={readOnly}
        />
        <Select_static
          optionsType="leftIcon"
          labelProps={{ isActive: true, message: "Status" }}
          options={INTEGRATION_STATUSES()}
          placeholder="Pick one…"
          value={v.status ?? ""}
          onChange={setField("status")}
          readOnly={readOnly}
        />
      </div>

      <IdentityLifecycleBlock
        lifecycle={v.lifecycle}
        readOnly={readOnly}
        setField={setField}
      />

      <IdentityLinksBlock
        links={v.links}
        readOnly={readOnly}
        setField={setField}
        onPatch={patch}
      />
    </section>
  );
};

export default CK_stp_integ_fld_identity;
