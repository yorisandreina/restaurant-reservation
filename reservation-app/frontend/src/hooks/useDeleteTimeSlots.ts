import { supabase } from "@/lib/apiClient";
import { useState } from "react";

export const useDeleteTimeSlots = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeTimeSlots = async (businessId: number) => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from("Time Slots")
        .delete()
        .eq("business_id", businessId);

      if (error) {
        setError(error.message);
        return false;
      }

      return true;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { removeTimeSlots, loading, error };
};
