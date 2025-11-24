'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TawkToChat from "@/components/TawkToChat";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if current path is an admin route
  const isAdminRoute = pathname?.startsWith('/admin');

  // If it's an admin route, render children without Header/Footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // For all other routes, render with Header and Footer
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <TawkToChat />
    </>
  );
}
