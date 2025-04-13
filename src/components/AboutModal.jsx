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
              About
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
                <h3>
                  ClusterONE
                </h3> Clustering with overlapping neighborhood expansion is an algorithm developed by <a href='https://paccanarolab.org/' target="_blank"> PaccanaroLab </a> that identifies protein complexes in protein-protein interaction networks click <a href="https://www.nature.com/articles/nmeth.1938" target="_blank">HERE</a> to see the paper.
              </Typography>
              <Divider orientation="horizontal" flexItem />
              <Typography gutterBottom>
                <h3>ClusterONE Web</h3> It is a web application that allows users to find protein complexes in a network using ClusterONE, also visualize the results, and perform a functional enrichment analysis of the protein complexes found.
                The official documentation can be found <a href="https://paccanarolab.org/clusteroneweb/doc/cl1web-docs.html" target="_blank">HERE</a> 
              </Typography>
              <Divider orientation="horizontal" flexItem />
              <Typography gutterBottom>
                Developed by: <a href="https://github.com/Mbaez97" target="_blank">Marcelo Baez</a> and <a href="https://github.com/rubjim" target="_blank">Ruben Jimenez</a>
              </Typography>
            </DialogContent>
        </BootstrapDialog>
    </div>
  );
}


export { AboutModal };
