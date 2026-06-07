import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
export default function SimpleSnackbar({
  message,
  open,
  handleClose,
  color
}) {

  const action = (
    <React.Fragment>
      <Button
        color="secondary"
        size="small"
        onClick={handleClose}
      >
        UNDO
      </Button>

      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
 <Alert
        onClose={handleClose}
        variant="filled"
        severity={color??"success"}
        sx={{
          width: "auto",
          height:"80px",
          fontSize: "25px",
          textAlign:"center",
          fontWeight: "500",
        }}
      >
        {message}
      </Alert>
      </Snackbar>

    </div>
  );
}