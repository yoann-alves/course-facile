import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from '@/components/ui/toast';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { ShoppingListProvider } from '@/contexts/ShoppingListContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

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
    <html lang="fr" className="light">
      <body className={`${inter.className} min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
        <ThemeProvider>
          <NotificationProvider>
            <ShoppingListProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </ShoppingListProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
