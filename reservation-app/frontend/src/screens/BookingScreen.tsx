import React, { useState } from "react";
import Header from "../components/Header";
import PeoplePicker from "../components/PeoplePicker";
import DatePicker from "../components/DatePicker";
import TimeSlots from "../components/TimeSlots";

const BookingScreen: React.FC = () => {
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header name="El Rincón de la Tortilla" />
      <div className="flex items-center justify-between p-4 gap-x-12">
        <PeoplePicker value={people} onChange={setPeople} />
        <DatePicker value={date} onChange={setDate} />
      </div>
      <div className="w-full max-w-md">
        <TimeSlots date={date} people={people} />
      </div>
    </div>
  );
};

export default BookingScreen;
