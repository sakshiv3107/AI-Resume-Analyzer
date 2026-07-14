import { supabase } from "../supabase";

export const saveAnalysis = async ({
  resumeId,
  userId,
  jobDescription,
  analysis,
}) => {
  const { data, error } = await supabase
    .from("analyses")
    .insert({
      resume_id: resumeId,
      user_id: userId,
      ats_score: analysis.ats_score,
      match_percentage: analysis.match_percentage,
      job_description: jobDescription,
      analysis,
    })
    .select()
    .single();

  return { data, error };
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