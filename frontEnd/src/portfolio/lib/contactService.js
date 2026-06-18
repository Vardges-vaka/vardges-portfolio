/**
 * contactService — the single place the contact form talks to the outside world.
 *
 * `submitContact` is currently SIMULATED. Wire it to the real endpoint when ready
 * (the backend scaffold exposes `POST /api/public/contact/message`, or use a
 * service like Formspree / Resend). The honeypot + validation already happen in
 * the form; this just delivers the payload and returns `{ success }`.
 */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email) => EMAIL_RE.test(String(email || "").trim());

export const submitContact = async (payload) => {
  // --- replace with the real API call (POST → { success, message, data }) ---
  // e.g. const res = await fetch("/api/public/contact/message", {
  //   method: "POST", headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // }).then((r) => r.json());
  // return { success: !!res?.success };
  console.info("[contact] payload ready for backend:", payload);
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { success: true };
  // -------------------------------------------------------------------------
};
