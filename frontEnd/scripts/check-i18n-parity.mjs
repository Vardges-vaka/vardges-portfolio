// i18n parity check — flattens the key paths of the three extra locale files
// (ru/hy/ar) and verifies they are identical. Run after any i18n edit.
//   node scripts/check-i18n-parity.mjs
import ru from "../src/portfolio/i18n/extra/ru.js";
import hy from "../src/portfolio/i18n/extra/hy.js";
import ar from "../src/portfolio/i18n/extra/ar.js";

const flatten = (obj, prefix = "", out = []) => {
  if (Array.isArray(obj)) {
    out.push(prefix + "[]"); // treat arrays as a single leaf (order/length checked separately)
    return out;
  }
  if (obj && typeof obj === "object") {
    for (const k of Object.keys(obj)) flatten(obj[k], prefix ? `${prefix}.${k}` : k, out);
    return out;
  }
  out.push(prefix);
  return out;
};

const sets = {
  ru: new Set(flatten(ru)),
  hy: new Set(flatten(hy)),
  ar: new Set(flatten(ar)),
};

const ref = sets.ru;
let ok = true;
for (const lang of ["hy", "ar"]) {
  const s = sets[lang];
  const missing = [...ref].filter((k) => !s.has(k));
  const extra = [...s].filter((k) => !ref.has(k));
  if (missing.length || extra.length) {
    ok = false;
    console.error(`\n[${lang}] vs ru — DIVERGENT`);
    if (missing.length) console.error(`  missing in ${lang} (${missing.length}):\n   ` + missing.join("\n   "));
    if (extra.length) console.error(`  extra in ${lang} (${extra.length}):\n   ` + extra.join("\n   "));
  }
}

console.log(`\nKey counts → ru:${sets.ru.size}  hy:${sets.hy.size}  ar:${sets.ar.size}`);
if (ok && sets.ru.size === sets.hy.size && sets.hy.size === sets.ar.size) {
  console.log(`✅ i18n parity OK — ${sets.ru.size} keys in all three.`);
  process.exit(0);
} else {
  console.error(`❌ i18n parity FAILED.`);
  process.exit(1);
}
