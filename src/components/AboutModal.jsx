import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { AppContext } from './AppContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

const AboutModal= () => {
  const {
    openAboutModal,
    setOpenAboutModal,
  } = React.useContext(AppContext);

  const handleClose = () => {
    setOpenAboutModal(false);
  };

  return (
    <div>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={openAboutModal}
        >
            <DialogTitle 
              sx={{ m: 1, p: 3 }} 
              id="customized-dialog-title"
            >
              DEVELOP - ABOUT INFO.............................................
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
              <CloseIcon />
            </IconButton>

            <DialogContent dividers>
              <Typography gutterBottom>
                DEVELOP - ABOUT INFO.............................................
              </Typography>

            </DialogContent>
        </BootstrapDialog>
    </div>
  );
}


export { AboutModal };
