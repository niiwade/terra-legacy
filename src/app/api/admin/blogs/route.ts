import { NextRequest, NextResponse } from 'next/server';
import { db, blogs } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { eq, desc } from 'drizzle-orm';

// GET all blogs
export async function GET() {
  try {
    await requireAdmin();

    const allBlogs = await db
      .select()
      .from(blogs)
      .orderBy(desc(blogs.createdAt));

    return NextResponse.json({ blogs: allBlogs });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Get blogs error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST create new blog
export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin();

    const data = await request.json();

    // Generate slug from title
    const slug = data.slug || data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newBlog = await db.insert(blogs).values({
      title: data.title,
      slug,
      content: data.content,
      excerpt: data.excerpt,
      coverImageUrl: data.coverImageUrl,
      categoryId: data.categoryId,
      authorId: session.id,
      status: data.status || 'draft',
      publishedAt: data.status === 'published' ? new Date() : null,
      tags: data.tags ? JSON.stringify(data.tags) : null,
      metadata: data.metadata ? JSON.stringify(data.metadata) : null,
    }).returning();

    return NextResponse.json({ blog: newBlog[0] }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Create blog error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
