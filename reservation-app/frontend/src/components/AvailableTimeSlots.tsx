import React, { useState } from "react";
import { useAvailability } from "../hooks/useAvailability";
import { Button } from "./ui/button";

interface AvailabilityDisplayProps {
  businessId: number;
  date: string;
  people: number;
}

interface TimeSlot {
  hora: string;
  disponible: boolean;
  available_tables: number;
}

const AvailableTimeSlots: React.FC<AvailabilityDisplayProps> = ({
  businessId,
  date,
  people,
}) => {
  const { availability, loading, error } = useAvailability(
    businessId,
    date,
    people
  );

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  console.log(selectedTime)

  if (!date || !people) {
    return <p>Seleccione fecha y cantidad de personas</p>;
  }

  if (loading) return <p>Cargando disponibilidad...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!availability || availability.length === 0)
    return <p>No hay franjas disponibles</p>;

  return (
    <div className="flex flex-wrap gap-2 w-sm justify-center">
      {availability.map((slot: TimeSlot) => (
        <Button
          key={slot.hora}
          onClick={() => slot.disponible && setSelectedTime(slot.hora)}
          className={`px-3 py-2 rounded-md border font-medium text-black w-20
            ${
              slot.disponible
                ? "bg-green-100 border-green-400 hover:bg-green-100"
                : "bg-red-100 border-red-400 cursor-not-allowed hover:bg-red-100"
            }
            ${selectedTime === slot.hora ? "ring-1 ring-neutral-400" : ""}
          `}
          disabled={!slot.disponible}
        >
          {slot.hora} {slot.disponible ? "" : "❌"}
        </Button>
      ))}
    </div>
  );
};

export default AvailableTimeSlots;
