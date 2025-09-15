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
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {defaultColors.map((color) => (
        <div
          key={color}
          className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
            value === color ? "border-black" : "border-transparent"
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  );
}
