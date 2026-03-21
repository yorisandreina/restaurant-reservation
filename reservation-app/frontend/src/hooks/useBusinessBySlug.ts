import { supabase } from "@/lib/apiClient";
import { useEffect, useState } from "react";

interface Business {
  id: number;
  name: string;
  slug: string;
  phone: string;
  address: string;
}

export const useBusinessBySlug = (slug: string | undefined) => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loadingBusiness, setLoadingBusiness] = useState(true);
  const [errorBusiness, setErrorBusiness] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!slug) {
        setErrorBusiness("Slug es obligatorio.");
        setLoadingBusiness(false);
        return;
      }

      try {
        setLoadingBusiness(true);
        setErrorBusiness(null);

        const { data, error } = await supabase
          .from("Businesses")
          .select("id, name, slug, phone, address")
          .eq("slug", slug)
          .single();

        if (error) {
          setErrorBusiness(error.message);
          setBusiness(null);
          return;
        }

        setBusiness(data);
      } catch (err: any) {
        setErrorBusiness(err.message || "Error desconocido");
        setBusiness(null);
      } finally {
        setLoadingBusiness(false);
      }
    };

    fetchBusiness();
  }, [slug]);

  return { business, loadingBusiness, errorBusiness };
};
