'use client';

import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ResourceDetailsSection from '@/components/community/ResourceDetailsSection';

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
    content: 'Many homebuyers, especially first-time buyers, face challenges with the upfront costs of purchasing a home. Fortunately, numerous local, state, and federal programs exist to provide financial assistance.\n\nDown Payment Assistance Programs\n\nDown payment assistance programs help homebuyers cover the initial down payment required when purchasing a home. These programs typically offer:\n\n- Grants: Funds that do not need to be repaid\n- Forgivable loans: Loans that are forgiven over a set period if certain conditions are met\n- Deferred payment loans: Loans where payments are deferred until the home is sold or refinanced\n- Low-interest loans: Traditional loans with below-market interest rates\n\nQualification for these programs often depends on factors such as income level, credit score, and whether you\'re a first-time homebuyer.\n\nTax Credits and Deductions\n\nVarious tax benefits are available to homeowners, including:\n\n- Mortgage interest deduction: Allows homeowners to deduct mortgage interest payments from their taxable income\n- Property tax deduction: Enables deduction of property taxes paid on your primary residence\n- Mortgage credit certificate (MCC): Provides a tax credit for a percentage of the mortgage interest paid each year\n\nLocal Programs in Our Area\n\n1. City First-Time Homebuyer Grant: Provides up to $10,000 in down payment assistance for qualified buyers purchasing within city limits\n\n2. County Housing Trust Fund: Offers low-interest loans up to $15,000 for down payment and closing costs\n\n3. State Housing Finance Agency: Provides below-market rate mortgages and down payment assistance\n\n4. Neighborhood Stabilization Program: Targets specific neighborhoods for revitalization with special incentives for homebuyers\n\nHow to Apply\n\nThe application process varies by program but typically involves:\n\n1. Verifying your eligibility based on income, credit score, and other factors\n2. Completing homebuyer education courses (often required)\n3. Working with an approved lender or housing counselor\n4. Submitting documentation of your financial situation\n5. Meeting property requirements (some programs restrict the type or location of eligible properties)',
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
        title: 'State Housing Finance Agency',
        url: 'https://www.statehfa.org',
        description: 'Official state agency for housing assistance programs.'
      },
      {
        title: 'City Housing Department',
        url: 'https://www.cityhousing.gov',
        description: 'Information about city-specific housing assistance programs.'
      }
    ],
    contactInfo: {
      name: 'Financial Assistance Team',
      email: 'assistance@terralegacy.com',
      phone: '(555) 234-5678'
    }
  },
  '3': {
    id: '3',
    title: 'Community Development Organizations',
    category: 'Community',
    description: 'A directory of local organizations focused on community development, affordable housing, and neighborhood improvement.',
    content: 'Community development organizations play a vital role in creating vibrant, sustainable neighborhoods. These organizations work at the grassroots level to address local needs and improve quality of life for residents.\n\nTypes of Community Organizations\n\n1. Community Development Corporations (CDCs)\n   - Nonprofit organizations focused on revitalizing specific neighborhoods\n   - Often develop affordable housing and commercial spaces\n   - Provide services such as job training, financial education, and youth programs\n\n2. Housing Advocacy Groups\n   - Focus on tenants&apos; rights and affordable housing policy\n   - Provide education about fair housing laws\n   - Advocate for policy changes at local and state levels\n\n3. Neighborhood Associations\n   - Represent residents of specific geographic areas\n   - Address quality-of-life issues such as safety, beautification, and zoning\n   - Organize community events and foster neighborhood identity\n\n4. Economic Development Organizations\n   - Support local businesses and entrepreneurs\n   - Attract investment to underserved areas\n   - Create job opportunities within the community\n\nLocal Organizations Directory\n\nBelow is a list of key community development organizations in our area:\n\n- **Neighborhood Housing Partnership**\n  Focus: Affordable housing development and homeownership programs\n  Contact: (555) 789-0123, info@nhpartnership.org\n\n- **Community Reinvestment Coalition**\n  Focus: Fair lending advocacy and financial education\n  Contact: (555) 456-7890, contact@reinvestcoalition.org\n\n- **Urban Renewal Initiative**\n  Focus: Commercial revitalization and small business support\n  Contact: (555) 234-5678, info@urbanrenewal.org\n\n- **Greenspace Alliance**\n  Focus: Creating and maintaining community gardens and parks\n  Contact: (555) 345-6789, green@gsalliance.org\n\n- **Youth Empowerment Collective**\n  Focus: After-school programs and youth leadership development\n  Contact: (555) 567-8901, programs@youthempowerment.org\n\nHow to Get Involved\n\nThere are many ways to support community development in your neighborhood:\n\n1. Volunteer your time and skills\n2. Attend community meetings and events\n3. Support local businesses\n4. Participate in neighborhood clean-ups and beautification projects\n5. Join the board or committee of a local organization\n6. Donate to organizations aligned with your values\n\nBy getting involved with community development organizations, you can help create positive change in your neighborhood and build connections with your neighbors.',
    icon: 'users',
    lastUpdated: 'May 20, 2025',
    relatedResources: [
      {
        id: '5',
        title: 'Neighborhood Guides',
        category: 'Neighborhoods'
      },
      {
        id: '2',
        title: 'Local Housing Assistance Programs',
        category: 'Financial'
      }
    ],
    downloadableFiles: [
      {
        name: 'Community Organizations Directory',
        type: 'PDF',
        size: '1.8 MB',
        url: '/resources/downloads/community-organizations-directory.pdf'
      },
      {
        name: 'Volunteer Opportunities Calendar',
        type: 'PDF',
        size: '950 KB',
        url: '/resources/downloads/volunteer-calendar.pdf'
      }
    ],
    externalLinks: [
      {
        title: 'National Community Development Association',
        url: 'https://www.ncdaonline.org/',
        description: 'National organization supporting community development efforts.'
      },
      {
        title: 'Local Initiatives Support Corporation',
        url: 'https://www.lisc.org/',
        description: 'National nonprofit supporting community development initiatives.'
      }
    ],
    contactInfo: {
      name: 'Community Outreach Team',
      email: 'community@terralegacy.com',
      phone: '(555) 345-6789'
    }
  },
  '4': {
    id: '4',
    title: 'Sustainable Home Improvement Resources',
    category: 'Home Improvement',
    description: 'Resources for eco-friendly home improvements, energy efficiency upgrades, and sustainable living practices.',
    content: 'Making sustainable improvements to your home not only reduces your environmental footprint but can also lead to significant cost savings over time. This guide provides information on eco-friendly home improvements, energy efficiency upgrades, and sustainable living practices.\n\nEnergy Efficiency Upgrades\n\n1. Home Energy Audit\n   - A professional energy audit can identify areas where your home is losing energy\n   - DIY energy assessments can help you identify simple improvements\n   - Many utility companies offer free or discounted energy audits\n\n2. Insulation and Air Sealing\n   - Proper insulation in attics, walls, and floors can reduce heating and cooling costs by up to 20%\n   - Air sealing around windows, doors, and other openings prevents drafts\n   - Weather stripping and caulking are cost-effective DIY solutions\n\n3. Energy-Efficient Appliances and Systems\n   - Look for ENERGY STAR certified appliances\n   - Consider upgrading to a high-efficiency HVAC system\n   - Programmable and smart thermostats optimize heating and cooling\n   - Heat pump water heaters use 60% less energy than standard models\n\nWater Conservation\n\n1. Low-Flow Fixtures\n   - Low-flow showerheads and faucet aerators reduce water usage\n   - Dual-flush or low-flow toilets save thousands of gallons annually\n   - Smart irrigation systems prevent overwatering\n\n2. Water Reuse Systems\n   - Rainwater harvesting systems collect water for gardens and landscaping\n   - Greywater systems reuse water from sinks, showers, and washing machines\n\nRenewable Energy Options\n\n1. Solar Power\n   - Solar photovoltaic (PV) panels convert sunlight into electricity\n   - Solar water heaters reduce water heating costs\n   - Federal and state incentives can offset installation costs\n\n2. Geothermal Systems\n   - Ground-source heat pumps use stable underground temperatures for heating and cooling\n   - Can reduce energy use by 25-50% compared to conventional systems\n\nSustainable Materials\n\n1. Flooring Options\n   - Bamboo and cork are rapidly renewable resources\n   - Reclaimed wood gives new life to existing materials\n   - Natural linoleum is biodegradable and made from renewable materials\n\n2. Paints and Finishes\n   - Low-VOC or zero-VOC paints improve indoor air quality\n   - Natural finishes like milk paint and plant-based oils are non-toxic alternatives\n\nFinancial Incentives\n\n1. Tax Credits and Rebates\n   - Federal tax credits for renewable energy and energy efficiency improvements\n   - State and local rebate programs for energy-efficient appliances\n   - Utility company incentives for reducing energy consumption\n\n2. Green Mortgages and Financing\n   - Energy-efficient mortgages (EEMs) help finance energy improvements\n   - Property Assessed Clean Energy (PACE) financing ties repayment to property taxes\n   - Home equity loans and lines of credit for larger projects',
    icon: 'leaf',
    lastUpdated: 'June 5, 2025',
    relatedResources: [
      {
        id: '6',
        title: 'Real Estate Market Reports',
        category: 'Market'
      },
      {
        id: '1',
        title: 'First-Time Homebuyer Guide',
        category: 'Guides'
      }
    ],
    downloadableFiles: [
      {
        name: 'Home Energy Efficiency Checklist',
        type: 'PDF',
        size: '875 KB',
        url: '/resources/downloads/energy-efficiency-checklist.pdf'
      },
      {
        name: 'Sustainable Materials Guide',
        type: 'PDF',
        size: '1.6 MB',
        url: '/resources/downloads/sustainable-materials-guide.pdf'
      },
      {
        name: 'Energy Savings Calculator',
        type: 'Excel',
        size: '420 KB',
        url: '/resources/downloads/energy-savings-calculator.xlsx'
      }
    ],
    externalLinks: [
      {
        title: 'ENERGY STAR',
        url: 'https://www.energystar.gov/',
        description: 'Government-backed program for energy efficiency information and products.'
      },
      {
        title: 'Database of State Incentives for Renewables & Efficiency',
        url: 'https://www.dsireusa.org/',
        description: 'Comprehensive source of information on incentives and policies supporting renewable energy.'
      }
    ],
    contactInfo: {
      name: 'Sustainable Living Team',
      email: 'sustainable@terralegacy.com',
      phone: '(555) 456-7890'
    }
  },
  '5': {
    id: '5',
    title: 'Neighborhood Guides',
    category: 'Neighborhoods',
    description: 'Detailed guides to local neighborhoods, including amenities, schools, transportation, and community features.',
    content: 'Choosing the right neighborhood is just as important as finding the right home. Our neighborhood guides provide comprehensive information to help you make an informed decision about where to live.\n\nWhat Makes a Great Neighborhood?\n\nWhen evaluating neighborhoods, consider these key factors:\n\n1. Location and Accessibility\n   - Proximity to work, schools, and daily necessities\n   - Public transportation options\n   - Walkability and bike-friendliness\n   - Access to major roads and highways\n\n2. Amenities and Services\n   - Parks and recreational facilities\n   - Shopping and dining options\n   - Healthcare facilities\n   - Libraries and community centers\n\n3. Schools and Education\n   - School district ratings and performance\n   - Public, private, and charter school options\n   - Proximity to colleges and universities\n   - Adult education opportunities\n\n4. Safety and Security\n   - Crime statistics and trends\n   - Police and fire department presence\n   - Emergency response times\n   - Community watch programs\n\n5. Community Character\n   - Demographic makeup\n   - Community events and activities\n   - Neighborhood associations\n   - Historic significance\n\nFeatured Neighborhoods\n\nBelow are profiles of some key neighborhoods in our area:\n\n**Riverside District**\n\nOverview: A vibrant, mixed-use neighborhood along the river with a blend of historic homes and modern developments.\n\nHighlights:\n- Riverfront park with walking and biking trails\n- Weekly farmers market and seasonal festivals\n- Highly rated elementary and middle schools\n- Diverse dining scene with local restaurants and cafes\n- Strong neighborhood association with active community involvement\n\nHousing: Mix of historic single-family homes, converted lofts, and newer condominiums. Median home price: $375,000.\n\n**Oak Hill**\n\nOverview: A well-established suburban neighborhood known for its excellent schools and family-friendly atmosphere.\n\nHighlights:\n- Top-rated school district with award-winning programs\n- Multiple parks and sports facilities\n- Community recreation center with pool and fitness classes\n- Shopping center with grocery stores and local businesses\n- Annual neighborhood block parties and holiday events\n\nHousing: Primarily single-family homes with spacious yards. Median home price: $425,000.\n\n**Downtown Core**\n\nOverview: The urban heart of the city, offering a walkable lifestyle with abundant cultural and entertainment options.\n\nHighlights:\n- Museums, theaters, and music venues\n- Diverse restaurant scene and nightlife\n- Public transit hub with connections throughout the city\n- Historic architecture and modern high-rises\n- Weekend art walks and street festivals\n\nHousing: Primarily condominiums and apartments, with some historic lofts. Median home price: $350,000.\n\n**Greenfield**\n\nOverview: A newer, master-planned community with an emphasis on sustainability and outdoor living.\n\nHighlights:\n- LEED-certified community center and buildings\n- Extensive trail system and preserved green spaces\n- Community garden plots and farmers market\n- Modern K-8 school with environmental focus\n- Energy-efficient homes and community solar program\n\nHousing: Mix of single-family homes, townhouses, and apartments. Median home price: $400,000.\n\nNeighborhood Selection Tips\n\n1. Visit at different times of day and week to get a complete picture\n2. Talk to current residents about their experiences\n3. Research property value trends and development plans\n4. Consider your daily commute and routine\n5. Think about your long-term needs, not just current situation',
    icon: 'map',
    lastUpdated: 'May 25, 2025',
    relatedResources: [
      {
        id: '3',
        title: 'Community Development Organizations',
        category: 'Community'
      },
      {
        id: '6',
        title: 'Real Estate Market Reports',
        category: 'Market'
      }
    ],
    downloadableFiles: [
      {
        name: 'Comprehensive Neighborhood Comparison Chart',
        type: 'PDF',
        size: '2.1 MB',
        url: '/resources/downloads/neighborhood-comparison.pdf'
      },
      {
        name: 'School District Boundaries Map',
        type: 'PDF',
        size: '1.5 MB',
        url: '/resources/downloads/school-districts-map.pdf'
      },
      {
        name: 'Neighborhood Walkability Scores',
        type: 'Excel',
        size: '380 KB',
        url: '/resources/downloads/walkability-scores.xlsx'
      }
    ],
    externalLinks: [
      {
        title: 'City Planning Department',
        url: 'https://www.cityplanning.gov',
        description: 'Official information about zoning and future development plans.'
      },
      {
        title: 'School District Performance Dashboard',
        url: 'https://www.schooldistrict.edu/performance',
        description: 'Detailed metrics and comparisons of local school performance.'
      }
    ],
    contactInfo: {
      name: 'Neighborhood Relations Team',
      email: 'neighborhoods@terralegacy.com',
      phone: '(555) 567-8901'
    }
  },
  '6': {
    id: '6',
    title: 'Real Estate Market Reports',
    category: 'Market',
    description: 'Quarterly market reports with data on housing trends, prices, and forecasts for the local real estate market.',
    content: 'Understanding the real estate market is essential for making informed decisions about buying, selling, or investing in property. Our quarterly market reports provide comprehensive data and analysis on local housing trends, prices, and forecasts.\n\nMarket Overview - Q2 2025\n\nThe local real estate market continues to show resilience and steady growth in the second quarter of 2025. Here are the key highlights:\n\n- Median home prices increased 3.2% year-over-year to $412,500\n- Average days on market: 24 (down from 29 in Q2 2024)\n- Total sales volume: $1.8 billion (up 5.1% from Q2 2024)\n- New listings increased 2.7% compared to the previous quarter\n- Housing inventory stands at 2.3 months of supply (balanced market = 4-6 months)\n\nPrice Trends by Property Type\n\nSingle-Family Homes:\n- Median price: $450,000 (up 3.5% year-over-year)\n- Average price per square foot: $275\n- Most active price range: $350,000 - $500,000\n\nCondominiums/Townhomes:\n- Median price: $325,000 (up 2.8% year-over-year)\n- Average price per square foot: $295\n- Most active price range: $250,000 - $400,000\n\nLuxury Market (Top 10%):\n- Median price: $1,250,000 (up 4.2% year-over-year)\n- Average days on market: 45\n- Inventory: 4.5 months of supply\n\nNeighborhood Performance\n\nStrongest Performing Neighborhoods:\n1. Riverside District: 5.7% year-over-year price growth\n2. Greenfield: 4.9% year-over-year price growth\n3. Oak Hill: 4.1% year-over-year price growth\n\nEmerging Neighborhoods:\n1. Westside Junction: Significant infrastructure improvements and commercial development\n2. Harbor View: New transit options increasing accessibility and demand\n3. Northridge: School improvements driving increased family buyer interest\n\nMarket Factors and Influences\n\n1. Interest Rates and Financing\n   - Current average 30-year fixed mortgage rate: 4.5%\n   - Rate trend: Relatively stable with slight increases projected\n   - Financing availability: Moderate, with tightening standards for jumbo loans\n\n2. Economic Indicators\n   - Local unemployment rate: 3.8% (down 0.2% from previous quarter)\n   - Job growth: 2.3% year-over-year increase\n   - Major employers expanding: Tech and healthcare sectors showing strongest growth\n\n3. Development and Construction\n   - New housing starts: Up 3.5% from previous quarter\n   - Building permits issued: 850 (up 5.2% year-over-year)\n   - Construction costs: Up 2.8% year-over-year\n   - Notable developments: Three mixed-use projects breaking ground downtown\n\n4. Demographic Trends\n   - Population growth: 1.7% year-over-year increase\n   - In-migration from: Neighboring states and major coastal cities\n   - Buyer demographics: Millennials comprise 42% of first-time buyers\n\nMarket Forecast\n\nShort-term Outlook (6-12 months):\n- Continued moderate price appreciation (2-4% annually)\n- Slight increase in inventory levels\n- Sustained demand in mid-price ranges\n- Potential cooling in the luxury segment\n\nLong-term Projection (2-5 years):\n- Steady growth aligned with economic fundamentals\n- Increased density in urban cores and along transit corridors\n- Growing emphasis on sustainable and energy-efficient properties\n- Potential for market normalization with more balanced conditions',
    icon: 'chart',
    lastUpdated: 'June 15, 2025',
    relatedResources: [
      {
        id: '5',
        title: 'Neighborhood Guides',
        category: 'Neighborhoods'
      },
      {
        id: '2',
        title: 'Local Housing Assistance Programs',
        category: 'Financial'
      }
    ],
    downloadableFiles: [
      {
        name: 'Q2 2025 Market Report - Full Analysis',
        type: 'PDF',
        size: '3.2 MB',
        url: '/resources/downloads/q2-2025-market-report.pdf'
      },
      {
        name: 'Historical Price Trends (2020-2025)',
        type: 'Excel',
        size: '750 KB',
        url: '/resources/downloads/historical-price-trends.xlsx'
      },
      {
        name: 'Neighborhood Price Comparison',
        type: 'PDF',
        size: '1.4 MB',
        url: '/resources/downloads/neighborhood-price-comparison.pdf'
      }
    ],
    externalLinks: [
      {
        title: 'Federal Housing Finance Agency - House Price Index',
        url: 'https://www.fhfa.gov/DataTools/Downloads/Pages/House-Price-Index.aspx',
        description: 'National house price data and trends.'
      },
      {
        title: 'Local Association of Realtors',
        url: 'https://www.localrealtors.org/marketdata',
        description: 'Additional local market statistics and resources.'
      }
    ],
    contactInfo: {
      name: 'Market Analysis Team',
      email: 'marketreports@terralegacy.com',
      phone: '(555) 678-9012'
    }
  }
};

export default function ResourcePage({ params }: { params: { id: string } }) {
  // Access the id directly from params
  const id = params.id;
  const resource = RESOURCES[id as keyof typeof RESOURCES];
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);
  
  if (!resource) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <ResourceDetailsSection resource={resource} />
    </div>
  );
}
