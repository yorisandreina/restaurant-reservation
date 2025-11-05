import { useGetReservations } from "@/hooks/useGetReservations";
import React from "react";
import { Spinner } from "./ui/spinner";
import { Card, CardContent } from "./ui/card";
import { SquarePen, CircleX } from "lucide-react";

interface ReservationProps {
  businessId: number;
}

interface Reservation {
  id: number;
  created_at: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  people: number;
  status: string;
  table_id: number
}

const CurrentReservations: React.FC<ReservationProps> = ({ businessId }) => {
  const { loading, error, reservationData } = useGetReservations({businessId});

  if (loading) return (
    <div className="flex justify-center items-center w-full h-full mt-5">
      <Spinner className="size-8" />
    </div>
  );
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="flex flex-col gap-4 items-center p-5">
      {reservationData?.data
        ?.slice()
        .sort(
          (a: Reservation, b: Reservation) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .map((reservation: Reservation) => (
          <Card className="w-full max-w-sm text-left" key={reservation.id}>
            <CardContent>
              <div className="flex flex-row justify-between items-center mb-1">
                <strong>{reservation.name}</strong>
                <div className="flex flex-row items-center gap-2">
                  <CircleX
                    size={20}
                    color="#e20404"
                    className="cursor-pointer"
                  />
                </div>
              </div>
              <p className="mb-1">
                {formatDate(reservation.date)} | {reservation.time}
              </p>
              <div className="flex flex-row justify-between items-center gap-2">
                <p>{reservation.phone}</p>
                <p
                  className={
                    reservation.status === "CONFIRMED"
                      ? "text-green-500"
                      : reservation.status === "CANCELLED"
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  {reservation.status}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );

}

export default CurrentReservations;
