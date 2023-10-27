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

const ProteinModal= () => {
  const {
    openProteinInfo,
    proteinInfo,
    setOpenProteinInfo,
    setProteinInfo,
  } = React.useContext(AppContext);

  const handleClose = () => {
    setOpenProteinInfo(false);
    setProteinInfo("");
  };

  const parseData = (data) => {
    let finalDataToShow = [];
    let uniprotData = data.data;
    console.log(uniprotData);
    uniprotData.forEach(
      (element) => {
        finalDataToShow.push(
          <Typography gutterBottom>
            {element}
          </Typography>
        ) 
      }

    );
    return finalDataToShow;
  }
  return (
    <div>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={openProteinInfo}
        >
            <DialogTitle 
              sx={{ m: 1, p: 3 }} 
              id="customized-dialog-title"
            >
              DEVELOP - {proteinInfo.protein ? proteinInfo.protein : "No protein selected"}
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
              { 
                proteinInfo 
                ? 
                  parseData(proteinInfo)
                :
                  <Typography gutterBottom>
                    No data available
                  </Typography>
              }
            </DialogContent>
        </BootstrapDialog>
    </div>
  );
}


export { ProteinModal };
