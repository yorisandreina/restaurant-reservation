import React, { useState } from "react";
import OptionSection from "@/components/OptionSection";
import CurrentReservations from "@/components/CurrentReservations";
import BookingSection from "@/components/BookingSection";
import SettingsSection from "@/components/SettingsSection";

const ClientScreen: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("reservations");
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="flex flex-wrap item-center justify-between pt-4 gap-4">
        <OptionSection value={selectedOption} onChange={setSelectedOption} />
      </div>
      {selectedOption === "reservations" ? (
        <div className="w-full items-center">
          <CurrentReservations
            businessId={1}
            refreshKey={refreshKey}
            onRefresh={() => setRefreshKey((prev) => prev + 1)}
          />
        </div>
      ) : selectedOption === "new" ? (
        <div className="w-full items-center mt-4">
          <BookingSection businessId={0} />
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
