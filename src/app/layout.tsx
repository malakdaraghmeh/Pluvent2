import React from 'react';
import './globals.css';
import { Sora, Tajawal } from 'next/font/google';
import { cookies } from 'next/headers';
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

export const metadata = {
  title: 'Default Title',
  description: 'Default description',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const locale = cookieStore.get('locale')?.value || 'ar';
  const isArabic = locale === 'ar';
  const currentFont = isArabic ? tajawal : sora;
  const dir = isArabic ? 'rtl' : 'ltr';

  return (
    <html dir={dir} lang={locale} className={cn("font-sans", currentFont.variable)}>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${currentFont.className}`}>
        {children}
      </body>
    </html>
  );
}
