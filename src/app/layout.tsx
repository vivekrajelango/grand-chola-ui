import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AddToHomeScreenButton from "@/components/AddToHomeScreenButton";
import Navigation from "@/components/Navigation";
import StoreProvider from "@/store/StoreProvider";
import MainLayout from "@/components/RootLayout";
import DynamicManifest from "@/components/DynamicManifest";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Grand Chola',
  description: 'Grand Chola - Order Online or Collection at M27 8FH',
  manifest: '/manifest.json',
  themeColor: '#f9f3f0',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <DynamicManifest />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="">
        <StoreProvider>
          <MainLayout children={children}></MainLayout>
        </StoreProvider>
      </body>
    </html>
  )
}
