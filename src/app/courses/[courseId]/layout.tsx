import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Course Details | Terra Legacy",
  description: "Detailed information about our educational courses on land investment and property development.",
};

export default function CourseDetailsLayout({
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
