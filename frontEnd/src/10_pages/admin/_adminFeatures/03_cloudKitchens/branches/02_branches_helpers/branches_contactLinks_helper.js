/** Build safe hrefs for contact channels (branch detail / map info). */

const digitsOnly = (s) => (s ? String(s).replace(/\D/g, "") : "");

export const hrefTel = (phone) => {
  if (!phone?.trim()) return null;
  return `tel:${digitsOnly(phone) || phone.trim()}`;
};

export const hrefWhatsApp = (phone) => {
  const d = digitsOnly(phone);
  if (!d) return null;
  return `https://wa.me/${d}`;
};

export const hrefTelegram = (telegram) => {
  if (!telegram?.trim()) return null;
  const t = telegram.trim();
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  const user = t.replace(/^@/, "");
  return user ? `https://t.me/${user}` : null;
};

export const hrefMailto = (email) => {
  if (!email?.trim()) return null;
  return `mailto:${email.trim()}`;
};

export const empty = (v) => v == null || v === "";
