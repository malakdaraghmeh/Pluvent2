// app/[locale]/layout.tsx
import React from 'react';
import '@/app/globals.css';
import { Sora, Tajawal } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import ClientProviders from '@/Providers/ClientProviders';
import { cn } from "@/lib/utils";

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sora',
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-tajawal',
});

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return {
    title: messages.Home?.title || 'Default Title',
    description: messages.Home?.description || 'Default description',
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  const isArabic = locale === 'ar';
  const currentFont = isArabic ? tajawal : sora;
  const dir = isArabic ? 'rtl' : 'ltr';

  return (
    <html 
      lang={locale} 
      dir={dir} 
      className={cn(currentFont.variable, currentFont.className)}
    >
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProviders>
            <div className="p-4">
              {children}
            </div>
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}