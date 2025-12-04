import { createReservationInDB, deleteReservation } from "../models/reservationModel.js";

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
      !phone
    ) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios" });
    }

    const res_key = `${business_id}-${table_id}-${date}-${time}`;

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
      res_key
    });

    if (data?.statement === "Throw Error" && data?.payload) {
      throw new Error(data.payload);
    }

    return res
      .status(201)
      .json({ message: "Reserva creada exitosamente", data: newReservation });
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const eraseReservation = async (req, res) => {
  try {
    const {reservations_id} = req.query;

    if (!reservations_id) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios" });
    }

    const reservationToDelete = await deleteReservation(reservations_id);

    return res
      .status(201)
      .json({ message: "Éxito", data: reservationToDelete });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};