import type { Metadata } from "next";
import './globals.css';
import '@/styles/animations.css';
import 'aos/dist/aos.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TawkToChat from "@/components/TawkToChat";
import AOSInitializer from '@/components/AOSInitializer';

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
        <AOSInitializer />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <TawkToChat />
      </body>
    </html>
  )
}
