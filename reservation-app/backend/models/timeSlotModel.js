import apiClient from "../helpers/apiClient.js";

export const getReservationDurationByBusiness = async (business_id, dow) => {
  const { data } = await apiClient.get("/time_slots", {
    params: { business_id },
  });

  const filtered = data.filter(
    (slot) =>
      Number(slot.business_id) === Number(business_id) &&
      Number(slot.dow) === Number(dow)
  );

  return filtered;
};

export const getBusinessTimeSlots = async (business_id) => {
  const { data } = await apiClient.get("/time_slots", {
    params: { business_id },
  });
  return data;
};

export const createTimeSlots = async (timeSlotsData) => {
  const { data } = await apiClient.post("/time_slots", timeSlotsData);
  console.log(data);
  console.log(typeof data)
  return data;
};

export const deleteBusinessTimeSlots = async (business_id) => {
  const { data } = await apiClient.delete(`/time_slots/${business_id}`);
  return data;
};