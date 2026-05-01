// Shimmer skeleton that mirrors the real dashboard layout
export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 xl:px-0">

      {/* Page header — matches flex-col sm:flex-row sm:items-start sm:justify-between */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="shimmer h-2.5 w-32" />
          <div className="shimmer h-10 w-52" />
        </div>
        {/* Filter + View Ledger + Add Expense */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="shimmer h-9 w-[230px]" />
          <div className="shimmer h-9 w-28" />
          <div className="shimmer h-9 w-30" />
        </div>
      </div>

      {/* Stat cards — gap-px flush grid */}
      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-card p-6">
            <div className="shimmer h-2.5 w-28" />
            <div className="mt-3 shimmer h-10 w-40" />
            <div className="mt-4 shimmer h-4 w-24" />
          </div>
        ))}
      </div>

      {/* Lower section — lg:grid-cols-12 */}
      <div className="grid gap-8 lg:grid-cols-12">

        {/* Left: Spend by Category (col-span-7) */}
        <div className="lg:col-span-7">
          <div className="border border-border bg-card">
            {/* Card header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="shimmer h-4 w-36" />
              <div className="shimmer h-3 w-20" />
            </div>
            {/* Donut + legend side by side */}
            <div className="flex items-start gap-8 p-6">
              <div className="shimmer h-40 w-40 flex-shrink-0" />
              <div className="flex-1 space-y-3 pt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="shimmer h-3 w-3 flex-shrink-0" />
                    <div className="shimmer h-3 flex-1" style={{ maxWidth: `${60 - i * 6}%` }} />
                    <div className="shimmer h-3 w-16 ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="mt-6 border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <div className="shimmer h-4 w-40" />
            </div>
            <div className="divide-y divide-border">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3">
                  <div className="shimmer h-2.5 w-24" />
                  <div className="shimmer h-1.5 flex-1" />
                  <div className="shimmer h-2.5 w-14" />
                  <div className="shimmer h-4 w-8" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Activity + Peak (col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="shimmer h-4 w-32" />
              <div className="shimmer h-3.5 w-16" />
            </div>
            <div className="divide-y divide-border">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                  <div className="shimmer h-8 w-8 flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="shimmer h-3 w-36" />
                    <div className="shimmer h-2.5 w-24" />
                  </div>
                  <div className="shimmer h-3.5 w-12" />
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border bg-card p-5 space-y-2">
            <div className="shimmer h-3 w-28" />
            <div className="shimmer h-8 w-28" />
            <div className="shimmer h-2.5 w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}
