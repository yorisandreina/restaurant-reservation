import React from "react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import DatePicker from "./DatePicker";

interface Props {
  filters: {
    search: string;
    status: string;
    date: string;
  };
  onChange: (newFilters: any) => void;
}

const ReservationFilter: React.FC<Props> = ({ filters, onChange }) => {
  return (
    <div className="w-full max-w-sm mb-1 mt-1 flex flex-row gap-3">
      <Input
        type="text"
        value={filters.search}
        placeholder="Nombre"
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
      />
      <Select
        value={filters.status || "TODOS"}
        onValueChange={(newStatus) => onChange({ ...filters, status: newStatus })}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={filters.status} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="TODOS">Todos</SelectItem>
            <SelectItem value="CONFIRMED">Confirmados</SelectItem>
            <SelectItem value="CANCELLED">Cancelados</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <DatePicker
        value={filters.date}
        showLabel={false}
        onChange={(newDate) => onChange({ ...filters, date: newDate })}
      />
    </div>
  );
};

export default ReservationFilter;
