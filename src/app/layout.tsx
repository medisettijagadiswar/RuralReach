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

import { AuthProvider } from "@/contexts/AuthContext";
import { TypographyProvider } from "@/contexts/TypographyContext";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "RuralReach - Education for All",
  description: "Production-grade, mobile-first education platform for rural areas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <TypographyProvider>
            <ScrollToTop />
            {children}
            <ToastContainer position="bottom-right" />
          </TypographyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
