import { GoogleGenAI } from "@google/genai";
import { callGeminiWithRetry } from "./geminiRetry";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

/**
 * Send a chat message to Gemini with full conversation history and resume grounding.
 *
 * @param {{
 *   resumeText: string,
 *   jobDescription: string,
 *   analysisSummary: string,
 *   conversationHistory: Array<{role: 'user'|'assistant', content: string}>,
 *   userMessage: string
 * }}
 * @returns {Promise<string>} The assistant's plain-text reply.
 */
export const sendChatMessage = async ({
  resumeText,
  jobDescription,
  analysisSummary,
  conversationHistory,
  userMessage,
}) => {
  const systemInstruction = `
You are a helpful, honest career coach having a conversation with a candidate about
their specific resume. You have access to their actual resume text, the job description
they're targeting (if any), and a summary of a prior AI analysis of their resume.

--------------------------------------------------
GROUNDING RULE (CRITICAL)
--------------------------------------------------
- Only reference facts, skills, projects, and experience that are actually present in
  the resume text below. Never invent details about the candidate's background.
- If asked something the resume doesn't contain enough information to answer, say so
  plainly rather than guessing or fabricating.
- You may give general career/resume advice (industry norms, formatting conventions,
  interview tips) even when it isn't drawn from their resume — that's expected and
  useful. Just don't claim something IS true of their specific resume/experience when
  it isn't.

--------------------------------------------------
TONE & FORMAT
--------------------------------------------------
Be direct and honest, like a supportive career coach — not falsely encouraging, not harsh.
If something is genuinely weak, say so clearly and explain why, then help them fix it.

Format your replies for a casual chat interface, not a document. Prefer short paragraphs
and occasional bullet points for lists of 3+ items. Avoid heavy markdown structure —
do not use "###" headings or emoji section markers. Use **bold** sparingly, only for
genuinely key terms. Keep most replies to 2-5 sentences unless the user asks for
something that truly requires more detail (like a full rewritten section). Never end
a response with a generic filler like "Feel free to ask anything else".
For any list (skills, tips, improvements, steps, missing keywords, etc.) use a
  bullet list. Each bullet must be SHORT — one crisp line, max two if truly needed.
- Use a relevant emoji at the start of each bullet or section heading to make the
  response easy to scan. Examples: ✅ 🔴 💡 🚀 📌 🛠️ 📄 🎯 ⚠️ ✨ 🔑

--------------------------------------------------
RESUME
--------------------------------------------------
${resumeText}

--------------------------------------------------
JOB DESCRIPTION
--------------------------------------------------
${jobDescription || "No job description was provided for this analysis."}

--------------------------------------------------
PRIOR ANALYSIS SUMMARY
--------------------------------------------------
${analysisSummary}

--------------------------------------------------

Answer the candidate's questions about their resume, their fit for the role, how to
improve specific parts, or general job-search/interview questions, using the grounding
rule above at all times.
`;

  // Map stored history to Gemini's multi-turn content format
  const historyContents = conversationHistory.map(({ role, content }) => ({
    role: role === "assistant" ? "model" : "user",
    parts: [{ text: content }],
  }));

  // Append the new user turn at the end
  const contents = [
    ...historyContents,
    { role: "user", parts: [{ text: userMessage }] },
  ];

  const response = await callGeminiWithRetry(() =>
    ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction,
      },
      thinkingConfig: {
        thinkingBudget: 0,
      },
    })
  );

  return response.text;
};
