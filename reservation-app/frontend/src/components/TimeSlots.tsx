import { useTimeSlots } from "@/hooks/useTimeSlots";

interface TimeSlot {
  id: number;
  day_of_week: string;
  time: string;
}

interface Props {
    date: string;
    people: number;
}

const TimeSlots: React.FC<Props> = ({ date, people }) => {
  const { slots, loading, error} = useTimeSlots(date, people);

  if (loading) return <div className="p-4">Cargando slots...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!slots.length) return <div className="p-4">No hay slots disponibles</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Horarios Disponibles</h2>
      <ul className="space-y-2">
        {slots.map((s: TimeSlot) => (
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
