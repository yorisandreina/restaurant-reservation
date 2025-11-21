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
import { useState } from "react";

const NewClientDetailsScreen = () => {
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

/*   const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(username, password);

  }; */

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-sm text-left">
        <CardHeader>
          <CardTitle className="text-xl">Datos de la compañía</CardTitle>
          <CardDescription>
            Por favor ingresa los datos asociados a tu compañía.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre de la compañía</Label>
                <Input
                  id="name"
                  type="name"
                  value={companyName}
                  placeholder="0x-xxx"
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  type="address"
                  value={address}
                  placeholder="0x-xxx"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="phone">Número de teléfono</Label>
                </div>
                <Input
                  id="phone"
                  type="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Continuar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewClientDetailsScreen;
