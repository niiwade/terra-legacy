import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Courses | Terra Legacy",
  description: "Explore our educational courses on land investment, property development, and real estate strategies.",
};

export default function CoursesLayout({
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
