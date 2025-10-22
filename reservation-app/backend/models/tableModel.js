import apiClient from "../helpers/apiClient.js";

export const getTablesByBusiness = async (business_id) => {
  const { data } = await apiClient.get("/tables");

  const filtered = data.filter(
    (table) => Number(table.business_id) === Number(business_id)
  );

  return filtered;
};
