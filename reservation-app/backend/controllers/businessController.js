import { getBusiness } from "../models/businessModel.js";

export const getBusinessBySlug = async (req, res) => {
  try {
    const { slug } = req.query;

    if (!slug) return res.status(400).json({ error: "Falatn parámetros obligatorios." });

    const business = await getBusiness(slug);
    if (!business)
      return res.status(404).json({ error: "Restaurante no encontrado" });

    return res.status(200).json(business);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
