import React, { useEffect, useState } from "react";
import OptionSection from "@/components/OptionSection";
import CurrentReservations from "@/components/CurrentReservations";
import BookingSection from "@/components/BookingSection";
import SettingsSection from "@/components/SettingsSection";
import { useNavigate, useSearchParams } from "react-router-dom";

const ClientScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("reservations");
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const businessId = Number(localStorage.getItem("businessId"));

  const tabFromUrl = searchParams.get("tab") || "reservations";

  useEffect(() => {
    if (!businessId) {
      navigate("/client-auth", { replace: true });
    }
  }, [businessId, navigate]);

  useEffect(() => {
    setSelectedOption(tabFromUrl);
  }, [tabFromUrl]);

  const handleChangeOption = (option: string) => {
    setSelectedOption(option);
    setSearchParams({ tab: option });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="flex flex-wrap item-center justify-between pt-4 gap-4">
        <OptionSection value={selectedOption} onChange={handleChangeOption} />
      </div>
      {selectedOption === "reservations" ? (
        <div className="w-full items-center">
          <CurrentReservations
            businessId={businessId}
            refreshKey={refreshKey}
            onRefresh={() => setRefreshKey((prev) => prev + 1)}
          />
        </div>
      ) : selectedOption === "new" ? (
        <div className="w-full items-center mt-4">
          <BookingSection businessId={businessId} />
        </div>
      ) : (
        <div className="w-full items-center">
          <SettingsSection />
        </div>
      )}
    </div>
  );
};

export default ClientScreen;
