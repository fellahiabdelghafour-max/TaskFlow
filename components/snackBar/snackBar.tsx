'use client'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSnackBar } from '../../context/snackBarContext';
import { info } from 'console';

export default function SnackBar() {
  const snackBarContext = useSnackBar();
  if(!snackBarContext) return;
  const {open,setOpen,message,type} = snackBarContext;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const BG = type ==='success'?'#9bffa7' : type === 'info' ? '#9be4ff' : '#ff9b9b';
  const color = type ==='success'?'#00c22d' : type === 'info' ? '#009dff' : '#ff0000';


  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
        <Alert
          onClose={handleClose}
          variant="filled"
          sx={{ width: '100%' ,bgcolor:BG , color:color , border:`solid ${color}`, borderRadius:'10px'}}
        >
         {message}
        </Alert>
      </Snackbar>
    </div>
  );
}