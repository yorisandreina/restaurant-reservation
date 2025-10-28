import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import { checkAvailability } from "./controllers/availabilityController.js";
import { createReservation } from "./controllers/reservationController.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const baseUrl = process.env.XANO_BASE_URL;
const apiKey = process.env.XANO_API_KEY;

app.get("/availability", checkAvailability);

app.post("/reservation", createReservation);

app.get("/time-slots", async (req, res) => {
  try {
    const response = await axios.get(`${baseUrl}/time_slots`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error al obtener time slots:",
      error.response?.status,
      error.response?.data || error.message
    );
    res.status(500).json({
      message: "Error al obtener time slots",
      detail: error.response?.data || error.message,
    });
  }
});

app.get("/time-slot-capacity", async (req, res) => {
  try {
    const response = await axios.get(`${baseUrl}/time_slot_capacity`, {
        headers: { Authorization: `Bearer ${apiKey}`}
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error al obtener capacidad:", error.message);
    res.status(500).json({ error: "Error al obtener capacidad" });
  }
});

// Puerto
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
