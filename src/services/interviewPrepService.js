import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const generateInterviewQuestions = async ({ resumeText, jobDescription }) => {
  const prompt = `
   You are an experienced technical interviewer and hiring manager preparing a candidate for a real interview.

   Your task is to generate likely interview questions based ONLY on what is actually written in this specific candidate's resume — not generic interview questions anyone could be asked.

   --------------------------------------------------
   GROUNDING RULE (CRITICAL)
   --------------------------------------------------
   - Every question must reference something concrete and real from the resume: a specific project name, a specific technology combination, a specific claimed outcome, a specific role or responsibility.
   - Do NOT generate generic questions that could apply to any candidate ("Tell me about yourself", "What's your biggest weakness") unless the resume gives you nothing else to work with.
   - Do NOT invent details about the candidate's projects/experience beyond what's written — base every question on what's actually there, including asking about details that seem UNDER-explained (this is realistic — interviewers probe vague claims).

   --------------------------------------------------
   RESUME
   --------------------------------------------------
   ${resumeText}

   --------------------------------------------------
   JOB DESCRIPTION (optional — if provided, weight questions toward the skills/responsibilities it emphasizes)
   --------------------------------------------------
   ${jobDescription || "No job description provided. Generate questions based on the strongest and most relevant experience on the resume."}

   --------------------------------------------------

   Generate questions across these categories:
   1. "project_deep_dive" (3-4 questions) — specific to individual projects/experience listed on the resume, asking the candidate to explain decisions, tradeoffs, or technical details of something they specifically claim to have built or done.
   2. "technical_skills" (3-4 questions) — probing depth on specific technologies/skills listed on the resume, appropriate to the candidate's apparent experience level (don't ask senior-architecture questions of an entry-level resume, and vice versa).
   3. "behavioral" (2-3 questions) — grounded in specific claimed experiences (e.g. if resume mentions leading a team or handling a deadline, ask about that specific situation), not generic behavioral prompts.
   4. "gap_probing" (1-3 questions) — questions targeting vague, unquantified, or thin parts of the resume where an interviewer would naturally push for more detail. Only include this category if such gaps genuinely exist in the resume; return an empty array if the resume is already strong and specific everywhere.

   For each question, include a one-sentence "why_asked" note explaining what the interviewer is trying to assess and referencing the specific resume detail it's tied to.

   Return ONLY valid JSON. Do NOT return markdown. Do NOT use \`\`\`json. Do NOT write any explanation outside the JSON.

   The JSON schema MUST be exactly:

   {
     "project_deep_dive": [
       { "question": "", "why_asked": "" }
     ],
     "technical_skills": [
       { "question": "", "why_asked": "" }
     ],
     "behavioral": [
       { "question": "", "why_asked": "" }
     ],
     "gap_probing": [
       { "question": "", "why_asked": "" }
     ]
   }

   Rules:
   1. Every question must be traceable to something specific in the resume — no generic filler questions.
   2. Never fabricate resume content to justify a question.
   3. Match question difficulty to the candidate's apparent experience level from the resume.
   4. gap_probing may be an empty array if there are no genuine gaps — do not force weak questions into it.
   5. Always return valid, complete JSON matching the schema exactly.
   `;

  const InterviewQuestionsSchema = {
    type: Type.OBJECT,
    properties: {
      project_deep_dive: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            why_asked: { type: Type.STRING },
          },
          required: ["question", "why_asked"],
        },
      },
      technical_skills: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            why_asked: { type: Type.STRING },
          },
          required: ["question", "why_asked"],
        },
      },
      behavioral: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            why_asked: { type: Type.STRING },
          },
          required: ["question", "why_asked"],
        },
      },
      gap_probing: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            why_asked: { type: Type.STRING },
          },
          required: ["question", "why_asked"],
        },
      },
    },
    required: ["project_deep_dive", "technical_skills", "behavioral", "gap_probing"],
  };

    const response = await callGeminiWithRetry(() =>
      ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: InterviewQuestionsSchema,
        },
        thinkingConfig: {
        thinkingBudget: 0, // disables thinking — big latency win for extraction/scoring tasks
      }, 
      })
    );


  return JSON.parse(response.text);
};
