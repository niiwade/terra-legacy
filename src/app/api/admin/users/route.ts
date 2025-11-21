import { NextRequest, NextResponse } from 'next/server';
import { db, adminUsers } from '@/lib/db';
import { requireAdmin, hashPassword } from '@/lib/auth';
import { desc, eq } from 'drizzle-orm';

// GET all admin users
export async function GET() {
  try {
    await requireAdmin();

    const users = await db
      .select({
        id: adminUsers.id,
        email: adminUsers.email,
        name: adminUsers.name,
        role: adminUsers.role,
        createdAt: adminUsers.createdAt,
        updatedAt: adminUsers.updatedAt,
      })
      .from(adminUsers)
      .orderBy(desc(adminUsers.createdAt));

    return NextResponse.json({ users });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Get users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST create new admin user
export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const data = await request.json();

    if (!data.email || !data.password || !data.name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, data.email))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(data.password);

    const newUser = await db.insert(adminUsers).values({
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role: data.role || 'admin',
    }).returning({
      id: adminUsers.id,
      email: adminUsers.email,
      name: adminUsers.name,
      role: adminUsers.role,
      createdAt: adminUsers.createdAt,
    });

    return NextResponse.json({ user: newUser[0] }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Create user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
