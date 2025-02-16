"use client";

import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchDate({
  keyName,
  label,
}: {
  keyName: string;
  label: string;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const storedDate = searchParams.get(keyName);
  const dateValue =
    storedDate && dayjs(storedDate).isValid() ? dayjs(storedDate) : null;

  const handleDateChange = (key: string, newValue: Dayjs | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (newValue) {
      params.set(key, newValue.format("YYYY-MM-DD")); // Format to standard date string
    } else {
      params.delete(key);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DatePicker
      value={dateValue}
      onChange={(newValue) => handleDateChange(keyName, newValue)}
      label={label}
      name={keyName}
    />
  );
}
