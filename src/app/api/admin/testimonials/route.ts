import { NextRequest, NextResponse } from 'next/server';
import { db, testimonials } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    await requireAdmin();
    const all = await db.select().from(testimonials).orderBy(testimonials.sortOrder, desc(testimonials.createdAt));
    return NextResponse.json({ testimonials: all });
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

    const newItem = await db.insert(testimonials).values({
      authorName: data.authorName,
      authorRole: data.authorRole,
      authorImage: data.authorImage,
      content: data.content,
      rating: data.rating || 5,
      category: data.category,
      isActive: data.isActive !== false,
      sortOrder: data.sortOrder || 0,
    }).returning();

    return NextResponse.json({ testimonial: newItem[0] }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
