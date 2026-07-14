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