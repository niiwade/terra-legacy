import { notFound } from 'next/navigation';
import ResourceDetailsSection from '@/components/community/ResourceDetailsSection';

// Define the type for resource data
interface ExternalLink {
  title: string;
  url: string;
  description: string;
}

interface DownloadableFile {
  name: string;
  type: string;
  size: string;
  url: string;
}

interface RelatedResource {
  id: string;
  title: string;
  category: string;
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

interface Resource {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  icon: string;
  lastUpdated: string;
  relatedResources: RelatedResource[];
  downloadableFiles: DownloadableFile[];
  externalLinks: ExternalLink[];
  contactInfo: ContactInfo;
}

// Sample resource data
const RESOURCES = {
  '1': {
    id: '1',
    title: 'First-Time Homebuyer Guide',
    category: 'Guides',
    description: 'A comprehensive guide for first-time homebuyers covering everything from mortgage basics to closing costs.',
    content: 'Buying your first home is one of the most significant financial decisions you will make in your lifetime. This guide aims to simplify the process and provide you with the knowledge you need to make informed decisions.\n\nUnderstanding Mortgages\n\nA mortgage is essentially a loan specifically used to purchase real estate. When you take out a mortgage, the property serves as collateral for the loan. If you fail to make payments, the lender can foreclose on the property.\n\nThere are several types of mortgages available, including:\n\n- Fixed-rate mortgages: The interest rate remains constant throughout the loan term.\n- Adjustable-rate mortgages (ARMs): The interest rate can change periodically based on market conditions.\n- FHA loans: Government-backed loans with lower down payment requirements.\n- VA loans: Loans for veterans and active military personnel.\n- USDA loans: Loans for rural property purchases.\n\nThe Homebuying Process\n\n1. Assess your financial readiness\n2. Get pre-approved for a mortgage\n3. Find a real estate agent\n4. Search for homes\n5. Make an offer\n6. Get a home inspection\n7. Secure final mortgage approval\n8. Close on your new home\n\nClosing Costs\n\nClosing costs typically range from 2% to 5% of the loan amount and include expenses such as:\n\n- Loan origination fees\n- Appraisal fees\n- Title insurance\n- Attorney fees\n- Recording fees\n- Prepaid expenses (property taxes, homeowners insurance)\n\nFirst-time homebuyer programs may offer assistance with down payments and closing costs. Check with your state housing authority for available programs.',
    icon: 'document',
    lastUpdated: 'June 1, 2025',
    relatedResources: [
      {
        id: '2',
        title: 'Local Housing Assistance Programs',
        category: 'Financial'
      },
      {
        id: '5',
        title: 'Neighborhood Guides',
        category: 'Neighborhoods'
      }
    ],
    downloadableFiles: [
      {
        name: 'First-Time Homebuyer Checklist',
        type: 'PDF',
        size: '1.2 MB',
        url: '/resources/downloads/homebuyer-checklist.pdf'
      },
      {
        name: 'Mortgage Calculator Spreadsheet',
        type: 'Excel',
        size: '345 KB',
        url: '/resources/downloads/mortgage-calculator.xlsx'
      }
    ],
    externalLinks: [
      {
        title: 'Consumer Financial Protection Bureau',
        url: 'https://www.consumerfinance.gov/owning-a-home/',
        description: 'Official government resources for homebuyers.'
      },
      {
        title: 'HUD First-Time Homebuyer Programs',
        url: 'https://www.hud.gov/topics/buying_a_home',
        description: 'Information about federal homebuying assistance programs.'
      }
    ],
    contactInfo: {
      name: 'Homebuyer Education Team',
      email: 'homebuyer@terralegacy.com',
      phone: '(555) 123-4567'
    }
  },
  '2': {
    id: '2',
    title: 'Local Housing Assistance Programs',
    category: 'Financial',
    description: 'Information about local programs that provide financial assistance for housing, including down payment assistance and tax credits.',
    content: 'Many homebuyers are unaware of the numerous financial assistance programs available at the local level. These programs can significantly reduce the financial burden of purchasing a home.\n\nDown Payment Assistance Programs\n\nDown payment assistance programs help homebuyers cover the upfront costs of purchasing a home. These programs typically offer:\n\n- Grants (funds that don\'t need to be repaid)\n- Zero-interest loans\n- Deferred payment loans\n- Forgivable loans\n\nEligibility for these programs often depends on factors such as income level, credit score, and whether you\'re a first-time homebuyer.\n\nTax Credits and Deductions\n\nSeveral tax benefits are available to homeowners, including:\n\n- Mortgage Interest Deduction: Allows you to deduct mortgage interest paid on loans up to $750,000.\n- Property Tax Deduction: You can deduct up to $10,000 in state and local taxes, including property taxes.\n- Mortgage Credit Certificate (MCC): Provides a tax credit of 20-30% of mortgage interest paid annually.\n\nLocal Housing Trust Funds\n\nMany communities have established housing trust funds that provide financial support for affordable housing initiatives. These funds may offer:\n\n- Low-interest loans for home purchases\n- Rehabilitation assistance for existing homes\n- Subsidies to reduce monthly mortgage payments\n\nEmployer-Assisted Housing Programs\n\nSome employers offer housing assistance as an employee benefit, which may include:\n\n- Down payment grants or loans\n- Mortgage subsidies\n- Homebuyer education resources\n- Relocation assistance\n\nContact your local housing authority or a HUD-approved housing counselor to learn more about programs available in your area.',
    icon: 'money',
    lastUpdated: 'May 15, 2025',
    relatedResources: [
      {
        id: '1',
        title: 'First-Time Homebuyer Guide',
        category: 'Guides'
      },
      {
        id: '6',
        title: 'Real Estate Market Reports',
        category: 'Market'
      }
    ],
    downloadableFiles: [
      {
        name: 'Local Assistance Programs Directory',
        type: 'PDF',
        size: '2.4 MB',
        url: '/resources/downloads/local-assistance-directory.pdf'
      },
      {
        name: 'Assistance Program Eligibility Calculator',
        type: 'Excel',
        size: '520 KB',
        url: '/resources/downloads/assistance-calculator.xlsx'
      }
    ],
    externalLinks: [
      {
        title: 'HUD Local Homebuying Programs',
        url: 'https://www.hud.gov/topics/buying_a_home/localbuying',
        description: 'Federal resources for finding local homebuying assistance.'
      },
      {
        title: 'State Housing Finance Agency',
        url: 'https://www.statehfa.org/assistance',
        description: 'Information about city-specific housing assistance programs.'
      }
    ],
    contactInfo: {
      name: 'Financial Assistance Team',
      email: 'assistance@terralegacy.com',
      phone: '(555) 234-5678'
    }
  }
};

import { Metadata } from 'next';

// Define the props type that Next.js 15 expects based on the error message
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Page({ params }: PageProps) {
  // Resolve the params Promise
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const resource = RESOURCES[id as keyof typeof RESOURCES] as Resource | undefined;
  
  if (!resource) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <ResourceDetailsSection resource={resource} />
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
  
  const resource = RESOURCES[id as keyof typeof RESOURCES] as Resource | undefined;
  
  if (!resource) {
    return {
      title: 'Resource Not Found',
    };
  }
  
  return {
    title: resource.title,
    description: resource.description,
  };
}
