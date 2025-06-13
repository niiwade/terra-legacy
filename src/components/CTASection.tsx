import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="w-full py-12 px-6 md:px-12 bg-burgundy text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Start Your Real Estate Journey Today</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Whether you&apos;re looking to buy, sell, or rent, our team of experienced professionals is here to help you every step of the way.
        </p>
        <Link href="/contact" className="bg-white text-burgundy px-6 py-3 rounded-md font-medium hover:bg-gray-100 inline-block">
          Talk To Us
        </Link>
      </div>
    </section>
  );
}
