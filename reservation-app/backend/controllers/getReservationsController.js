import { DateTime } from "luxon";
import { getReservationsByBusiness } from "../models/reservationModel.js";

export const getReservations = async (req, res) => {
  try {
    const { business_id } = req.query;

    if (!business_id) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios" });
    }

    const today = DateTime.local().toISODate();

    const reservations = await getReservationsByBusiness(business_id, today);

    return res.status(201).json({ message: "Exito", data: reservations });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
