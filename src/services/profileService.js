import { supabase } from "../supabase";

/* ------------------ Get Profile ------------------ */

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  return { data, error };
};

/* ------------------ Update Profile ------------------ */

export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single();

  return { data, error };
};

/* ------------------ Upload Avatar ------------------ */

export const uploadAvatar = async (file, userId) => {
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      upsert: true,
    });

  if (uploadError) {
    return { error: uploadError };
  }

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  return {
    avatarUrl: data.publicUrl,
  };
};