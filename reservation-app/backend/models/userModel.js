import apiClient from "../helpers/apiClient.js";

export const validate = async (username) => {
  const { data } = await apiClient.get(`/users/${username}`);
  return data;
};
