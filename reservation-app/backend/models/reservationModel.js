import apiClient from "../helpers/apiClient.js";

export const getReservationsByBusinessAndDate = async (business_id, date) => {
  const { data } = await apiClient.get("/reservations", {
    params: { business_id, date },
  });
  return data;
};

export const createReservationInDB = async (reservationData) => {
  console.log("data received in model", reservationData)
  const { data } = await apiClient.post("/reservations", reservationData);
  return data;
};
