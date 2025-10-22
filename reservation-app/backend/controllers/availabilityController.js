import { getTablesByBusiness } from "../models/tableModel.js";
import { getReservationsByBusinessAndDate } from "../models/reservationModel.js";
import { getReservationDurationByBusiness } from "../models/timeSlotModel.js";

export const checkAvailability = async (req, res) => {
  console.log("checkAvailability called with:", req.query);
  const { business_id, date, people } = req.query;

  if (!business_id || !date || !people) {
    return res.status(400).json({ error: "Faltan parámetros obligatorios" });
  }

  try {
    const dow = new Date(date).getDay(); // 1=lunes, 7=domingo

    // Duración de la reserva
    const reservationSlots = await getReservationDurationByBusiness(
      business_id,
      dow
    );
    if (!reservationSlots || reservationSlots.length === 0) {
      return res
        .status(400)
        .json({ error: "No hay franjas definidas para este día" });
    }
    console.log("reservation slots", reservationSlots)

    const { start_time, end_time, slot_min, max_duration } =
      reservationSlots[0];

    const reservationDuration = Number(max_duration); // en minutos
    console.log("reservation duration", reservationDuration);

    const slotInterval = Number(slot_min); // intervalos en minutos
    console.log("slot interval", slotInterval);

    // Mesas disponibles
    const tables = await getTablesByBusiness(business_id);
    console.log("tables", tables);

    const validTables = tables.filter((t) => t.max_capacity >= Number(people));
    if (!validTables.length) {
      return res.json([]);
    }
    console.log("valid tables", validTables);


    // Reservas del día
    const reservations = await getReservationsByBusinessAndDate(
      business_id,
      date
    );
    const activeReservations = reservations.filter(
      (r) => r.estado !== "cancelled" && r.estado !== "no_show"
    );
    console.log("reservations", reservations);

    const reservationsByTable = new Map();
    for (const r of activeReservations) {
      const mesaId = r.mesa_id;
      if (!reservationsByTable.has(mesaId)) reservationsByTable.set(mesaId, []);
      reservationsByTable.get(mesaId).push({
        start: new Date(r.inicio).getTime(),
        end: new Date(r.fin).getTime(),
      });
    }
    console.log("reservations by table", reservationsByTable)

    const availableSlots = [];
    let slotStartTime = new Date(`${date}T${start_time}:00Z`).getTime();
    const endTime = new Date(`${date}T${end_time}:00Z`).getTime();
    console.log("slot start time", slotStartTime);
    console.log("slot end time", endTime);

    while (slotStartTime + reservationDuration * 60000 <= endTime) {
      const slotEndTime = slotStartTime + reservationDuration * 60000;

      let freeTables = 0;

      for (const table of validTables) {
        const tableReservations = reservationsByTable.get(table.id) || [];
        const hasConflict = tableReservations.some(
          (r) => !(slotEndTime <= r.start || slotStartTime >= r.end)
        );
        if (!hasConflict) freeTables++;
      }

      availableSlots.push({
        hora: new Date(slotStartTime).toISOString().slice(11, 16),
        disponible: freeTables > 0,
        available_tables: freeTables,
      });

      // Avanzar al siguiente slot
      slotStartTime += slotInterval * 60000;
    }

    console.log("disponibilidad", availableSlots)

    res.json(availableSlots);
  } catch (error) {
    console.error("Error al verificar disponibilidad:", error);
    res.status(500).json({ error: "Error al verificar disponibilidad" });
  }
};
