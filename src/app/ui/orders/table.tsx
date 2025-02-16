import { fetchFilteredOrders } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DeleteInvoice } from "./buttons";

export default async function OrdersTable({
  query,
  currentPage,
  startDate,
  endDate,
}: {
  query: string;
  currentPage: number;
  startDate: string | null;
  endDate: string | null;
}) {
  const orders = await fetchFilteredOrders(
    query,
    currentPage,
    startDate,
    endDate
  );

  return (
    <Paper>
      <TableContainer sx={{ height: 440 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Buyer</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Total Purchase</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
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
                <TableCell>
                  <IconButton
                    href={`/orders/${order.id}/edit`}
                    aria-label="delete"
                  >
                    <EditIcon color="success" />
                  </IconButton>
                  <DeleteInvoice id={order.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
