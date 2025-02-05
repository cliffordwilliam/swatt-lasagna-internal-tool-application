import prisma from "../../../lib/prisma";

// Fetch Total Revenue (number) for the Current Year
export async function fetchTotalRevenue() {
  try {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const totalRevenue = await prisma.order.aggregate({
      _sum: {
        grandTotal: true,
      },
      where: {
        orderDate: {
          gte: startOfYear,
        },
      },
    });
    return totalRevenue._sum.grandTotal || 0;
  } catch (error) {
    console.error("Database Error (fetchTotalRevenue):", error);
    throw new Error("Failed to fetch total revenue.");
  }
}

// Fetch Total Orders (number) for the Current Year
export async function fetchTotalOrders() {
  try {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const totalOrders = await prisma.order.count({
      where: {
        orderDate: {
          gte: startOfYear,
        },
      },
    });
    return totalOrders;
  } catch (error) {
    console.error("Database Error (fetchTotalOrders):", error);
    throw new Error("Failed to fetch total orders.");
  }
}

// Fetch Latest Orders (list obj)
export async function fetchLatestOrders(limit = 5) {
  try {
    return await prisma.order.findMany({
      orderBy: {
        orderDate: "desc",
      },
      take: limit,
      include: {
        buyer: true,
        recipient: true,
      },
    });
  } catch (error) {
    console.error("Database Error (fetchLatestOrders):", error);
    throw new Error("Failed to fetch latest orders.");
  }
}

// Fetch Top Selling Items (list obj) (Current Year)
export async function fetchTopSellingItems(limit = 5) {
  try {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const topItems = await prisma.orderItem.groupBy({
      by: ["itemId"],
      _sum: {
        quantity: true,
      },
      where: {
        order: {
          orderDate: {
            gte: startOfYear,
          },
        },
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: limit,
    });

    const itemDetails = await Promise.all(
      topItems.map(async (orderItem) => {
        const item = await prisma.item.findUnique({
          where: { id: orderItem.itemId },
        });
        return { ...item, totalSold: orderItem._sum.quantity };
      })
    );

    return itemDetails;
  } catch (error) {
    console.error("Database Error (fetchTopSellingItems):", error);
    throw new Error("Failed to fetch top-selling items.");
  }
}

// Fetch Monthly Revenue Trend (list obj) (Current Year)
export async function fetchMonthlyRevenueTrend() {
  try {
    const currentYear = new Date().getFullYear();
    const monthlyRevenue = await Promise.all(
      Array.from({ length: 12 }, (_, i) => i).map(async (month) => {
        const start = new Date(currentYear, month, 1);
        const end = new Date(currentYear, month + 1, 1);

        const revenue = await prisma.order.aggregate({
          _sum: {
            grandTotal: true,
          },
          where: {
            orderDate: {
              gte: start,
              lt: end,
            },
          },
        });

        return {
          month: start.toLocaleString("default", { month: "long" }),
          revenue: revenue._sum.grandTotal || 0,
        };
      })
    );

    return monthlyRevenue;
  } catch (error) {
    console.error("Database Error (fetchMonthlyRevenueTrend):", error);
    throw new Error("Failed to fetch monthly revenue trend.");
  }
}

// Fetch Order Status Summary (list obj)
export async function fetchOrderStatusSummary() {
  try {
    const statusCounts = await prisma.order.groupBy({
      by: ["orderStatusId"],
      _count: true,
    });

    const statusDetails = await Promise.all(
      statusCounts.map(async (status) => {
        const statusInfo = await prisma.orderStatus.findUnique({
          where: { id: status.orderStatusId },
        });
        return {
          status: statusInfo?.name || "Unknown",
          count: status._count,
        };
      })
    );

    return statusDetails;
  } catch (error) {
    console.error("Database Error (fetchOrderStatusSummary):", error);
    throw new Error("Failed to fetch order status summary.");
  }
}
