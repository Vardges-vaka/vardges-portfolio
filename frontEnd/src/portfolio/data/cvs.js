import { pdfByName } from "../lib/media.js";

/**
 * Downloadable CVs. Files live in src/portfolio/media/ (CV_tech.pdf, Cv_Bar.pdf,
 * Cv_Both.pdf) and resolve at build time. `track` drives which CV is highlighted
 * on each page.
 */
export const CVS = {
  tech: { track: "tech", file: pdfByName("CV_tech"), filename: "Vardges-Petrosyan-Tech-CV.pdf" },
  bar: { track: "bar", file: pdfByName("Cv_Bar"), filename: "Vardges-Petrosyan-Hospitality-CV.pdf" },
  both: { track: "both", file: pdfByName("Cv_Both"), filename: "Vardges-Petrosyan-CV.pdf" },
};
