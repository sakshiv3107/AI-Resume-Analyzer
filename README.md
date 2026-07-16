AI Resume Analyzer

AI-powered Resume Analysis Platform built with React, Tailwind CSS, Supabase, PDF.js, and Google Gemini AI that evaluates resumes, calculates ATS compatibility, provides intelligent suggestions, and helps candidates improve their chances of getting shortlisted.

📖 Overview

AI Resume Analyzer is a modern web application that analyzes resumes using Artificial Intelligence. Users can upload their resume in PDF format, optionally provide a Job Description (JD), and receive a detailed ATS report including:

ATS Score
Match Percentage
Resume Summary
Strengths & Weaknesses
Missing Keywords
Missing Skills
AI Suggestions
Resume Preview
Downloadable Analysis Report

The application also supports authentication and stores previous analyses for registered users while allowing guest users to analyze resumes without saving history.

✨ Features
Resume Upload
Upload PDF resumes
Drag & Drop interface
PDF validation
Resume preview
AI Resume Analysis

Powered by Google Gemini AI

Analyzes:

Resume quality
ATS compatibility
Professional formatting
Skills
Experience
Projects
Education
Certifications
Overall readability
ATS Score

Provides an ATS score out of 100

Example:

ATS Score

87 / 100
Match Percentage

If a Job Description is provided:

Calculates Resume vs JD Match
Detects missing requirements
Highlights matching skills
Keyword Analysis

Finds

Missing Keywords
Existing Keywords
Relevant Technologies

Example

Missing Keywords

• Docker
• Kubernetes
• CI/CD
• Redis
Skills Detection

Automatically extracts skills from resume.

Example

JavaScript
React
Node.js
C++
Python
SQL
Git
Tailwind CSS
AI Suggestions

Gemini generates personalized improvement suggestions.

Example

High Priority

Add measurable achievements to your projects.

Medium Priority

Improve formatting consistency.

Low Priority

Include certifications section.
Strengths & Weaknesses

Highlights

Strengths
Strong technical projects
Good education section
Relevant programming skills
Weaknesses
Missing achievements
Weak professional summary
Few action verbs
Resume Summary

AI generates a concise professional summary of the uploaded resume.

Authentication

Powered by Supabase Authentication

Supports

Email Login
Google Login
Protected Dashboard
Guest Mode

Guest users can analyze resumes but analysis history is not saved.

Analysis History

Logged-in users can

View previous analyses
Search analyses
Filter history
Open previous reports
Report Generation

Generate downloadable report containing

ATS Score
Match Percentage
Summary
Suggestions
Keywords
Skills
Responsive Design

Fully responsive

Desktop
Tablet
Mobile
🛠 Tech Stack
Frontend
React
React Router
Tailwind CSS
Context API
Lucide React
Backend
Supabase

Features used

Authentication
Database
Storage
AI

Google Gemini API

Used for

Resume Analysis
ATS Evaluation
Suggestions
Keyword Detection
PDF Processing

pdfjs-dist

Used for extracting text from uploaded PDFs.

📂 Project Structure
src
│
├── assets
│
├── components
│   ├── Dashboard
│   ├── Home
│   ├── Result
│   ├── History
│   ├── Settings
│   └── Common
│
├── context
│   ├── AuthContext.jsx
│   └── ResumeContext.jsx
│
├── hooks
│
├── pages
│   ├── Dashboard.jsx
│   ├── History.jsx
│   ├── Result.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── Home.jsx
│
├── services
│   ├── analysisService.js
│   ├── authService.js
│   ├── pdfService.js
│   ├── reportService.js
│   ├── resumeService.js
│   └── historyService.js
│
├── lib
│   └── supabase.js
│
├── router
│
└── App.jsx
⚙️ Installation

Clone repository

git clone https://github.com/yourusername/ai-resume-analyzer.git

Move into project

cd ai-resume-analyzer

Install dependencies

npm install

Run project

npm run dev
🔑 Environment Variables

Create

.env

Add

VITE_SUPABASE_URL=your_supabase_url

VITE_SUPABASE_ANON_KEY=your_supabase_key

VITE_GEMINI_API_KEY=your_gemini_api_key
Database
Tables
profiles

Stores user profile information.

resumes

Stores uploaded resumes.

analyses

Stores AI analysis.

Includes

ATS Score
Match Percentage
Analysis JSON
Resume Reference
User Reference
Job Description
Workflow
User Uploads Resume
          │
          ▼
PDF Text Extraction
          │
          ▼
Gemini AI Analysis
          │
          ▼
Structured JSON Response
          │
          ▼
Store Analysis (if logged in)
          │
          ▼
Display Result Page
AI Analysis Flow
User uploads resume.
PDF.js extracts text.
Resume text is sent to Gemini.
Gemini evaluates:
ATS Score
Match Percentage
Skills
Weaknesses
Suggestions
Summary
JSON response is validated.
Analysis is stored in Supabase.
Results are displayed.
JSON Response Schema
{
  "ats_score": 87,
  "match_percentage": 82,
  "summary": "...",
  "strengths": [],
  "weaknesses": [],
  "missing_keywords": [],
  "missing_skills": [],
  "detected_skills": [],
  "suggestions": [
    {
      "title": "",
      "description": "",
      "priority": ""
    }
  ]
}
Screens
Home
Login
Signup
Dashboard
Resume Upload
Analysis Result
History
Settings
Future Improvements
Multi-page PDF support improvements
Resume comparison
Resume version tracking
Cover letter generation
AI resume rewriting
Resume templates
Dark mode
Multi-language support
Recruiter dashboard
Interview preparation
Resume scoring trends
Export to Word
Shareable report links
AI chatbot for resume improvement
Dependencies

Major packages

{
  "@google/genai": "^1.x",
  "@supabase/supabase-js": "^2.x",
  "pdfjs-dist": "^4.x",
  "react": "^19.x",
  "react-router-dom": "^7.x",
  "tailwindcss": "^4.x",
  "lucide-react": "^0.x"
}
Performance
Fast PDF parsing
Optimized AI requests
Context API state management
Lazy-loaded routes
Responsive UI
Efficient Supabase queries
Security
Row Level Security (RLS) in Supabase
Secure authentication
Environment variables for API keys
Protected user data
Input validation
Contributing
Fork the repository.
Create a feature branch.
git checkout -b feature/new-feature
Commit your changes.
git commit -m "Add new feature"
Push to GitHub.
git push origin feature/new-feature
Open a Pull Request.
License

This project is licensed under the MIT License.

Author

Sakshi Vishnoi

GitHub: https://github.com/sakshiv3107
LinkedIn: https://www.linkedin.com/in/sakshiv3107/
⭐ If you found this project useful, consider giving it a star on GitHub!
