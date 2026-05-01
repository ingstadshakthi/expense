import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ea580c", // primary orange (oklch 0.65 0.15 50 ≈ #ea580c)
          color: "white",
          fontFamily: "system-ui, sans-serif",
          fontSize: 20,
          fontWeight: 900,
          letterSpacing: "-0.5px",
        }}
      >
        E
      </div>
    ),
    { ...size }
  );
}
