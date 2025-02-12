import { fetchPeople } from "@/app/lib/data";
import Form from "@/app/ui/orders/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Invoice",
};

export default async function Page() {
  const customers = await fetchPeople();

  return (
    <main>
      <Form customers={customers} />
    </main>
  );
}
