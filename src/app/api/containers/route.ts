import { NextRequest, NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';
import { auth } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Only admins can view containers
    if (session.user?.role !== 'admin') {
      return NextResponse.json(
        { message: 'Forbidden: Only admins can view containers' },
        { status: 403 }
      );
    }

    const containers = await prisma.container.findMany({
      include: {
        items: true,
        shipment: {
          select: {
            trackingNumber: true,
            status: true,
          },
        },
        invoices: {
          select: {
            id: true,
            invoiceNumber: true,
            status: true,
            totalUSD: true,
            totalAED: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ containers }, { status: 200 });
  } catch (error) {
    console.error('Error fetching containers:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

type CreateContainerPayload = {
  containerNumber: string;
  shipmentId?: string | null;
  status?: string;
};

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.user?.role !== 'admin') {
      return NextResponse.json(
        { message: 'Forbidden: Only admins can create containers' },
        { status: 403 }
      );
    }

    const data = (await request.json()) as CreateContainerPayload;
    const { containerNumber, shipmentId, status } = data;

    if (!containerNumber) {
      return NextResponse.json(
        { message: 'Container number is required' },
        { status: 400 }
      );
    }

    const container = await prisma.container.create({
      data: {
        containerNumber,
        shipmentId: shipmentId || null,
        status: status || 'ACTIVE',
      },
      include: {
        items: true,
        shipment: {
          select: {
            trackingNumber: true,
            status: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'Container created successfully', container },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error creating container:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json(
        { message: 'Container number already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

