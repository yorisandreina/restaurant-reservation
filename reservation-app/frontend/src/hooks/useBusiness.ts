import { supabase } from "@/lib/apiClient";

export const useBusiness = () => {
  const fetchBusinessByUserId = async (userId: string) => {
    const { data, error } = await supabase
      .from("Businesses")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (error || !data) return null;

    localStorage.setItem("businessId", String(data.id));
    return data;
  };

  return { fetchBusinessByUserId };
};
