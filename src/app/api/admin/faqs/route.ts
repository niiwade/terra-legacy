import { NextRequest, NextResponse } from 'next/server';
import { db, faqs } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    await requireAdmin();
    const all = await db.select().from(faqs).orderBy(faqs.sortOrder, desc(faqs.createdAt));
    return NextResponse.json({ faqs: all });
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

    const newItem = await db.insert(faqs).values({
      question: data.question,
      answer: data.answer,
      category: data.category,
      isActive: data.isActive !== false,
      sortOrder: data.sortOrder || 0,
    }).returning();

    return NextResponse.json({ faq: newItem[0] }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
