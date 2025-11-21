import { NextRequest, NextResponse } from 'next/server';
import { db, categories } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { desc, eq, isNull } from 'drizzle-orm';

// GET all categories (with hierarchy support)
export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get('parentId');
    const level = searchParams.get('level');
    const flat = searchParams.get('flat') === 'true';

    let query = db.select().from(categories);

    if (flat) {
      // Return all categories as flat list
      const allCategories = await query.orderBy(desc(categories.createdAt));
      return NextResponse.json({ categories: allCategories });
    }

    if (parentId) {
      // Get children of specific parent
      query = query.where(eq(categories.parentId, parentId)) as typeof query;
    } else if (level !== null) {
      // Get categories of specific level
      query = query.where(eq(categories.level, parseInt(level))) as typeof query;
    } else {
      // Get only root categories (no parent)
      query = query.where(isNull(categories.parentId)) as typeof query;
    }

    const result = await query.orderBy(desc(categories.createdAt));

    return NextResponse.json({ categories: result });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Get categories error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST create new category
export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const data = await request.json();

    // Generate slug from name
    const slug = data.slug || data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Determine level based on parent
    let level = 0;
    if (data.parentId) {
      const parent = await db
        .select()
        .from(categories)
        .where(eq(categories.id, data.parentId))
        .limit(1);

      if (parent.length) {
        level = parent[0].level + 1;
      }
    }

    const newCategory = await db.insert(categories).values({
      name: data.name,
      slug,
      description: data.description,
      parentId: data.parentId || null,
      level,
      imageUrl: data.imageUrl,
      isActive: data.isActive !== false,
    }).returning();

    return NextResponse.json({ category: newCategory[0] }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Create category error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
