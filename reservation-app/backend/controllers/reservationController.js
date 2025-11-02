import { createReservationInDB } from "../models/reservationModel.js";

export const createReservation = async (req, res) => {
  try {
    const { business_id, table_id, date, people, time, name, lastName, email, phone } =
      req.body;

    if (
      !business_id ||
      !table_id ||
      !date ||
      !people ||
      !time ||
      !name ||
      !lastName ||
      !email ||
      !phone
    ) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios" });
    }

    const newReservation = await createReservationInDB({
      business_id,
      table_id,
      date,
      people,
      time,
      name,
      lastName,
      email,
      phone,
    });

    return res
      .status(201)
      .json({ message: "Reserva creada exitosamente", data: newReservation });
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
