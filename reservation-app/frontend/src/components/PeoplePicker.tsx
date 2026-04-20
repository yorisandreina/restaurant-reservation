import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/apiClient";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  value: number;
  onChange: (value: number) => void;
  businessId: number;
}

const PeoplePicker: React.FC<Props> = ({ value, onChange, businessId }) => {
  const [maxPeople, setMaxPeople] = useState(10);

  useEffect(() => {
    const fetchMaxCapacity = async () => {
      if (!businessId) return;

      const { data, error } = await supabase
        .from("Tables")
        .select("max_capacity")
        .eq("business_id", businessId)
        .order("max_capacity", { ascending: false })
        .limit(1);

      if (error || !data || data.length === 0) {
        setMaxPeople(10);
        return;
      }

      const maxCapacity = data?.[0]?.max_capacity;
      setMaxPeople(maxCapacity);
    };

    fetchMaxCapacity();
  }, [businessId]);

  useEffect(() => {
    if (maxPeople > 0 && value > maxPeople) {
      onChange(maxPeople);
    }
  }, [maxPeople, value, onChange]);

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-small text-gray-400">Pax</label>
      <Select
        value={value?.toString()}
        onValueChange={(e) => onChange(Number(e))}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={value?.toString()} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Array.from({ length: maxPeople }, (_, i) => i + 1).map((n) => (
              <SelectItem key={n} value={n.toString()}>
                {n}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PeoplePicker;