"use client";

// Generic page-level loading skeleton (used for routes without specific loading.tsx)
export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 xl:px-0">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="shimmer h-2.5 w-24" />
          <div className="shimmer h-8 w-48" />
        </div>
      </div>
      {/* Content block */}
      <div className="shimmer h-64 w-full" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="shimmer h-24" />
        ))}
      </div>
    </div>
  );
}
