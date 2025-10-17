import React from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const PeoplePicker: React.FC<Props> = ({ value, onChange }) => (
  <div className="flex flex-col items-center mb-4">
    <label className="text-sm font-medium mb-2">Número de personas</label>
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="border rounded-md px-3 py-2"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
        <option key={n} value={n}>
          {n} {n === 1 ? "persona" : "personas"}
        </option>
      ))}
    </select>
  </div>
);

export default PeoplePicker;
