import { GoogleGenAI, Type } from "@google/genai";
import { supabase } from "../supabase";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const generateCoverLetter = async ({ resumeText, jobDescription, companyName, roleName, tone }) => {
  const prompt = `
   You are an expert career writer and professional cover letter specialist, writing on behalf of a real job candidate.

   Your task is to write a personalized, ready-to-send cover letter using ONLY the candidate's resume and (optionally) a target job description.

   --------------------------------------------------
   GROUNDING RULE (CRITICAL)
   --------------------------------------------------
   Use ONLY facts, skills, projects, achievements, and experience explicitly present in the resume below.
   - NEVER invent metrics, companies, job titles, responsibilities, or outcomes not stated in the resume.
   - If the resume lacks strong quantified achievements, write around genuine strengths (skills depth, project scope, initiative, learning ability) instead of fabricating numbers.
   - Do not exaggerate seniority or claim expertise not evidenced in the resume.

   --------------------------------------------------
   ANTI-GENERIC RULE
   --------------------------------------------------
   Do NOT use generic filler openers such as:
   - "I am writing to express my interest in..."
   - "I believe I would be a great fit for..."
   - "With a strong background in..."
   Instead, open with something concrete and specific to the candidate's actual background (a real project, a real skill combination, a real accomplishment) that connects naturally to the role.

   --------------------------------------------------
   RESUME
   --------------------------------------------------
   ${resumeText}

   --------------------------------------------------
   JOB DESCRIPTION
   --------------------------------------------------
   ${jobDescription || "No job description provided. Write a strong general-purpose cover letter based on the candidate's strongest and most relevant experience from the resume, targeting the role implied by their skills and experience level."}

   --------------------------------------------------
   TARGET DETAILS
   --------------------------------------------------
   Role: ${roleName || "Not specified — infer the most relevant role from the resume"}
   Company: ${companyName || "Not specified — use a neutral placeholder like 'your team' instead of a company name"}
   Tone: ${tone || "professional"} (options: professional, enthusiastic, concise)

   --------------------------------------------------

   Write a cover letter with the following structure:
   1. Greeting — use "Dear Hiring Manager," if no specific name is available.
   2. Opening paragraph — references something specific and real from the resume; no generic openers.
   3. 1-2 body paragraphs — connect the candidate's actual skills/projects/experience directly to the JD's stated requirements. If no JD, connect to the strongest and most relevant experience on the resume.
   4. Closing paragraph — a clear, confident call to action. Not desperate, not overly casual.
   5. Sign-off.

   Formatting rules:
   - Do NOT use placeholder brackets like "[Your Name]", "[Company Address]", or "[Date]" anywhere. Write it as a ready-to-send letter using only real information found in the resume. If a detail (like a name) isn't present in the resume, omit that line entirely rather than inserting a placeholder.
   - Total length: 250-350 words.
   - Use natural paragraph breaks, not bullet points.
   - Do not repeat the resume verbatim — synthesize and reframe, don't copy-paste bullet lines.

   Return ONLY valid JSON. Do NOT return markdown. Do NOT use \`\`\`json. Do NOT write any explanation outside the JSON.

   The JSON schema MUST be exactly:

   {
     "greeting": "",
     "opening_paragraph": "",
     "body_paragraphs": [],
     "closing_paragraph": "",
     "sign_off": "",
     "full_text": ""
   }

   Rules:
   1. "body_paragraphs" must contain 1-2 strings, each a full paragraph.
   2. "full_text" must be the complete letter assembled as one continuous, properly formatted string (with paragraph breaks as "\\n\\n"), ready to copy-paste as-is — this is the primary field the app will display.
   3. Never fabricate resume content. If information needed for a strong letter is missing, write around it rather than inventing it.
   4. Always return valid, complete JSON matching the schema exactly.
   `;

  const CoverLetterSchema = {
    type: Type.OBJECT,
    properties: {
      greeting: { type: Type.STRING },
      opening_paragraph: { type: Type.STRING },
      body_paragraphs: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      closing_paragraph: { type: Type.STRING },
      sign_off: { type: Type.STRING },
      full_text: { type: Type.STRING },
    },
    required: [
      "greeting",
      "opening_paragraph",
      "body_paragraphs",
      "closing_paragraph",
      "sign_off",
      "full_text",
    ],
  };

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: CoverLetterSchema,
    },
  });

  return JSON.parse(response.text);
};

export const saveCoverLetter = async ({
  userId,
  analysisId,
  resumeHash,
  jdHash,
  companyName,
  roleName,
  tone,
  content,
}) => {
  const { data, error } = await supabase
    .from("cover_letters")
    .insert({
      user_id: userId,
      analysis_id: analysisId,
      resume_hash: resumeHash,
      jd_hash: jdHash,
      company_name: companyName,
      role_name: roleName,
      tone,
      content,
    })
    .select()
    .single();

  return { data, error };
};

export const getCoverLettersForAnalysis = async (analysisId) => {
  const { data, error } = await supabase
    .from("cover_letters")
    .select("*")
    .eq("analysis_id", analysisId)
    .order("created_at", { ascending: false });

  return { data, error };
};

export const deleteCoverLetter = async (id) => {
  const { error } = await supabase.from("cover_letters").delete().eq("id", id);
  return { error };
};
