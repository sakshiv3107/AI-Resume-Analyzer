import { supabase } from "../supabase";
import { hashText } from "../utils/hash";

export const saveAnalysis = async ({
  resumeId,
  userId,
  resumeText,
  jobDescription,
  analysis,
}) => {
  const resumeHash = await hashText(resumeText);
  const jdHash = await hashText(jobDescription);

  // Skip creating a new row if this exact resume+JD combo was already scored
  const { data: existing, error: checkError } = await supabase
    .from("analyses")
    .select("*, resumes(id, file_name, file_url)")
    .eq("user_id", userId)
    .eq("resume_hash", resumeHash)
    .eq("jd_hash", jdHash)
    .maybeSingle();

  if (checkError) {
    return { data: null, error: checkError };
  }

  if (existing) {
    return { data: existing, error: null, skipped: true };
  }

  const { data, error } = await supabase
    .from("analyses")
    .insert({
      resume_id: resumeId,
      user_id: userId,
      resume_hash: resumeHash,
      jd_hash: jdHash,
      resume_text: resumeText,
      ats_score: analysis.ats_score,
      match_percentage: analysis.match_percentage,
      job_description: jobDescription,
      analysis,
    })
    .select()
    .single();

  return { data, error };
};

// New: for the score-history chart, ascending by time
export const getScoreHistory = async (userId, resumeHash = null) => {
  let query = supabase
    .from("analyses")
    .select("id, ats_score, match_percentage, created_at, resume_hash, analysis, resumes(file_name)")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (resumeHash) {
    query = query.eq("resume_hash", resumeHash);
  }

  const { data, error } = await query;
  return { data, error };
};

export const getResumeGroups = async (userId) => {
  const { data, error } = await supabase
    .from("analyses")
    .select("resume_hash, resumes(file_name), created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) return { data: null, error };

  // Dedupe by resume_hash, keeping the most recent file_name for each
  const seen = new Map();
  for (const row of data) {
    if (!seen.has(row.resume_hash)) {
      seen.set(row.resume_hash, {
        resumeHash: row.resume_hash,
        fileName: row.resumes?.file_name,
        lastUpdated: row.created_at,
      });
    }
  }

  return { data: Array.from(seen.values()), error: null };
};


export const getHistory = async (userId) => {
  const { data, error } = await supabase
    .from("analyses")
    .select(`
      *,
      resumes (
        id,
        file_name,
        file_url
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
};

export const getAnalysisById = async (id) => {
  const { data, error } = await supabase
    .from("analyses")
    .select(`
      *,
      resumes (
        file_name,
        file_url
      )
    `)
    .eq("id", id)
    .single();

  return { data, error };
};

export const getRecentAnalyses = async (userId, limit = 3) => {
  const { data, error } = await supabase
    .from("analyses")
    .select(`
      *,
      resumes (
        id,
        file_name,
        file_url
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  return { data, error };
};

export const deleteAnalysis = async (analysisId) => {
  const { error } = await supabase
    .from("analyses")
    .delete()
    .eq("id", analysisId);

  return { error };
};

export const getDashboardStats = async (userId) => {
  const { data, error } = await supabase
    .from("analyses")
    .select("ats_score, match_percentage")
    .eq("user_id", userId);

  if (error) {
    return { data: null, error };
  }

  const totalAnalyses = data.length;

  const averageATS =
    totalAnalyses > 0
      ? Math.round(
          data.reduce((sum, item) => sum + (item.ats_score || 0), 0) /
            totalAnalyses
        )
      : 0;

  const averageMatch =
    totalAnalyses > 0
      ? Math.round(
          data.reduce(
            (sum, item) => sum + (item.match_percentage || 0),
            0
          ) / totalAnalyses
        )
      : 0;

  return {
    data: {
      totalAnalyses,
      averageATS,
      averageMatch,
    },
    error: null,
  };
};