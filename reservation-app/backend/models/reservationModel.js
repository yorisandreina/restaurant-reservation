import apiClient from "../helpers/apiClient.js";
import axios from "axios";

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

export const sendConfirmationEmail = async(name, date, time, people, email) => {
  console.log("send confirmation email called")
  const { data } = await axios.post(
    "https://hook.eu2.make.com/njnuz4d24nlyvfjj28mm6tbmxwh9qnq1",
    {
      email: email,
      date: date,
      time: time,
      name: name,
      people: people,
    }
  );
  return data;
}