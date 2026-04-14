import { supabase } from "@/lib/apiClient";
import { useState, useEffect } from "react";

interface Params {
  businessId: number;
  refreshKey: number;
}

interface Reservation {
  id: number;
  created_at: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  people: number;
  status: string;
  table_id: number;
  table_name: { name: string };
}

export const useGetReservations = (params: Params) => {
  const [reservationData, setReservationData] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!params.businessId) {
        setError("Business ID es obligatorio.");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const today = new Date().toISOString().split("T")[0];
        const { data, error } = await supabase
          .from("Reservations")
          .select(
            `
            id,
            created_at,
            name,
            phone,
            date,
            time,
            people,
            status,
            table_id,
            table_name:Tables(name)         
          `
          )
          .eq("business_id", params.businessId)
          .gte("date", today)
          .order("date", { ascending: true });

        if (error) {
          setError(error.message);
          setReservationData([]);
          return;
        }

        setReservationData((data as any) || []);
      } catch (err: any) {
        console.error("Error fetching reservations:", err);
        setError(err.message || "Error desconocido");
        setReservationData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [params.businessId, params.refreshKey]);

  return { reservationData, loading, error };
};