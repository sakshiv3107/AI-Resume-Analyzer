import { extractTextFromPDF } from "./pdfService";
import { extractTextFromDOCX } from "./docxService";

const DOCX_MIME =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

/**
 * Dispatcher: extracts plain text from a resume file regardless of format.
 * Supports PDF and modern DOCX only.
 * @param {File} file
 * @returns {Promise<string>}
 */
export const extractResumeText = async (file) => {
  if (file.type === "application/pdf") {
    return extractTextFromPDF(file);
  }
  if (file.type === DOCX_MIME) {
    return extractTextFromDOCX(file);
  }
  throw new Error("Unsupported file type");
};
