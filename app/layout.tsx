import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
          <div className="container mx-auto px-6">
            <ul className="flex justify-center items-center h-16 space-x-8">
              <li>
                <a href="/origin" className="group relative flex items-center">
                  <span className="text-gray-300 text-lg font-medium hover:text-white transition-colors duration-200">
                    石狗信仰起源
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li>
                <a href="/making" className="group relative flex items-center">
                  <span className="text-gray-300 text-lg font-medium hover:text-white transition-colors duration-200">
                    石狗雕制起始
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li>
                <a href="/distribution" className="group relative flex items-center">
                  <span className="text-gray-300 text-lg font-medium hover:text-white transition-colors duration-200">
                    石狗分布及置放
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li>
                <a href="/protection" className="group relative flex items-center">
                  <span className="text-gray-300 text-lg font-medium hover:text-white transition-colors duration-200">
                    雷州石狗保护
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
