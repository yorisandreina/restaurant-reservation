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
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const ClientAuthScreen = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [username, setUsername] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isSetPassword, setIsSetPassword] = useState(false);
  const [message, setMessage] = useState("");

  const { signup, validate, login, getCurrentUser, loading, error } = useAuth();

  useEffect(() => {
    localStorage.removeItem("businessId");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignup && !isSetPassword) {
      const res = await validate(username);
      if (!res) return;
      if (res.res === 0) {
        setIsValidated(true);
        setIsSetPassword(true);
      } else {
        setMessage(res.message);
      }

      return;
    }

    if (isSetPassword && isSignup) {
      if (password !== passwordVal) {
        setMessage("Las contraseñas deben ser iguales.");
        return;
      }

      const res = await signup(username, password);
      if (!res) return;

      await getCurrentUser();

      navigate("/client-home");
      return;
    }
    
    const res = await login(username, password);
    if (!res) return;

    await getCurrentUser();

    console.log("Login response:", res);
    console.log("businessId:", localStorage.getItem("businessId"));

    navigate("/client-home")
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-sm text-left">
        <CardHeader>
          <CardTitle className="text-xl">
            {isSignup ? "Validar mi cuenta" : "¡Bienvenido de vuelta!"}
          </CardTitle>
          <CardDescription>
            {isSignup
              ? "Ingresa tu usuario validar la cuenta."
              : "Ingresa tu usuario y contraseña para acceder a tu cuenta."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {!isSignup && (
                <div className="grid gap-2">
                  <Label htmlFor="email">Usuario</Label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              )}
              {isSignup && (
                <>
                  <div className="grid gap-2">
                    <Label>Usuario</Label>
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  {isValidated && (
                    <div>
                      <div className="grid gap-2">
                        <Label>Contraseña</Label>
                        <Input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div className="grid gap-2 mt-5">
                        <Label>Repetir Contraseña</Label>
                        <Input
                          type="password"
                          value={passwordVal}
                          onChange={(e) => setPasswordVal(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
              {!isSignup && (
                <div className="grid gap-2">
                  <Label>Contraseña</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {isSignup ? (
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              {loading ? <Spinner className="size-5" /> : "Validar"}
            </Button>
          ) : (
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              {loading ? <Spinner className="size-5" /> : "Acceder"}
            </Button>
          )}
          {!isSignup ? (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsSignup(true)}
            >
              Validar mi usuario
            </Button>
          ) : (
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setIsSignup(false)}
            >
              Ya tengo cuenta
            </Button>
          )}
          <div>
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-red-500">{message}</p>}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ClientAuthScreen;
