import React from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const PeoplePicker: React.FC<Props> = ({ value, onChange }) => (
  <div className="flex flex-col items-left">
    <label className="text-sm font-medium mb-2 text-gray-400">Personas</label>
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="border rounded-md bg-white shadow-sm focus:outline-none px-3 py-2 w-30"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>
  </div>
);

export default PeoplePicker;
