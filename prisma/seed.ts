import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // // Data for items (Lasagna and others)
  // const itemsData = [
  //   { name: "Lasagna Mini", price: 65000 },
  //   { name: "Lasagna Small", price: 95000 },
  //   { name: "Lasagna Medium", price: 180000 },
  //   { name: "Lasagna Long", price: 295000 },
  //   { name: "Lasagna Xtra Medium", price: 395000 },
  //   { name: "Lasagna Family", price: 495000 },
  //   { name: "Lasagna Xtra Family", price: 555000 },
  //   { name: "Lasagna Party Medium", price: 1350000 },
  //   { name: "Lasagna Party Large", price: 2750000 },

  //   { name: "Macaroni Mini", price: 50000 },
  //   { name: "Macaroni Small", price: 85000 },
  //   { name: "Macaroni Oval", price: 110000 },
  //   { name: "Macaroni Medium", price: 165000 },
  //   { name: "Macaroni Long", price: 250000 },
  //   { name: "Macaroni Xtra Medium", price: 335000 },
  //   { name: "Macaroni Family", price: 380000 },
  //   { name: "Macaroni Xtra Family", price: 445000 },
  //   { name: "Macaroni Party Medium", price: 1100000 },
  //   { name: "Macaroni Party Large", price: 2200000 },

  //   { name: "Marmer Cake 1 Loyang Bulat", price: 335000 },
  //   { name: "Marmer Cake 1 Loyang Dipotong", price: 335000 },
  //   { name: "Marmer Cake 1 Slice", price: 22000 },
  //   { name: "Marmer Cake 3 Slice", price: 63000 },
  //   { name: "Marmer Cake 6 Slice", price: 125000 },
  //   { name: "Marmer Cake 9 Slice", price: 185000 },
  //   { name: "Marmer Cake 12 Slice", price: 245000 },

  //   { name: "Nastar Bulat", price: 185000 },
  //   { name: "Nastar Kotak", price: 135000 },

  //   { name: "Kue Keju Bulat", price: 195000 },
  //   { name: "Kue Keju Kotak", price: 145000 },

  //   { name: "Lidah Kucing Bulat", price: 150000 },
  //   { name: "Lidah Kucing Kotak", price: 120000 },

  //   { name: "Sagu Keju Bulat", price: 150000 },
  //   { name: "Sagu Keju Kotak", price: 120000 },

  //   { name: "Almond Keju Bulat", price: 185000 },
  //   { name: "Almond Keju Kotak", price: 135000 },

  //   { name: "Cheese Stick Kotak", price: 160000 },

  //   { name: "Bolu Peuyeum 1 Slice", price: 11000 },
  //   { name: "Bolu Peuyeum 5 Slice", price: 50000 },
  //   { name: "Bolu Peuyeum 12 Slice", price: 110000 },
  //   { name: "Bolu Peuyeum 1 Loyang Utuh", price: 140000 },

  //   { name: "Roti Baso", price: 15000 },
  //   { name: "Roti Keju", price: 15000 },
  //   { name: "Roti Coklat", price: 15000 },

  //   { name: "Pudding 1 Cup", price: 30000 },
  //   { name: "Pudding 4 Cup ", price: 115000 },
  //   { name: "Pudding 6 Cup", price: 172500 },

  //   { name: "Box Hampers Box K3", price: 75000 },
  //   { name: "Box Hampers Box K4", price: 95000 },
  //   { name: "Box Hampers Box B3", price: 85000 },
  //   { name: "Box Hampers Box B4", price: 95000 },

  //   { name: "Tas Kain MC", price: 15000 },
  //   { name: "Tas Kain K3", price: 15000 },
  //   { name: "Tas Kain K4", price: 15000 },
  //   { name: "Tas Kain B3", price: 15000 },
  //   { name: "Tas Kain B4", price: 15000 },

  //   { name: "Hampers Marmer Cake", price: 350000 },
  // ];

  // // Seed items
  // const createdItems = await Promise.all(
  //   itemsData.map((itemData) => prisma.item.create({ data: itemData }))
  // );
  // console.log("Seeded items:", createdItems);

  // // Data for pickup deliveries
  // const pickupDeliveries = [
  //   { name: "Pickup" },
  //   { name: "Delivery" },
  //   { name: "Gojek" },
  //   { name: "Citytran" },
  //   { name: "Paxel" },
  //   { name: "Daytrans" },
  //   { name: "Baraya" },
  //   { name: "Lintas" },
  //   { name: "Bineka" },
  //   { name: "Jne" },
  // ];

  // // Seed pickup deliveries
  // const createdPickupDeliveries = await Promise.all(
  //   pickupDeliveries.map((pickupDelivery) =>
  //     prisma.pickupDelivery.create({ data: pickupDelivery })
  //   )
  // );
  // console.log("Seeded pickup deliveries:", createdPickupDeliveries);

  // // Data for payments
  // const payments = [
  //   { name: "Tunai" },
  //   { name: "Kartu Kredit" },
  //   { name: "Transfer Bank" },
  //   { name: "QRIS" },
  // ];

  // // Seed payments
  // const createdPayments = await Promise.all(
  //   payments.map((payment) => prisma.payment.create({ data: payment }))
  // );
  // console.log("Seeded payments:", createdPayments);

  // // Data for people (buyers and recipients)
  // const peopleData = [
  //   {
  //     name: "Andi Pratama",
  //     address: "Jl. Raya No. 25, Jakarta",
  //     phoneNumber: "081234567890",
  //   },
  //   {
  //     name: "Siti Aminah",
  //     address: "Jl. Merdeka No. 12, Bandung",
  //     phoneNumber: "081298765432",
  //   },
  //   {
  //     name: "Budi Santoso",
  //     address: "Jl. Sudirman No. 9, Surabaya",
  //     phoneNumber: "082234567891",
  //   },
  //   {
  //     name: "Dewi Lestari",
  //     address: "Jl. Kebon Jeruk No. 17, Jakarta",
  //     phoneNumber: "081212345678",
  //   },
  // ];

  // // Seed people
  // const createdPeople = await Promise.all(
  //   peopleData.map((person) => prisma.person.create({ data: person }))
  // );
  // console.log("Seeded people:", createdPeople);

  // // Data for order statuses
  // const orderStatuses = [
  //   { name: "Downpayment" },
  //   { name: "Belum bayar" },
  //   { name: "Lunas" },
  // ];

  // // Seed order statuses
  // const createdOrderStatuses = await Promise.all(
  //   orderStatuses.map((status) => prisma.orderStatus.create({ data: status }))
  // );
  // console.log("Seeded order statuses:", createdOrderStatuses);

  // Data for orders (just to generate test data for the chart)
  const ordersData = [
    {
      buyerId: createdPeople[0].id,
      recipientId: createdPeople[1].id,
      orderDate: new Date(2026, 0, 10), // January 2026
      deliveryDate: new Date(2026, 0, 12),
      totalPurchase: 3_000_000,
      pickupDeliveryId: createdPickupDeliveries[1].id, // Delivery
      shippingCost: 50000,
      grandTotal: 3_050_000,
      paymentId: createdPayments[2].id, // Transfer Bank
      orderStatusId: createdOrderStatuses[1].id, // Lunas
      note: "Harap antar tepat waktu.",
      items: {
        create: [
          {
            itemId: createdItems[0].id, // Lasagna Mini
            quantity: 3,
          },
          {
            itemId: createdItems[5].id, // Macaroni Medium
            quantity: 1,
          },
        ],
      },
    },
    {
      buyerId: createdPeople[2].id,
      recipientId: createdPeople[3].id,
      orderDate: new Date(2026, 2, 15), // March 2026
      deliveryDate: new Date(2026, 2, 17),
      totalPurchase: 2_500_000,
      pickupDeliveryId: createdPickupDeliveries[0].id, // Pickup
      shippingCost: 0,
      grandTotal: 2_500_000,
      paymentId: createdPayments[0].id, // Tunai
      orderStatusId: createdOrderStatuses[2].id, // Proses Pengiriman
      note: "Pesanan untuk acara ulang tahun.",
      items: {
        create: [
          {
            itemId: createdItems[3].id, // Lasagna Long
            quantity: 2,
          },
          {
            itemId: createdItems[6].id, // Marmer Cake 1 Loyang Bulat
            quantity: 1,
          },
        ],
      },
    },
    {
      buyerId: createdPeople[1].id,
      recipientId: createdPeople[0].id,
      orderDate: new Date(2026, 4, 25), // May 2026
      deliveryDate: new Date(2026, 4, 27),
      totalPurchase: 1_800_000,
      pickupDeliveryId: createdPickupDeliveries[2].id, // Gojek
      shippingCost: 30000,
      grandTotal: 1_830_000,
      paymentId: createdPayments[3].id, // QRIS
      orderStatusId: createdOrderStatuses[0].id, // Belum Bayar
      note: "Harap dikirim dengan hati-hati.",
      items: {
        create: [
          {
            itemId: createdItems[2].id, // Lasagna Medium
            quantity: 2,
          },
        ],
      },
    },
    {
      buyerId: createdPeople[0].id,
      recipientId: createdPeople[1].id,
      orderDate: new Date(2026, 0, 10), // January 2026
      deliveryDate: new Date(2026, 0, 12),
      totalPurchase: 3_000_000,
      pickupDeliveryId: createdPickupDeliveries[1].id, // Delivery
      shippingCost: 50000,
      grandTotal: 3_050_000,
      paymentId: createdPayments[2].id, // Transfer Bank
      orderStatusId: createdOrderStatuses[1].id, // Lunas
      note: "Harap antar tepat waktu.",
      items: {
        create: [
          {
            itemId: createdItems[0].id, // Lasagna Mini
            quantity: 3,
          },
          {
            itemId: createdItems[5].id, // Macaroni Medium
            quantity: 1,
          },
        ],
      },
    },
    {
      buyerId: createdPeople[2].id,
      recipientId: createdPeople[3].id,
      orderDate: new Date(2026, 2, 15), // March 2026
      deliveryDate: new Date(2026, 2, 17),
      totalPurchase: 2_500_000,
      pickupDeliveryId: createdPickupDeliveries[0].id, // Pickup
      shippingCost: 0,
      grandTotal: 2_500_000,
      paymentId: createdPayments[0].id, // Tunai
      orderStatusId: createdOrderStatuses[2].id, // Proses Pengiriman
      note: "Pesanan untuk acara ulang tahun.",
      items: {
        create: [
          {
            itemId: createdItems[3].id, // Lasagna Long
            quantity: 2,
          },
          {
            itemId: createdItems[6].id, // Marmer Cake 1 Loyang Bulat
            quantity: 1,
          },
        ],
      },
    },
    {
      buyerId: createdPeople[1].id,
      recipientId: createdPeople[0].id,
      orderDate: new Date(2026, 4, 25), // May 2026
      deliveryDate: new Date(2026, 4, 27),
      totalPurchase: 1_800_000,
      pickupDeliveryId: createdPickupDeliveries[2].id, // Gojek
      shippingCost: 30000,
      grandTotal: 1_830_000,
      paymentId: createdPayments[3].id, // QRIS
      orderStatusId: createdOrderStatuses[0].id, // Belum Bayar
      note: "Harap dikirim dengan hati-hati.",
      items: {
        create: [
          {
            itemId: createdItems[2].id, // Lasagna Medium
            quantity: 2,
          },
        ],
      },
    },
    {
      buyerId: createdPeople[0].id,
      recipientId: createdPeople[1].id,
      orderDate: new Date(2026, 0, 10), // January 2026
      deliveryDate: new Date(2026, 0, 12),
      totalPurchase: 3_000_000,
      pickupDeliveryId: createdPickupDeliveries[1].id, // Delivery
      shippingCost: 50000,
      grandTotal: 3_050_000,
      paymentId: createdPayments[2].id, // Transfer Bank
      orderStatusId: createdOrderStatuses[1].id, // Lunas
      note: "Harap antar tepat waktu.",
      items: {
        create: [
          {
            itemId: createdItems[0].id, // Lasagna Mini
            quantity: 3,
          },
          {
            itemId: createdItems[5].id, // Macaroni Medium
            quantity: 1,
          },
        ],
      },
    },
    {
      buyerId: createdPeople[2].id,
      recipientId: createdPeople[3].id,
      orderDate: new Date(2026, 2, 15), // March 2026
      deliveryDate: new Date(2026, 2, 17),
      totalPurchase: 2_500_000,
      pickupDeliveryId: createdPickupDeliveries[0].id, // Pickup
      shippingCost: 0,
      grandTotal: 2_500_000,
      paymentId: createdPayments[0].id, // Tunai
      orderStatusId: createdOrderStatuses[2].id, // Proses Pengiriman
      note: "Pesanan untuk acara ulang tahun.",
      items: {
        create: [
          {
            itemId: createdItems[3].id, // Lasagna Long
            quantity: 2,
          },
          {
            itemId: createdItems[6].id, // Marmer Cake 1 Loyang Bulat
            quantity: 1,
          },
        ],
      },
    },
    {
      buyerId: createdPeople[1].id,
      recipientId: createdPeople[0].id,
      orderDate: new Date(2026, 4, 25), // May 2026
      deliveryDate: new Date(2026, 4, 27),
      totalPurchase: 1_800_000,
      pickupDeliveryId: createdPickupDeliveries[2].id, // Gojek
      shippingCost: 30000,
      grandTotal: 1_830_000,
      paymentId: createdPayments[3].id, // QRIS
      orderStatusId: createdOrderStatuses[0].id, // Belum Bayar
      note: "Harap dikirim dengan hati-hati.",
      items: {
        create: [
          {
            itemId: createdItems[2].id, // Lasagna Medium
            quantity: 2,
          },
        ],
      },
    },
    {
      buyerId: createdPeople[0].id,
      recipientId: createdPeople[1].id,
      orderDate: new Date(2026, 0, 10), // January 2026
      deliveryDate: new Date(2026, 0, 12),
      totalPurchase: 3_000_000,
      pickupDeliveryId: createdPickupDeliveries[1].id, // Delivery
      shippingCost: 50000,
      grandTotal: 3_050_000,
      paymentId: createdPayments[2].id, // Transfer Bank
      orderStatusId: createdOrderStatuses[1].id, // Lunas
      note: "Harap antar tepat waktu.",
      items: {
        create: [
          {
            itemId: createdItems[0].id, // Lasagna Mini
            quantity: 3,
          },
          {
            itemId: createdItems[5].id, // Macaroni Medium
            quantity: 1,
          },
        ],
      },
    },
    {
      buyerId: createdPeople[2].id,
      recipientId: createdPeople[3].id,
      orderDate: new Date(2026, 2, 15), // March 2026
      deliveryDate: new Date(2026, 2, 17),
      totalPurchase: 2_500_000,
      pickupDeliveryId: createdPickupDeliveries[0].id, // Pickup
      shippingCost: 0,
      grandTotal: 2_500_000,
      paymentId: createdPayments[0].id, // Tunai
      orderStatusId: createdOrderStatuses[2].id, // Proses Pengiriman
      note: "Pesanan untuk acara ulang tahun.",
      items: {
        create: [
          {
            itemId: createdItems[3].id, // Lasagna Long
            quantity: 2,
          },
          {
            itemId: createdItems[6].id, // Marmer Cake 1 Loyang Bulat
            quantity: 1,
          },
        ],
      },
    },
    {
      buyerId: createdPeople[1].id,
      recipientId: createdPeople[0].id,
      orderDate: new Date(2026, 4, 25), // May 2026
      deliveryDate: new Date(2026, 4, 27),
      totalPurchase: 1_800_000,
      pickupDeliveryId: createdPickupDeliveries[2].id, // Gojek
      shippingCost: 30000,
      grandTotal: 1_830_000,
      paymentId: createdPayments[3].id, // QRIS
      orderStatusId: createdOrderStatuses[0].id, // Belum Bayar
      note: "Harap dikirim dengan hati-hati.",
      items: {
        create: [
          {
            itemId: createdItems[2].id, // Lasagna Medium
            quantity: 2,
          },
        ],
      },
    },
    {
      buyerId: createdPeople[0].id,
      recipientId: createdPeople[1].id,
      orderDate: new Date(2026, 0, 10), // January 2026
      deliveryDate: new Date(2026, 0, 12),
      totalPurchase: 3_000_000,
      pickupDeliveryId: createdPickupDeliveries[1].id, // Delivery
      shippingCost: 50000,
      grandTotal: 3_050_000,
      paymentId: createdPayments[2].id, // Transfer Bank
      orderStatusId: createdOrderStatuses[1].id, // Lunas
      note: "Harap antar tepat waktu.",
      items: {
        create: [
          {
            itemId: createdItems[0].id, // Lasagna Mini
            quantity: 3,
          },
          {
            itemId: createdItems[5].id, // Macaroni Medium
            quantity: 1,
          },
        ],
      },
    },
    {
      buyerId: createdPeople[2].id,
      recipientId: createdPeople[3].id,
      orderDate: new Date(2026, 2, 15), // March 2026
      deliveryDate: new Date(2026, 2, 17),
      totalPurchase: 2_500_000,
      pickupDeliveryId: createdPickupDeliveries[0].id, // Pickup
      shippingCost: 0,
      grandTotal: 2_500_000,
      paymentId: createdPayments[0].id, // Tunai
      orderStatusId: createdOrderStatuses[2].id, // Proses Pengiriman
      note: "Pesanan untuk acara ulang tahun.",
      items: {
        create: [
          {
            itemId: createdItems[3].id, // Lasagna Long
            quantity: 2,
          },
          {
            itemId: createdItems[6].id, // Marmer Cake 1 Loyang Bulat
            quantity: 1,
          },
        ],
      },
    },
    {
      buyerId: createdPeople[1].id,
      recipientId: createdPeople[0].id,
      orderDate: new Date(2026, 4, 25), // May 2026
      deliveryDate: new Date(2026, 4, 27),
      totalPurchase: 1_800_000,
      pickupDeliveryId: createdPickupDeliveries[2].id, // Gojek
      shippingCost: 30000,
      grandTotal: 1_830_000,
      paymentId: createdPayments[3].id, // QRIS
      orderStatusId: createdOrderStatuses[0].id, // Belum Bayar
      note: "Harap dikirim dengan hati-hati.",
      items: {
        create: [
          {
            itemId: createdItems[2].id, // Lasagna Medium
            quantity: 2,
          },
        ],
      },
    },
    {
      buyerId: createdPeople[0].id,
      recipientId: createdPeople[1].id,
      orderDate: new Date(2026, 0, 10), // January 2026
      deliveryDate: new Date(2026, 0, 12),
      totalPurchase: 3_000_000,
      pickupDeliveryId: createdPickupDeliveries[1].id, // Delivery
      shippingCost: 50000,
      grandTotal: 3_050_000,
      paymentId: createdPayments[2].id, // Transfer Bank
      orderStatusId: createdOrderStatuses[1].id, // Lunas
      note: "Harap antar tepat waktu.",
      items: {
        create: [
          {
            itemId: createdItems[0].id, // Lasagna Mini
            quantity: 3,
          },
          {
            itemId: createdItems[5].id, // Macaroni Medium
            quantity: 1,
          },
        ],
      },
    },
    {
      buyerId: createdPeople[2].id,
      recipientId: createdPeople[3].id,
      orderDate: new Date(2026, 2, 15), // March 2026
      deliveryDate: new Date(2026, 2, 17),
      totalPurchase: 2_500_000,
      pickupDeliveryId: createdPickupDeliveries[0].id, // Pickup
      shippingCost: 0,
      grandTotal: 2_500_000,
      paymentId: createdPayments[0].id, // Tunai
      orderStatusId: createdOrderStatuses[2].id, // Proses Pengiriman
      note: "Pesanan untuk acara ulang tahun.",
      items: {
        create: [
          {
            itemId: createdItems[3].id, // Lasagna Long
            quantity: 2,
          },
          {
            itemId: createdItems[6].id, // Marmer Cake 1 Loyang Bulat
            quantity: 1,
          },
        ],
      },
    },
    {
      buyerId: createdPeople[1].id,
      recipientId: createdPeople[0].id,
      orderDate: new Date(2026, 4, 25), // May 2026
      deliveryDate: new Date(2026, 4, 27),
      totalPurchase: 1_800_000,
      pickupDeliveryId: createdPickupDeliveries[2].id, // Gojek
      shippingCost: 30000,
      grandTotal: 1_830_000,
      paymentId: createdPayments[3].id, // QRIS
      orderStatusId: createdOrderStatuses[0].id, // Belum Bayar
      note: "Harap dikirim dengan hati-hati.",
      items: {
        create: [
          {
            itemId: createdItems[2].id, // Lasagna Medium
            quantity: 2,
          },
        ],
      },
    },
  ];

  // Seed orders
  const createdOrders = await Promise.all(
    ordersData.map((orderData) => prisma.order.create({ data: orderData }))
  );
  console.log("Seeded orders:", createdOrders);
}

// Execute the main function and handle errors
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
