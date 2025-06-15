import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Store | Terra Legacy",
  description: "Explore our collection of educational resources, courses, and tools for land investment and property development.",
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
