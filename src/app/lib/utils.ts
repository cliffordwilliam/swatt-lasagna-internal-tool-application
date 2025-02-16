export const formatDateToLocal = (
  dateStr: string,
  locale: string = "id-ID"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long", // "long" for full month names in Indonesian
    year: "numeric",
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID").format(value);
