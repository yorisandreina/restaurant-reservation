import React from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const PeoplePicker: React.FC<Props> = ({ value, onChange }) => (
  <div className="flex items-center gap-2">
    <label className="text-sm font-small mb-2 text-gray-400">Pax</label>
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="border rounded-md bg-white shadow-sm focus:outline-none px-3 py-2 w-full"
    >
      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>
  </div>
);

export default PeoplePicker;
