import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface TableFormProps {
  onSubmit: (data: {
    name: string;
    minCapacity: number;
    maxCapacity: number;
    active: boolean;
  }) => void;
}

const TableForm: React.FC<TableFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [minCapacity, setMinCapacity] = useState<number>(1);
  const [maxCapacity, setMaxCapacity] = useState<number>(4);
  const [active, setActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, minCapacity, maxCapacity, active });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <div>
        <Label htmlFor="name">Nombre de la mesa</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Mesa 1"
          className="mt-1 w-full"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="minCapacity">Capacidad mínima</Label>
          <Input
            id="minCapacity"
            type="number"
            value={minCapacity}
            onChange={(e) => setMinCapacity(Number(e.target.value))}
            className="mt-1 w-full"
            min={1}
          />
        </div>

        <div className="flex-1">
          <Label htmlFor="maxCapacity">Capacidad máxima</Label>
          <Input
            id="maxCapacity"
            type="number"
            value={maxCapacity}
            onChange={(e) => setMaxCapacity(Number(e.target.value))}
            className="mt-1 w-full"
            min={1}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="active"
          checked={active}
          onCheckedChange={(checked) => setActive(checked as boolean)}
        />
        <Label htmlFor="active">Mesa activa</Label>
      </div>

      <Button type="submit" className="w-full mt-4">
        Agregar mesa
      </Button>
    </form>
  );
};

export default TableForm;
