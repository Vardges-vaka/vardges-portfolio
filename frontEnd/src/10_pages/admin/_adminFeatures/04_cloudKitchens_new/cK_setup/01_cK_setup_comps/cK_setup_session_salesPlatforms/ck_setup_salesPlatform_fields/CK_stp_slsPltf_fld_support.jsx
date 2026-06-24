import { useCallback, useEffect, useState } from "react";
import {
  Input_email,
  Input_text,
  Input_tel,
  Input_workingHours,
  Modal,
} from "../../../../../../../../01_components/_components.index.js";
import {
  buildSupportContactGridRows,
  cloneSupportContact,
  DFLT_SALES_PLATFORM_SUPPORT_CONTACT,
  duplicateSupportContact,
  getSupportContactCardTitle,
  getSupportContactGridMeta,
  SUPPORT_CONTACTS_PER_ROW,
} from "../../../02_cK_setup_hlpr/salesPlatformSupportContacts_hlpr.js";
import CK_stp_slsPltf_fld_supportContactCard from "./CK_stp_slsPltf_fld_supportContactCard.jsx";
import CK_stp_slsPltf_fld_supportContactControlsCard from "./CK_stp_slsPltf_fld_supportContactControlsCard.jsx";
import CK_stp_slsPltf_fld_supportContactEdit from "./CK_stp_slsPltf_fld_supportContactEdit.jsx";
import CK_stp_slsPltf_fld_supportContactZoomModal from "./CK_stp_slsPltf_fld_supportContactZoomModal.jsx";
import "../../../_styles/cK_setup_session_salesPlatforms/ck_setup_salesPlatform_fields/cK_stp_slsPltf_fld.css";
import "../../../_styles/cK_setup_session_salesPlatforms/ck_setup_salesPlatform_fields/cK_stp_slsPltf_fld_supportContacts.css";

