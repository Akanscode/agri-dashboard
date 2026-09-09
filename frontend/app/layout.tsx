// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/sideBar";

export const metadata: Metadata = {
  title: "Nigeria Agri Forecasting",
  description: "Price forecasting and logistics optimization for Nigerian agricultural markets",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-parchment text-ink">
        <Sidebar />
        <main className="ml-64 flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}