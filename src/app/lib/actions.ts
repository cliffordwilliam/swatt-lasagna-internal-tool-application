"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function deleteOrder(id: string) {
  await prisma.order.delete({
    where: { id },
  });
  revalidatePath("/orders");
}

export type CreateOrderState = {
  errors?: {
    buyerId?: string[];
    recipientId?: string[];
    orderDate?: string[];
    deliveryDate?: string[];
    totalPurchase?: string[];
    pickupDeliveryId?: string[];
    shippingCost?: string[];
    grandTotal?: string[];
    paymentId?: string[];
    statusId?: string[];
    items?: string[];
    note?: string[];
    po?: string[];
  };
  message?: string | null;
};

const CreateOrderFormSchema = z.object({
  buyerId: z.string().min(1, "Buyer is required"),
  recipientId: z.string().min(1, "Recipient is required"),
  orderDate: z.string().min(1, "Order date is required"),
  deliveryDate: z.string().min(1, "Delivery date is required"),
  pickupDeliveryId: z.string().min(1, "Pickup delivery method is required"),
  shippingCost: z
    .string()
    .regex(/^\d+$/, "Shipping cost must be a number")
    .transform(Number)
    .refine((val) => val >= 0, "Shipping cost must be non-negative"),
  paymentId: z.string().min(1, "Payment method is required"),
  statusId: z.string().min(1, "Order status is required"),
  items: z
    .array(
      z.object({
        id: z.string().min(1, "Item ID is required"),
        quantity: z
          .string()
          .regex(/^\d+$/, "Quantity must be a number")
          .transform(Number)
          .refine((val) => val > 0, "Quantity must be greater than 0"),
      })
    )
    .min(1, "At least one item must be selected"),
  totalPurchase: z
    .string()
    .regex(/^\d+$/, "Total purchase must be a number")
    .transform(Number)
    .refine((val) => val >= 0, "Total purchase must be non-negative"),
  grandTotal: z
    .string()
    .regex(/^\d+$/, "Grand total must be a number")
    .transform(Number)
    .refine((val) => val >= 0, "Grand total must be non-negative"),
  note: z.string().optional(),
  po: z.string(),
});

export async function createOrder(
  prevState: CreateOrderState,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = CreateOrderFormSchema.safeParse({
    buyerId: formData.get("buyerId"),
    recipientId: formData.get("recipientId"),
    orderDate: formData.get("orderDate"),
    deliveryDate: formData.get("deliveryDate"),
    totalPurchase: formData.get("totalPurchase"),
    pickupDeliveryId: formData.get("pickupDeliveryId"),
    shippingCost: formData.get("shippingCost"),
    grandTotal: formData.get("grandTotal"),
    paymentId: formData.get("paymentId"),
    statusId: formData.get("statusId"),
    items: JSON.parse(String(formData.get("items"))),
    note: formData.get("note"),
    po: formData.get("po"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Order.",
    };
  }

  // Prepare data for insertion into the database
  const {
    buyerId,
    recipientId,
    orderDate,
    deliveryDate,
    totalPurchase,
    pickupDeliveryId,
    shippingCost,
    grandTotal,
    paymentId,
    statusId,
    items,
    note,
    po,
  } = validatedFields.data;

  // Insert data into the database
  try {
    await prisma.order.create({
      data: {
        buyerId,
        recipientId,
        orderDate: new Date(orderDate),
        deliveryDate: new Date(deliveryDate),
        totalPurchase,
        pickupDeliveryId,
        shippingCost,
        grandTotal,
        paymentId,
        orderStatusId: statusId,
        note,
        po,
        items: {
          create: items.map((item) => ({
            itemId: item.id,
            quantity: item.quantity,
          })),
        },
      },
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: `Database Error: Failed to Create Order. ${error}`,
    };
  }

  // Revalidate the cache for the orders page and redirect the user.
  revalidatePath("/orders");
  redirect("/orders");
}

export async function updateOrder(
  id: string,
  prevState: CreateOrderState,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = CreateOrderFormSchema.safeParse({
    buyerId: formData.get("buyerId"),
    recipientId: formData.get("recipientId"),
    orderDate: formData.get("orderDate"),
    deliveryDate: formData.get("deliveryDate"),
    totalPurchase: formData.get("totalPurchase"),
    pickupDeliveryId: formData.get("pickupDeliveryId"),
    shippingCost: formData.get("shippingCost"),
    grandTotal: formData.get("grandTotal"),
    paymentId: formData.get("paymentId"),
    statusId: formData.get("statusId"),
    items: JSON.parse(String(formData.get("items"))),
    note: formData.get("note"),
    po: formData.get("po"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Order.",
    };
  }

  // Prepare data for updating the database
  const {
    buyerId,
    recipientId,
    orderDate,
    deliveryDate,
    totalPurchase,
    pickupDeliveryId,
    shippingCost,
    grandTotal,
    paymentId,
    statusId,
    items,
    note,
    po,
  } = validatedFields.data;

  try {
    await prisma.$transaction([
      // Update the order details
      prisma.order.update({
        where: { id },
        data: {
          buyerId,
          recipientId,
          orderDate: new Date(orderDate),
          deliveryDate: new Date(deliveryDate),
          totalPurchase,
          pickupDeliveryId,
          shippingCost,
          grandTotal,
          paymentId,
          orderStatusId: statusId,
          note,
          po,
        },
      }),

      // Remove old order items
      prisma.orderItem.deleteMany({
        where: { orderId: id },
      }),

      // Insert new order items
      prisma.orderItem.createMany({
        data: items.map((item) => ({
          orderId: id,
          itemId: item.id,
          quantity: item.quantity,
        })),
      }),
    ]);
  } catch (error) {
    return {
      message: `Database Error: Failed to Update Order. ${error}`,
    };
  }

  // Revalidate the cache for the orders page and redirect the user.
  revalidatePath("/orders");
  redirect("/orders");
}

export type CreatePeopleState = {
  errors?: {
    name?: string[];
    address?: string[];
    phoneNumber?: string[];
  };
  message?: string | null;
};

const CreatePeopleFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
});

export async function createPeople(
  prevState: CreatePeopleState,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = CreatePeopleFormSchema.safeParse({
    name: formData.get("name"),
    address: formData.get("address"),
    phoneNumber: formData.get("phoneNumber"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Person.",
    };
  }

  // Prepare data for insertion into the database
  const { name, address, phoneNumber } = validatedFields.data;

  // Insert data into the database
  try {
    await prisma.person.create({
      data: {
        name,
        address,
        phoneNumber,
      },
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: `Database Error: Failed to Create Person. ${error}`,
    };
  }

  // Revalidate the cache for the persons page and redirect the user.
  revalidatePath("/orders/create");
  redirect("/orders/create");
}
