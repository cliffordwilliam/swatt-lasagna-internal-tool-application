"use client";

import { useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteInvoice } from "./buttons";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";
import { OrderTableRow } from "@/app/lib/definitions";

export default function Row({ order }: { order: OrderTableRow }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{order.buyer.name}</TableCell>
        <TableCell>{order.recipient.name}</TableCell>
        <TableCell>{`Rp ${formatCurrency(order.totalPurchase)}`}</TableCell>
        <TableCell>{formatDateToLocal(order.orderDate.toString())}</TableCell>
        <TableCell>
          {formatDateToLocal(order.deliveryDate.toString())}
        </TableCell>
        <TableCell>{`Rp ${formatCurrency(order.grandTotal)}`}</TableCell>
        <TableCell>{order.payment.name}</TableCell>
        <TableCell>{order.pickupDelivery.name}</TableCell>
        <TableCell>{`Rp ${formatCurrency(order.shippingCost)}`}</TableCell>
        <TableCell>{order.note}</TableCell>
        <TableCell>{order.po}</TableCell>
        <TableCell>{order.status.name}</TableCell>
        <TableCell>
          <IconButton href={`/orders/${order.id}/edit`}>
            <EditIcon color="success" />
          </IconButton>
          <DeleteInvoice id={order.id} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Items
              </Typography>
              <Table size="small" aria-label="items">
                <TableHead>
                  <TableRow>
                    <TableCell>Item Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map(({ item, quantity }) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell align="right">{quantity}</TableCell>
                      <TableCell align="right">{`Rp ${formatCurrency(
                        item.price
                      )}`}</TableCell>
                      <TableCell align="right">{`Rp ${formatCurrency(
                        item.price * quantity
                      )}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
