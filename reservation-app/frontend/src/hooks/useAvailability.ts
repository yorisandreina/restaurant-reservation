import { supabase } from "@/lib/apiClient";
import { useState, useEffect } from "react";

interface TimeSlot {
  message?: string;
  hora: string;
  disponible: boolean;
  cantidad_mesas_disp: number;
  mesas_disponibles: [];
  mesa_sugerida: number;
}

export const useAvailability = (
  businessId: number,
  date: string,
  people: number
) => {
  const [availability, setAvailability] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!businessId || !date || !people) return;

    const fetchAvailability = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          business_id: businessId.toString(),
          date,
          people: people.toString(),
        });

        const {
          data: { session },
        } = await supabase.auth.getSession();

        const response = await fetch(
          `${
            import.meta.env.VITE_SUPABASE_URL
          }/functions/v1/check-availability?${params.toString()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
              apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            },
          }
        );

        const data = await response.json();
        setAvailability(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
        setAvailability([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [businessId, date, people]);

  return { availability, loading, error };
};
