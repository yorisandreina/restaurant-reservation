// src/components/BookingDetailsModal.tsx
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

interface BookingDetailsModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    name: string;
    lastName: string;
    phone: string;
    email: string;
  }) => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = React.useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Datos de la reserva</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-3">
          <Input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
          />
          <Input
            name="lastName"
            placeholder="Apellido"
            value={form.lastName}
            onChange={handleChange}
            className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
          />
          <Input
            name="phone"
            placeholder="Teléfono"
            value={form.phone}
            onChange={handleChange}
            className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
          />
          <Input
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
          />
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsModal;
