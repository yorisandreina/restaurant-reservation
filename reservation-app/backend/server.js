import express from "express";
import cors from "cors";
import { checkAvailability } from "./controllers/availabilityController.js";
import { createReservation, eraseReservation } from "./controllers/reservationController.js";
import { getReservations } from "./controllers/getReservationsController.js";
import { eraseTable, getTables, setTable } from "./controllers/tableController.js";
import { getTimeSlots, setTimeSlots } from "./controllers/timeSlotController.js";
import { checkAvailabilityAtTime } from "./controllers/agent/availabilityAtTimeController.js";
import { createReservationFromAgent } from "./controllers/agent/agentReservationController.js";
import { clientLoginController, clientSignupController, clientValidationController, getUserController } from "./controllers/clientAuthController.js";
import { getBusinessBySlug, getBusinessByUserId } from "./controllers/businessController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/availability", checkAvailability);

app.post("/reservation", createReservation);

app.post("/signup", clientSignupController);

app.post("/login", clientLoginController);

app.get("/validate-user", clientValidationController);

app.get("/get-user", getUserController);

app.get("/reservations", getReservations);

app.get("/tables", getTables);

app.post("/set-tables", setTable);

app.get("/time-slots", getTimeSlots);

app.post("/set-time-slots", setTimeSlots);

app.delete("/delete-reservation", eraseReservation);

app.delete("/delete-table", eraseTable);

app.get("/check-availability-time", checkAvailabilityAtTime);

app.get("/create-reservation-agent", createReservationFromAgent);

app.get("/businesses", getBusinessBySlug);

app.get("/user-id-businesses", getBusinessByUserId);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
