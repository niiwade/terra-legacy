import { NextRequest, NextResponse } from 'next/server';
import { db, products } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { desc } from 'drizzle-orm';

// GET all products
export async function GET() {
  try {
    await requireAdmin();

    const allProducts = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt));

    return NextResponse.json({ products: allProducts });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Get products error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const data = await request.json();

    // Generate slug from name
    const slug = data.slug || data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newProduct = await db.insert(products).values({
      name: data.name,
      slug,
      description: data.description,
      shortDescription: data.shortDescription,
      price: data.price,
      salePrice: data.salePrice,
      categoryId: data.categoryId,
      imageUrl: data.imageUrl,
      images: data.images ? JSON.stringify(data.images) : null,
      fileUrl: data.fileUrl,
      productType: data.productType || 'digital',
      stockQuantity: data.stockQuantity || 0,
      isActive: data.isActive !== false,
      isFeatured: data.isFeatured || false,
      metadata: data.metadata ? JSON.stringify(data.metadata) : null,
    }).returning();

    return NextResponse.json({ product: newProduct[0] }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
