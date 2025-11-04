import React from "react";
import { Spinner } from "./ui/spinner";
import { Card, CardContent } from "./ui/card";
import { Trash2, Users } from "lucide-react";
import { getTables } from "@/hooks/useTables";
import { Badge } from "./ui/badge";

interface TableProps {
  businessId: number;
  refreshKey: number;
}

interface Tables {
  id: number;
  name: string;
  min_capacity: number;
  max_capacity: number;
  active: boolean;
}

const Table: React.FC<TableProps> = ({ businessId, refreshKey }) => {
  const { loading, error, data } = getTables({
    businessId,
    refreshKey
  });

  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-full mt-5">
        <Spinner className="size-8" />
      </div>
    );
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col w-full gap-4 items-center p-2">
      {data?.data.map((table: Tables) => (
        <Card className="w-full max-w-sm text-left py-5 px-1">
          <CardContent>
            <div className="flex flex-row justify-between items-center">
              <Badge className="px-2 py-1">{table.name}</Badge>
              <Trash2 size={20} color="#e20404" />
            </div>
            <div className="flex flex-row justify-between mt-3">
              <div className="flex gap-2 mb-1">
                <Users size={18} className="mt-1" />
                <p className="mb-1">
                  <span className="text-sm text-gray-500">Min.</span>{" "}
                  {table.min_capacity} |{" "}
                  <span className="text-sm text-gray-500">Max.</span>{" "}
                  {table.max_capacity}
                </p>
              </div>
              <p
                className={
                  table.active === true
                    ? "text-green-500 text-sm"
                    : "text-sm text-red-500"
                }
              >
                {table.active ? "Activa" : "Inactiva"}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Table;
