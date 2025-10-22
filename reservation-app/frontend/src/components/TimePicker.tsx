import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const TimePicker: React.FC<Props> = ({ value, onChange }) => (
  <div className="flex flex-col items-left">
    <label className="text-sm font-small mb-2 text-gray-400">Hora</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-md bg-white shadow-sm focus:outline-none px-3 py-2 w-full"
    >
      {Array.from({ length: 7 }, (_, i) => 12 + i).map((hour) => (
        <option key={hour} value={hour}>
          {`${hour}:00`}
        </option>
      ))}
    </select>
  </div>
);

export default TimePicker;
