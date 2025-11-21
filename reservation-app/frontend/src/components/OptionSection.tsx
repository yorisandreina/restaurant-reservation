import React from "react";
import { Button } from "./ui/button";
import { FolderCog, CalendarPlus, CalendarCheck2 } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const OptionSection: React.FC<Props> = ({ value, onChange }) => (
  <div className="flex flex-row flex-wrap items-center justify-between gap-2 px-4">
    <Button
      className="w-full sm:w-auto"
      variant={value === "reservations" ? "default" : "outline"}
      size="sm"
      onClick={() => onChange("reservations")}
    >
      <CalendarCheck2 /> Reservas
    </Button>

    <Button
      className="w-full sm:w-auto"
      variant={value === "new" ? "default" : "outline"}
      size="sm"
      onClick={() => onChange("new")}
    >
      <CalendarPlus /> Nueva reserva
    </Button>

    <Button
      className="w-full sm:w-auto"
      variant={value === "settings" ? "default" : "outline"}
      size="sm"
      onClick={() => onChange("settings")}
    >
      <FolderCog /> Ajustes
    </Button>
  </div>
);

export default OptionSection;
