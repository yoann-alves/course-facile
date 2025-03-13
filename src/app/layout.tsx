import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from '@/components/ui/toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Course Facile",
  description: "Application de gestion de courses et de péremptions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
