import { GoogleGenAI, Type } from "@google/genai";
import { callGeminiWithRetry } from "./geminiRetry";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const analyzeResume = async (resumeText, jobDescription = "") => {
const prompt = `
You are an expert ATS (Applicant Tracking System) engine, Senior Technical Recruiter, and Resume Auditor.
You do NOT flatter candidates. You score strictly, like a real ATS + human recruiter combined, using only evidence present in the text below. Do not assume, infer, or invent anything not explicitly stated.

--------------------------------------------------
DETERMINISM RULE (IMPORTANT)
--------------------------------------------------
"ats_score" measures the INTRINSIC quality of the resume itself (structure, clarity, quantification, skills evidence, formatting signals, section completeness) and must be independent of any specific Job Description.
- Compute it using ONLY the rubric in ATS_BREAKDOWN_RUBRIC below.
- Given the exact same resume text, you MUST return the exact same "ats_score" and "ats_breakdown" every time — do not vary it based on tone, phrasing choices, or randomness. Treat this as a deterministic calculation, not a creative judgment.
- "match_percentage" measures resume-to-JD overlap and legitimately changes every time the JD changes (or is absent). It is allowed to differ across runs when JD differs.
- If NO JD is provided, match_percentage = ats_score exactly.

--------------------------------------------------
ATS_BREAKDOWN_RUBRIC (use these fixed weights, total = 100)
--------------------------------------------------
- skills (0-20): count of relevant, clearly-listed technical skills with evidence of actual use in projects/experience (not just listed).
- experience (0-20): presence of real roles/internships, use of action verbs, clarity of responsibilities. 0 if no experience section exists.
- education (0-10): completeness (degree, institution, year, CGPA/grade if present).
- projects (0-20): number of projects, technical depth, presence of tech stack, live link/repo.
- keywords (0-15): density and relevance of industry/role-standard keywords found in the resume text itself.
- formatting (0-15): consistent structure, clear section headers, no walls of text, appropriate length (1 page for <3 yrs experience, up to 2 for senior).
Sum these six sub-scores to get ats_score (cap at 90 max per rule below).

--------------------------------------------------
STRICTNESS RULES
--------------------------------------------------
- Do NOT give benefit-of-the-doubt. If a claim isn't quantified (no numbers, %, scale, impact), treat it as a weakness, not a strength.
- Generic filler bullets ("responsible for", "worked on", "helped with") without outcomes should reduce the experience/projects sub-score and appear in weaknesses or red_flags.
- A resume with no measurable achievements anywhere should score no higher than 55-60 overall, regardless of how many skills are listed.
- Do not reward keyword-stuffing (skills listed but never used in any project/experience bullet) — flag it as a red flag instead of scoring it as a strength.
- Most real-world resumes should land in the 40-75 range. Reserve 80-85 only for resumes with strong quantified impact, clean formatting, and strong keyword-role alignment. Reserve below 40 for resumes missing multiple core sections or with major red flags.

--------------------------------------------------
RESUME
--------------------------------------------------
${resumeText}

--------------------------------------------------
JOB DESCRIPTION
--------------------------------------------------
${jobDescription || "No Job Description Provided"}

--------------------------------------------------

Return ONLY valid JSON. Do NOT return markdown. Do NOT use \`\`\`json. Do NOT write explanations outside the JSON.

The JSON schema MUST be exactly:

{
  "ats_score": number,
  "match_percentage": number,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missing_keywords": [],
  "matched_skills": [],
  "missing_skills": [],
  "suggestions": [
    {
      "title": "",
      "description": "",
      "priority": ""
    }
  ],
  "detected_skills": [],
  "experience_level": "",
  "recommended_roles": [],
  "formatting_score": number,
  "grammar_score": number,
  "keyword_score": number,
  "sections_found": [],
  "sections_missing": [],
  "red_flags": [],
  "ats_breakdown": {
      "skills": number,
      "experience": number,
      "education": number,
      "projects": number,
      "keywords": number,
      "formatting": number
  }
}

Rules:

1. ATS Score must be between 0-90, computed strictly from ATS_BREAKDOWN_RUBRIC above. It must stay identical across repeated runs on the same resume text.

2. Match Percentage must be between 0-100, and is JD-dependent (can vary between runs if JD changes). If no JD, match_percentage = ats_score.

3. Give at least 3 strengths — each must reference a specific, concrete element actually present in the resume (a real project name, a real quantified bullet, a real skill). No generic praise.

4. Give at least 3 weaknesses — prioritize missing quantification, vague bullets, missing sections, weak keyword alignment.

5. Return at least 3 suggestions. Each suggestion must be actionable and specific to this resume (not generic advice), and contain:
   { "title": "", "description": "", "priority": "High | Medium | Low" }

6. missing_keywords: only include keywords genuinely absent from the resume that matter for the role/JD (or general industry standard if no JD).

7. missing_skills: only technical skills required by the JD but absent from the resume. Empty array if no JD.

8. matched_skills: skills present in BOTH resume and JD. If no JD, matched_skills = detected_skills.

9. detected_skills: all skills actually found in the resume text (do not infer skills from job titles alone).

10. recommended_roles: based only on evidence in the resume (skills + project domains + experience), not aspirational titles.

11. sections_found / sections_missing: check against ["Education","Skills","Projects","Experience","Certifications","Achievements","Summary"].

12. red_flags: include concrete issues such as no quantified achievements, no action verbs, inconsistent formatting, missing GitHub/LinkedIn, missing contact info, resume too short (<1 project/role), resume too long for experience level, keyword-stuffed but unused skills.

13. ats_breakdown sub-scores must sum to approximately ats_score (±2).

14. Never invent experience, skills, metrics, or outcomes not present in the resume text. If information is unavailable, return [] or "".

15. Always return valid, complete JSON matching the schema exactly — no extra keys, no missing keys.
`;
  const ResumeSchema = {
  type: Type.OBJECT,

  properties: {
    ats_score: {
      type: Type.NUMBER,
    },

    match_percentage: {
      type: Type.NUMBER,
    },

    summary: {
      type: Type.STRING,
    },

    strengths: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },

    weaknesses: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },

    missing_keywords: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },

    missing_skills: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },

   suggestions: {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
      },
      description: {
        type: Type.STRING,
      },
      priority: {
        type: Type.STRING,
      },
    },
    required: [
      "title",
      "description",
      "priority",
    ],
  },
},

    detected_skills: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },

    matched_skills: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },

    experience_level: {
      type: Type.STRING,
    },

    recommended_roles: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },

    formatting_score: {
      type: Type.NUMBER,
    },

    grammar_score: {
      type: Type.NUMBER,
    },

    keyword_score: {
      type: Type.NUMBER,
    },

    sections_found: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },

    sections_missing: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },

    red_flags: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },

    ats_breakdown: {
      type: Type.OBJECT,
      properties: {
        skills: { type: Type.NUMBER },
        experience: { type: Type.NUMBER },
        education: { type: Type.NUMBER },
        projects: { type: Type.NUMBER },
        keywords: { type: Type.NUMBER },
        formatting: { type: Type.NUMBER },
      },
    },
  },
  required: [
  "ats_score",
  "match_percentage",
  "summary",
  "strengths",
  "weaknesses",
  "missing_keywords",
  "missing_skills",
  "suggestions",
  "detected_skills",
  "matched_skills",
  "experience_level",
  "recommended_roles",
  "formatting_score",
  "grammar_score",
  "keyword_score",
  "sections_found",
  "sections_missing",
  "red_flags",
  "ats_breakdown",
],
};
  const response = await callGeminiWithRetry(() =>
    ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: ResumeSchema,
      },
    })
  );

  return JSON.parse(response.text);
};

