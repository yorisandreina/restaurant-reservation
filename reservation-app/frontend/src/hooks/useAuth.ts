import { useState } from "react";

interface AuthResponse {
  token?: string;
  user?: any;
  message?: string;
}

interface ValidationResponse {
  res: number;
  message: string;
  data?: any;
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

      return await res.json();
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { validate, signup, login, loading, error };
};
