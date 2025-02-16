// import Form from '@/app/ui/invoices/edit-form';
import { notFound } from "next/navigation";
import {
  fetchOrderById,
  fetchItems,
  fetchOrderstatuses,
  fetchPayments,
  fetchPeople,
  fetchPickupDelivery,
} from "@/app/lib/data";
import { Metadata } from "next";
import Form from "@/app/ui/orders/edit-form";

export const metadata: Metadata = {
  title: "Edit Order",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [order, peoples, items, pickupDeliveries, payments, statuses] =
    await Promise.all([
      fetchOrderById(id),
      fetchPeople(),
      fetchItems(),
      fetchPickupDelivery(),
      fetchPayments(),
      fetchOrderstatuses(),
    ]);

  if (!order) {
    notFound();
  }

  return (
    <main>
      <Form
        order={order}
        peoples={peoples}
        items={items}
        pickupDeliveries={pickupDeliveries}
        payments={payments}
        statuses={statuses}
      />
    </main>
  );
}
