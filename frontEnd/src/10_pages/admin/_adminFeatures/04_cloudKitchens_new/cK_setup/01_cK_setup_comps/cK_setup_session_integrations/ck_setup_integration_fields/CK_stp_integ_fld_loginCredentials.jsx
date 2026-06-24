import { useCallback, useEffect, useState } from "react";
import {
  Input_email,
  Input_password,
  Input_text,
  Input_textArea,
  Input_tel,
  Select_static,
  Toggler,
  Modal,
} from "../../../../../../../../01_components/_components.index.js";
import {
  buildLoginCredentialGridRows,
  cloneLoginCredential,
  DFLT_INTEGRATION_LOGIN_CREDENTIAL,
  duplicateLoginCredential,
  getIntegrationPortalUrl,
  getLoginCredentialCardTitle,
  getLoginCredentialGridMeta,
  LOGIN_CREDENTIALS_PER_ROW,
} from "../../../02_cK_setup_hlpr/integrationLoginCredentials_hlpr.js";
import CK_stp_integ_fld_loginCredentialCard from "./CK_stp_integ_fld_loginCredentialCard.jsx";
import CK_stp_integ_fld_loginCredentialControlsCard from "./CK_stp_integ_fld_loginCredentialControlsCard.jsx";
import CK_stp_integ_fld_loginCredentialEdit from "./CK_stp_integ_fld_loginCredentialEdit.jsx";
import CK_stp_integ_fld_loginCredentialZoomModal from "./CK_stp_integ_fld_loginCredentialZoomModal.jsx";
import "../../../_styles/cK_setup_session_integrations/ck_setup_integration_fields/cK_stp_integ_fld.css";
import "../../../_styles/cK_setup_session_integrations/ck_setup_integration_fields/cK_stp_integ_fld_loginCredentials.css";

const LOGIN_TYPE_OPTIONS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
];

