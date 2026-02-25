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
import { supabase } from "@/lib/apiClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SetPasswordScreen = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordValidation, setPasswordValidation] = useState<string>('');
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

   useEffect(() => {
     const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
            setReady(true);
        }
     });

     return () => subscription.unsubscribe();
   }, []);

   const handleSetPassword = async () => {
     if (!ready) {
       setError("Sesión inválida o expirada.");
       return;
     }

     if (password !== passwordValidation) {
       setError("Las contraseñas deben ser iguales.");
       return;
     }

     try {
       setLoading(true);
       setError(null);

       const { error } = await supabase.auth.updateUser({ password });

       if (error) {
         setError(error.message);
         return;
       }

       navigate("/client-home");
     } finally {
       setLoading(false);
     }
   };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-sm text-left">
        <CardHeader>
          <CardTitle className="text-xl">Crear contraseña</CardTitle>
          <CardDescription>
            Por favor crea una contraseña para tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Contraseña</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Repetir Contraseña</Label>
                <Input
                  type="password"
                  value={passwordValidation}
                  onChange={(e) => setPasswordValidation(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="button"
            className="w-full"
            onClick={handleSetPassword}
            disabled={loading}
          >
            {loading ? <Spinner className="size-5" /> : "Continuar"}
          </Button>
          <div>{error && <p className="text-red-500">{error}</p>}</div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SetPasswordScreen;
