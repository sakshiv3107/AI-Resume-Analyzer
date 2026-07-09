import { supabase } from "../supabase";

export const uploadResume = async (file, userId) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;

  console.log("Uploading:", fileName);

  const { data, error } = await supabase.storage
    .from("resumes")
    .upload(fileName, file);

  console.log("Upload Data:", data);
  console.log("Upload Error:", error);

  if (error) {
    return { error };
  }

  const { data: urlData } = supabase.storage
    .from("resumes")
    .getPublicUrl(fileName);

  console.log("Public URL:", urlData);

  return {
    fileName: file.name,
    filePath: fileName,
    fileUrl: urlData.publicUrl,
  };
};