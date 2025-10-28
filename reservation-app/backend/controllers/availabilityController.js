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

    const reservationDuration = Number(max_duration);
    console.log("reservation duration", reservationDuration);

    const slotInterval = Number(slot_min);
    console.log("slot interval", slotInterval);

    const tables = await getTablesByBusiness(business_id);
    console.log("tables", tables);

    const validTables = tables.filter((t) => t.max_capacity >= Number(people));
    if (!validTables.length) {
      return null;
    }
    console.log("valid tables", validTables);

    const reservations = await getReservationsByBusinessAndDate(
      business_id,
      date
    );
    const activeReservations = reservations.filter(
      (r) => r.estado !== "CANCELLED" && r.estado !== "NO_SHOW"
    );
    console.log("reservations", reservations);

    const reservationsByTable = new Map();
    for (const r of activeReservations) {
      const mesaId = r.table_id;

      const start = new Date(`${r.date}T${r.time}:00Z`).getTime();
      const end = start + reservationDuration * 60 * 1000;

      if (!reservationsByTable.has(mesaId)) reservationsByTable.set(mesaId, []);
      reservationsByTable.get(mesaId).push({ start, end });
    }
    console.log("reservations by table", reservationsByTable)

    const availableSlots = [];

    let slotStartTime = new Date(`${date}T${start_time}:00Z`).getTime();
    const endTime = new Date(`${date}T${end_time}:00Z`).getTime();

    const madridOffsetHours = 2;
    const now = new Date();
    const nowTime = now.getTime() + madridOffsetHours * 60 * 60 * 1000;
    console.log("now time", nowTime)

    const selectedDate = new Date(date);
    console.log("selected date", selectedDate);
    const isToday =
      selectedDate.getFullYear() === now.getFullYear() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getDate() === now.getDate();
    console.log("is today", isToday);

    while (slotStartTime + reservationDuration * 60000 <= endTime) {
      const slotEndTime = slotStartTime + reservationDuration * 60000;

      if (isToday && slotStartTime < nowTime) {
        slotStartTime += slotInterval * 60000;
        continue;
      }

      let freeTables = [];

      for (const table of validTables) {
        const tableReservations = reservationsByTable.get(table.id) || [];
        const hasConflict = tableReservations.some(
          (r) => !(slotEndTime <= r.start || slotStartTime >= r.end)
        );
        if (!hasConflict) freeTables.push(table.id);
      }

      availableSlots.push({
        hora: new Date(slotStartTime).toISOString().slice(11, 16),
        disponible: freeTables.length > 0,
        cantidad_mesas_disp: freeTables.length,
        mesas_disponibles: freeTables,
        mesa_sugerida: freeTables[0],
      });

      slotStartTime += slotInterval * 60000;
    }

    console.log("disponibilidad", availableSlots)

    res.json(availableSlots);
  } catch (error) {
    console.error("Error al verificar disponibilidad:", error);
    res.status(500).json({ error: "Error al verificar disponibilidad" });
  }
};
