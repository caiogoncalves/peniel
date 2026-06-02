import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  title: "Peniel · Palavra do Dia",
  description: "Uma palavra de fé e afeto para o seu dia. Renovada a cada amanhecer.",
  openGraph: {
    title: "Peniel · Palavra do Dia",
    description: "Uma palavra de fé e afeto para o seu dia. Renovada a cada amanhecer.",
    url: "https://peniel.faith",
    siteName: "Peniel",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "https://peniel.faith/api/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peniel · Palavra do Dia",
    description: "Uma palavra de fé e afeto para o seu dia.",
    images: ["https://peniel.faith/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${lato.variable}`}>
      <body>{children}</body>
    </html>
  );
}
