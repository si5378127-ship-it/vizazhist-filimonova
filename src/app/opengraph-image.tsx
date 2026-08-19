import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt =
  "Визажист Елена Филимонова в Твери — макияж и укладки";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F2EC",
          padding: "72px",
          color: "#2B2825",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 28, color: "#6F675F" }}>
            Визажист · Тверь
          </div>
          <div style={{ fontSize: 72, lineHeight: 1.05 }}>
            Елена Филимонова
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 40 }}>Макияж</div>
          <div style={{ fontSize: 28, color: "#6F675F" }}>3 000 ₽</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
