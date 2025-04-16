import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin", "cyrillic"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <title>xdearboy</title>
        <meta name="description" content="Крутой вебсайтик на нечистом React от xdearboy, то есть меня." />
        <SpeedInsights />
      </head>
      <body className={jetbrainsMono.className}>{children}</body>
    </html>
  );
}
