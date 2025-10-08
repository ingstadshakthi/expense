"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  currentYear: number;
  currentMonth: number;
}

export function FilterControls({ currentYear, currentMonth }: Props) {
  const router = useRouter();
  const [month, setMonth] = useState(currentMonth.toString());
  const [year, setYear] = useState(currentYear.toString());

  const handleNavigate = (newYear: string, newMonth: string) => {
    router.push(`/expenses/${newYear}/${newMonth}`);
  };

  const months = Array.from({ length: 12 }, (_, i) => ({
    label: format(new Date(0, i), "MMMM"),
    value: (i + 1).toString(),
  }));

  const currentYearNum = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => (currentYearNum - i).toString());

  return (
    <div className="flex items-center gap-2">
      {/* Month Selector */}
      <Select
        value={month}
        onValueChange={val => {
          setMonth(val);
          handleNavigate(year, val);
        }}
      >
        <SelectTrigger className="bg-background w-[140px] border">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {months.map(m => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Year Selector */}
      <Select
        value={year}
        onValueChange={val => {
          setYear(val);
          handleNavigate(val, month);
        }}
      >
        <SelectTrigger className="bg-background w-[100px] border">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {years.map(y => (
            <SelectItem key={y} value={y}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
