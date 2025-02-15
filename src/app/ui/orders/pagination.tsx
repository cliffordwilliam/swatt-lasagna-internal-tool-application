"use client";

import { Pagination, Stack } from "@mui/material";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function PaginationComponent({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", value.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
      />
    </Stack>
  );
}
