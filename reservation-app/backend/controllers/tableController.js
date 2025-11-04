import { createTable, getTablesByBusiness,  } from "../models/tableModel.js";

export const getTables = async (req, res) => {
  try {
    const { business_id } = req.query;

    if (!business_id) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios" });
    }

    const tables = await getTablesByBusiness(business_id);
    console.log(tables);

    return res.status(201).json({ message: "Exito", data: tables });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const setTable = async (req, res) => {
  try {
    const { business_id, name, min_capacity, max_capacity, active } = req.body;

    console.log(req.body)
    if (
      !business_id ||
      !name ||
      !min_capacity ||
      !max_capacity ||
      !active
    ) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios" });
    }

    const newTable = await createTable({
      business_id,
      name,
      min_capacity,
      max_capacity,
      active
    });

    return res.status(201).json({ message: "Exito", data: newTable });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
