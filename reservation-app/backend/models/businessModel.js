import apiClient from "../helpers/apiClient.js";

export const getBusinessSlug = async (slug) => {
  const { data } = await apiClient.get(`/businesses?slug=${slug}`);
  return data[0];
};

export const getBusinessUserId = async (user_id) => {
  const { data } = await apiClient.get(`/businesses?user_id=${user_id}`);
  return data[0];
};
