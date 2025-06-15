import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Terra Legacy',
  description: 'Get in touch with Terra Legacy for inquiries about our luxury properties, investment opportunities, or to schedule a consultation with our real estate experts.',
  keywords: 'contact Terra Legacy, real estate contact, property consultation, luxury real estate inquiry',
};

export default function ContactLayout({
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
