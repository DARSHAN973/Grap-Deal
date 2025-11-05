import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'payouts';
    
    if (type === 'payouts') {
      // Real vendor payout statistics using orders/payments data
      const totalRevenueAgg = await prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { status: 'DELIVERED' }
      });

      const commissionRate = 0.15; // could be pulled from settings
      const totalRevenue = parseFloat(totalRevenueAgg._sum.totalAmount) || 0;
      const commissionEarned = totalRevenue * commissionRate;

      // Logistics paid not integrated yet - return null so UI can show Coming Soon
      const logisticsPaid = null;

      // Profit (for now commission minus logistics if available)
      const profit = commissionEarned - (logisticsPaid || 0);

      // Aggregate payouts per vendor from orders (delivered)
      const vendorGroups = await prisma.order.groupBy({
        by: ['vendorId'],
        _sum: { totalAmount: true },
        _count: { id: true },
        where: {
          vendorId: { not: null },
          status: 'DELIVERED'
        },
        orderBy: { _sum: { totalAmount: 'desc' } },
        take: 50
      });

      const vendorIds = vendorGroups.map(v => v.vendorId).filter(Boolean);
      const vendorProfiles = await prisma.vendorProfile.findMany({
        where: { id: { in: vendorIds } },
        select: { id: true, businessName: true, isActive: true }
      });

      const payouts = vendorGroups.map(g => {
        const vp = vendorProfiles.find(v => v.id === g.vendorId);
        const vendorName = vp ? vp.businessName : 'Unknown Vendor';
        const amountDue = parseFloat(g._sum.totalAmount) || 0;
        const commission = amountDue * commissionRate;
        const payoutAmount = amountDue - commission;

        return {
          id: g.vendorId,
          vendorName,
          vendorIsActive: !!vp?.isActive,
          amountDue,
          commission,
          payoutAmount,
          status: 'READY',
          orderCount: g._count.id || 0
        };
      });

      return NextResponse.json({
        success: true,
        data: {
          stats: {
            totalRevenue,
            commissionEarned,
            profit,
            logisticsPaid
          },
          payouts
        }
      });
    }
    
    if (type === 'transactions') {
      // Fetch recent payment records (gateway / razorpay) if available
      const payments = await prisma.payment.findMany({
        include: {
          order: {
            include: { user: { select: { name: true, email: true } } }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 50
      });

      return NextResponse.json({
        success: true,
        data: {
          transactions: payments.map(p => ({
            id: p.id,
            orderNumber: p.order?.orderNumber || `ORD${(p.orderId || '').slice(-8)}`,
            customer: p.order?.user?.name || 'Unknown',
            amount: parseFloat(p.amount) || 0,
            status: p.status,
            paymentMethod: p.paymentMethod,
            gatewayId: p.gatewayId || null,
            gatewayData: p.gatewayData || null,
            date: p.createdAt
          }))
        }
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid payment type'
    }, { status: 400 });

  } catch (error) {
    console.error('Payment management error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment data' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, payoutId } = body;

    if (action === 'process_payout') {
      // Mock payout processing
      // In a real implementation, this would integrate with payment gateway
      
      return NextResponse.json({
        success: true,
        message: 'Payout processed successfully',
        data: {
          payoutId,
          utrNumber: `UTR${Date.now()}`,
          processedAt: new Date()
        }
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid action'
    }, { status: 400 });

  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment action' },
      { status: 500 }
    );
  }
}