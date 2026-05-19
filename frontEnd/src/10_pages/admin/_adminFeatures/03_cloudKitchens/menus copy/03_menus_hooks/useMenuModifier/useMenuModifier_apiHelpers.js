/* ============================================================================
   useMenuModifier_apiHelpers — thin wrappers around the backend endpoints for
   Modifier documents. Mirrors useMenus_apiHelpers.js — the calls are
   placeholders today (return mock data) and should be wired to the real
   service when the backend is in place.

   Every helper resolves to { ok, data?, error? } so handlers can branch
   uniformly.
============================================================================ */

const wait = (ms = 200) => new Promise((r) => setTimeout(r, ms));

const useMenuModifier_apiHelpers = () => {
  // ---- READ ----
  const fetchOne = async (id) => {
    await wait();
    return { ok: true, data: { _id: id } };
  };

  const fetchAll = async ({ ownerType } = {}) => {
    await wait();
    return { ok: true, data: [], filters: { ownerType } };
  };

  // ---- CREATE ----
  const createDoc = async (payload) => {
    await wait();
    if (!payload?.ownerType) return { ok: false, error: "ownerType is required" };
    if (!payload?.label?.trim()) return { ok: false, error: "label is required" };
    // Real API would POST here.
    return { ok: true, data: { _id: `mock-${Date.now()}`, ...payload, isActive: true } };
  };

  // ---- UPDATE (per-field patch) ----
  const updateField = async ({ id, fieldPath, value }) => {
    await wait();
    if (!id || !fieldPath) return { ok: false, error: "id and fieldPath required" };
    return { ok: true, data: { id, fieldPath, value } };
  };

  // ---- UPDATE (whole document) ----
  const updateDoc = async ({ id, patch }) => {
    await wait();
    return { ok: true, data: { id, patch } };
  };

  // ---- DELETE ----
  const deleteDoc = async (id) => {
    await wait();
    return { ok: true, data: { id } };
  };

  return { apiHelpers: { fetchOne, fetchAll, createDoc, updateField, updateDoc, deleteDoc } };
};

export default useMenuModifier_apiHelpers;
