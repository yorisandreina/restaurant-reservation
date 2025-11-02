import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.XANO_AUTH_BASE_URL;
const apiKey = process.env.XANO_API_KEY;

const authApiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

export default authApiClient;
