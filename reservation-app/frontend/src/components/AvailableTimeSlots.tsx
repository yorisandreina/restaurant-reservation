import React from "react";
import { useAvailability } from "../hooks/useAvailability";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

interface AvailabilityDisplayProps {
  businessId: number;
  date: string;
  people: number;
  value: string;
  tableId: number;
  onChange: (value: string, tableId: number) => void;
}

interface TimeSlot {
  hora: string;
  disponible: boolean;
  cantidad_mesas_disp: number;
  mesas_disponibles: [];
  mesa_sugerida: number;
}

const AvailableTimeSlots: React.FC<AvailabilityDisplayProps> = ({
  businessId,
  date,
  people,
  value,
  onChange
}) => {
  const { availability, loading, error } = useAvailability(
    businessId,
    date,
    people
  );

  if (!date || !people) {
    return <p className="text-sm">Seleccione fecha y cantidad de personas.</p>;
  }

  if (loading) return <Spinner className="size-8"/>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!availability || availability.length === 0)
    return <p>No hay disponibilidad en esa fecha.</p>;
  if (availability.length === 1 && availability[0].message) {
    return <p className="w-sm">{availability[0].message} Puedes llamarnos para ayudarte con la solicitud.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2 w-sm justify-center">
      {availability[0].hora &&
        availability.map((slot: TimeSlot) => (
          <Button
            key={slot.hora}
            onClick={() =>
              slot.disponible && onChange(slot.hora, slot.mesa_sugerida)
            }
            className={`px-3 py-2 rounded-md border font-medium text-black w-20
            ${
              slot.disponible
                ? "bg-green-100 border-green-400 hover:bg-green-100"
                : "bg-gray-100 border-gray-400 cursor-not-allowed hover:bg-gray-100"
            }
            ${value === slot.hora ? "ring-1 ring-neutral-400" : ""}
          `}
            disabled={!slot.disponible}
          >
            {slot.hora}
          </Button>
        ))}
    </div>
  );
};

export default AvailableTimeSlots;
