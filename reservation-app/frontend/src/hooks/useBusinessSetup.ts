import { supabase } from "@/lib/apiClient";
import { useEffect, useState } from "react";

interface BusinessSetupData {
  name: string;
  phone: string;
  address: string;
}

export const useBusinessSetup = () => {
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthorized(!!session);
    });
  }, []);

  const createBusiness = async (fields: BusinessSetupData) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("No se encontró una sesión activa.");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const slug = fields.name.toLowerCase().trim().replace(/\s+/g, "-"); 

      const { error } = await supabase.from("Businesses").insert({
        user_id: user.id,
        name: fields.name,
        phone: fields.phone,
        address: fields.address,
        slug: slug,
      });

      if (error) {
        setError(error.message);
        return false;
      }

      return true;
    } finally {
      setLoading(false);
    }
  };

  return { createBusiness, authorized, loading, error };
};
