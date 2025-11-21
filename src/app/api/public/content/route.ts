import { NextRequest, NextResponse } from 'next/server';
import { db, products, blogs, events, testimonials, faqs, courses, siteSettings, marketplaceListings, resources, categories } from '@/lib/db';
import { eq, desc, and, gte } from 'drizzle-orm';

// GET public content by type
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '10');
    const featured = searchParams.get('featured') === 'true';

    switch (type) {
      case 'products': {
        const whereCondition = featured
          ? and(eq(products.isActive, true), eq(products.isFeatured, true))
          : eq(products.isActive, true);
        const data = await db
          .select()
          .from(products)
          .where(whereCondition)
          .orderBy(desc(products.createdAt))
          .limit(limit);
        return NextResponse.json({ data });
      }

      case 'blogs': {
        const data = await db
          .select()
          .from(blogs)
          .where(eq(blogs.status, 'published'))
          .orderBy(desc(blogs.publishedAt))
          .limit(limit);
        return NextResponse.json({ data });
      }

      case 'events': {
        const whereCondition = featured
          ? and(eq(events.isActive, true), eq(events.isFeatured, true), gte(events.date, new Date()))
          : and(eq(events.isActive, true), gte(events.date, new Date()));
        const data = await db
          .select()
          .from(events)
          .where(whereCondition)
          .orderBy(events.date)
          .limit(limit);
        return NextResponse.json({ data });
      }

      case 'testimonials': {
        const data = await db
          .select()
          .from(testimonials)
          .where(eq(testimonials.isActive, true))
          .orderBy(testimonials.sortOrder)
          .limit(limit);
        return NextResponse.json({ data });
      }

      case 'faqs': {
        const data = await db
          .select()
          .from(faqs)
          .where(eq(faqs.isActive, true))
          .orderBy(faqs.sortOrder)
          .limit(limit);
        return NextResponse.json({ data });
      }

      case 'courses': {
        const whereCondition = featured
          ? and(eq(courses.isActive, true), eq(courses.isFeatured, true))
          : eq(courses.isActive, true);
        const data = await db
          .select()
          .from(courses)
          .where(whereCondition)
          .orderBy(desc(courses.createdAt))
          .limit(limit);
        return NextResponse.json({ data });
      }

      case 'marketplace': {
        const whereCondition = featured
          ? and(eq(marketplaceListings.isActive, true), eq(marketplaceListings.isFeatured, true))
          : eq(marketplaceListings.isActive, true);
        const data = await db
          .select()
          .from(marketplaceListings)
          .where(whereCondition)
          .orderBy(desc(marketplaceListings.createdAt))
          .limit(limit);
        return NextResponse.json({ data });
      }

      case 'resources': {
        const data = await db
          .select()
          .from(resources)
          .where(eq(resources.isActive, true))
          .orderBy(resources.sortOrder)
          .limit(limit);
        return NextResponse.json({ data });
      }

      case 'categories': {
        const data = await db
          .select()
          .from(categories)
          .where(eq(categories.isActive, true))
          .orderBy(categories.name);
        return NextResponse.json({ data });
      }

      case 'settings': {
        const group = searchParams.get('group');
        const data = group
          ? await db.select().from(siteSettings).where(eq(siteSettings.group, group))
          : await db.select().from(siteSettings);
        // Convert to key-value object
        const settings: Record<string, string> = {};
        data.forEach(s => {
          settings[s.key] = s.value;
        });
        return NextResponse.json({ data: settings });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid content type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Public content error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
