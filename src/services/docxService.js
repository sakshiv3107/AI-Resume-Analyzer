import mammoth from "mammoth";

/**
 * Extract plain text from a .docx file using mammoth.
 * @param {File} file
 * @returns {Promise<string>}
 */
export const extractTextFromDOCX = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
  } catch (error) {
    console.error("DOCX Extraction Error:", error);
    throw error;
  }
};
