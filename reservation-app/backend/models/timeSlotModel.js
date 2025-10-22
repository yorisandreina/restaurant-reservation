import apiClient from "../helpers/apiClient.js";

export const getReservationDurationByBusiness = async (business_id, dow) => {
  const { data } = await apiClient.get("/time_slots");

  const filtered = data.filter(
    (slot) =>
      Number(slot.business_id) === Number(business_id) &&
      Number(slot.dow) === Number(dow)
  );

  const maxDuration =
    filtered.length > 0 ? Number(filtered[0].max_duration) : null;

  return filtered;
};
