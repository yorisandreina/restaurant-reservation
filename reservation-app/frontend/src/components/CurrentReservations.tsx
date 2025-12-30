import { useGetReservations } from "@/hooks/useGetReservations";
import React from "react";
import { Spinner } from "./ui/spinner";
import { Card, CardContent } from "./ui/card";
import { CircleX } from "lucide-react";
import { eraseReservation } from "@/hooks/useReservation";
import ConfirmationModal from "./ConfirmationModal";
import EmptyState from "./EmptyState";
import ReservationFilter from "./ReservationFilter";

interface ReservationProps {
  businessId: number;
  refreshKey: number;
  onRefresh: () => void;
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
  table_id: number;
  table_name: {
    name: string;
  };
}

const CurrentReservations: React.FC<ReservationProps> = ({ businessId, refreshKey, onRefresh }) => {
  const { loading, error, reservationData } = useGetReservations({
    businessId,
    refreshKey,
  });
  const { loadingRes, errorRes, deleteReservation } = eraseReservation();

  const [selectedReservationId, setSelectedReservationId] = React.useState<
    number | null
  >(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [filters, setFilters] = React.useState({
    search: "",
    status: "",
    date: "",
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleDeleteClick = (reservationId: number) => {
    setSelectedReservationId(reservationId);
    setModalOpen(true);
  };

  const handleConfirmDelete = async (confirmed: boolean) => {
    if (confirmed && selectedReservationId !== null) {
      const success = await deleteReservation(selectedReservationId);
      if (success) onRefresh();
    }
    setSelectedReservationId(null);
    setModalOpen(false);
  };

  if (loading || loadingRes)
    return (
      <div className="flex justify-center items-center w-full h-full mt-5">
        <Spinner className="size-8" />
      </div>
    );

  if (error || errorRes) return <p className="text-red-500">Error: {error}</p>;

  if (!reservationData?.data || reservationData?.data.length === 0)
    return (
      <div className="py-10">
        <EmptyState
          iconName="CalendarClock"
          header="No hay reservas"
          description="Aún no hay reservas registradas."
        />
      </div>
    );

  let list = reservationData?.data || [];

  list = list.filter((r: any) =>
    r.name.toLowerCase().includes(filters.search.toLowerCase())
  );

  if (filters.status && filters.status !== "TODOS") {
    list = list.filter((r: any) => r.status === filters.status);
  }

  if (filters.date)
    list = list.filter((r: any) => r.date.startsWith(filters.date));

  list = list.slice().sort((a: any, b: any) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  if (list.length === 0)
    return (
      <div className="flex flex-col gap-4 items-center p-5">
        <div className="w-full max-w-sm border-t border-gray-300"></div>
        <ReservationFilter filters={filters} onChange={setFilters} />
        <div className="py-10">
          <EmptyState
            iconName="CalendarClock"
            header="No hay reservas"
            description="Aún no hay reservas con estos filtros."
          />
        </div>
      </div>
    );

  const groupedByDate = list.reduce((groups: any, reservation: Reservation) => {
    const date = formatDate(reservation.date);
    if (!groups[date]) groups[date] = [];
    groups[date].push(reservation);
    return groups;
  }, {});

  return (
    <div className="flex flex-col gap-4 items-center p-5">
      <div className="w-full max-w-sm border-t border-gray-300"></div>
      <ReservationFilter filters={filters} onChange={setFilters} />
      {Object.keys(groupedByDate).map((date) => (
        <div key={date} className="w-full max-w-sm">
          <h2 className="flex justify-start text-lg font-semibold text-gray-400 mb-2">
            {date}
          </h2>

          {groupedByDate[date].map((reservation: Reservation) => (
            <Card className="w-full text-left mb-3" key={reservation.id}>
              <CardContent>
                <div className="flex flex-row justify-between items-center mb-1">
                  <strong>{reservation.name} | {reservation.table_name.name}</strong>
                  <CircleX
                    size={20}
                    color="#e20404"
                    className="cursor-pointer"
                    onClick={() => handleDeleteClick(reservation.id)}
                  />
                </div>

                <p className="mb-1">{reservation.time} - {reservation.people}pax</p>

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
                    {reservation.status === "CONFIRMED"
                      ? "CONFIRMADO"
                      : "CANCELADO"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
      <ConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default CurrentReservations;
