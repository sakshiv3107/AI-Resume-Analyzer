import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const rewriteBullet = async ({ originalBullet, context, jobDescription }) => {
  const prompt = `
   You are an expert resume writer and technical recruiter who specializes in transforming weak, generic resume bullets into strong, achievement-oriented ones.

   Your task is to rewrite ONE resume bullet point into 3 improved variants.

   --------------------------------------------------
   GROUNDING RULE (CRITICAL)
   --------------------------------------------------
   - NEVER invent metrics, numbers, percentages, team sizes, or outcomes that are not present in the original bullet or the surrounding context provided below.
   - If the original bullet has no quantifiable outcome, do NOT make one up. Instead, insert a clearly marked placeholder in square brackets describing what the candidate should fill in, e.g. "[add: % improvement]" or "[add: number of users]" or "[add: time saved]".
   - You MAY strengthen the verb, sharpen the phrasing, add technical specificity (tools/technologies already mentioned elsewhere in context), and restructure for clarity — but you must NOT fabricate facts.
   - Every placeholder must be genuinely fillable by the candidate from memory (a real number they'd know), not vague filler.

   --------------------------------------------------
   WHAT MAKES A BULLET STRONG
   --------------------------------------------------
   - Starts with a strong action verb (Built, Led, Reduced, Automated, Designed — not "Responsible for" or "Worked on").
   - States the specific action taken.
   - States the measurable or observable outcome (real if present in context, placeholder if not).
   - Is specific to this candidate's actual work — not a generic template line.
   - Fits on one line where possible (under ~28 words).

   --------------------------------------------------
   ORIGINAL BULLET
   --------------------------------------------------
   ${originalBullet}

   --------------------------------------------------
   CONTEXT (role/project this bullet belongs to, and any tech stack mentioned nearby in the resume — use this to keep rewrites accurate, do not use it to invent unrelated claims)
   --------------------------------------------------
   ${context || "No additional context provided."}

   --------------------------------------------------
   TARGET JOB DESCRIPTION (optional — if provided, lean the phrasing toward relevant keywords/skills from it, without changing what actually happened)
   --------------------------------------------------
   ${jobDescription || "No job description provided."}

   --------------------------------------------------

   Generate 3 rewritten variants of the original bullet:
   1. "quantified" — the strongest version, using a real metric if one exists in the original/context, or a clearly marked placeholder if not.
   2. "concise" — a tightened, punchier version prioritizing clarity and brevity over added detail.
   3. "keyword_aligned" — a version that naturally incorporates relevant terminology from the job description (only if one was provided; if not, make this a version emphasizing technical specificity instead).

   For each variant, also return whether it contains a placeholder the user needs to fill in.

   Return ONLY valid JSON. Do NOT return markdown. Do NOT use \`\`\`json. Do NOT write any explanation outside the JSON.

   The JSON schema MUST be exactly:

   {
     "original_bullet": "",
     "variants": [
       {
         "type": "quantified",
         "text": "",
         "has_placeholder": false
       },
       {
         "type": "concise",
         "text": "",
         "has_placeholder": false
       },
       {
         "type": "keyword_aligned",
         "text": "",
         "has_placeholder": false
       }
     ]
   }

   Rules:
   1. Never fabricate metrics, outcomes, team sizes, or technologies not present in the original bullet or context.
   2. Any invented-but-unverifiable detail must use a "[add: ...]" placeholder, and "has_placeholder" must be true for that variant.
   3. Do not change the fundamental meaning or scope of what the candidate actually did.
   4. Always return valid, complete JSON matching the schema exactly — exactly 3 variants, in the order specified.
   `;

  const BulletRewriteSchema = {
    type: Type.OBJECT,
    properties: {
      original_bullet: { type: Type.STRING },
      variants: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING },
            text: { type: Type.STRING },
            has_placeholder: { type: Type.BOOLEAN },
          },
          required: ["type", "text", "has_placeholder"],
        },
      },
    },
    required: ["original_bullet", "variants"],
  };

  const response = await callGeminiWithRetry(() =>
    ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: BulletRewriteSchema,
      },
    })
  );
  
  return JSON.parse(response.text);
};
