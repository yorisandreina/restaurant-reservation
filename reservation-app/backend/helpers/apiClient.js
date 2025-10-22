import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); 

const baseUrl = process.env.XANO_BASE_URL;
const apiKey = process.env.XANO_API_KEY;

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: { Authorization: `Bearer ${apiKey}` },
});

export default apiClient;
