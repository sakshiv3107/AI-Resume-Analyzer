import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const analyzeResume = async (resumeText, jobDescription = "") => {
    const prompt = `
You are an expert ATS (Applicant Tracking System), Senior HR Recruiter, Career Coach, and Resume Reviewer.

Your task is to analyze a candidate's resume.

The user may also provide a Job Description (JD).

If a Job Description is provided:
- Compare the resume with the JD.
- Evaluate how well the resume matches the role.
- Calculate ATS score based on the JD.
- Identify missing keywords.
- Mention important skills missing from the resume.
- Suggest improvements to increase the ATS score.

If NO Job Description is provided:
- Analyze the resume independently.
- Evaluate formatting, skills, projects, education, experience, and resume quality.
- Estimate ATS score based on general industry standards.

--------------------------------------------------
RESUME
--------------------------------------------------

${resumeText}

--------------------------------------------------
JOB DESCRIPTION
--------------------------------------------------

${jobDescription || "No Job Description Provided"}

--------------------------------------------------

Return ONLY valid JSON.

Do NOT return markdown.

Do NOT use \`\`\`json.

Do NOT write explanations.

The JSON schema MUST be exactly:

{
  "ats_score": number,
  "match_percentage": number,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missing_keywords": [],
  "missing_skills": [],
  "suggestions": [],
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

1. ATS Score must be between 0-90.

2. Match Percentage must be between 0-100.

3. Give at least 3 strengths.

4. Give at least 3 weaknesses.

5. Give at least 5 suggestions.

6. Give all important missing keywords.

7. Give all missing technical skills.

8. Detected skills should only include skills found in the resume.

9. Recommended roles should be based only on the resume.

10. Sections Found should contain sections available in the resume such as:
[
"Education",
"Skills",
"Projects",
"Experience",
"Certifications",
"Achievements",
"Summary"
]

11. Sections Missing should include important missing sections.

12. Red Flags should include issues like:
- No quantified achievements
- No action verbs
- Poor formatting
- Missing GitHub
- Missing LinkedIn
- Missing contact information
- Short resume
- Resume too lengthy

13. The ATS Breakdown should total approximately 100.

14. If Job Description is empty:
- match_percentage should equal ats_score.
- missing_keywords should be based on common industry expectations.

15. Never invent experience that is not present.

16. Never fabricate skills.

17. If information is unavailable, return:
[]
or
""

18. Always return valid JSON.
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
        type: Type.STRING,
      },
    },

    detected_skills: {
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
};
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",

    contents: prompt,

    config: {
      responseMimeType: "application/json",
      responseSchema: ResumeSchema,
    },
  });

  return JSON.parse(response.text);
};

