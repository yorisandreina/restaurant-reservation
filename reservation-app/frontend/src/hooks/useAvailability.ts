import { useEffect, useState } from "react";

export const useAvailability = (
  businessId: number,
  date: string,
  people: number
) => {
  const [availability, setAvailability] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!businessId || !date || !people) return;

    const fetchAvailability = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          business_id: businessId.toString(),
          date,
          people: people.toString(),
        });
        const res = await fetch(`/api/availability?${params.toString()}`);
        if (!res.ok) {
          const errorBody = await res.text();
          throw new Error(`HTTP ${res.status} ${res.statusText}: ${errorBody}`);
        }
        const data: any = await res.json();
        setAvailability(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching availability:", err);
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
