import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/trpc/client";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from "sonner";

// Import the Inter font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Innhee",
  description: "Innhee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <TRPCProvider>
          <Toaster />
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
        </TRPCProvider>
      </body>
    </html>
  );
}
