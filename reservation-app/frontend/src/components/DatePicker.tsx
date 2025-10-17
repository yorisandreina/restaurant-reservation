import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const DatePicker: React.FC<Props> = ({ value, onChange }) => (
  <div className="flex flex-col items-left">
    <label className="text-sm font-medium mb-2 text-gray-400">Fecha</label>
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-md bg-white shadow-sm focus:outline-none px-3 py-2"
    />
  </div>
);

export default DatePicker;
