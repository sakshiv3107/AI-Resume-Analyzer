import { supabase } from "../supabase";

export const uploadResume = async (file, userId) => {
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/${Date.now()}.${fileExt}`;

  // Upload to Storage
  const { error: uploadError } = await supabase.storage
    .from("resumes")
    .upload(filePath, file);

  if (uploadError) {
    return { error: uploadError };
  }

  // Get Public URL
  const {
    data: { publicUrl },
  } = supabase.storage
    .from("resumes")
    .getPublicUrl(filePath);

  // Save metadata in resumes table
  const { data: resume, error: dbError } = await supabase
    .from("resumes")
    .insert({
      user_id: userId,
      file_name: file.name,
      file_url: publicUrl,
    })
    .select()
    .single();

  if (dbError) {
    return { error: dbError };
  }

  return {
    resumeId: resume.id,
    fileName: file.name,
    fileUrl: publicUrl,
  };
};
// Hash text using the browser's built-in SubtleCrypto (no extra package needed)
const hashText = async (text) => {
  const encoded = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export const saveAnalysisIfNew = async ({
  userId,
  resumeId,
  fileName,
  resumeText,
  jdText,
  analysisResult,
}) => {
  const resumeHash = await hashText(resumeText);
  const jdHash = jdText ? await hashText(jdText) : null;

  // Check if this exact resume+JD combo was already scored
  const { data: existing, error: checkError } = await supabase
    .from("resume_versions")
    .select("id")
    .eq("user_id", userId)
    .eq("resume_hash", resumeHash)
    .eq("jd_hash", jdHash) // works fine even when jdHash is null
    .maybeSingle();

  if (checkError) {
    return { error: checkError };
  }

  if (existing) {
    // nothing changed, no new version row needed
    return { skipped: true, versionId: existing.id };
  }

  const { data: version, error: insertError } = await supabase
    .from("resume_versions")
    .insert({
      user_id: userId,
      resume_id: resumeId,
      resume_hash: resumeHash,
      jd_hash: jdHash,
      file_name: fileName,
      ats_score: analysisResult.ats_score,
      match_percentage: analysisResult.match_percentage,
      ats_breakdown: analysisResult.ats_breakdown,
      detected_skills: analysisResult.detected_skills,
    })
    .select()
    .single();

  if (insertError) {
    return { error: insertError };
  }

  return { version };
};