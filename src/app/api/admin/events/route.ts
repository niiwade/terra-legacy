import { NextRequest, NextResponse } from 'next/server';
import { db, events } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    await requireAdmin();
    const allEvents = await db.select().from(events).orderBy(desc(events.date));
    return NextResponse.json({ events: allEvents });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Get events error:', error);
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

    const newEvent = await db.insert(events).values({
      title: data.title,
      slug,
      description: data.description,
      date: new Date(data.date),
      time: data.time,
      location: data.location,
      category: data.category,
      imageUrl: data.imageUrl,
      speaker: data.speaker,
      attendees: data.attendees || 0,
      isFeatured: data.isFeatured || false,
      isActive: data.isActive !== false,
    }).returning();

    return NextResponse.json({ event: newEvent[0] }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Create event error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
