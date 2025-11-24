import { NextRequest, NextResponse } from 'next/server';
import { db, blogs, adminUsers, products, courses, events } from '@/lib/db';
import { eq } from 'drizzle-orm';

// GET single content item by ID (blogs, products, courses, or events)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'blog'; // Default to blog for backward compatibility

    switch (type) {
      case 'blog': {
        // Fetch blog with author information
        const blogData = await db
          .select({
            id: blogs.id,
            title: blogs.title,
            slug: blogs.slug,
            content: blogs.content,
            excerpt: blogs.excerpt,
            coverImageUrl: blogs.coverImageUrl,
            categoryId: blogs.categoryId,
            status: blogs.status,
            publishedAt: blogs.publishedAt,
            tags: blogs.tags,
            viewCount: blogs.viewCount,
            createdAt: blogs.createdAt,
            updatedAt: blogs.updatedAt,
            authorName: adminUsers.name,
            authorEmail: adminUsers.email,
          })
          .from(blogs)
          .leftJoin(adminUsers, eq(blogs.authorId, adminUsers.id))
          .where(eq(blogs.id, id))
          .limit(1);

        if (blogData.length === 0) {
          return NextResponse.json(
            { error: 'Blog post not found' },
            { status: 404 }
          );
        }

        // Only return published blogs for public API
        if (blogData[0].status !== 'published') {
          return NextResponse.json(
            { error: 'Blog post not found' },
            { status: 404 }
          );
        }

        // Increment view count
        await db
          .update(blogs)
          .set({ viewCount: (blogData[0].viewCount || 0) + 1 })
          .where(eq(blogs.id, id));

        return NextResponse.json({ data: blogData[0], type: 'blog' });
      }

      case 'product': {
        // Fetch product
        const productData = await db
          .select()
          .from(products)
          .where(eq(products.id, id))
          .limit(1);

        if (productData.length === 0) {
          return NextResponse.json(
            { error: 'Product not found' },
            { status: 404 }
          );
        }

        // Only return active products
        if (!productData[0].isActive) {
          return NextResponse.json(
            { error: 'Product not found' },
            { status: 404 }
          );
        }

        return NextResponse.json({ data: productData[0], type: 'product' });
      }

      case 'course': {
        // Fetch course
        const courseData = await db
          .select()
          .from(courses)
          .where(eq(courses.id, id))
          .limit(1);

        if (courseData.length === 0) {
          return NextResponse.json(
            { error: 'Course not found' },
            { status: 404 }
          );
        }

        // Only return active courses
        if (!courseData[0].isActive) {
          return NextResponse.json(
            { error: 'Course not found' },
            { status: 404 }
          );
        }

        return NextResponse.json({ data: courseData[0], type: 'course' });
      }

      case 'event': {
        // Fetch event
        const eventData = await db
          .select()
          .from(events)
          .where(eq(events.id, id))
          .limit(1);

        if (eventData.length === 0) {
          return NextResponse.json(
            { error: 'Event not found' },
            { status: 404 }
          );
        }

        // Only return active events
        if (!eventData[0].isActive) {
          return NextResponse.json(
            { error: 'Event not found' },
            { status: 404 }
          );
        }

        // Increment attendees view (optional)
        return NextResponse.json({ data: eventData[0], type: 'event' });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid content type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Content fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
