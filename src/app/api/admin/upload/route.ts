import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import {
  uploadFile,
  validateFileType,
  validateFileSize,
  FILE_TYPES,
  MAX_FILE_SIZES
} from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    await requireAdmin();

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'general';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!validateFileType(file, [...FILE_TYPES.images, ...FILE_TYPES.documents])) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: images, PDF, DOC files' },
        { status: 400 }
      );
    }

    // Validate file size
    const maxSize = file.type.startsWith('image/')
      ? MAX_FILE_SIZES.image
      : MAX_FILE_SIZES.document;

    if (!validateFileSize(file, maxSize)) {
      return NextResponse.json(
        { error: `File too large. Maximum size: ${maxSize / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Upload file
    const result = await uploadFile(file, folder);

    return NextResponse.json({
      success: true,
      file: result,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
