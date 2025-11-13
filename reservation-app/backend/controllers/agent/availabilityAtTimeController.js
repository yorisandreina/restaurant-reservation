import { getTablesByBusiness } from "../../models/tableModel.js";
import { getReservationsByBusinessAndDate } from "../../models/reservationModel.js";
import { getReservationDurationByBusiness } from "../../models/timeSlotModel.js";
import { verifyDateTime } from "../../helpers/verifyDateTime.js";
import { DateTime } from "luxon";

export const checkAvailabilityAtTime = async (req, res) => {
  console.log("checkAvailabilityAtTime called with body:", req.query);
  const { business_id, dateTime, people } = req.query;

  if (!business_id || !dateTime || !people) {
    return res.status(400).json({ error: "Faltan parámetros obligatorios" });
  }

  const isDateTimeValid = verifyDateTime(dateTime);
    if (!isDateTimeValid) {
      return res.json({
        disponible: false,
        message:
          "La fecha y hora deben ser iguales o posteriores al momento actual.",
      });
    }

  try {
    const [date, time] = dateTime.split("T");
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

    const now = DateTime.now().setZone("Europe/Madrid");
    const selectedDateTime = DateTime.fromISO(dateTime, {
      zone: "Europe/Madrid",
    });

    const isToday =
      now.hasSame(selectedDateTime, "day") &&
      now.hasSame(selectedDateTime, "month") &&
      now.hasSame(selectedDateTime, "year");

    if (isToday) {
      const diffMinutes = selectedDateTime.diff(now, "minutes").minutes;

      if (diffMinutes < slotInterval) {
        const remainder = now.minute % slotInterval;
        const minutesToAdd =
          remainder === 0 ? slotInterval : slotInterval - remainder;

        const nextAvailable = now
          .plus({ minutes: minutesToAdd })
          .plus({ minutes: slotInterval });

        return res.json({
          disponible: false,
          mesa_sugerida: null,
          nextAvailability: nextAvailable.toFormat("HH:mm"),
          message: `La reserva debe realizarse con al menos ${slotInterval} minutos de antelación.`,
        });
      }
    }

    const tables = await getTablesByBusiness(business_id);
    const validTables = tables.filter((t) => t.max_capacity >= Number(people));
    if (!validTables.length) {
      return res.json({
        disponible: false,
        nextAvailability: null,
        message: "No tenemos mesa para esa cantidad de personas.",
      });
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

    const selectedStart = new Date(`${date}T${time}:00Z`).getTime();
    const selectedEnd = selectedStart + reservationDuration * 60 * 1000;

    let availableTables = [];

    for (const table of validTables) {
      const tableReservations = reservationsByTable.get(table.id) || [];
      const hasConflict = tableReservations.some(
        (r) => !(selectedEnd <= r.start || selectedStart >= r.end)
      );
      if (!hasConflict) availableTables.push(table.id);
    }

    const disponible = availableTables.length > 0;
    const mesa_sugerida = disponible ? availableTables[0] : null;

    let nextAvailability = null;

    if (!disponible) {
      let slotStartTime = DateTime.fromISO(`${date}T${start_time}`, {
        zone: "Europe/Madrid",
      }).toMillis();
      let endTime = DateTime.fromISO(`${date}T${end_time}`, {
        zone: "Europe/Madrid",
      }).toMillis();

      if (end_time === "00:00" || end_time === "0:00") {
        endTime += 24 * 60 * 60 * 1000;
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

        if (freeTables.length > 0) {
          nextAvailability = DateTime.fromMillis(slotStartTime, {
            zone: "Europe/Madrid",
          }).toFormat("HH:mm");
          break;
        }

        slotStartTime += slotInterval * 60000;
      }
    }

    return res.json({
      disponible,
      mesa_sugerida,
      nextAvailability,
    });
  } catch (error) {
    console.error("Error al verificar disponibilidad en hora:", error);
    res.status(500).json({ error: "Error al verificar disponibilidad" });
  }
};
