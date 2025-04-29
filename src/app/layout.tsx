import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from 'react';
import Head from 'next/head';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Findit All - Our Categories", // Update the title here
  description: "Findit All - Browse and explore our categories",
};

export default function RootLayout({
  children,
}: Readonly < {
  children: React.ReactNode;
}>) {
  return (
    <html lang = "en">
      <Head>
        <title>Findit All</title> {/* Default title */}
      </Head>
      <body
        className = {'antialiased '}>
        {children}
      </body>
    </html>
  );
}

// Children -> are rendered inside the layout

// For the created Pages "TopRated, My Favorites, Now Playing, Popular":

