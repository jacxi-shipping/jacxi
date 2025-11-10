import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.user?.role !== 'admin') {
      return NextResponse.json(
        { message: 'Forbidden: Only admins can create items' },
        { status: 403 }
      );
    }

    const data = await request.json();
    const {
      containerId,
      vin,
      lotNumber,
      auctionCity,
      freightCost,
      towingCost,
      clearanceCost,
      vatCost,
      customsCost,
      otherCost,
    } = data;

    if (!containerId || !vin || !lotNumber || !auctionCity) {
      return NextResponse.json(
        { message: 'Container ID, VIN, Lot Number, and Auction City are required' },
        { status: 400 }
      );
    }

    // Verify container exists
    const container = await prisma.container.findUnique({
      where: { id: containerId },
    });

    if (!container) {
      return NextResponse.json(
        { message: 'Container not found' },
        { status: 404 }
      );
    }

    const item = await prisma.item.create({
      data: {
        containerId,
        vin,
        lotNumber,
        auctionCity,
        freightCost: freightCost ? parseFloat(freightCost) : 0,
        towingCost: towingCost ? parseFloat(towingCost) : 0,
        clearanceCost: clearanceCost ? parseFloat(clearanceCost) : 0,
        vatCost: vatCost ? parseFloat(vatCost) : 0,
        customsCost: customsCost ? parseFloat(customsCost) : 0,
        otherCost: otherCost ? parseFloat(otherCost) : 0,
      },
      include: {
        container: {
          select: {
            containerNumber: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'Item created successfully', item },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

