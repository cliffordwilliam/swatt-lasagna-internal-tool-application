import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import Form from "./create-form";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function FormDialog({ isInDialog }: { isInDialog: boolean }) {
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
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle>Create People</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <Form isInDialog={isInDialog} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
