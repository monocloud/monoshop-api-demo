import type { Metadata } from "next";
import React from "react";
import { Navbar } from "./components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "MonoShop - Dashboard",
  description:
    "MonoCloud sample dashboard showcasing access-token-protected APIs, scoped authorization, and secure bearer-token forwarding.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-text-main antialiased min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 px-6 md:px-10 py-10">{children}</main>
      </body>
    </html>
  );
}
