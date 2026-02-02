import { apiClient } from "@/lib/apiClient";
import { useState, useEffect } from "react";

export const useBusiness = (slug?: string) => {
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

  const fetchBusinessByUserId = async (userId: number | string) => {
    if (!userId) {
      throw new Error("userId is required");
    }

    try {
      setLoadingBusiness(true);
      setErrorBusiness(null);

      const data = await apiClient(`/user-id-businesses?user_id=${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const business = Array.isArray(data) ? data[0] : data;

      if (business?.id && business?.name) {
        localStorage.setItem("businessId", String(business.id));
        localStorage.setItem("businessName", business.name);
      }

      setBusiness(business);
      return business;
    } catch (err: any) {
      setErrorBusiness(err.message);
      throw err;
    } finally {
      setLoadingBusiness(false);
    }
  };

  return {
    business,
    loadingBusiness,
    errorBusiness,
    fetchBusinessByUserId,
  };
};