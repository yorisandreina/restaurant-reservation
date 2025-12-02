import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import PeoplePicker from "../components/PeoplePicker";
import DatePicker from "../components/DatePicker";
import AvailableTimeSlots from "../components/AvailableTimeSlots";
import { Button } from "@/components/ui/button";
import BookingDetailsModal from "@/components/BookingDetailsModal";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useReservation } from "@/hooks/useReservation";
import { Spinner } from "@/components/ui/spinner";
import { useBusiness } from "@/hooks/useBusiness";

const BookingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [tableId, setTableId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { loading, error, createReservation } = useReservation();
  const { slug } = useParams<{ slug: string }>();
  const { business, loadingBusiness, errorBusiness } = useBusiness(slug);

  const handleOpenModal = () => {
    if (!date || !selectedTimeSlot) {
      setShowAlert(true);
      return;
    }
    setShowModal(true);
  }

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
      businessId: business.id,
      tableId: tableId,
    });

    if (reservationCreated) {
      setShowModal(false);
      navigate("/success", {
        state: {
          reservation: {
            name: formData.name,
            lastName: formData.lastName,
            date,
            time: selectedTimeSlot,
            people,
            phone: formData.phone,
            slug: business.slug,
          },
        },
      });
    }
  };

  if (loadingBusiness || business === undefined) return (
    <div className="flex justify-center items-center w-full h-full mt-5">
      <Spinner className="size-8" />
    </div>
  );
  if (errorBusiness) return <p>Error: {error}</p>;
  if (!business)
    return <p>Restaurante no encontrado.</p>;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header name={business.name} />
      <div className="flex flex-wrap item-center justify-between pt-4 pb-5 gap-4">
        <PeoplePicker value={people} onChange={setPeople} />
        <DatePicker value={date} showLabel={true} onChange={setDate} />
      </div>
      <div className="flex items-center w-full max-w-sm border-t border-gray-300"></div>
      <div className="py-6">
        <AvailableTimeSlots
          businessId={business.id}
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
      <Button
        className="mt-4 w-full max-w-sm hover:bg-transparent"
        variant="outline"
        onClick={() => navigate("/client-auth")}
      >
        I am a client
      </Button>

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

export default BookingScreen;
