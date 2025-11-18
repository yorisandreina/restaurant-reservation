import apiClient from "../helpers/apiClient.js";
import authApiClient from "../helpers/authApiClient.js";

export const signup = async (username, password) => {
  const body = {
    username: username,
    password: password,
  };

  const { data } = await authApiClient.post("/auth/signup", body);
  return data;
};

export const login = async (username, password) => {
  const body = {
    username: username,
    password: password,
  };

  const { data } = await authApiClient.post("/auth/login", body);
  return data;
};