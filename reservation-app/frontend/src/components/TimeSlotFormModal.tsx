// src/components/BookingDetailsModal.tsx
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Spinner } from "./ui/spinner";

interface TimeSlotFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    form: {
      dow: number;
      closed: boolean;
      startTime: string;
      endTime: string;
      slotMin: number;
      maxDuration: number;
    }[]
  ) => void;
  loading: boolean;
  error: string | null;
}


interface DaySlot {
  dow: number;
  closed: boolean;
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  slotMin: number;
  maxDuration: number;
}

const daysOfWeek = [
  { dow: 1, label: "Lunes" },
  { dow: 2, label: "Martes" },
  { dow: 3, label: "Miércoles" },
  { dow: 4, label: "Jueves" },
  { dow: 5, label: "Viernes" },
  { dow: 6, label: "Sábado" },
  { dow: 7, label: "Domingo" },
];

const TimeSlotFormModal: React.FC<TimeSlotFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  loading,
  error,
}) => {
  const [form, setForm] = React.useState(
    daysOfWeek.map((day) => ({
      dow: day.dow,
      closed: false,
      startTime: "00:00",
      endTime: "00:00",
      slotMin: 0,
      maxDuration: 0,
    }))
  );

  const handleChange = (
    index: number,
    field: keyof DaySlot,
    value: string | number | boolean
  ) => {
    setForm((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        [field]: value as any,
      };
      return next;
    });
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Configurar horarios</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 overflow-y-auto pr-1 max-h-[70vh]">
          {form.map((day: any, index: number) => (
            <div
              key={day.dow}
              className="border p-3 rounded-lg flex flex-col gap-3 bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <Label className="font-medium">{daysOfWeek[index].label}</Label>
                <div className="flex items-center gap-2">
                  <Label htmlFor={`closed-${day.dow}`} className="text-sm">
                    Cerrado
                  </Label>
                  <Switch
                    id={`closed-${day.dow}`}
                    checked={day.closed}
                    onCheckedChange={(checked) =>
                      handleChange(index, "closed", checked)
                    }
                  />
                </div>
              </div>

              {!day.closed && (
                <div className="grid grid-cols-4 gap-3">
                  <div className="flex flex-col gap-2">
                    <Label>Inicio</Label>
                    <Input
                      type="time"
                      value={day.startTime}
                      onChange={(e) =>
                        handleChange(index, "startTime", e.target.value)
                      }
                      className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>Fin</Label>
                    <Input
                      type="time"
                      value={day.endTime}
                      onChange={(e) =>
                        handleChange(index, "endTime", e.target.value)
                      }
                      className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>Slot (min)</Label>
                    <Input
                      type="number"
                      value={day.slotMin}
                      onChange={(e) =>
                        handleChange(index, "slotMin", e.target.value)
                      }
                      className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>Duración máx. (min)</Label>
                    <Input
                      type="number"
                      value={day.maxDuration}
                      onChange={(e) =>
                        handleChange(index, "maxDuration", e.target.value)
                      }
                      className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <DialogFooter className="mt-4 flex justify-end gap-2">
          {error && <p className="text-red-500 mr-auto">{error}</p>}
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimeSlotFormModal;
