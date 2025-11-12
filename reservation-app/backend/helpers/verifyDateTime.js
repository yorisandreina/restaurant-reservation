import { DateTime } from "luxon";

export const verifyDateTime = (date, time) => {
  const target = DateTime.fromISO(`${date}T${time}`, { zone: "Europe/Madrid" });
  const now = DateTime.now().setZone("Europe/Madrid");
  return target >= now;
}
