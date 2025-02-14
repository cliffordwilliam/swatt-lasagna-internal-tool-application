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
  title: "Create Invoice",
};

export default async function Page() {
  const peoples = await fetchPeople();
  const items = await fetchItems();
  const pickupDeliveries = await fetchPickupDelivery();
  const payments = await fetchPayments();
  const statuses = await fetchOrderstatuses();

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
