import { fetchLatestOrders } from "@/app/lib/data";
import { convertToRp } from "@/app/lib/utils";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default async function BasicTable() {
  const orders = await fetchLatestOrders();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="orders table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell align="right">Buyer</TableCell>
            <TableCell align="right">Recipient</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Delivery Date</TableCell>
            <TableCell align="right">Grand Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="right">{order.buyer.name}</TableCell>
              <TableCell align="right">{order.recipient.name}</TableCell>
              <TableCell align="right">
                {new Date(order.orderDate).toLocaleDateString()}
              </TableCell>
              <TableCell align="right">
                {new Date(order.deliveryDate).toLocaleDateString()}
              </TableCell>
              <TableCell align="right">
                {convertToRp(order.grandTotal)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
