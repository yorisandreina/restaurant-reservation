import TimeSlotFormModal from "@/components/TimeSlotFormModal";
import TimeSlots from "@/components/TimeSlots";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useCreateTimeSlots } from "@/hooks/useCreateTimeSlots";
import { useDeleteTimeSlots } from "@/hooks/useDeleteTimeSlots";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TimeSlotsScreen = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [hasSlots, setHasSlots] = useState<boolean | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isAlertError, setIsAlertError] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(true);

  const businessId = Number(localStorage.getItem("businessId"));

  const { postTimeSlots, loading, error } = useCreateTimeSlots();
  const {
    removeTimeSlots,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteTimeSlots();

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
    const success = await postTimeSlots(
      formData.map((day) => ({
        businessId,
        dow: day.dow,
        closed: day.closed,
        startTime: day.startTime,
        endTime: day.endTime,
        slotMin: day.slotMin,
        maxDuration: day.maxDuration,
      }))
    );

    if (success) {
      setOpenModal(false);
      setIsAlertError(false);
      setAlertMessage("Horarios guardados correctamente.");
      setRefreshKey((prev) => prev + 1);
    } else {
      setIsAlertError(true);
      setAlertMessage(error || "No se pudieron guardar los horarios.");
    }

    setShowAlert(true);
  };

  const handleDelete = async () => {
    const success = await removeTimeSlots(businessId);

    if (success) {
      setIsAlertError(false);
      setAlertMessage("Horarios eliminados correctamente.");
      setRefreshKey((prev) => prev + 1);
    } else {
      setIsAlertError(true);
      setAlertMessage(deleteError || "No se pudieron eliminar los horarios.");
    }

    setShowAlert(true);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className="flex flex-col p-4 text-center items-center">
      <div className="flex flex-row items-center w-sm gap-4 mb-4">
        <ArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h1 className="text-2xl font-semibold">Horario</h1>
      </div>
      {hasSlots === true && (
        <p className="text-left w-sm mb-2 text-gray-400">
          Pasa el cursor sobre el ícono para ver más información.
        </p>
      )}
      {hasSlots === false && !slotsLoading && (
        <Button
          variant="outline"
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
        onLoadingChange={setSlotsLoading}
      />
      <TimeSlotFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
      {hasSlots === true && (
        <Button
          variant="destructive"
          className="mt-4 w-full max-w-sm"
          onClick={handleDelete}
          disabled={deleteLoading}
        >
          {deleteLoading
            ? "Eliminando horarios..."
            : "Eliminar horarios existentes"}
        </Button>
      )}
      {showAlert && alertMessage && (
        <Alert
          variant="default"
          className={`my-4 w-sm border-none justify-center flex ${
            isAlertError
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          <AlertTitle>{alertMessage}</AlertTitle>
        </Alert>
      )}
    </div>
  );
};

export default TimeSlotsScreen;
