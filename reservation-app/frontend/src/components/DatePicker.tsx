import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const DatePicker: React.FC<Props> = ({ value, onChange }) => (
  <div className="flex flex-col items-center mb-4">
    <label className="text-sm font-medium mb-2">Fecha</label>
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-md px-3 py-2"
    />
  </div>
);

export default DatePicker;
