import ForumDetailsSection from '@/components/community/ForumDetailsSection';
import { Metadata } from 'next';

// Forum topic data will be implemented in the future

// Define the props type that Next.js 15 expects based on the error message
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

// This page will use the id parameter when forum data is implemented
export default async function Page({ params }: PageProps) {
  // Resolve the params Promise
  const resolvedParams = await params;
  // The id will be used to fetch the specific forum topic data in future implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const id = resolvedParams.id;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ForumDetailsSection />
    </div>
  );
}

// Generate metadata for the page
export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  // Resolve the params Promise
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  return {
    title: `Forum Topic ${id}`,
    description: 'Forum topic discussion',
  };
}
