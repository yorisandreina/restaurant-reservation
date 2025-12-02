import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { Spinner } from "./ui/spinner";

interface TableFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    name: string;
    minCapacity: number;
    maxCapacity: number;
    active: boolean;
  }) => void;
  loading: boolean;
  error: string | null;
}

const TableFormModal: React.FC<TableFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  loading,
  error,
}) => {
  const [form, setForm] = React.useState({
    name: "",
    minCapacity: 1,
    maxCapacity: 1,
    active: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Datos de la mesa</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-3">
          <Label htmlFor="name">Nombre</Label>
          <Input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
          />
          <Label htmlFor="minCapacity">Capacidad mínima</Label>
          <Input
            name="minCapacity"
            placeholder="Capacidad mínima"
            value={form.minCapacity}
            onChange={handleChange}
            className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
          />
          <Label htmlFor="maxCapacity">Capacidad máxima</Label>
          <Input
            name="maxCapacity"
            placeholder="Capacidad máxima"
            value={form.maxCapacity}
            onChange={handleChange}
            className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
          />
          {/* <div className="flex flex-row justify-between">
            <Label htmlFor="active">Mesa activa</Label>
            <Switch
              id="active"
              checked={form.active}
              onCheckedChange={(checked) =>
                setForm({ ...form, active: checked as boolean })
              }
            />
          </div> */}
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <Spinner className="size-5" /> : "Confirmar"}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TableFormModal;
