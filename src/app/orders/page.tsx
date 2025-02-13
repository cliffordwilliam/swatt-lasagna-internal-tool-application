import { fetchOrdersPages } from "@/app/lib/data";
import Pagination from "@/app/ui/orders/pagination";
import OrdersTable from "@/app/ui/orders/table";
import Search from "@/app/ui/search";
import { Button, Stack } from "@mui/material";
import { Metadata } from "next";
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
    <Stack spacing={2}>
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search placeholder="Search invoices..." />
        <Button variant="contained" href="/dashboard/orders/create">
          Add
        </Button>
      </Stack>
      <Suspense key={query + currentPage} fallback={<>orders table skeleton</>}>
        <OrdersTable query={query} currentPage={currentPage} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </Stack>
  );
}
