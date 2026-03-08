import { supabase } from "@/lib/apiClient";
import { useState } from "react";

export const useDeleteTable = () => {
  const [loadingTab, setLoadingTab] = useState(false);
  const [errorTab, setErrorTab] = useState<string | null>(null);

  const deleteTable = async (tableId: number) => {
    if (!tableId) {
      setErrorTab("Table ID es obligatorio.");
      return false;
    }

    try {
      setLoadingTab(true);
      setErrorTab(null);

      const { error } = await supabase
        .from("Tables")
        .delete()
        .eq("id", tableId);

      if (error) {
        setErrorTab(error.message);
        return false;
      }

      return true;
    } catch (err: any) {
      setErrorTab(err.message || "Error desconocido");
      return false;
    } finally {
      setLoadingTab(false);
    }
  };

  return { loadingTab, errorTab, deleteTable };
};
