import { DateTime } from "luxon";
import { createReservationInDB } from "../../models/reservationModel.js";

export const createReservationFromAgent = async (req, res) => {
  try {
    const {
      business_id,
      table_id,
      dateTime,
      people,
      name,
      phone,
    } = req.query;

    if (!business_id || !table_id || !dateTime || !people || !name || !phone) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios" });
    }

    const dt = DateTime.fromISO(dateTime, { zone: "Europe/Madrid" });

    const date = dt.toFormat("yyyy-MM-dd");
    const time = dt.toFormat("HH:mm");

    const res_key = `${business_id}-${table_id}-${date}-${time}`;

    const newReservation = await createReservationInDB({
      business_id,
      table_id,
      date,
      people,
      time,
      name,
      phone,
      res_key
    });

    return res
      .status(201)
      .json({ status: "confirmed", message: "Reserva creada exitosamente", data: newReservation });
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    return res.status(500).json({ status: "not confirmed", error: "Error interno del servidor" });
  }
};
