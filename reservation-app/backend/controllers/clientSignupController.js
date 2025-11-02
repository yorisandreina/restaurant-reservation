import { signup } from "../models/authModel.js";

export const clientSignupController = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios" });
    }

    const newUser = await signup(email, password);

    return res
      .status(201)
      .json({ message: "Usuario creado con éxito", data: newUser });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
