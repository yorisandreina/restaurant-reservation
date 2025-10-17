import React, { useEffect, useState } from "react";

interface TimeSlot {
  id: number;
  day_of_week: string;
  time: string;
}

const TimeSlots: React.FC = () => {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = "/api/time-slots";

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setSlots(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching time-slots:", err);
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4">Cargando slots...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!slots.length) return <div className="p-4">No hay slots disponibles</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Time Slots</h2>
      <ul className="space-y-2">
        {slots.map((s) => (
          <li
            key={s.id}
            className="border p-3 rounded-md bg-white shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">
                  {s.day_of_week}
                </div>
                <div className="text-sm text-gray-500">
                  {s.time}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeSlots;
