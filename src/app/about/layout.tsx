import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us | Terra Legacy Real Estate",
  description: "Learn about Terra Legacy's journey, values, and the team behind our success in the real estate industry.",
};

export default function AboutLayout({
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
