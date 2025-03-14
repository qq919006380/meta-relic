import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className="antialiased min-h-screen"
        style={{
          background: `linear-gradient(135deg, rgba(42,40,38,0.03) 0%, rgba(150,53,30,0.05) 100%)`,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
        }}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
