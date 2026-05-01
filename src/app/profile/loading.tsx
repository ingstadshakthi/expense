export default function ProfileLoading() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8 xl:px-0">

      {/* Header */}
      <div className="space-y-2">
        <div className="shimmer h-2.5 w-20" />
        <div className="shimmer h-8 w-44" />
      </div>

      {/* Card */}
      <div className="border border-border bg-card p-6 space-y-6">

        {/* Email */}
        <div className="space-y-1.5">
          <div className="shimmer h-2.5 w-12" />
          <div className="shimmer h-10 w-full" />
        </div>

        <div className="h-px bg-border" />

        {/* Name */}
        <div className="space-y-1.5">
          <div className="shimmer h-2.5 w-28" />
          <div className="shimmer h-10 w-full" />
        </div>

        <div className="h-px bg-border" />

        {/* Budget */}
        <div className="space-y-1.5">
          <div className="shimmer h-2.5 w-32" />
          <div className="shimmer h-10 w-full" />
        </div>

        {/* Actions */}
        <div className="border-t border-border pt-4">
          <div className="shimmer h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
