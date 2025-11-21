import React, { useState } from "react";
import PeoplePicker from "../components/PeoplePicker";
import DatePicker from "../components/DatePicker";
import AvailableTimeSlots from "../components/AvailableTimeSlots";
import { Button } from "@/components/ui/button";
import BookingDetailsModal from "@/components/BookingDetailsModal";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useReservation } from "@/hooks/useReservation";
import { Spinner } from "@/components/ui/spinner";

interface ReservationProps {
  businessId: number;
}

const BookingSection: React.FC<ReservationProps> = ({ businessId }) => {
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [tableId, setTableId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { loading, error, createReservation } = useReservation();

  const handleOpenModal = () => {
    if (!date || !selectedTimeSlot) {
      setShowAlert(true);
      return;
    }
    setShowModal(true);
  };

  const handleSubmit = async (formData: {
    name: string;
    lastName: string;
    phone: string;
    email: string;
  }) => {
    const reservationCreated = await createReservation({
      name: formData.name,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      date,
      people,
      time: selectedTimeSlot,
      businessId: businessId,
      tableId: tableId,
    });

    if (reservationCreated) {
      setShowModal(false);

      setPeople(2);
      setDate("");
      setSelectedTimeSlot("");
      setTableId(0);

      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="flex flex-wrap item-center justify-between pt-4 pb-5 gap-4">
        <PeoplePicker value={people} onChange={setPeople} />
        <DatePicker value={date} onChange={setDate} />
      </div>
      <div className="flex items-center w-full max-w-sm border-t border-gray-300"></div>
      <div className="py-6">
        <AvailableTimeSlots
          businessId={businessId}
          date={date}
          people={people}
          value={selectedTimeSlot}
          tableId={tableId}
          onChange={(hora, tableId) => {
            setSelectedTimeSlot(hora);
            setTableId(tableId);
          }}
        />
      </div>
      <div className="w-full max-w-sm border-t border-gray-300"></div>
      <Button
        className="mt-6 w-full max-w-sm hover:bg-transparent"
        variant="outline"
        onClick={handleOpenModal}
        disabled={!date || !selectedTimeSlot}
      >
        {loading ? <Spinner className="size-5" /> : "Continuar"}
      </Button>
      {showSuccess && (
        <Alert
          variant="default"
          className="my-4 w-sm border-none justify-center flex bg-green-100 text-green-700"
        >
          <AlertTitle>Reserva creada</AlertTitle>
        </Alert>
      )}

      <BookingDetailsModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
      />
      {error && <p className="text-red-500">{error}</p>}
      {showAlert && (
        <Alert
          variant="destructive"
          className="my-2 w-md border-none justify-center flex"
        >
          <AlertTitle>
            Selecciona una fecha y una hora antes de continuar.
          </AlertTitle>
        </Alert>
      )}
    </div>
  );
};

export default BookingSection;
