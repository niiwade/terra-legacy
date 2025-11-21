import { db, adminUsers } from './db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export interface AdminSession {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Simple JWT-like token (for demo purposes, use proper JWT in production)
function encodeToken(data: AdminSession): string {
  return Buffer.from(JSON.stringify(data)).toString('base64');
}

function decodeToken(token: string): AdminSession | null {
  try {
    return JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function authenticateAdmin(email: string, password: string): Promise<AdminSession | null> {
  const user = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);

  if (!user.length) {
    return null;
  }

  const isValid = await verifyPassword(password, user[0].password);

  if (!isValid) {
    return null;
  }

  return {
    id: user[0].id,
    email: user[0].email,
    name: user[0].name,
    role: user[0].role,
  };
}

export async function createAdminSession(session: AdminSession): Promise<string> {
  const token = encodeToken(session);
  const cookieStore = await cookies();

  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  return token;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!token) {
    return null;
  }

  return decodeToken(token);
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}

export async function createAdminUser(email: string, password: string, name: string): Promise<AdminSession> {
  const hashedPassword = await hashPassword(password);

  const result = await db.insert(adminUsers).values({
    email,
    password: hashedPassword,
    name,
    role: 'admin',
  }).returning();

  return {
    id: result[0].id,
    email: result[0].email,
    name: result[0].name,
    role: result[0].role,
  };
}

export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
}
