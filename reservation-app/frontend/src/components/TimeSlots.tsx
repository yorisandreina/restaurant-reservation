import React from "react";
import { Spinner } from "./ui/spinner";
import { Card, CardContent } from "./ui/card";
import { Info } from "lucide-react";
import { getTimeSlots } from "@/hooks/useTimeSlots";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import EmptyState from "./EmptyState";

interface TimeSlotProps {
  businessId: number;
  refreshKey: number;
  onSlotsStatusChange?: (hasSlots: boolean) => void;
}

interface TimeSlot {
  id: number;
  dow: number;
  start_time: string;
  end_time: string;
  slot_min: number;
  max_duration: number;
}

const TimeSlots: React.FC<TimeSlotProps> = ({ businessId, refreshKey, onSlotsStatusChange }) => {
  const { loading, error, slots } = getTimeSlots({businessId, refreshKey});

  React.useEffect(() => {
    if (onSlotsStatusChange) {
      const hasData = Array.isArray(slots?.data) && slots.data.length > 0;
      onSlotsStatusChange(hasData);
    }
  }, [slots, onSlotsStatusChange]);

  const getDayName = (dow: number) => {
    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    return days[dow - 1];
  };

  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-full mt-5">
        <Spinner className="size-8" />
      </div>
    );

  if (error) return <p className="text-red-500">Error: {error}</p>;

    if (!slots?.data || slots?.data.length === 0)
      return (
        <div className="py-10">
          <EmptyState
            iconName="ClockAlert"
            header="No hay horarios"
            description="Aún no hay horarios registrados."
          />
        </div>
      );

  return (
    <div className="flex flex-col w-full gap-4 items-center p-2">
      <Card className="py-5 px-2">
        {slots?.data.map((timeSlot: TimeSlot) => (
          <CardContent key={timeSlot.id}>
            <div className="flex flex-row w-xs items-center justify-between">
              <p>{getDayName(timeSlot.dow)}</p>
              <div className="flex flex-row gap-2 items-center">
                <p>
                  {timeSlot.start_time} - {timeSlot.end_time}
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info
                        size={18}
                        color="#999999"
                        className="cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-500 text-background p-2 rounded-sm">
                      <div className="text-sm">
                        <p>
                          <strong>Duración del slot:</strong>{" "}
                          {timeSlot.slot_min} min
                        </p>
                        <p>
                          <strong>Duración máx.:</strong>{" "}
                          {timeSlot.max_duration} min
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        ))}
      </Card>
    </div>
  );
};

export default TimeSlots;
