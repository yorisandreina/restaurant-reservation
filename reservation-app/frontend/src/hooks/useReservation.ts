import { supabase } from "@/lib/apiClient";
import { useEffect, useState } from "react";

interface ReservationParams {
  name: string;
  phone: string;
  email: string;
  date: string;
  people: number;
  time: string;
  businessId: number;
  tableId: number;
  businessName?: string | null;
}

export const useReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReservation = async (params: ReservationParams) => {
    const {
      name,
      phone,
      email,
      date,
      people,
      time,
      businessId,
      tableId,
      businessName,
    } = params;

    if (
      !name ||
      !phone ||
      !email ||
      !date ||
      !people ||
      !time ||
      !businessId ||
      !tableId ||
      businessName != null
    ) {
      setError("Todos los campos son obligatorios");
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.from("Reservations").insert({
        business_id: businessId,
        table_id: tableId,
        date,
        people,
        name,
        phone,
        email,
        time,
        status: "CONFIRMED",
      });

      if (error) {
        setError(error.message);
        return false;
      }

      return true;
    } catch (err: any) {
      console.error("Error creating reservation:", err);
      setError(err.message || "Error desconocido");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  return { loading, error, createReservation };
};
