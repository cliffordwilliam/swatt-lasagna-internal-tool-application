import prisma from "@/lib/prisma";

export async function fetchLatestItems() {
  try {
    return await prisma.item.findMany();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest items.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredOrders(query: string, currentPage: number) {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          { buyer: { name: { contains: query, mode: "insensitive" } } },
          { recipient: { name: { contains: query, mode: "insensitive" } } },
          {
            totalPurchase: {
              equals: isNaN(Number(query)) ? undefined : Number(query),
            },
          },
          {
            orderDate: {
              equals: isNaN(Date.parse(query)) ? undefined : new Date(query),
            },
          },
          { status: { name: { contains: query, mode: "insensitive" } } },
        ],
      },
      orderBy: {
        orderDate: "desc",
      },
      skip,
      take: ITEMS_PER_PAGE,
      include: {
        buyer: { select: { name: true } },
        recipient: { select: { name: true } },
        status: { select: { name: true } },
      },
    });

    return orders;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch orders.");
  }
}

export async function fetchOrdersPages(query: string) {
  try {
    const totalOrders = await prisma.order.count({
      where: {
        OR: [
          { buyer: { name: { contains: query, mode: "insensitive" } } },
          { recipient: { name: { contains: query, mode: "insensitive" } } },
          {
            totalPurchase: {
              equals: isNaN(Number(query)) ? undefined : Number(query),
            },
          },
          {
            orderDate: {
              equals: isNaN(Date.parse(query)) ? undefined : new Date(query),
            },
          },
          { status: { name: { contains: query, mode: "insensitive" } } },
        ],
      },
    });

    return Math.ceil(totalOrders / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of orders.");
  }
}

export async function fetchPeople() {
  try {
    const people = await prisma.person.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        phoneNumber: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return people;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all people.");
  }
}
