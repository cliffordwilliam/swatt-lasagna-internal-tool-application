import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/material";
import Form from "./create-form";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add People
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create People</DialogTitle>
        <DialogContent>
          <Form />
        </DialogContent>
        <DialogActions>
          <Stack spacing={2} direction="row">
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
