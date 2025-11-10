import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
	try {
		const session = await auth();

		if (!session) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}

		// Only admins can upload images
		if (session.user?.role !== 'admin') {
			return NextResponse.json(
				{ message: 'Forbidden: Only admins can upload images' },
				{ status: 403 }
			);
		}

		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return NextResponse.json(
				{ message: 'No file provided' },
				{ status: 400 }
			);
		}

		// Validate file type
		const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
		if (!allowedTypes.includes(file.type)) {
			return NextResponse.json(
				{ message: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.' },
				{ status: 400 }
			);
		}

		// Validate file size (max 5MB)
		const maxSize = 5 * 1024 * 1024; // 5MB
		if (file.size > maxSize) {
			return NextResponse.json(
				{ message: 'File size exceeds 5MB limit' },
				{ status: 400 }
			);
		}

		// Create uploads directory if it doesn't exist
		const uploadsDir = join(process.cwd(), 'public', 'uploads', 'containers');
		if (!existsSync(uploadsDir)) {
			await mkdir(uploadsDir, { recursive: true });
		}

		// Generate unique filename
		const timestamp = Date.now();
		const randomString = Math.random().toString(36).substring(2, 15);
		const fileExtension = file.name.split('.').pop();
		const filename = `container_${timestamp}_${randomString}.${fileExtension}`;
		const filepath = join(uploadsDir, filename);

		// Convert file to buffer and save
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		await writeFile(filepath, buffer);

		// Return the public URL
		const publicUrl = `/uploads/containers/${filename}`;

		return NextResponse.json(
			{
				message: 'File uploaded successfully',
				url: publicUrl,
				filename,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error uploading file:', error);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
}

