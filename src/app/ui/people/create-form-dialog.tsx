import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import Form from "./create-form";

export default function FormDialog({ cancelHref }: { cancelHref: string }) {
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
        <DialogContent>
          <Form cancelHref={cancelHref} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
