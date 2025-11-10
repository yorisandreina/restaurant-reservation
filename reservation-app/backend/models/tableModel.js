import apiClient from "../helpers/apiClient.js";

export const getTablesByBusiness = async (business_id) => {
  const { data } = await apiClient.get("/tables");

  const filtered = data.filter(
    (table) => Number(table.business_id) === Number(business_id)
  );

  return filtered;
};

export const createTable = async (tableData) => {
  const { data } = await apiClient.post("/tables", tableData);
  return data;
};

export const deleteTable = async (table_id) => {
  const { data } = await apiClient.delete(`/tables/${table_id}`);
  return data;
};