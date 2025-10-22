import express from "express";
import { checkAvailability } from "../controllers/availabilityController";

const router = express.Router();

router.get("/", checkAvailability);

export default router;
