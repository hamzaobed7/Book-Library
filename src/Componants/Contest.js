import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




export default function DraggableDialog({
  open,
  handleClose,
  handleDelete,
  message,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle id="draggable-dialog-title">
        Delete Confirmation
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {message} ?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button color="error" onClick={handleDelete}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}