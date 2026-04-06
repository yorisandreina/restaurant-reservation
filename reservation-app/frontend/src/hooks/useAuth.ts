import { supabase } from "@/lib/apiClient";
import { useState } from "react";

interface LoginResult {
  user: any | null;
  error: string | null;
}

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResult> => {
    try {
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return { user: null, error: error.message };
      }

      return { user: data.user, error: null };
    } catch (err: any) {
      const message = err?.message || "Error al iniciar sesión.";
      setError(message);
      return { user: null, error: message };
    }
  };

  return { login, error };
};
