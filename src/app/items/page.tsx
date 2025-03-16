import { fetchItemsPages } from "@/app/lib/data";
import Pagination from "@/app/ui/orders/pagination";
import Search from "@/app/ui/search";
import { Button, Stack } from "@mui/material";
import { Metadata } from "next";
import { Suspense } from "react";
import ItemsTable from "../ui/items/table";
import { ItemsTableSkeleton } from "../ui/skeletons";

export const metadata: Metadata = {
  title: "Orders",
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

  const totalPages = await fetchItemsPages(query);

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search placeholder="Search items..." />
        <Button disabled variant="contained" href="/items/create">
          Add
        </Button>
      </Stack>
      <Suspense key={query + currentPage} fallback={<ItemsTableSkeleton />}>
        <ItemsTable
          query={query}
          currentPage={currentPage}
        />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </Stack>
  );
}
