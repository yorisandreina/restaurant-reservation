import { useState, useEffect } from "react";

interface Params {
  businessId: number;
}

export const useGetReservations = (params: Params) => {
  const [reservationData, setReservationData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!params.businessId) {
        setError("Todos los campos son obligatorios");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/reservations?business_id=${params.businessId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const errorBody = await res.text();
          throw new Error(`HTTP ${res.status} ${res.statusText}: ${errorBody}`);
        }

        const data = await res.json();
        setReservationData(data);
      } catch (err: any) {
        console.error("Error fetching reservations:", err);
        setError(err.message || "Error desconocido");
        setReservationData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [params.businessId]);

  return { reservationData, loading, error };
};
