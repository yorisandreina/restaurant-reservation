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

        const res = await fetch(
          `/api/tables?business_id=${params.businessId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          const errorBody = await res.text();
          throw new Error(`HTTP ${res.status} ${res.statusText}: ${errorBody}`);
        }

        const data = await res.json();
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

export const useCreateTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTable = async (body: NewTable) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/set-tables`, {
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

      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`HTTP ${res.status} ${res.statusText}: ${errorBody}`);
      }

      const data = await res.json();
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createTable, loading, error };
};
