import { getTablesByBusiness } from "../models/tableModel.js";
import { getReservationsByBusinessAndDate } from "../models/reservationModel.js";
import { getReservationDurationByBusiness } from "../models/timeSlotModel.js";
import { DateTime } from "luxon";

export const checkAvailability = async (req, res) => {
  console.log("checkAvailability called with:", req.query);
  const { business_id, date, people } = req.query;

  if (!business_id || !date || !people) {
    return res.status(400).json({ error: "Faltan parámetros obligatorios" });
  }

  try {
    const dow = new Date(date).getDay();

    const reservationSlots = await getReservationDurationByBusiness(
      business_id,
      dow
    );
    if (!reservationSlots || reservationSlots.length === 0) {
      return res
        .status(400)
        .json({ error: "No hay franjas definidas para este día" });
    }

    const { start_time, end_time, slot_min, max_duration } =
      reservationSlots[0];

    const reservationDuration = Number(max_duration);

    const slotInterval = Number(slot_min);

    const tables = await getTablesByBusiness(business_id);

    const validTables = tables.filter((t) => t.max_capacity >= Number(people));
    if (!validTables.length) {
      return res.status(200).json([
        {
          hora: null,
          disponible: false, 
          cantidad_mesas_disp: 0,
          mesas_disponibles: [],
          mesa_sugerida: null,
          message: `No hay mesas disponibles para ${people} personas.`,
          nextAvailability: null,
        },
      ]);
    }

    const reservations = await getReservationsByBusinessAndDate(
      business_id,
      date
    );
    const activeReservations = reservations.filter(
      (r) => r.estado !== "CANCELLED" && r.estado !== "NO_SHOW"
    );

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

    let slotStartTime = DateTime.fromISO(`${date}T${start_time}`, { zone: "Europe/Madrid" }).toMillis();
    let endTime = DateTime.fromISO(`${date}T${end_time}`, { zone: "Europe/Madrid" }).toMillis();

    if (end_time === "00:00" || end_time === "0:00") {
      endTime += 24 * 60 * 60 * 1000;
    }

    const now = DateTime.now().setZone("Europe/Madrid");
    const nowTime = now.toMillis();

    const selectedDate = DateTime.fromISO(date, { zone: "Europe/Madrid" });
    const isToday =
      selectedDate.year === now.year &&
      selectedDate.month === now.month &&
      selectedDate.day === now.day;

    if (isToday) {
      const minutesNow = now.minute;
      const remainder = minutesNow % slotInterval;

      const minutesToAdd =
        remainder === 0 ? slotInterval : slotInterval - remainder;

      const roundedNowTime = nowTime + minutesToAdd * 60000;

      while (slotStartTime < roundedNowTime) {
        slotStartTime += slotInterval * 60000;
      }
    }

    while (slotStartTime + reservationDuration * 60000 <= endTime) {
      const slotEndTime = slotStartTime + reservationDuration * 60000;

      let freeTables = [];

      for (const table of validTables) {
        const tableReservations = reservationsByTable.get(table.id) || [];
        const hasConflict = tableReservations.some(
          (r) => !(slotEndTime <= r.start || slotStartTime >= r.end)
        );
        if (!hasConflict) freeTables.push(table.id);
      }

      availableSlots.push({
        hora: DateTime.fromMillis(slotStartTime, {
          zone: "Europe/Madrid",
        }).toFormat("HH:mm"),
        disponible: freeTables.length > 0,
        cantidad_mesas_disp: freeTables.length,
        mesas_disponibles: freeTables,
        mesa_sugerida: freeTables[0],
      });

      slotStartTime += slotInterval * 60000;
    }

    res.json(availableSlots);
  } catch (error) {
    console.error("Error al verificar disponibilidad:", error);
    res.status(500).json({ error: "Error al verificar disponibilidad" });
  }
};
