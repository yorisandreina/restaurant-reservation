import { supabase } from "@/lib/apiClient";
import { useEffect, useState } from "react";

interface Params {
  businessId: number;
  refreshKey: number;
}

interface TimeSlot {
  id: number;
  dow: number;
  closed: boolean;
  start_time: string;
  end_time: string;
  slot_min: number;
  max_duration: number;
}

export const useGetTimeSlots = (params: Params) => {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!params.businessId) {
        setError("Business ID es obligatorio.");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("Time Slots")
          .select(
            "id, dow, closed, start_time, end_time, slot_min, max_duration"
          )
          .eq("business_id", params.businessId)
          .order("dow", { ascending: true });

        if (error) {
          setError(error.message);
          setSlots([]);
          return;
        }

        setSlots(data || []);
      } catch (err: any) {
        console.error("Error fetching time slots:", err);
        setError(err.message || "Error desconocido");
        setSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [params.businessId, params.refreshKey]);

  return { slots, loading, error };
};
