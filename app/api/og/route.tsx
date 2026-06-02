import { ImageResponse } from "next/og";
import { getTodayCard } from "@/lib/kv";

export const runtime = "edge";

export async function GET(req: Request) {
  const card = await getTodayCard();
  const { searchParams } = new URL(req.url);
  const download = searchParams.get("download") === "true";

  const response = new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "#0a0a0f",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Imagem de fundo */}
        {card.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.imageUrl}
            alt=""
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.55,
            }}
          />
        )}

        {/* Gradiente escuro sobre a imagem */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.7) 50%, rgba(10,10,15,0.95) 100%)",
            display: "flex",
          }}
        />

        {/* Conteúdo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "0.4em",
              color: "#d4af37",
              textTransform: "uppercase",
              marginBottom: "28px",
              fontWeight: 300,
            }}
          >
            P E N I E L
          </div>

          {/* Linha dourada */}
          <div
            style={{
              width: "120px",
              height: "1px",
              background: "linear-gradient(to right, transparent, #d4af37, transparent)",
              marginBottom: "28px",
              display: "flex",
            }}
          />

          {/* Palavra */}
          <div
            style={{
              fontSize: "42px",
              color: "#f5ead8",
              fontStyle: "italic",
              textAlign: "center",
              lineHeight: 1.3,
              marginBottom: "28px",
              maxWidth: "900px",
            }}
          >
            &ldquo;{card.palavra}&rdquo;
          </div>

          {/* Versículo */}
          <div
            style={{
              fontSize: "22px",
              color: "#e8d5a0",
              fontStyle: "italic",
              textAlign: "center",
              marginBottom: "10px",
              maxWidth: "800px",
            }}
          >
            &ldquo;{card.versiculo}&rdquo;
          </div>
          <div style={{ fontSize: "18px", color: "#d4af37", marginBottom: "32px" }}>
            — {card.referencia}
          </div>

          {/* Linha dourada base */}
          <div
            style={{
              width: "80px",
              height: "1px",
              background: "linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)",
              display: "flex",
            }}
          />
        </div>

        {/* Watermark */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "24px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "rgba(212,175,55,0.7)",
              letterSpacing: "0.1em",
              fontStyle: "italic",
            }}
          >
            peniel.faith
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: download
        ? { "Content-Disposition": 'attachment; filename="peniel-palavra-do-dia.png"' }
        : {},
    }
  );

  return response;
}
