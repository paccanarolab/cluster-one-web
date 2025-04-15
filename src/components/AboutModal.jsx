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
              id="customized-dialog-title"
            >
              <Typography variant="h4" component="h2">
                About
              </Typography>
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
                <h3>ClusterONE</h3> 
                ClusterONE (Clustering with Overlapping Neighborhood Expansion) is an algorithm
                developed by <a href='https://paccanarolab.org/' target="_blank"> PaccanaroLab </a>  for detecting protein complexes in protein-protein interaction
                networks. For details, see:  <a href="https://www.nature.com/articles/nmeth.1938" target="_blank">Nepusz, Yu, Paccanaro, Nature Methods (2012)</a>
              </Typography>
              <Divider orientation="horizontal" flexItem />
              <Typography gutterBottom>
                <h3>ClusterONE Web</h3> 
                ClusterONE Web is a web application that allows users to identify protein complexes in a
                network using the ClusterONE algorithm, visualize the results interactively, and perform
                functional enrichment analysis on the detected complexes. The official documentation is
                available <a href="https://paccanarolab.org/clusteroneweb/doc/cl1web-docs.html" target="_blank">HERE</a>.
              </Typography>
              <Typography gutterBottom>
                <h3>Database version information: </h3> 
                <ul>
                  <li>
                    <b>GOA files:</b> 2025-03-08
                  </li>
                  <li>
                    <b>BioGRID:</b> 4.4.237
                  </li>
                  <li>
                    <b>IntAct, MINT, and DIP:</b> downloaded in September 2024
                  </li>
                </ul>
              </Typography>
              <Divider orientation="horizontal" flexItem />
              <Typography gutterBottom sx={{ mt: 2 }}>
                <h3>Developed by:</h3>
                <a href="https://github.com/Mbaez97" target="_blank">Marcelo Baez</a> and <a href="https://www.linkedin.com/in/ruben-jimenez-franco/" target="_blank">Ruben Jimenez</a>
              </Typography>
            </DialogContent>
        </BootstrapDialog>
    </div>
  );
}


export { AboutModal };
