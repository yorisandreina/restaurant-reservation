import Table from "@/components/Table";
import TableFormModal from "@/components/TableFormModal";
import { Button } from "@/components/ui/button";
import { createTable } from "@/hooks/useTables";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TablesScreen = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const businessId = Number(localStorage.getItem("businessId"));

  const { postTable, loading, error } = createTable();

  useEffect(() => {
    if (!businessId) {
      navigate("/client-auth", { replace: true });
    }
  }, []);

  const handleSubmit = async (formData: {
    name: string;
    minCapacity: number;
    maxCapacity: number;
    active: boolean;
  }) => {
    const tableCreated = await postTable({
        businessId: businessId,
        name: formData.name,
        minCapacity: formData.minCapacity,
        maxCapacity: formData.maxCapacity,
        active: formData.active,
    });

    if (tableCreated) {
      setOpenModal(false);
      setRefreshKey((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col p-4 text-center items-center">
      <div className="flex flex-row items-center w-sm gap-4">
        <ArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h1 className="text-2xl font-semibold">Mesas</h1>
      </div>
      <Button
        variant={"outline"}
        className="w-sm my-4"
        onClick={() => setOpenModal(true)}
      >
        Agregar mesa
      </Button>
      <Table
        businessId={businessId}
        refreshKey={refreshKey}
        onRefresh={() => setRefreshKey((prev) => prev + 1)}
      />
      <TableFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default TablesScreen;
