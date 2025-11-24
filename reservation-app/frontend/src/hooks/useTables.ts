import { apiClient } from "@/lib/apiClient";
import { useState, useEffect } from "react";

interface Params {
  businessId: number;
  refreshKey: number;
}

interface NewTable {
  businessId: number;
  name: string;
  minCapacity: number;
  maxCapacity: number;
  active: boolean;
}

export const getTables = (params: Params) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTables = async () => {
      if (!params.businessId) {
        setError("Todos los campos son obligatorios");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await apiClient(
          `/tables?business_id=${params.businessId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        setData(data);
      } catch (err: any) {
        console.error("Error fetching tables:", err);
        setError(err.message || "Error desconocido");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, [params.businessId, params.refreshKey]);

  return { data, loading, error };
};

export const createTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postTable = async (body: NewTable) => {
    try {
      setLoading(true);
      setError(null);

      const data = await apiClient(`/set-tables`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_id: body.businessId,
          name: body.name,
          min_capacity: body.minCapacity,
          max_capacity: body.maxCapacity,
          active: body.active,
        }),
      });

      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postTable, loading, error };
};

export const eraseTable = () => {
  const [reservation, setReservation] = useState<any | null>(null);
  const [loadingTab, setLoadingTab] = useState(false);
  const [errorTab, setErrorTab] = useState<string | null>(null);

  const deleteTable = async (tableId: number) => {
    if (!tableId) {
      setErrorTab("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoadingTab(true);
      setErrorTab(null);

      const data = await apiClient(
        `/delete-table?tables_id=${tableId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      setReservation(data);
      return true;
    } catch (err: any) {
      console.error("Error creating reservation:", err);
      setErrorTab(err.message || "Error desconocido");
      setReservation(null);
      return false;
    } finally {
      setLoadingTab(false);
    }
  };

  return { reservation, loadingTab, errorTab, deleteTable };
};
