import React from "react";
import "./globals.css";
import { Sora, Tajawal } from "next/font/google";
import { cn } from "@/lib/utils";

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

export const metadata = {
  title: "Default Title",
  description: "Default description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
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

      <body>{children}</body>
    </html>
  );
}