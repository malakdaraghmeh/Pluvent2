import React from 'react';
import './globals.css';
import localFont from 'next/font/local';

import { cn } from "@/lib/utils";

const thmanyah = localFont({
  src: [
    { path: '../../public/fonts/thmanyahsans-Light.otf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/thmanyahsans-Regular.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/thmanyahsans-Medium.otf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/thmanyahsans-Bold.otf', weight: '700', style: 'normal' },
    { path: '../../public/fonts/thmanyahsans-Black.otf', weight: '900', style: 'normal' },
  ],
  variable: '--font-thmanyah',
});

export const metadata = {
  title: 'Default Title',
  description: 'Default description',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html dir="rtl" lang="ar" className={cn("font-sans", thmanyah.variable)}>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${thmanyah.className}`}>
          {children}
      </body>
    </html>
  );
}
