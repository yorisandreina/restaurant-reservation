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
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ClientAuthScreen = () => {
  const navigate = useNavigate();  
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const { signup, login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignup) {
      const res = await signup(email, password);
      if (!res) return;
      
      navigate("/client-details");
      return;
    }
    
    const res = await login(username, password);
    if (!res) return;

    navigate("/client-home")
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-sm text-left">
        <CardHeader>
          <CardTitle className="text-xl">¡Bienvenido!</CardTitle>
          <CardDescription>
            {isSignup
              ? "Ingresa tu email y contraseña para crear una cuenta."
              : "Ingresa tu usuario y contraseña para acceder a tu cuenta."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {isSignup ? (
                ""
              ) : (
                <div className="grid gap-2">
                  <Label htmlFor="username">Usuario</Label>
                  <Input
                    id="username"
                    type="username"
                    value={username}
                    placeholder="0x-xxx"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              )}
              {isSignup ? (
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="m@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              ) : (
                ""
              )}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Olvidé mi contraseña
                  </a> */}
                </div>
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
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            {loading ? <Spinner className="size-5" /> : "Acceder"}
          </Button>
          {!isSignup ? <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsSignup(true)}
          >
            {loading ? <Spinner className="size-5" /> : "Crear una cuenta"}
          </Button> : ""}
          {error && <p className="text-red-500">{error}</p>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ClientAuthScreen;
