import { NextRequest, NextResponse } from 'next/server';
import { db, courses } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    await requireAdmin();
    const all = await db.select().from(courses).orderBy(desc(courses.createdAt));
    return NextResponse.json({ courses: all });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const data = await request.json();

    const slug = data.slug || data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newItem = await db.insert(courses).values({
      title: data.title,
      slug,
      description: data.description,
      instructor: data.instructor,
      level: data.level,
      duration: data.duration,
      lectures: data.lectures || 0,
      price: data.price,
      salePrice: data.salePrice,
      rating: data.rating || '0',
      reviews: data.reviews || 0,
      imageUrl: data.imageUrl,
      category: data.category,
      isFeatured: data.isFeatured || false,
      isActive: data.isActive !== false,
      enrollmentStatus: data.enrollmentStatus || 'open',
      startDate: data.startDate ? new Date(data.startDate) : null,
    }).returning();

    return NextResponse.json({ course: newItem[0] }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
