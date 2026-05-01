// Shimmer skeleton that mirrors the real ledger layout
export default function ExpensesLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 xl:px-0">

      {/* Page header — left label+title, right add button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="shimmer h-2.5 w-28" />
          <div className="shimmer h-8 w-36" />
        </div>
        <div className="shimmer h-9 w-28" />
      </div>

      {/* Filter bar — border bg-card p-3, 4 selects */}
      <div className="flex flex-wrap items-center gap-3 border border-border bg-card p-3">
        <div className="shimmer h-9 w-[140px]" />
        <div className="shimmer h-9 w-[100px]" />
        <div className="shimmer h-9 w-[160px]" />
        <div className="shimmer h-9 w-[160px]" />
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-border bg-card">
        {/* Header row */}
        <div className="flex items-center gap-4 border-b border-border bg-secondary/50 px-4 py-3">
          <div className="shimmer h-2.5 w-16 shrink-0" style={{ width: "90px" }} />
          <div className="shimmer h-2.5" style={{ width: "130px" }} />
          <div className="shimmer h-2.5 flex-1" style={{ minWidth: "80px" }} />
          <div className="shimmer h-2.5" style={{ width: "70px" }} />
          <div className="shimmer h-2.5" style={{ width: "90px" }} />
          <div className="shimmer h-2.5" style={{ width: "140px" }} />
          <div className="shimmer h-2.5" style={{ width: "60px" }} />
        </div>
        {/* Data rows */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-border px-4 py-4 last:border-0"
          >
            {/* Date — two lines */}
            <div className="shrink-0 space-y-1.5" style={{ width: "90px" }}>
              <div className="shimmer h-3 w-full" />
              <div className="shimmer h-2.5 w-14" />
            </div>
            {/* Name */}
            <div className="shimmer h-3" style={{ width: "130px" }} />
            {/* Description */}
            <div className="shimmer h-3 flex-1" style={{ minWidth: "80px", maxWidth: "180px" }} />
            {/* Amount */}
            <div className="shimmer h-3" style={{ width: "70px" }} />
            {/* Category badge */}
            <div className="shimmer h-5" style={{ width: "70px" }} />
            {/* Payment badge */}
            <div className="shimmer h-5" style={{ width: i % 3 === 0 ? "140px" : "100px" }} />
            {/* Actions */}
            <div className="shimmer h-5 ml-auto" style={{ width: "50px" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
