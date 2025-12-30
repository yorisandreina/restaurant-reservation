import { DateTime } from "luxon";

export const verifyDateTime = (dateTime) => {
  if (!dateTime) return false;
  const target = DateTime.fromISO(dateTime, { zone: 'Europe/Madrid'});
  const now = DateTime.now().setZone("Europe/Madrid");
  return target >= now;
};