const CK_stp_slsPltf_fld_support = ({ states, handlers }) => {
  const supportItems = states.values?.support ?? [];
  const isGlobalEdit = Boolean(states.isGlobalEdit);
  const isSaving = Boolean(states.isSaving);

  const [zoomIndex, setZoomIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [duplicateIndex, setDuplicateIndex] = useState(null);
  const [editSnapshot, setEditSnapshot] = useState(null);
  const [isNewContact, setIsNewContact] = useState(false);
  const [visibleRows, setVisibleRows] = useState(1);
  const [showAllContacts, setShowAllContacts] = useState(false);

  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  const closeEditor = useCallback(() => {
    setEditingIndex(null);
    setEditSnapshot(null);
    setIsNewContact(false);
  }, []);

  const handleStartEdit = useCallback(
    (index) => {
      if (isSaving || editingIndex !== null) return;
      setEditSnapshot(cloneSupportContact(supportItems[index]));
      setEditingIndex(index);
      setIsNewContact(false);
    },
    [editingIndex, isSaving, supportItems],
  );

  const handleAddContact = useCallback(() => {
    if (isSaving || editingIndex !== null) return;

    const nextItems = [...supportItems, { ...DFLT_SALES_PLATFORM_SUPPORT_CONTACT }];
    handlers.onChange?.("support", nextItems);
    setEditSnapshot({ ...DFLT_SALES_PLATFORM_SUPPORT_CONTACT });
    setEditingIndex(nextItems.length - 1);
    setIsNewContact(true);
  }, [editingIndex, handlers, isSaving, supportItems]);

  useEffect(() => {
    if (showAllContacts) return;

    const minimumRows = Math.max(
      1,
      Math.ceil(supportItems.length / SUPPORT_CONTACTS_PER_ROW) || 1,
    );

    if (visibleRows > minimumRows) {
      setVisibleRows(minimumRows);
    }
  }, [showAllContacts, supportItems.length, visibleRows]);

  const gridMeta = getSupportContactGridMeta({
    total: supportItems.length,
    visibleRows,
    showAll: showAllContacts,
  });

  const gridRows = buildSupportContactGridRows({
    total: supportItems.length,
    visibleRows,
    showAll: showAllContacts,
  });

  const cardsDisabled = isSaving || editingIndex !== null;

  const handleShowMore = useCallback(() => {
    setShowAllContacts(false);
    setVisibleRows((rows) => rows + 1);
  }, []);

  const handleShowAll = useCallback(() => {
    setShowAllContacts(true);
  }, []);

  const handleShowLess = useCallback(() => {
    if (showAllContacts) {
      setShowAllContacts(false);
      setVisibleRows(1);
      return;
    }

    setVisibleRows((rows) => Math.max(1, rows - 1));
  }, [showAllContacts]);

  const handleCancelEdit = useCallback(() => {
    if (isNewContact && editingIndex !== null) {
      handlers.onChange?.(
        "support",
        supportItems.filter((_, index) => index !== editingIndex),
      );
    } else if (editSnapshot && editingIndex !== null) {
      handlers.onChange?.(
        "support",
        supportItems.map((item, index) =>
          index === editingIndex ? editSnapshot : item,
        ),
      );
    }

    closeEditor();
  }, [
    closeEditor,
    editSnapshot,
    editingIndex,
    handlers,
    isNewContact,
    supportItems,
  ]);

  const handleSaveContact = useCallback(async () => {
    if (editingIndex === null) return;

    const res = await handlers.onSupportContactsPersist?.(
      states.values?.support ?? supportItems,
    );

    if (res?.success) {
      closeEditor();
    }
  }, [closeEditor, editingIndex, handlers, states.values?.support, supportItems]);

  const handleConfirmDelete = useCallback(async () => {
    if (deleteIndex === null) return;

    const nextItems = supportItems.filter((_, index) => index !== deleteIndex);
    const res = await handlers.onSupportContactsPersist?.(nextItems);

    if (res?.success) {
      setDeleteIndex(null);
      if (editingIndex === deleteIndex) closeEditor();
    }
  }, [closeEditor, deleteIndex, editingIndex, handlers, supportItems]);

  const handleConfirmDuplicate = useCallback(async () => {
    if (duplicateIndex === null) return;

    const source = supportItems[duplicateIndex];
    if (!source) {
      setDuplicateIndex(null);
      return;
    }

    const duplicate = duplicateSupportContact(source);
    const nextItems = [
      ...supportItems.slice(0, duplicateIndex + 1),
      duplicate,
      ...supportItems.slice(duplicateIndex + 1),
    ];

    const res = await handlers.onSupportContactsPersist?.(nextItems);

    if (res?.success) {
      setDuplicateIndex(null);
    }
  }, [duplicateIndex, handlers, supportItems]);

  if (isGlobalEdit) {
    return (
      <section className="cK_stp_slsPltf_fld">
        {supportItems.length === 0 ? (
          <p className="cK_stp_slsPltf_fld__empty">No support contacts yet.</p>
        ) : (
          <div className="cK_stp_slsPltf_fld__list">
            {supportItems.map((item, index) => (
              <div key={`support-${index}`} className="cK_stp_slsPltf_fld__card">
                <div className="cK_stp_slsPltf_fld__cardHead">
                  <h5 className="cK_stp_slsPltf_fld__cardTitle">
                    {getSupportContactCardTitle(item, index)}
                  </h5>
                  <button
                    type="button"
                    className="cK_stp_slsPltf_fld__ghostBtn cK_stp_slsPltf_fld__ghostBtn_danger"
                    onClick={() =>
                      handlers.onChange?.(
                        "support",
                        supportItems.filter((_, i) => i !== index),
                      )
                    }
                    disabled={isSaving}>
                    Remove
                  </button>
                </div>

                <Input_text
                  labelProps={{ isActive: true, message: "Label" }}
                  value={item?.label ?? ""}
                  onChange={set(`support.${index}.label`)}
                  placeholder="e.g. general, billing, technical"
                />

                <div className="cK_stp_slsPltf_fld__row">
                  <Input_email
                    labelProps={{ isActive: true, message: "Email" }}
                    value={item?.email ?? ""}
                    onChange={set(`support.${index}.email`)}
                    placeholder="support@platform.com"
                  />
                  <Input_tel
                    kind="phone"
                    labelProps={{ isActive: true, message: "Phone" }}
                    hintsProps={{ isActive: false }}
                    value={item?.phone ?? ""}
                    onChange={set(`support.${index}.phone`)}
                  />
                </div>

                <div className="cK_stp_slsPltf_fld__row">
                  <Input_tel
                    kind="whatsApp"
                    labelProps={{ isActive: true, message: "WhatsApp" }}
                    hintsProps={{ isActive: false }}
                    value={item?.whatsApp ?? ""}
                    onChange={set(`support.${index}.whatsApp`)}
                  />
                  <Input_workingHours
                    labelProps={{ isActive: true, message: "Hours" }}
                    value={item?.hours ?? ""}
                    onChange={set(`support.${index}.hours`)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  const zoomItem = zoomIndex === null ? null : supportItems[zoomIndex];
  const deleteItem = deleteIndex === null ? null : supportItems[deleteIndex];
  const duplicateItem =
    duplicateIndex === null ? null : supportItems[duplicateIndex];
  const editingItem = editingIndex === null ? null : supportItems[editingIndex];

  const renderContactCard = (index) => {
    if (editingIndex === index) return null;

    const item = supportItems[index];
    if (!item) return null;

    return (
      <CK_stp_slsPltf_fld_supportContactCard
        key={`support-card-${index}`}
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
    <section className="cK_stp_slsPltf_fld_supportContacts">
      {editingIndex !== null && editingItem ? (
        <article
          className={[
            "cK_stp_slsPltf_fld_supportContacts__card",
            "cK_stp_slsPltf_fld_supportContacts__card--editing",
          ].join(" ")}>
          <div className="cK_stp_slsPltf_fld_supportContacts__cardHead">
            <h5 className="cK_stp_slsPltf_fld_supportContacts__cardTitle">
              {isNewContact
                ? "New support contact"
                : `Update ${getSupportContactCardTitle(editingItem, editingIndex)}`}
            </h5>
          </div>
          <CK_stp_slsPltf_fld_supportContactEdit
            index={editingIndex}
            item={editingItem}
            disabled={isSaving}
            onChange={handlers.onChange}
            onSave={handleSaveContact}
            onCancel={handleCancelEdit}
            isSaving={isSaving}
          />
        </article>
      ) : null}

      <div className="cK_stp_slsPltf_fld_supportContacts__grid">
        {gridRows.map((row, rowIndex) => (
          <div
            key={`support-row-${rowIndex}`}
            className="cK_stp_slsPltf_fld_supportContacts__gridRow">
            {row.contactIndices.map((index) => renderContactCard(index))}
            {row.showControls ? (
              <CK_stp_slsPltf_fld_supportContactControlsCard
                total={supportItems.length}
                disabled={cardsDisabled}
                canShowMore={gridMeta.canShowMore}
                canShowAll={gridMeta.canShowAll}
                canShowLess={gridMeta.canShowLess}
                onAdd={handleAddContact}
                onShowMore={handleShowMore}
                onShowAll={handleShowAll}
                onShowLess={handleShowLess}
              />
            ) : null}
          </div>
        ))}
      </div>

      <CK_stp_slsPltf_fld_supportContactZoomModal
        isOpen={zoomIndex !== null}
        item={zoomItem}
        index={zoomIndex ?? 0}
        onClose={() => setZoomIndex(null)}
      />

      <Modal
        isOpen={deleteIndex !== null}
        title="Delete support contact"
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
          confirmLabel: isSaving ? "Deleting…" : "Delete contact",
        }}>
        <p className="cK_stp_slsPltf_fld__empty">
          Delete{" "}
          <strong>
            {deleteItem
              ? getSupportContactCardTitle(deleteItem, deleteIndex ?? 0)
              : "this contact"}
          </strong>
          ? This cannot be undone.
        </p>
      </Modal>

      <Modal
        isOpen={duplicateIndex !== null}
        title="Duplicate support contact"
        onCancel={() => setDuplicateIndex(null)}
        onConfirm={handleConfirmDuplicate}
        withFooter
        footerStates={{
          isConfirmDisabled: isSaving,
          isCancelDisabled: isSaving,
        }}
        footerLabels={{
          cancelLabel: "Cancel",
          confirmLabel: isSaving ? "Duplicating…" : "Duplicate contact",
        }}>
        <p className="cK_stp_slsPltf_fld__empty">
          Duplicate{" "}
          <strong>
            {duplicateItem
              ? getSupportContactCardTitle(duplicateItem, duplicateIndex ?? 0)
              : "this contact"}
          </strong>
          ? A copy will be inserted right after it
          {duplicateItem?.label?.trim?.()
            ? ` as "${duplicateSupportContact(duplicateItem).label}"`
            : ""}
          .
        </p>
      </Modal>
    </section>
  );
};

export default CK_stp_slsPltf_fld_support;
