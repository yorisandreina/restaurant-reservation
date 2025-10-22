import React, { useState } from "react";
import Header from "../components/Header";
import PeoplePicker from "../components/PeoplePicker";
import DatePicker from "../components/DatePicker";
import AvailableTimeSlots from "../components/AvailableTimeSlots";
import { Button } from "@/components/ui/button";

const BookingScreen: React.FC = () => {
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header name="El Rincón de la Tortilla" />
      <div className="flex flex-wrap item-center justify-between pt-4 pb-5 gap-4">
        <PeoplePicker value={people} onChange={setPeople} />
        <DatePicker value={date} onChange={setDate} />
      </div>
      <div className="flex items-center w-full max-w-sm border-t border-gray-300"></div>
      <div className="py-6">
        <AvailableTimeSlots
          businessId={1}
          date={date}
          people={people}
        />
      </div>
      <div className="w-full max-w-sm border-t border-gray-300"></div>
      <Button
        className="mt-6 w-full max-w-sm"
        variant="outline"
      >
        Continuar
      </Button>
    </div>
  );
};

export default BookingScreen;
