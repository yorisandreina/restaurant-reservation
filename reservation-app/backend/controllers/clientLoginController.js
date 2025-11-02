import { login } from "../models/authModel.js";

export const clientLoginController = async (req, res) => {
  try {
    const {
      username,
      password,
    } = req.body;

    console.log(username, password)

    if (!username || !password) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios" });
    }

    const logUser = await login(username, password);

    return res
      .status(201)
      .json({ message: "Éxito", data: logUser });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
