import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.user?.role !== 'admin') {
      return NextResponse.json(
        { message: 'Forbidden: Only admins can view containers' },
        { status: 403 }
      );
    }

    const container = await prisma.container.findUnique({
      where: { id },
      include: {
        items: {
          orderBy: { createdAt: 'desc' },
        },
        invoices: {
          include: {
            items: true,
          },
          orderBy: { createdAt: 'desc' },
        },
        shipment: {
          select: {
            trackingNumber: true,
            status: true,
            paymentStatus: true,
          },
        },
      },
    });

    if (!container) {
      return NextResponse.json(
        { message: 'Container not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ container }, { status: 200 });
  } catch (error) {
    console.error('Error fetching container:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

