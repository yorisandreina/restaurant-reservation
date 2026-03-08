import { supabase } from "@/lib/apiClient";
import { useEffect, useState } from "react";

interface Params {
  businessId: number;
  refreshKey: number;
}

interface Table {
  id: number;
  name: string;
  min_capacity: number;
  max_capacity: number;
  active: boolean;
}

export const useGetTables = (params: Params) => {
  const [data, setData] = useState<Table[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTables = async () => {
      if (!params.businessId) {
        setError("Business ID es obligatorio.");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("Tables")
          .select("id, name, min_capacity, max_capacity, active")
          .eq("business_id", params.businessId)
          .order("name", { ascending: true });

        if (error) {
          setError(error.message);
          setData([]);
          return;
        }

        setData(data || []);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, [params.businessId, params.refreshKey]);

  return { data, loading, error };
};
