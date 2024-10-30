import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });
const notoKufiArabic = Noto_Sans_Arabic({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Learn Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>
        <main>
          <Suspense fallback={<p>Loading....</p>}>{children}</Suspense>
        </main>
      </body>
    </html>
  );
}
