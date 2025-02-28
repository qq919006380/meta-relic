import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "百灵|雷州石狗",
  description: "雷州石狗，源于古代百越族的图腾崇拜，是雷州半岛多个土著民族文化的融合象征。石狗不仅展现了精湛的雕刻工艺，更承载着当地独特的民俗信仰与文化传承。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        style={{
          background: `linear-gradient(135deg, rgba(42,40,38,0.03) 0%, rgba(150,53,30,0.05) 100%)`
        }}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
