import { fetchMonthlyRevenueTrend } from "@/app/lib/data";
import RevenueChart from "./RevenueChart"; // Import the client component

export default async function RevenueChartWrapper() {
  const data = await fetchMonthlyRevenueTrend(); // Fetch data on the server

  return <RevenueChart data={data} />; // Pass data to client component
}
