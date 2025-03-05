import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Stack, TextField } from "@mui/material";

export default function OrdersTableSkeleton() {
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
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton variant="text" width={100} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={100} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={80} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={120} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={80} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={100} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={100} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={80} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={120} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={80} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={120} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={80} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export function OrdersFormSkeleton() {
  return (
    <Stack gap={2}>
      {/* Add people form dialog */}
      <Skeleton variant="rectangular" width="100%">
        <Button>.</Button>
      </Skeleton>

      {/* Other fields */}
      {[...Array(12)].map((_, index) => (
        <Skeleton variant="rectangular" width="100%" key={index}>
          <TextField />
        </Skeleton>
      ))}

      {/* Note */}
      <Skeleton variant="rectangular" width="100%">
        <TextField multiline rows={4} />
      </Skeleton>

      {/* Submit / cancel */}
      <Stack spacing={2} direction="row">
        <Skeleton variant="rectangular">
          <Button>Cancel</Button>
        </Skeleton>
        <Skeleton variant="rectangular">
          <Button>Create Order</Button>
        </Skeleton>
      </Stack>
    </Stack>
  );
}
