import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days
    const reportType = searchParams.get('type') || 'overview';

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    if (reportType === 'overview') {
      // Get order statistics
      const totalOrders = await prisma.order.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      });

      const ordersByStatus = await prisma.order.groupBy({
        by: ['status'],
        _count: {
          id: true
        },
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      });

      // Get revenue data
      const revenueData = await prisma.order.aggregate({
        _sum: {
          totalAmount: true
        },
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          },
          status: 'DELIVERED'
        }
      });

      // Get user registration stats
      const newUsers = await prisma.user.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      });

      // Get product stats
      const totalProducts = await prisma.product.count({
        where: {
          status: 'ACTIVE'
        }
      });

      const newProducts = await prisma.product.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      });

      // Get vendor stats
      const totalVendors = await prisma.user.count({
        where: {
          role: 'VENDOR'
        }
      });

      const activeVendors = await prisma.user.count({
        where: {
          role: 'VENDOR',
          orders: {
            some: {
              createdAt: {
                gte: startDate,
                lte: endDate
              }
            }
          }
        }
      });

      // Calculate success rate
      const deliveredOrders = ordersByStatus.find(s => s.status === 'DELIVERED')?._count.id || 0;
      const successRate = totalOrders > 0 ? ((deliveredOrders / totalOrders) * 100).toFixed(1) : 0;

      // Get daily sales data for chart - using standard Prisma queries instead of raw SQL
      const dailySalesData = await prisma.order.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          },
          status: 'DELIVERED'
        },
        select: {
          createdAt: true,
          totalAmount: true
        }
      });

      // Group by date
      const salesByDate = {};
      dailySalesData.forEach(order => {
        const date = order.createdAt.toISOString().split('T')[0];
        if (!salesByDate[date]) {
          salesByDate[date] = { orders: 0, revenue: 0 };
        }
        salesByDate[date].orders++;
        salesByDate[date].revenue += parseFloat(order.totalAmount) || 0;
      });

      const dailySales = Object.entries(salesByDate)
        .map(([date, data]) => ({
          date,
          orders: data.orders,
          revenue: data.revenue
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      return NextResponse.json({
        success: true,
        data: {
          period: `${period} days`,
          overview: {
            totalOrders,
            totalRevenue: parseFloat(revenueData._sum.totalAmount) || 0,
            newUsers,
            totalProducts,
            newProducts,
            totalVendors,
            activeVendors,
            successRate: parseFloat(successRate)
          },
          ordersByStatus: ordersByStatus.map(item => ({
            status: item.status,
            count: item._count.id
          })),
          dailySales: dailySales,
          topPerformers: {
            // Calculate top products by quantity sold and revenue within the period
            topProducts: await (async () => {
              try {
                // First get delivered orders in the time period
                const deliveredOrders = await prisma.order.findMany({
                  where: {
                    createdAt: {
                      gte: startDate,
                      lte: endDate
                    },
                    status: 'DELIVERED'
                  },
                  select: { id: true }
                });

                const orderIds = deliveredOrders.map(o => o.id);
                
                if (orderIds.length === 0) {
                  return [];
                }

                // Now group order items by productId for those orders
                const prodGroups = await prisma.orderItem.groupBy({
                  by: ['productId'],
                  _sum: {
                    quantity: true,
                    total: true
                  },
                  where: {
                    orderId: { in: orderIds }
                  },
                  orderBy: {
                    _sum: {
                      total: 'desc'
                    }
                  },
                  take: 10
                });

                const productIds = prodGroups.map(g => g.productId);
                const products = await prisma.product.findMany({
                  where: { id: { in: productIds } },
                  select: { id: true, name: true }
                });

                return prodGroups.map(g => {
                  const p = products.find(x => x.id === g.productId);
                  return {
                    name: p ? p.name : 'Unknown Product',
                    sales: g._sum.quantity || 0,
                    revenue: parseFloat(g._sum.total) || 0
                  };
                });
              } catch (e) {
                console.error('topProducts error', e);
                return [];
              }
            })(),

            // Calculate top vendors by total revenue within the period
            topVendors: await (async () => {
              try {
                const vendorGroups = await prisma.order.groupBy({
                  by: ['vendorId'],
                  _sum: { totalAmount: true },
                  _count: { id: true },
                  where: {
                    vendorId: { not: null },
                    createdAt: {
                      gte: startDate,
                      lte: endDate
                    },
                    status: 'DELIVERED'
                  },
                  orderBy: {
                    _sum: { totalAmount: 'desc' }
                  },
                  take: 10
                });

                const vendorIds = vendorGroups.map(v => v.vendorId).filter(Boolean);
                const vendors = await prisma.vendorProfile.findMany({
                  where: { id: { in: vendorIds } },
                  select: { id: true, businessName: true, isActive: true }
                });

                return vendorGroups.map(g => {
                  const v = vendors.find(x => x.id === g.vendorId);
                  return {
                    name: v ? v.businessName : 'Unknown Vendor',
                    sales: g._count.id || 0,
                    revenue: parseFloat(g._sum.totalAmount) || 0,
                    vendorIsActive: v ? !!v.isActive : false
                  };
                });
              } catch (e) {
                console.error('topVendors error', e);
                return [];
              }
            })()
          }
        }
      });
    }

    if (reportType === 'revenue') {
      // Get detailed revenue analytics
      const revenueByCategory = await prisma.category.findMany({
        include: {
          products: {
            include: {
              orderItems: {
                include: {
                  order: {
                    where: {
                      createdAt: {
                        gte: startDate,
                        lte: endDate
                      },
                      status: 'DELIVERED'
                    }
                  }
                }
              }
            }
          }
        }
      });

      const categoryRevenue = revenueByCategory.map(category => {
        const revenue = category.products.reduce((total, product) => {
          return total + product.orderItems.reduce((subtotal, item) => {
            return subtotal + (item.order ? item.price * item.quantity : 0);
          }, 0);
        }, 0);

        return {
          category: category.name,
          revenue: revenue,
          products: category.products.length
        };
      }).filter(item => item.revenue > 0);

      return NextResponse.json({
        success: true,
        data: {
          revenueByCategory,
          totalRevenue: categoryRevenue.reduce((sum, cat) => sum + cat.revenue, 0)
        }
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid report type'
    }, { status: 400 });

  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { reportType, period, format } = body;

    // Mock report generation
    // In a real implementation, this would generate PDF/CSV reports
    
    const reportId = `REPORT_${Date.now()}`;
    
    return NextResponse.json({
      success: true,
      message: 'Report generation started',
      data: {
        reportId,
        status: 'GENERATING',
        estimatedTime: '2-3 minutes',
        downloadUrl: `/api/admin/reports/${reportId}/download`
      }
    });

  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}