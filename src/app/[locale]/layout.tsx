import React from "react";
import "../globals.css";
import { Sora, Tajawal } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import ClientProviders from "@/Providers/ClientProviders";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sora",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-tajawal",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let messages;

  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return {
    title: messages.Home.title,
    description: messages.Home.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let messages;

  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  const isArabic = locale === "ar";
  const dir = isArabic ? "rtl" : "ltr";
  const currentFont = isArabic ? tajawal : sora;

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(
        "font-sans",
        sora.variable,
        tajawal.variable
      )}
    >
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="shortcut icon"
          href="/favicon.ico"
          type="image/x-icon"
        />
      </head>

      <body className={currentFont.className}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <ClientProviders>
            {children}
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}