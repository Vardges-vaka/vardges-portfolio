/**
 * response.util — the API response envelope.
 *
 * Mirrors the main vardges.me backend's shape EXACTLY so the two are consistent:
 *       { success: Boolean, message: String, payload: <data | null> }
 *
 * When you wire this into your real backend you can delete these helpers and call
 * your existing `validRespond` / `catch_errorHandler_cntrl` instead — the JSON
 * shape is already identical.
 */
export const respond = (res, { status = 200, success = true, message = "OK", payload = null }) =>
  res.status(status).json({ success, message, payload });

export const ok = (res, payload, message = "OK") => respond(res, { payload, message });
export const created = (res, payload, message = "Created") => respond(res, { status: 201, payload, message });
export const fail = (res, message = "Server error", status = 500) =>
  respond(res, { status, success: false, message, payload: null });

/**
 * wrap — an async controller wrapper so individual controllers never need
 * their own try/catch. Any thrown error becomes a clean `fail(...)`.
 * Swap this for your `catch_errorHandler_cntrl` when integrating.
 */
export const wrap = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    console.error("[portfolio-api]", err?.message || err);
    const status = err?.name === "ValidationError" ? 400 : err?.status || 500;
    fail(res, err?.message || "Server error", status);
  }
};
