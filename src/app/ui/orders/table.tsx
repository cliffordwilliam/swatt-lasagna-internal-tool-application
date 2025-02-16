import { fetchFilteredOrders } from "@/app/lib/data";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Row from "./table-row";

export default async function OrdersTable({
  query,
  currentPage,
  startDate,
  endDate,
  itemName,
}: {
  query: string;
  currentPage: number;
  startDate: string | null;
  endDate: string | null;
  itemName: string | null;
}) {
  const orders = await fetchFilteredOrders(
    query,
    currentPage,
    startDate,
    endDate,
    itemName
  );

  return (
    <Paper>
      <TableContainer sx={{ height: 440 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Buyer</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Total Purchase</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Grand Total</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Pickup Delivery</TableCell>
              <TableCell>Shipping Cost</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <Row key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
