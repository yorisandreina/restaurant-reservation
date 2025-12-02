import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface Props {
  value: string;
  showLabel?: boolean;
  onChange: (value: string) => void;
}

const DatePicker: React.FC<Props> = ({ value, showLabel, onChange }) => {
  const [open, setOpen] = React.useState(false);

  const selectedDate = value ? new Date(value) : undefined;

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange(format(date, "yyyy-MM-dd"));
    }
    setOpen(false);
  };

  return (
    <div className="flex gap-2 items-center">
      {showLabel && <label className="text-sm font-small text-gray-400">Fecha</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            size="lg"
            className="justify-between font-normal hover:bg-transparent"
          >
            {selectedDate
              ? selectedDate.toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
              : "Seleccionar fecha"}
            <ChevronDownIcon color="gray" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            onSelect={handleSelect}
            disabled={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0))
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
