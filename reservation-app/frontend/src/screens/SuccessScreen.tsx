import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CircleCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservation = location.state?.reservation;

  return (
    <div className="p-4 text-center">
      <ArrowLeft onClick={() => navigate("/")} className="cursor-pointer" />
      <div className="flex items-center justify-center">
        <CircleCheck size={75} color="#01E107" />
      </div>
      <h1 className="text-2xl font-semibold my-4">
        ¡Reserva creada con éxito!
      </h1>
      {reservation && (
        <div className="flex items-center justify-center w-full">
          <Card className="w-full max-w-sm text-left">
            <CardHeader>
              <CardDescription>
                Recuerda que si no puedes asistir debes cancelar la reserva con
                antelación.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Nombre:</strong> {reservation.name}{" "}
                {reservation.lastName}
              </p>
              <p>
                <strong>Fecha:</strong> {reservation.date}
              </p>
              <p>
                <strong>Hora:</strong> {reservation.time}
              </p>
              <p>
                <strong>Personas:</strong> {reservation.people}
              </p>
              <p>
                <strong>Teléfono:</strong> {reservation.phone}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SuccessScreen;
