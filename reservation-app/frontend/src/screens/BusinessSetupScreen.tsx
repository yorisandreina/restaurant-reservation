import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useBusinessSetup } from "@/hooks/useBusinessSetup";
import { ShieldOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BusinessSetupScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const { createBusiness, authorized, loading, error } = useBusinessSetup();

  if (authorized === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 text-center p-4">
        <ShieldOff className="size-12 text-muted-foreground" />{" "}
        <h2 className="text-lg font-semibold">Acceso no autorizado</h2>
        <p className="text-sm text-muted-foreground">
          No tienes permiso para acceder a esta página.
        </p>
        <Button variant="outline" onClick={() => navigate("/client-auth")}>
          Volver al inicio
        </Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !address) {
      setMessage("Por favor completa todos los campos.");
      return;
    }

    const success = await createBusiness({ name, phone, address });

    if (!success) {
      setMessage(error);
      return;
    }

    toast.success("Datos del negocio guardados correctamente.");
    navigate("/client-auth");
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-sm text-left">
        <CardHeader>
          <CardTitle className="text-xl">Configura tu negocio</CardTitle>
          <CardDescription>
            Ingresa los datos de tu negocio para comenzar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre del negocio</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Spinner className="size-5" /> : "Continuar"}
          </Button>
          {message && <p className="text-red-500 text-sm">{message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default BusinessSetupScreen;
