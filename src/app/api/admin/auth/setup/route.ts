import { NextRequest, NextResponse } from 'next/server';
import { db, adminUsers } from '@/lib/db';
import { createAdminUser } from '@/lib/auth';

// This endpoint creates the first admin user
// Should be disabled or protected after initial setup
export async function POST(request: NextRequest) {
  try {
    // Check if any admin users exist
    const existingUsers = await db.select().from(adminUsers).limit(1);

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'Admin user already exists. Use login instead.' },
        { status: 400 }
      );
    }

    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    const session = await createAdminUser(email, password, name);

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        id: session.id,
        email: session.email,
        name: session.name,
        role: session.role,
      },
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
