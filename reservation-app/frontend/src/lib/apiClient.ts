import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!
);

export const apiClient = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error en la solicitud");
  }

  return res.json();
};