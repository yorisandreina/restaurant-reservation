import { DateTime } from "luxon";

export const verifyDateTime = (dateTime) => {
  console.log("received date time", dateTime)
  if (!dateTime) return false;
  const target = DateTime.fromISO(dateTime, { zone: 'Europe/Madrid'});
  console.log("target", target)
  const now = DateTime.now().setZone("Europe/Madrid");
  console.log("now", now)
  return target >= now;
};
