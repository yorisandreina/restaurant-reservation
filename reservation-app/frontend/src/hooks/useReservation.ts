import { apiClient } from "@/lib/apiClient";
import { useEffect, useState } from "react";

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
  businessName: string | null;
}

export const useReservation = () => {
  const [reservation, setReservation] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReservation = async (params: ReservationParams) => {
    const { name, lastName, phone, email, date, people, time, businessId, tableId, businessName } =
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
      !tableId ||
      !businessName
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await apiClient(`/reservation`, {
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
          businessName: businessName
        }),
      });

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

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [error]);

  return { reservation, loading, error, createReservation };
};

export const eraseReservation = () => {
  const [reservation, setReservation] = useState<any | null>(null);
  const [loadingRes, setLoadingRes] = useState(false);
  const [errorRes, setErrorRes] = useState<string | null>(null);

  const deleteReservation = async (reservationId: number) => {
    if (!reservationId) {
      setErrorRes("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoadingRes(true);
      setErrorRes(null);

      const data = await apiClient(
        `/delete-reservation?reservations_id=${reservationId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      setReservation(data);
      return true;
    } catch (err: any) {
      console.error("Error creating reservation:", err);
      setErrorRes(err.message || "Error desconocido");
      setReservation(null);
      return false;
    } finally {
      setLoadingRes(false);
    }
  };

  return { reservation, loadingRes, errorRes, deleteReservation };
};