const CK_stp_integ_fld_loginCredentials = ({ states, handlers }) => {
  const credentials = states.values?.loginCredentials ?? [];
  const isGlobalEdit = Boolean(states.isGlobalEdit);
  const isSaving = Boolean(states.isSaving);
  const portalUrl = getIntegrationPortalUrl(states.values);

  const [zoomIndex, setZoomIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [duplicateIndex, setDuplicateIndex] = useState(null);
  const [editSnapshot, setEditSnapshot] = useState(null);
  const [isNewCredential, setIsNewCredential] = useState(false);
  const [visibleRows, setVisibleRows] = useState(1);
  const [showAllCredentials, setShowAllCredentials] = useState(false);

  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);
  const setBool = (name) => (e) => handlers.onChange?.(name, e.target.checked);

  const closeEditor = useCallback(() => {
    setEditingIndex(null);
    setEditSnapshot(null);
    setIsNewCredential(false);
  }, []);

  const handleStartEdit = useCallback(
    (index) => {
      if (isSaving || editingIndex !== null) return;
      setEditSnapshot(cloneLoginCredential(credentials[index]));
      setEditingIndex(index);
      setIsNewCredential(false);
    },
    [credentials, editingIndex, isSaving],
  );

  const handleAddCredential = useCallback(() => {
    if (isSaving || editingIndex !== null) return;

    const nextCredentials = [...credentials, { ...DFLT_INTEGRATION_LOGIN_CREDENTIAL }];
    handlers.onChange?.("loginCredentials", nextCredentials);
    setEditSnapshot({ ...DFLT_INTEGRATION_LOGIN_CREDENTIAL });
    setEditingIndex(nextCredentials.length - 1);
    setIsNewCredential(true);
  }, [credentials, editingIndex, handlers, isSaving]);

  useEffect(() => {
    if (showAllCredentials) return;

    const minimumRows = Math.max(
      1,
      Math.ceil(credentials.length / LOGIN_CREDENTIALS_PER_ROW) || 1,
    );

    if (visibleRows > minimumRows) {
      setVisibleRows(minimumRows);
    }
  }, [credentials.length, showAllCredentials, visibleRows]);

  const gridMeta = getLoginCredentialGridMeta({
    total: credentials.length,
    visibleRows,
    showAll: showAllCredentials,
  });

  const gridRows = buildLoginCredentialGridRows({
    total: credentials.length,
    visibleRows,
    showAll: showAllCredentials,
  });

  const cardsDisabled = isSaving || editingIndex !== null;

  const handleShowMore = useCallback(() => {
    setShowAllCredentials(false);
    setVisibleRows((rows) => rows + 1);
  }, []);

  const handleShowAll = useCallback(() => {
    setShowAllCredentials(true);
  }, []);

  const handleShowLess = useCallback(() => {
    if (showAllCredentials) {
      setShowAllCredentials(false);
      setVisibleRows(1);
      return;
    }

    setVisibleRows((rows) => Math.max(1, rows - 1));
  }, [showAllCredentials]);

  const handleCancelEdit = useCallback(() => {
    if (isNewCredential && editingIndex !== null) {
      handlers.onChange?.(
        "loginCredentials",
        credentials.filter((_, index) => index !== editingIndex),
      );
    } else if (editSnapshot && editingIndex !== null) {
      handlers.onChange?.(
        "loginCredentials",
        credentials.map((item, index) =>
          index === editingIndex ? editSnapshot : item,
        ),
      );
    }

    closeEditor();
  }, [
    closeEditor,
    credentials,
    editSnapshot,
    editingIndex,
    handlers,
    isNewCredential,
  ]);

  const handleSaveCredential = useCallback(async () => {
    if (editingIndex === null) return;

    const res = await handlers.onLoginCredentialsPersist?.(
      states.values?.loginCredentials ?? credentials,
    );

    if (res?.success) {
      closeEditor();
    }
  }, [closeEditor, credentials, editingIndex, handlers, states.values?.loginCredentials]);

  const handleConfirmDelete = useCallback(async () => {
    if (deleteIndex === null) return;

    const nextCredentials = credentials.filter((_, index) => index !== deleteIndex);
    const res = await handlers.onLoginCredentialsPersist?.(nextCredentials);

    if (res?.success) {
      setDeleteIndex(null);
      if (editingIndex === deleteIndex) closeEditor();
    }
  }, [closeEditor, credentials, deleteIndex, editingIndex, handlers]);

  const handleConfirmDuplicate = useCallback(async () => {
    if (duplicateIndex === null) return;

    const source = credentials[duplicateIndex];
    if (!source) {
      setDuplicateIndex(null);
      return;
    }

    const duplicate = duplicateLoginCredential(source);
    const nextCredentials = [
      ...credentials.slice(0, duplicateIndex + 1),
      duplicate,
      ...credentials.slice(duplicateIndex + 1),
    ];

    const res = await handlers.onLoginCredentialsPersist?.(nextCredentials);

    if (res?.success) {
      setDuplicateIndex(null);
    }
  }, [credentials, duplicateIndex, handlers]);

  if (isGlobalEdit) {
    return (
      <section className="cK_stp_slsPltf_fld">
        {credentials.length === 0 ? (
          <p className="cK_stp_integ_fld__empty">No credentials saved yet.</p>
        ) : (
          <div className="cK_stp_integ_fld__list">
            {credentials.map((item, index) => (
              <div key={`credential-${index}`} className="cK_stp_integ_fld__card">
                <div className="cK_stp_integ_fld__cardHead">
                  <h5 className="cK_stp_integ_fld__cardTitle">
                    {getLoginCredentialCardTitle(item, index)}
                  </h5>
                  <button
                    type="button"
                    className="cK_stp_integ_fld__ghostBtn cK_stp_integ_fld__ghostBtn_danger"
                    onClick={() =>
                      handlers.onChange?.(
                        "loginCredentials",
                        credentials.filter((_, i) => i !== index),
                      )
                    }
                    disabled={isSaving}>
                    Remove
                  </button>
                </div>

                <Input_text
                  labelProps={{ isActive: true, message: "Label" }}
                  value={item?.label ?? ""}
                  onChange={set(`loginCredentials.${index}.label`)}
                  placeholder='e.g. "Vardges main"'
                />

                <div className="cK_stp_integ_fld__row">
                  <Input_text
                    labelProps={{ isActive: true, message: "Username" }}
                    value={item?.username ?? ""}
                    onChange={set(`loginCredentials.${index}.username`)}
                    placeholder="Username"
                  />
                  <Input_password
                    kind="AuthLogIn"
                    labelProps={{ isActive: true, message: "Password" }}
                    hintsProps={{ isActive: false }}
                    value={item?.password ?? ""}
                    onChange={set(`loginCredentials.${index}.password`)}
                    placeholder="Password"
                  />
                </div>

                <div className="cK_stp_integ_fld__row">
                  <Input_email
                    labelProps={{ isActive: true, message: "Login email" }}
                    value={item?.email ?? ""}
                    onChange={set(`loginCredentials.${index}.email`)}
                    placeholder="login@email.com"
                  />
                  <Input_tel
                    kind="phone"
                    labelProps={{ isActive: true, message: "Login phone" }}
                    hintsProps={{ isActive: false }}
                    value={item?.phone ?? ""}
                    onChange={set(`loginCredentials.${index}.phone`)}
                  />
                </div>

                <div className="cK_stp_integ_fld__row">
                  <Select_static
                    labelProps={{ isActive: true, message: "Login type" }}
                    options={LOGIN_TYPE_OPTIONS}
                    placeholder="Pick login type…"
                    value={item?.loginType ?? ""}
                    onChange={set(`loginCredentials.${index}.loginType`)}
                  />
                  <Input_text
                    labelProps={{ isActive: true, message: "Belongs to" }}
                    value={item?.belongsTo?.name ?? ""}
                    onChange={set(`loginCredentials.${index}.belongsTo.name`)}
                    placeholder="Person or role name"
                  />
                </div>

                <div className="cK_stp_integ_fld__row cK_stp_integ_fld__row--single">
                  <Toggler
                    labelProps={{
                      isActive: true,
                      message: "Requires OTP",
                      position: "inline",
                      inlinePosition: "after",
                    }}
                    checked={Boolean(item?.requiresOtp)}
                    onChange={setBool(`loginCredentials.${index}.requiresOtp`)}
                  />
                </div>

                <Input_textArea
                  labelProps={{ isActive: true, message: "Notes" }}
                  rows={2}
                  value={item?.notes ?? ""}
                  onChange={set(`loginCredentials.${index}.notes`)}
                  placeholder="Access notes, 2FA details, etc."
                />
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  const zoomItem = zoomIndex === null ? null : credentials[zoomIndex];
  const deleteItem = deleteIndex === null ? null : credentials[deleteIndex];
  const duplicateItem = duplicateIndex === null ? null : credentials[duplicateIndex];
  const editingItem = editingIndex === null ? null : credentials[editingIndex];

  const renderCredentialCard = (index) => {
    if (editingIndex === index) return null;

    const item = credentials[index];
    if (!item) return null;

    return (
      <CK_stp_integ_fld_loginCredentialCard
        key={`credential-card-${index}`}
        item={item}
        index={index}
        disabled={cardsDisabled}
        onZoom={() => setZoomIndex(index)}
        onUpdate={() => handleStartEdit(index)}
        onDuplicate={() => setDuplicateIndex(index)}
        onDelete={() => setDeleteIndex(index)}
      />
    );
  };

  return (
    <section className="cK_stp_integ_fld_loginCredentials">
      {editingIndex !== null && editingItem ? (
        <article
          className={[
            "cK_stp_integ_fld_loginCredentials__card",
            "cK_stp_integ_fld_loginCredentials__card--editing",
          ].join(" ")}>
          <div className="cK_stp_integ_fld_loginCredentials__cardHead">
            <h5 className="cK_stp_integ_fld_loginCredentials__cardTitle">
              {isNewCredential
                ? "New credential"
                : `Update ${getLoginCredentialCardTitle(editingItem, editingIndex)}`}
            </h5>
          </div>
          <CK_stp_integ_fld_loginCredentialEdit
            index={editingIndex}
            item={editingItem}
            disabled={isSaving}
            onChange={handlers.onChange}
            onSave={handleSaveCredential}
            onCancel={handleCancelEdit}
            isSaving={isSaving}
          />
        </article>
      ) : null}

      <div className="cK_stp_integ_fld_loginCredentials__grid">
        {gridRows.map((row, rowIndex) => (
          <div
            key={`credential-row-${rowIndex}`}
            className="cK_stp_integ_fld_loginCredentials__gridRow">
            {row.credentialIndices.map((index) => renderCredentialCard(index))}
            {row.showControls ? (
              <CK_stp_integ_fld_loginCredentialControlsCard
                total={credentials.length}
                disabled={cardsDisabled}
                canShowMore={gridMeta.canShowMore}
                canShowAll={gridMeta.canShowAll}
                canShowLess={gridMeta.canShowLess}
                onAdd={handleAddCredential}
                onShowMore={handleShowMore}
                onShowAll={handleShowAll}
                onShowLess={handleShowLess}
              />
            ) : null}
          </div>
        ))}
      </div>

      <CK_stp_integ_fld_loginCredentialZoomModal
        isOpen={zoomIndex !== null}
        item={zoomItem}
        index={zoomIndex ?? 0}
        portalUrl={portalUrl}
        onClose={() => setZoomIndex(null)}
      />

      <Modal
        isOpen={deleteIndex !== null}
        title="Delete login credential"
        onCancel={() => setDeleteIndex(null)}
        onConfirm={handleConfirmDelete}
        withFooter
        danger
        footerStates={{
          isConfirmDisabled: isSaving,
          isCancelDisabled: isSaving,
        }}
        footerLabels={{
          cancelLabel: "Cancel",
          confirmLabel: isSaving ? "Deleting…" : "Delete credential",
        }}>
        <p className="cK_stp_integ_fld__empty">
          Delete{" "}
          <strong>
            {deleteItem
              ? getLoginCredentialCardTitle(deleteItem, deleteIndex ?? 0)
              : "this credential"}
          </strong>
          ? This cannot be undone.
        </p>
      </Modal>

      <Modal
        isOpen={duplicateIndex !== null}
        title="Duplicate login credential"
        onCancel={() => setDuplicateIndex(null)}
        onConfirm={handleConfirmDuplicate}
        withFooter
        footerStates={{
          isConfirmDisabled: isSaving,
          isCancelDisabled: isSaving,
        }}
        footerLabels={{
          cancelLabel: "Cancel",
          confirmLabel: isSaving ? "Duplicating…" : "Duplicate credential",
        }}>
        <p className="cK_stp_integ_fld__empty">
          Duplicate{" "}
          <strong>
            {duplicateItem
              ? getLoginCredentialCardTitle(duplicateItem, duplicateIndex ?? 0)
              : "this credential"}
          </strong>
          ? A copy will be inserted right after it
          {duplicateItem?.label?.trim?.()
            ? ` as "${duplicateLoginCredential(duplicateItem).label}"`
            : ""}
          .
        </p>
      </Modal>
    </section>
  );
};

export default CK_stp_integ_fld_loginCredentials;
