import { fetchFilteredOrders } from "@/app/lib/data";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";

export default async function OrdersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const orders = await fetchFilteredOrders(query, currentPage);

  return (
    <table>
      <thead>
        <tr>
          <th>Buyer</th>
          <th>Recipient</th>
          <th>Total Purchase</th>
          <th>Order Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order) => (
          <tr key={order.id}>
            <td>{order.buyer.name}</td>
            <td>{order.recipient.name}</td>
            <td>{formatCurrency(order.totalPurchase)}</td>
            <td>{formatDateToLocal(order.orderDate.toISOString())}</td>
            <td>{order.status.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
