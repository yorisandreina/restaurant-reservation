import { supabase } from "@/lib/apiClient";
import { useState } from "react";

interface NewTable {
  businessId: number;
  name: string;
  minCapacity: number;
  maxCapacity: number;
  active: boolean;
}

export const useCreateTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postTable = async (body: NewTable) => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.from("Tables").insert({
        business_id: body.businessId,
        name: body.name,
        min_capacity: body.minCapacity,
        max_capacity: body.maxCapacity,
        active: body.active,
      });

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

  return { postTable, loading, error };
};
