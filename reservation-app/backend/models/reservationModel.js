import apiClient from "../helpers/apiClient.js";

export const getReservationsByBusinessAndDate = async (business_id, date) => {
  const { data } = await apiClient.get("/reservations", {
    params: { business_id, date },
  });
  return data;
};

export const createReservationInDB = async (reservationData) => {
  const { data } = await apiClient.post("/reservations", reservationData);
  return data;
};

export const getReservationsByBusiness = async (business_id, date) => {
  const { data } = await apiClient.get("/reservations", {
    params: {
      business_id,
      date_gte: date,
    },
  });
  return data;
};

export const deleteReservation = async (reservation_id) => {
  const { data } = await apiClient.delete(`/reservations/${reservation_id}`);
  return data;
};