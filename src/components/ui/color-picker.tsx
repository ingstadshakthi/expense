"use client";

interface Props {
  value: string;
  onChange: (color: string) => void;
  colors?: string[];
}

export function ColorPicker({ value, onChange, colors }: Props) {
  const defaultColors = colors || [
    "#f87171",
    "#fbbf24",
    "#34d399",
    "#60a5fa",
    "#a78bfa",
    "#f472b6",
    "#facc15",
    "#22d3ee",
    "#818cf8",
    "#9ca3af",
    "#ec4899",
    "#10b981",
    "#f59e0b",
    "#3b82f6",
    "#6366f1",
    "#ef4444",
    "#84cc16",
    "#14b8a6",
    "#0ea5e9",
    "#d946ef",
    "#f97316",
    "#4ade80",
    "#c084fc",
    "#fb7185",
    "#eab308",
    "#06b6d4",
    "#8b5cf6",
    "#64748b",
    "#d97706",
    "#16a34a",
  ];

  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Pick a color">
      {defaultColors.map(color => (
        <button
          key={color}
          type="button"
          role="radio"
          aria-checked={value === color}
          aria-label={`Color ${color}`}
          onClick={() => onChange(color)}
          className={`h-8 w-8 border-2 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
            value === color ? "border-black dark:border-white" : "border-transparent"
          }`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
