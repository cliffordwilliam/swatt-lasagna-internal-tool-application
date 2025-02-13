import { fetchFilteredOrders } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default async function OrdersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const orders = await fetchFilteredOrders(query, currentPage);

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Buyer</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Total Purchase</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.buyer.name}</TableCell>
                <TableCell>{order.recipient.name}</TableCell>
                <TableCell>{`Rp ${order.totalPurchase.toLocaleString()}`}</TableCell>
                <TableCell>
                  {formatDateToLocal(order.orderDate.toISOString())}
                </TableCell>
                <TableCell>{order.status.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
