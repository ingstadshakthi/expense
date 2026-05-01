"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface Props {
  year: number;
  month: number;
}

/** Standalone "Today" button — always occupies space, invisible when already on current month */
export function TodayButton({ year, month }: Props) {
  const router = useRouter();
  const now = new Date();
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth() + 1;

  return (
    <button
      onClick={() => router.push(`/dashboard?year=${now.getFullYear()}&month=${now.getMonth() + 1}`)}
      disabled={isCurrentMonth}
      tabIndex={isCurrentMonth ? -1 : 0}
      className={`h-9 border border-border bg-card px-4 text-xs font-semibold text-primary transition-colors hover:bg-secondary ${
        isCurrentMonth ? "invisible" : ""
      }`}
    >
      Today
    </button>
  );
}

/** Month navigator — prev chevron · Month Year · next chevron */
export function DashboardFilters({ year, month }: Props) {
  const router = useRouter();
  const now = new Date();

  function navigate(newYear: number, newMonth: number) {
    router.push(`/dashboard?year=${newYear}&month=${newMonth}`);
  }

  function prev() {
    const m = month === 1 ? 12 : month - 1;
    const y = month === 1 ? year - 1 : year;
    navigate(y, m);
  }

  function next() {
    const m = month === 12 ? 1 : month + 1;
    const y = month === 12 ? year + 1 : year;
    navigate(y, m);
  }

  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth() + 1;

  return (
    <div className="flex items-center border border-border bg-card">
      <button
        onClick={prev}
        className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="flex h-9 min-w-[130px] items-center justify-center border-x border-border px-3 text-sm font-semibold">
        {MONTHS[month - 1]} {year}
      </div>

      <button
        onClick={next}
        disabled={isCurrentMonth}
        className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
