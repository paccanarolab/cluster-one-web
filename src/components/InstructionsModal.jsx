import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { AppContext } from './AppContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

const InstructionsModal= () => {
  const {
    openAboutModalInstruction,
    setOpenAboutModalInstruction,
  } = React.useContext(AppContext);

  const handleClose = () => {
    setOpenAboutModalInstruction(false);
  };

  return (
    <div>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={openAboutModalInstruction}
        >
            <DialogTitle 
              sx={{ m: 1, p: 3 }} 
              id="customized-dialog-title"
            >
              Quick Help
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
                <ul>
                  <li>
                      <b>Double click on Complex: </b> you can go to the corresponding graph
                  </li>
                  <li>
                      <b>Double click on Protein: </b> open a new tab with the corresponding UniProt page
                  </li>
                  <li>
                      <b>Single click on Protein: </b> highlights the protein and its interactions
                  </li>
                  <li>
                      <b>Single click on Background: </b> Resets all edges and nodes
                  </li>
                </ul>
              </Typography>
            </DialogContent>
        </BootstrapDialog>
    </div>
  );
}


export { InstructionsModal };
