import { useState } from "react";

interface ReservationParams {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  date: string;
  people: number;
  time: string;
  businessId: number;
  tableId: number;
}
// add filter by businessId
export const useReservation = () => {
  const [reservation, setReservation] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReservation = async (params: ReservationParams) => {
    const { name, lastName, phone, email, date, people, time, businessId, tableId } =
      params;

    if (
      !name ||
      !lastName ||
      !phone ||
      !email ||
      !date ||
      !people ||
      !time ||
      !businessId ||
      !tableId
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/reservation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_id: businessId,
          table_id: tableId,
          date,
          people,
          name,
          lastName,
          phone,
          email,
          time,
        }),
      });

      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`HTTP ${res.status} ${res.statusText}: ${errorBody}`);
      }
      const data = await res.json();
      setReservation(data);
      return true;
    } catch (err: any) {
      console.error("Error creating reservation:", err);
      setError(err.message || "Error desconocido");
      setReservation(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { reservation, loading, error, createReservation };
};
