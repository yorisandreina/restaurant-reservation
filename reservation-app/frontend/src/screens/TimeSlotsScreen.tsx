import TimeSlotFormModal from "@/components/TimeSlotFormModal";
import TimeSlots from "@/components/TimeSlots";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { createTimeSlots } from "@/hooks/useTimeSlots";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TimeSlotsScreen = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [hasSlots, setHasSlots] = useState(false);

  const businessId = Number(localStorage.getItem("businessId"));

  const { postTimeSlots, loading, error, message } = createTimeSlots();

  useEffect(() => {
    if (!businessId) {
      navigate("/client-auth", { replace: true });
    }
  }, []);

  const handleSubmit = async (
    formData: {
      dow: number;
      closed: boolean;
      startTime: string;
      endTime: string;
      slotMin: number;
      maxDuration: number;
    }[]
  ) => {
    await postTimeSlots(
      formData.map((day) => ({
        businessId: businessId,
        dow: day.dow,
        closed: day.closed,
        startTime: day.startTime,
        endTime: day.endTime,
        slotMin: day.slotMin,
        maxDuration: day.maxDuration,
      }))
    );
    setOpenModal(false);
    setShowAlert(true);
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className="flex flex-col p-4 text-center items-center">
      <div className="flex flex-row items-center w-sm gap-4 mb-4 ">
        <ArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h1 className="text-2xl font-semibold">Horario</h1>
      </div>
      {hasSlots && !loading && (
        <p className="text-left w-sm mb-2 text-gray-400">
          Pasa el cursor sobre el ícono para ver más información.
        </p>
      )}
      {!hasSlots && !loading && (
        <Button
          variant={"outline"}
          className="w-sm mb-4"
          onClick={() => setOpenModal(true)}
        >
          Agregar horario
        </Button>
      )}
      <TimeSlots
        businessId={businessId}
        refreshKey={refreshKey}
        onSlotsStatusChange={setHasSlots}
      />
      <TimeSlotFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
      {showAlert && message && (
        <Alert
          variant="default"
          className="my-4 w-sm border-none justify-center flex bg-green-100 text-green-700"
        >
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      )}
    </div>
  );
};

export default TimeSlotsScreen;
