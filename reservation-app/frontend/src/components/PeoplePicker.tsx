import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const PeoplePicker: React.FC<Props> = ({ value, onChange }) => (
  <div className="flex items-center gap-2">
    <label className="text-sm font-small text-gray-400">Pax</label>
    <Select value={value?.toString()} onValueChange={(e) => onChange(Number(e))}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={value?.toString()} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <SelectItem key={n} value={n.toString()}>
              {n}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

export default PeoplePicker;
