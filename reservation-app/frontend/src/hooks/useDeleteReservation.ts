import { supabase } from "@/lib/apiClient";
import { useState } from "react";

export const useDeleteReservation = () => {
  const [loadingRes, setLoadingRes] = useState(false);
  const [errorRes, setErrorRes] = useState<string | null>(null);

  const deleteReservation = async (reservationId: number) => {
    if (!reservationId) {
      setErrorRes("ID de reserva es obligatorio");
      return false;
    }

    try {
      setLoadingRes(true);
      setErrorRes(null);

      const { error } = await supabase
        .from("Reservations")
        .delete()
        .eq("id", reservationId);

      if (error) {
        setErrorRes(error.message);
        return false;
      }

      return true;
    } catch (err: any) {
      console.error("Error deleting reservation:", err);
      setErrorRes(err.message || "Error desconocido");
      return false;
    } finally {
      setLoadingRes(false);
    }
  };

  return { loadingRes, errorRes, deleteReservation };
};
