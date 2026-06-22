import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




export default function SendRequest({
  open,
  handleClose,
  handleRequest,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle id="draggable-dialog-title">
       Send Reqeust Book
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure to you want send Request ?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button color="success" onClick={handleRequest}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}