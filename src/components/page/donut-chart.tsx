"use client";

export interface DonutSegment {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

interface Props {
  segments: DonutSegment[];
  total: number;
  label?: string;
}

export function DonutChart({ segments, total, label = "total" }: Props) {
  const size = 180;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const gapBetween = 3; // px gap between segments

  let cumulativeLength = 0;

  const arcs = segments.map(seg => {
    const segLength = Math.max(0, (seg.percentage / 100) * circumference - gapBetween);
    const arc = {
      ...seg,
      dashOffset: -cumulativeLength,
      dashLength: segLength,
    };
    cumulativeLength += (seg.percentage / 100) * circumference;
    return arc;
  });

  const cx = size / 2;
  const cy = size / 2;

  const displayTotal =
    total >= 1_00_000
      ? `₹${(total / 1_00_000).toFixed(1)}L`
      : total >= 1_000
      ? `₹${(total / 1_000).toFixed(0)}K`
      : `₹${total.toLocaleString("en-IN")}`;

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      {/* SVG Donut */}
      <div className="relative mx-auto flex-shrink-0 sm:mx-0" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Background track */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-secondary"
          />
          {/* Segments */}
          {arcs.map((arc, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={arc.color}
              strokeWidth={strokeWidth - 2}
              strokeDasharray={`${arc.dashLength} ${circumference}`}
              strokeDashoffset={arc.dashOffset}
              strokeLinecap="butt"
            />
          ))}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="tab-nums text-xl font-black leading-tight">{displayTotal}</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {label}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {segments.map(seg => (
          <div key={seg.name} className="flex items-center gap-2.5 min-w-0">
            <div
              className="h-2.5 w-2.5 flex-shrink-0"
              style={{ backgroundColor: seg.color }}
            />
            <span className="flex-1 truncate text-sm text-muted-foreground">{seg.name}</span>
            <div className="flex-shrink-0 text-right">
              <span className="tab-nums text-sm font-bold">
                ₹{seg.amount.toLocaleString("en-IN")}
              </span>
              <span className="ml-1.5 text-xs text-muted-foreground/60">
                {seg.percentage.toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
