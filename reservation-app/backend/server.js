import express from "express";
import cors from "cors";
import { checkAvailability } from "./controllers/availabilityController.js";
import { createReservation } from "./controllers/reservationController.js";
import { clientSignupController } from "./controllers/clientSignupController.js";
import { clientLoginController } from "./controllers/clientLoginController.js";
import { getReservations } from "./controllers/getReservationsController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/availability", checkAvailability);

app.post("/reservation", createReservation);

app.post("/signup", clientSignupController);

app.post("/login", clientLoginController);

app.get("/reservations", getReservations);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
