// app/layout.tsx

import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sideBar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Nigeria Agri Forecasting",
  description: "Price forecasting and logistics optimization for Nigerian agricultural markets",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans bg-parchment text-ink`}>
        <Sidebar />
        <main className="ml-64 flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}