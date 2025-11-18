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

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Error al crear la cuenta");
      }

      return await res.json();
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

      const res = await fetch(`/api/validate-user?username=${username}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Error al validar la cuenta");
      }

      return await res.json();
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

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Error al iniciar sesión");
      }

      const data = await res.json();

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

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No hay token guardado");
      }

      const res = await fetch("/api/get-user", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Error al obtener usuario");
      }

      const data = await res.json();

      localStorage.setItem("businessId", JSON.stringify(data?.data?.id));

      return data.data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { validate, signup, login, getCurrentUser, loading, error };
};
