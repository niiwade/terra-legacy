import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
async function ensureUploadDir(subDir?: string): Promise<string> {
  const dir = subDir ? join(UPLOAD_DIR, subDir) : UPLOAD_DIR;
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
  return dir;
}

// Generate unique filename
function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = originalName.split('.').pop();
  return `${timestamp}-${random}.${ext}`;
}

export interface UploadResult {
  url: string;
  fileName: string;
  originalName: string;
  size: number;
  mimeType: string;
}

export async function uploadFile(
  file: File,
  subDir?: string
): Promise<UploadResult> {
  const dir = await ensureUploadDir(subDir);
  const fileName = generateFileName(file.name);
  const filePath = join(dir, fileName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  const relativePath = subDir
    ? `/uploads/${subDir}/${fileName}`
    : `/uploads/${fileName}`;

  return {
    url: relativePath,
    fileName,
    originalName: file.name,
    size: file.size,
    mimeType: file.type,
  };
}

export async function deleteFile(url: string): Promise<boolean> {
  try {
    // Convert URL to file path
    const relativePath = url.replace(/^\//, '');
    const filePath = join(process.cwd(), 'public', relativePath);

    if (existsSync(filePath)) {
      await unlink(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}

// Validate file type
export function validateFileType(
  file: File,
  allowedTypes: string[]
): boolean {
  return allowedTypes.some(type => {
    if (type.endsWith('/*')) {
      const baseType = type.replace('/*', '');
      return file.type.startsWith(baseType);
    }
    return file.type === type;
  });
}

// Validate file size (in bytes)
export function validateFileSize(
  file: File,
  maxSize: number
): boolean {
  return file.size <= maxSize;
}

// Common file type groups
export const FILE_TYPES = {
  images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  all: ['image/*', 'application/pdf'],
};

// Max file sizes
export const MAX_FILE_SIZES = {
  image: 5 * 1024 * 1024, // 5MB
  document: 10 * 1024 * 1024, // 10MB
  default: 10 * 1024 * 1024, // 10MB
};
