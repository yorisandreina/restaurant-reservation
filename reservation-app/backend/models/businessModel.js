import apiClient from "../helpers/apiClient.js";

export const getBusiness = async (slug) => {
  const { data } = await apiClient.get(`/businesses?slug=${slug}`);
  return data[0];
};
