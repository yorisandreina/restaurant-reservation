import { supabase } from "@/lib/apiClient";
import { useEffect, useState } from "react";

export const useSetPassword = () => {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        (event === "PASSWORD_RECOVERY" ||
          event === "SIGNED_IN" ||
          event === "INITIAL_SESSION") &&
        session
      ) {
        setReady(true);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const setPassword = async (password: string, passwordValidation: string) => {
    if (!ready) {
      setError("Sesión inválida o expirada.");
      return false;
    }

    if (password !== passwordValidation) {
      setError("Las contraseñas deben ser iguales.");
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setError(error.message);
        return false;
      }

      return true;
    } finally {
      setLoading(false);
    }
  };

  return { setPassword, ready, loading, error };
};
