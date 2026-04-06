import { supabase } from "@/lib/apiClient";
import { useState } from "react";

interface TimeSlotInput {
  businessId: number;
  dow: number;
  closed: boolean;
  startTime: string;
  endTime: string;
  slotMin: number;
  maxDuration: number;
}

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const validateTimeSlot = (day: TimeSlotInput): string | null => {
  if (day.closed) return null;

  if (!day.startTime || !day.endTime) {
    return `El día ${day.dow} debe tener hora de inicio y fin.`;
  }

  if (!day.slotMin || day.slotMin <= 0) {
    return `El día ${day.dow} tiene un slot inválido.`;
  }

  if (!day.maxDuration || day.maxDuration <= 0) {
    return `El día ${day.dow} tiene una duración máxima inválida.`;
  }

  const startMinutes = timeToMinutes(day.startTime);
  let endMinutes = timeToMinutes(day.endTime);

  const closesAtMidnight = day.endTime === "00:00";
  if (closesAtMidnight) {
    endMinutes = 24 * 60;
  }

  if (!closesAtMidnight && endMinutes <= startMinutes) {
    return `El día ${day.dow} tiene una hora de fin anterior o igual a la de inicio.`;
  }

  const openMinutes = endMinutes - startMinutes;

  if (openMinutes < day.maxDuration) {
    return `El día ${day.dow} no permite reservas: la duración máxima excede la franja horaria.`;
  }

  if (day.slotMin > day.maxDuration) {
    return `El día ${day.dow} tiene un slot mayor que la duración máxima.`;
  }

  return null;
};

export const useCreateTimeSlots = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postTimeSlots = async (body: TimeSlotInput[]) => {
    try {
      setLoading(true);
      setError(null);

      for (const day of body) {
        const validationError = validateTimeSlot(day);
        if (validationError) {
          setError(validationError);
          return false;
        }
      }

      const { error } = await supabase.from("Time Slots").insert(
        body.map((d) => ({
          business_id: d.businessId,
          dow: d.dow,
          closed: d.closed,
          start_time: d.startTime,
          end_time: d.endTime,
          slot_min: d.slotMin,
          max_duration: d.maxDuration,
        }))
      );

      if (error) {
        setError(error.message);
        return false;
      }

      return true;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { postTimeSlots, loading, error };
};
