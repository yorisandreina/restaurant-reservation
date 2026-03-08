import { supabase } from "@/lib/apiClient";
import { useState } from "react";

interface TimeSlotInput {
  businessId: number;
  dow: number;
  closed: boolean;
  startTime: string;
  endTime: string;
  slotMin: number;
  maxDuration: number;
}

export const useCreateTimeSlots = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postTimeSlots = async (body: TimeSlotInput[]) => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.from("Time Slots").insert(
        body.map((d) => ({
          business_id: d.businessId,
          dow: d.dow,
          closed: d.closed,
          start_time: d.startTime,
          end_time: d.endTime,
          slot_min: d.slotMin,
          max_duration: d.maxDuration,
        }))
      );

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

  return { postTimeSlots, loading, error };
};
