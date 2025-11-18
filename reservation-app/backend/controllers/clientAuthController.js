import { login, signup } from "../models/authModel.js";
import { validate } from "../models/userModel.js";

export const clientLoginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(username, password);

    if (!username || !password) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios" });
    }

    const logUser = await login(username, password);

    return res.status(201).json({ message: "Éxito", data: logUser });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const clientSignupController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios" });
    }

    const newUser = await signup(username, password);

    return res
      .status(201)
      .json({ message: "Usuario creado con éxito", data: newUser });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const clientValidationController = async (req, res) => {
    console.log("received in controller", req.query)
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios" });
    }

    const validatedUser = await validate(username);
    console.log(validatedUser)
    if (validatedUser.password.trim() !== "") {
      return res
        .status(200)
        .json({ res: 1, message: "El usuario ya está validado", data: validatedUser });
    }

    return res
      .status(201)
      .json({ res: 0, message: "Usuario validado con éxito", data: validatedUser });
  } catch (error) {
    console.error("Error al validar usuario:", error);
    return res.status(500).json({ error: error.res.data.message });
  }
};