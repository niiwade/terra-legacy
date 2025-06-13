import type { Metadata } from "next";
import './globals.css';
import '@/styles/animations.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FavoritesProvider } from '@/context/FavoritesContext';
import TawkToChat from "@/components/TawkToChat";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Terra Legacy | Find Your Dream Property",
  description: "Discover your dream property with Terra Legacy - Your trusted real estate partner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FavoritesProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <TawkToChat /> 
        </FavoritesProvider>
      </body>
    </html>
  )
}
