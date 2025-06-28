import type { Metadata } from "next";
import './globals.css';
import '@/styles/animations.css';
import 'aos/dist/aos.css';
import { Montserrat, Manrope } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TawkToChat from "@/components/TawkToChat";
import AOSInitializer from '@/components/AOSInitializer';
import { CartProvider } from './context/CartContext';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
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
    <html lang="en" className={`${montserrat.variable} ${manrope.variable}`}>
      <body className="font-montserrat">
        <CartProvider>
          <AOSInitializer />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <TawkToChat />
        </CartProvider>
      </body>
    </html>
  )
}
