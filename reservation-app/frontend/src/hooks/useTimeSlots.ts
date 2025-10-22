import { useEffect, useState } from "react";

interface TimeSlot {
  id: number;
  day_of_week: string;
  time: string;
}

export const useTimeSlots = (date: string, people: number, time: number) => {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date) return;

    const fetchSlots = async () => {
      try {
        setLoading(true);
        const url = "/api/time-slots";
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
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
  }, [date, people]);

  return { slots, loading, error };
};
