import { fetchOrdersPages } from "@/app/lib/data";
import Pagination from "@/app/ui/orders/pagination";
import OrdersTable from "@/app/ui/orders/table";
import Search from "@/app/ui/search";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Invoices",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchOrdersPages(query);

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <Link href="/dashboard/orders/create">Create Order</Link>
      </div>
      <Suspense key={query + currentPage} fallback={<>orders table skeleton</>}>
        <OrdersTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
