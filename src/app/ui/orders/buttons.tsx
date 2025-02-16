"use client";

import * as React from "react";
import { deleteOrder } from "@/app/lib/actions";
import { Delete } from "@mui/icons-material";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export function DeleteInvoice({ id }: { id: string }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const deleteOrderWithId = deleteOrder.bind(null, id);
    deleteOrderWithId();
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} aria-label="delete">
        <Delete color="warning" />
      </IconButton>

      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this order? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <form action={() => handleDelete()}>
            <Button type="submit" color="warning">
              Delete
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </>
  );
}
