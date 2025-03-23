import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/trpc/client";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from "sonner";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Innhee",
  description: "Innhee",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <NextIntlClientProvider>
          <TRPCProvider>
            <Toaster />
            <NuqsAdapter>
              {children}
            </NuqsAdapter>
          </TRPCProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
