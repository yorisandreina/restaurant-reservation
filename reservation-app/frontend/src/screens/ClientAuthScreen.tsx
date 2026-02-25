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
import { useAuth } from "@/hooks/useAuth";
import { useBusiness } from "@/hooks/useBusiness";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ClientAuthScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>();

  const { login, loading, error } = useAuth();
  const { fetchBusinessByUserId } = useBusiness();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await login(email, password);
    if (!user) {
      setMessage(error);
      return;
    }

    const business = await fetchBusinessByUserId(user.id);
    if (!business) {
      setMessage("No se encontró un negocio asociado a este usuario.");
      return;
    }

    localStorage.setItem("userId", user.id);
    toast.success("Credenciales correctas.");
    navigate("/client-home");
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-sm text-left">
        <CardHeader>
          <CardTitle className="text-xl">¡Bienvenido de vuelta!</CardTitle>
          <CardDescription>
            Ingresa tu correo y contraseña para acceder a tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            {loading ? <Spinner /> : "Iniciar sesión"}
          </Button>
          {message && <p className="text-red-500 text-sm">{message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ClientAuthScreen;