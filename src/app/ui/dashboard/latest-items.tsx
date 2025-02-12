import { fetchLatestItems } from "@/app/lib/data";

export default async function LatestItems() {
  const latestInvoices = await fetchLatestItems();

  return JSON.stringify(latestInvoices);
}
