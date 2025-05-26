import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import Head from "next/head";
import { CartProvider } from "../context/CartContext";
import { UsernameProvider } from "@/context/UsernameContext";
import { SettingsProvider } from "@/context/SettingsContext";
import ThemeProvider from "./ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Findit All - Our Categories",
  description: "Findit All - Browse and explore our categories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Findit All</title>
      </Head>
      <body className={"antialiased"} style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
        <SettingsProvider>
          <ThemeProvider>
            <CartProvider>
              <UsernameProvider>
                {children}
              </UsernameProvider>
            </CartProvider>
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
