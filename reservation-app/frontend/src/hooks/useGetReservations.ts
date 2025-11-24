import { apiClient } from "@/lib/apiClient";
import { useState, useEffect } from "react";

interface Params {
  businessId: number;
  refreshKey: number;
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

        const data = await apiClient(`/reservations?business_id=${params.businessId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

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
  }, [params.businessId, params.refreshKey]);

  return { reservationData, loading, error };
};
