import {
  fetchItems,
  fetchOrderstatuses,
  fetchPayments,
  fetchPeople,
  fetchPickupDelivery,
} from "@/app/lib/data";
import Form from "@/app/ui/orders/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Order",
};

export default async function Page() {
  const [peoples, items, pickupDeliveries, payments, statuses] =
    await Promise.all([
      fetchPeople(),
      fetchItems(),
      fetchPickupDelivery(),
      fetchPayments(),
      fetchOrderstatuses(),
    ]);
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <main>
      <Form
        peoples={peoples}
        items={items}
        pickupDeliveries={pickupDeliveries}
        payments={payments}
        statuses={statuses}
      />
    </main>
  );
}
