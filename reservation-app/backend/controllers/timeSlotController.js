import { createTimeSlots, getBusinessTimeSlots } from "../models/timeSlotModel.js";

export const getTimeSlots = async (req, res) => {
  try {
    const { business_id } = req.query;

    if (!business_id) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios" });
    }

    const timeSlots = await getBusinessTimeSlots(business_id);
    console.log("Time slots", timeSlots);

    return res.status(201).json({ message: "Exito", data: timeSlots });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const setTimeSlots = async (req, res) => {
  try {
    const body = req.body;
    const timeSlots = Array.isArray(body) ? body : [body];

    const missingFields = timeSlots.some((slot) => {
      if (slot.business_id == null) return true;
      if (slot.dow == null) return true;
      if (slot.closed == null) return true;
      if (!slot.closed && (!slot.start_time || !slot.end_time)) return true;
      if (slot.slot_min == null) return true;
      if (slot.max_duration == null) return true;
      return false;
    });

    if (missingFields) {
      return res
        .status(400)
        .json({ success: false, message: "Faltan parámetros obligatorios" });
    }

    const results = await Promise.all(
      timeSlots.map(async (slot) => {
        const rawResponse = await createTimeSlots({
          business_id: slot.business_id,
          dow: slot.dow,
          closed: slot.closed,
          start_time: slot.start_time,
          end_time: slot.end_time,
          slot_min: slot.slot_min,
          max_duration: slot.max_duration,
        });

        const response =
          typeof rawResponse === "string"
            ? JSON.parse(rawResponse)
            : rawResponse;

        if (response?.success === false) {
          return { success: false, message: response.message };
        }

        return { success: true, data: response };
      })
    );

    const failed = results.find((r) => r.success === false);
    if (failed) {
      return res.status(200).json({
        success: false,
        message: failed.message || "El negocio ya tiene un horario configurado",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Horarios creados correctamente",
      data: results.map((r) => r.data),
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};


