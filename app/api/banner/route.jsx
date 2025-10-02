import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const raw = url.searchParams.get('limit');
    const requested = Number.isFinite(Number(raw)) ? parseInt(raw, 10) : 0;

    const DEFAULT_LIMIT = 5;   // default to show 5 banners if no param
    const MAX_LIMIT = 20;      // never return more than this from server

    const limit = requested > 0 ? Math.min(requested, MAX_LIMIT) : DEFAULT_LIMIT;

    const banners = await prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      take: limit,
      select: { id: true, title: true, imageUrl: true } // add tone etc. if you add fields
    });

    return NextResponse.json({ banners });
  } catch (err) {
    console.error('Get banners error', err);
    return NextResponse.json({ error: 'Unable to load banners' }, { status: 500 });
  }
}