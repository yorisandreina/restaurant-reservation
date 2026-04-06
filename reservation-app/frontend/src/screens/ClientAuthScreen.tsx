import { Alert, AlertTitle } from "@/components/ui/alert";
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
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const { fetchBusinessByUserId } = useBusiness();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage(null);
    setSubmitting(true);

    try {
      const { user, error } = await login(email, password);

      if (error || !user) {
        setMessage("Credenciales inválidas.");
        setSubmitting(false);
        return;
      }

      const business = await fetchBusinessByUserId(user.id);

      if (!business) {
        setMessage("No se encontró un negocio asociado a este usuario.");
        setSubmitting(false);
        return;
      }

      localStorage.setItem("userId", user.id);
      toast.success("Credenciales correctas.");

      navigate("/client-home");
    } catch (err: any) {
      setMessage(err?.message || "Ha ocurrido un error al iniciar sesión.");
      setSubmitting(false);
    }
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

        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
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
                  disabled={submitting}
                  required
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full mt-5" disabled={submitting}>
              {submitting ? <Spinner /> : "Iniciar sesión"}
            </Button>
            {message && (
              <Alert
                variant="default"
                className="w-full mt-5 border-none justify-center flex bg-red-100 text-red-700"
              >
                <AlertTitle>{message}</AlertTitle>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ClientAuthScreen;
