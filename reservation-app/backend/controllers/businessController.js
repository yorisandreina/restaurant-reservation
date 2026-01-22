import { getBusinessSlug, getBusinessUserId } from "../models/businessModel.js";

export const getBusinessBySlug = async (req, res) => {
  try {
    const { slug } = req.query;

    if (!slug) return res.status(400).json({ error: "Faltan parámetros obligatorios." });

    const business = await getBusinessSlug(slug);
    if (!business)
      return res.status(404).json({ error: "Restaurante no encontrado" });

    return res.status(200).json(business);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getBusinessByUserId = async (req, res) => {
  try {
    const { user_id } = req.query;
    console.log('user id received', user_id)

    if (!user_id)
      return res.status(400).json({ error: "Faltan parámetros obligatorios." });

    const business = await getBusinessUserId(user_id);
    if (!business)
      return res.status(404).json({ error: "Restaurante no encontrado" });

    return res.status(200).json(business);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
