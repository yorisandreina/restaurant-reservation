import { apiClient } from "@/lib/apiClient";
import { useState, useEffect } from "react";

export const useBusiness = (slug: string | undefined) => {
  const [business, setBusiness] = useState<any | undefined>(undefined);
  const [loadingBusiness, setLoadingBusiness] = useState(false);
  const [errorBusiness, setErrorBusiness] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchBusiness = async () => {
      try {
        setLoadingBusiness(true);

        const data = await apiClient(`/businesses?slug=${slug}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        setBusiness(data);
      } catch (err: any) {
        setErrorBusiness(err.message);
      } finally {
        setLoadingBusiness(false);
      }
    };

    fetchBusiness();
  }, [slug]);

  return { business, loadingBusiness, errorBusiness };
};
