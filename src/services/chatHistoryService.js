import { supabase } from "../supabase";

/**
 * Fetch all chat messages for an analysis, oldest first.
 * @param {string} analysisId
 * @returns {Promise<{data, error}>}
 */
export const getChatMessages = async (analysisId) => {
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("analysis_id", analysisId)
    .order("created_at", { ascending: true });

  return { data, error };
};

/**
 * Persist a single chat message row.
 * @param {{ analysisId: string, userId: string, role: 'user'|'assistant', content: string }}
 * @returns {Promise<{data, error}>}
 */
export const saveChatMessage = async ({ analysisId, userId, role, content }) => {
  const { data, error } = await supabase
    .from("chat_messages")
    .insert({
      analysis_id: analysisId,
      user_id: userId,
      role,
      content,
    })
    .select()
    .single();

  return { data, error };
};

/**
 * Delete all chat messages for an analysis (Clear Chat).
 * @param {string} analysisId
 * @returns {Promise<{error}>}
 */
export const clearChatHistory = async (analysisId) => {
  const { error } = await supabase
    .from("chat_messages")
    .delete()
    .eq("analysis_id", analysisId);

  return { error };
};
