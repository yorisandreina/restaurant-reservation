import { apiClient } from "@/lib/apiClient";
import { useState } from "react";

interface AuthResponse {
  token?: string;
  user?: any;
  message?: string;
}

interface ValidationResponse {
  res: number;
  message: string;
  data: any;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (
    username: string,
    password: string
  ): Promise<AuthResponse | null> => {
    try {
      setLoading(true);
      setError(null);

      const data = await apiClient("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      return await data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const validate = async (
    username: string,
  ): Promise<ValidationResponse | null> => {
    try {
      setLoading(true);
      setError(null);

      const data = await apiClient(`/validate-user?username=${username}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      return await data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    username: string,
    password: string
  ): Promise<AuthResponse | null> => {
    try {
      setLoading(true);
      setError(null);

      const data = await apiClient("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (data.data?.authToken) {
        localStorage.setItem("authToken", data.data?.authToken);
      }

      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getCurrentBusinessUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No hay token guardado");
      }
      console.log("token recibido en current user", token)

      const user = await apiClient("/get-user",
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      return user.data;
    } catch (err: any) {
      setError(err.message);
      console.log(err.message)
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { validate, signup, login, getCurrentBusinessUser, loading, error };
};
