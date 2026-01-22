import { apiClient } from "@/lib/apiClient";
import { useEffect, useState } from "react";

interface Params {
  businessId: number;
  refreshKey: number;
}

interface TimeSlot {
  businessId: number;
  dow: number;
  closed: boolean;
  startTime: string;
  endTime: string;
  slotMin: number;
  maxDuration: number;
}

export const getTimeSlots = (params: Params) => {
  const [slots, setSlots] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!params.businessId) {
        setError("Todos los campos son obligatorios");
        return;
      }

      try {
        setLoading(true);

        const data = await apiClient(
          `/time-slots?business_id=${params.businessId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        setSlots(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching time-slots:", err);
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [params.businessId, params.refreshKey]);

  return { slots, loading, error };
};

export const createTimeSlots = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const postTimeSlots = async (body: TimeSlot[]) => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      console.log('time slot body', body)

      const data = await apiClient("/set-time-slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          body.map((d) => ({
            business_id: d.businessId,
            dow: d.dow,
            closed: d.closed,
            start_time: d.startTime,
            end_time: d.endTime,
            slot_min: d.slotMin,
            max_duration: d.maxDuration,
          }))
        ),
      });


      if (data?.message) {
        setMessage(data.message);
      }

      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postTimeSlots, loading, error, message };
};
