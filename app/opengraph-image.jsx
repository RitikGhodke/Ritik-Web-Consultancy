import { ImageResponse } from "next/og";

export const alt = "Ritik Web Consultancy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background:
            "linear-gradient(135deg, #05060a 0%, #0b1a3d 55%, #2a1b6b 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#67e8f9", letterSpacing: 6 }}>
          {"// WEB DEVELOPMENT"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 800,
            marginTop: 24,
            lineHeight: 1.05,
          }}
        >
          Ritik Web Consultancy
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#9aa4bd", marginTop: 28 }}>
          Websites that grow your business
        </div>
      </div>
    ),
    { ...size }
  );
}