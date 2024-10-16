import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/lab/Autocomplete';
import TextField from '@mui/material/TextField';
import { AppContext } from './AppContext';
import { ClusterOneParams } from "./ClusterOneParams.jsx";
import { Grid, Divider, Box, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import UploadIcon from '@mui/icons-material/Upload';

const InitialView = ({label, icon, classname }) => {
    const [selectedOrOption, setSelectedOrOption] = React.useState(null);
    const [selectedPPOption, setSelectedPPOption] = React.useState(null);
    const [open, setOpen] = React.useState(true);
    const {
        setPpiId,
        setPpiLabel,
        setIsPpiWeighted,
        ppiList,
        organismList,
        setLoadingMessage,
        setLoading,
        handleShowMenu,
        getPpiByOrganismAndDb,
        quickRunClusterOne,
        setLoadingInterval,
        setOrganismName,
        setGoaFileName,
        loadingIntervalClusterOne,
        uploadFilePpi,
		uploadGoaFile,
        goaFileName,
        ppiId
    } = React.useContext(AppContext);

    const handleSelectionPP = (event, newValue) => {
        if (newValue === null) {
            return;
        }
        setSelectedPPOption(newValue);
        setPpiId(newValue.id);
        setPpiLabel(newValue.name);
        setIsPpiWeighted(newValue.weighted);
    };

    const handleSelectionOR = (event, newValue) => {
        if (newValue === null) {
            return;
        }
        setSelectedOrOption(newValue);
        setOrganismName(newValue.name);
        setGoaFileName(newValue.goa_file_path);
        // console.log("Selected Organism: ", newValue);
        getPpiByOrganismAndDb(newValue.id, -1);
    }

    const handleConfirm = () => {
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleQuickRun = () => {
        setLoadingInterval(loadingIntervalClusterOne);
        setLoadingMessage("Running ClusterONE and rendering the results on screen. The time depends on PPI size. You can go for a coffee 🧬☕️");
        setLoading(true);
        handleShowMenu();
        quickRunClusterOne(selectedPPOption.id, 8000000); 
        handleConfirm();
    }

    return (
        <div>
            <IconButton
                className={classname}
                onClick={handleOpen}
                style={{ marginBottom: "15px" }}
            >
                <MenuIcon style={{ color: 'white' }} />
            </IconButton>
            
            <Dialog 
                open={open} 
                onClose={handleClose}
                PaperProps={{
                    style: { 
                        width: "90%",
                        height: "auto",
                        padding: "20px",
                        maxWidth: "1200px",
                        maxHeight: "150vh",
                        margin: "auto",
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-around',
                    }
                }}
            >
                <DialogTitle style={{ fontSize: "3em", textAlign: "center" }}>Welcome to ClusterONE Web 🧬</DialogTitle>
                <DialogContent style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "20px" }}>
                    <p style={{ fontSize: "1.5em", lineHeight: "1.5em", textAlign: "center" }}>
                        ClusterONE Web is a web-based tool for the identification of protein complexes in protein-protein interaction networks.
                        It is based on the ClusterONE algorithm, which is a graph clustering algorithm that identifies dense regions in networks. 
                        Developed by PaccanaroLab
                    </p>
                    <Divider orientation='horizontal'/>
                    <p style={{ fontSize: "1.2em", lineHeight: "1.2em" }}>
                        Please select an Organism, and a Protein-Protein Interaction from the lists below to proceed, or you can upload your own PPI and if you want to make the functional enrichment analysis, upload your GOA file.
                        Once you have made your selections, you can either run a quick analysis (Using the default parameters) or a full analysis (Setup your parameters) using ClusterONE.
                    </p>
                    <Grid container spacing={2} alignItems="flex-start" style={{ marginTop: "20px" }}>
            {/* Left Column */}
            <Grid item xs={12} sm={6}>
              <Box
                border={1}
                borderColor="grey.300"
                bgcolor="grey.100"
                p={2}
                borderRadius={4}
                height="100%"
              >
                <Typography variant="subtitle1" gutterBottom>
                  Required
                </Typography>
                <Box>
                  {/* First Autocomplete */}
                  <Autocomplete
                    options={organismList}
                    getOptionLabel={(option) => option.name}
                    onChange={handleSelectionOR}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Organism"
                        variant="outlined"
                        margin="none"
                        fullWidth
                      />
                    )}
                    disablePortal
                    disabled={organismList.length === 0}
                  />
                </Box>
                <Box mt={2}>
                  {/* Second Autocomplete */}
                  <Autocomplete
                    options={ppiList}
                    getOptionLabel={(option) => option.name}
                    onChange={handleSelectionPP}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Protein-Protein Interactions"
                        variant="outlined"
                        margin="none"
                        fullWidth
                      />
                    )}
                    disablePortal
                    disabled={ppiList.length === 0}
                  />
                </Box>
              </Box>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} sm={6}>
              <Box
                border={1}
                borderColor="grey.300"
                bgcolor="grey.100"
                p={2}
                borderRadius={4}
                height="100%"
              >
                <Typography variant="subtitle1" gutterBottom>
                  Optional
                </Typography>
                <Box>
                  {/* First Button */}
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={<UploadIcon />}
                    onClick={() => {
                      setOrganismName("");
                      const fileInput = document.createElement('input');
                      fileInput.type = 'file';
                      fileInput.accept = '.csv, .txt';
                      fileInput.onchange = () => uploadFilePpi(fileInput);
                      fileInput.click();
                    }}
                    style={{
                      height: '56px',
                      padding: '0 12px',
                      boxSizing: 'border-box',
                    }}
                  >
                    Load your PPI
                  </Button>
                </Box>
                <Box mt={2}>
                  {/* Second Button */}
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={<UploadIcon />}
                    onClick={() => {
                      const fileInput = document.createElement('input');
                      fileInput.type = 'file';
                      fileInput.accept = '.gaf';
                      fileInput.onchange = () => uploadGoaFile(fileInput);
                      fileInput.click();
                    }}
                    style={{
                      height: '56px',
                      padding: '0 12px',
                      boxSizing: 'border-box',
                    }}
                  >
                    Load your GOA file
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
                </DialogContent>
                <Divider orientation='horizontal'/>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleQuickRun} color='primary' disabled={!selectedPPOption}> 
                        Quick Run ClusterONE
                    </Button>
                    <ClusterOneParams
                        label="Run ClusterONE"
                        onClick={() => handleConfirm()}
                        disabled={!selectedPPOption}
                        initialView={true}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
};

export { InitialView };