import OpenAI from "openai";

export const groq = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
});

// export const analyzeResumeGrok = async (
//   resumeText,
//   jobDescription = ""
// ) => {

//   const prompt = `
//   ${YOUR_EXISTING_PROMPT}
//   `;

//   const response = await client.chat.completions.create({
//     model: "grok-4.3",

//     temperature: 0,

//     response_format: {
//       type: "json_object",
//     },

//     messages: [
//       {
//         role: "system",
//         content: "Return only valid JSON."
//       },
//       {
//         role: "user",
//         content: prompt
//       }
//     ]
//   });

//   return JSON.parse(response.choices[0].message.content);
// };