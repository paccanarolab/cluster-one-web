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
import { LabImage } from "./LabImage.jsx";

const InitialView = ({label, icon, classname }) => {
    const [selectedOrOption, setSelectedOrOption] = React.useState(null);
    const [selectedPPOption, setSelectedPPOption] = React.useState(null);
    const [disabled, setDisabled] = React.useState(true);
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
        fundacionImage,
        royalHollowayImage,
        ppiId,
        initialViewOpen,
        setInitialViewopen,
        setPpiList,
    } = React.useContext(AppContext);

    const handleSelectionPP = (event, newValue) => {
        if (newValue === null) {
            return;
        }
        setSelectedPPOption(newValue);
        setPpiId(newValue.id);
        setPpiLabel(newValue.name);
        setIsPpiWeighted(newValue.weighted);
        setDisabled(false);
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
        quickRunClusterOne(ppiId, 8000000); 
        handleConfirm();
    }

    const handleRunExample = () => {
        // PPI part
        setOrganismName("Saccharomyces cerevisiae");
        setGoaFileName("/app/app/media/enrichment/goa_yeast.gaf");
        setPpiList([
            {
                id: 3,
                name: "collins2007",
                file_name: "collins2007.txt",
                weighted: true,
            },
        ]);
        setPpiId(3);
        setPpiLabel("collins2007");
        setIsPpiWeighted(true);
        // ClusterONE part
        setLoadingMessage("Running ClusterONE and rendering the results on screen. The time depends on PPI size. You can go for a coffee 🧬☕️")       
        setLoading(true);
        // Put a timeout
        setTimeout(() => {
        }, 1000);
        handleShowMenu();
        quickRunClusterOne(3, 8000000);
        handleConfirm();
    }

    React.useEffect(() => {
        ppiId && setDisabled(false);
    }, [ppiId]);

    React.useEffect(() => {
        if (!initialViewOpen) {
            setOpen(false);
        }
    }
    , [initialViewOpen]);

    React.useEffect(() => {
        if (open) {
            setInitialViewopen(true);
        }
    }, [open]);
    
    
    return (
        <div>
            <IconButton
                className={classname}
                onClick={handleOpen}
                // style={{ marginBottom: "15px" }}
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
                <DialogTitle style={{ fontSize: "3em", textAlign: "center" }}>Welcome to ClusterONE Web</DialogTitle>
                {/* FGV Emap*/}
                <LabImage 
                    image={fundacionImage.image}
                    url={fundacionImage.url}
                    classname={fundacionImage.classname}
                />
                {/*Royal Holloway*/}
                <LabImage
                    image={royalHollowayImage.image}
                    url={royalHollowayImage.url}
                    classname={royalHollowayImage.classname}
                />
                <DialogContent style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "20px" }}>
                    <p style={{ fontSize: "1.5em", lineHeight: "1.5em", textAlign: "center" }}>
                        ClusterONE Web is a web-based tool for the identification of protein complexes in protein-protein interaction (PPI) networks.
                        It is based on the ClusterONE algorithm, which is a graph clustering algorithm that identifies dense regions in networks. 
                        Developed by PaccanaroLab
                    </p>
                    <Divider orientation='horizontal'/>
                    <Grid container spacing={2} alignItems="flex-start" style={{ marginTop: "20px" }}>
                        {/* Left Column */}
                        <Grid item xs={12} sm={6}>
                        <Box
                            border={1}
                            borderColor="grey.300"
                            bgcolor="grey.25"
                            p={2}
                            borderRadius={4}
                            height="100%"
                        >
                            <Typography variant="subtitle1" gutterBottom>
                               <strong>Main options.</strong> Please select an organism, and a PPI from the lists below
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
                                    label="PPI Databases"
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
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item xs={8}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Alternatively, you can upload your PPI and run your own experiments. If you want the functional enrichment analysis, upload the corresponding GOA file (this step is optional).
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                    <Box display="flex" flexDirection="column" gap={2} alignItems="center">
                                        <Button
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<UploadIcon />}
                                        onClick={() => {
                                            setOrganismName("");
                                            setGoaFileName("");
                                            const fileInput = document.createElement('input');
                                            fileInput.type = 'file';
                                            fileInput.accept = '.csv, .txt';
                                            fileInput.onchange = () => uploadFilePpi(fileInput);
                                            fileInput.click();
                                        }}
                                        style={{
                                            height: '30px',
                                            width: '90px',
                                        }}
                                        >
                                        PPI
                                        </Button>
                                        <Button
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<UploadIcon />}
                                        onClick={() => {
                                            setGoaFileName("");
                                            const fileInput = document.createElement('input');
                                            fileInput.type = 'file';
                                            fileInput.accept = '.gaf';
                                            fileInput.onchange = () => uploadGoaFile(fileInput);
                                            fileInput.click();
                                        }}
                                        style={{
                                            height: '30px', // Adjusted height for smaller button
                                            width: '90px',
                                        }}
                                        >
                                        GOA
                                        </Button>
                                    </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <Typography variant="subtitle1" gutterBottom>
                    Once you have made your selections, you can either use the "Quick Run" option to use the default parameters, or select "Run ClusterONE" to customize them.
                    </Typography>
                </DialogContent>
                <Divider orientation='horizontal'/>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleRunExample} color='primary'>
                        Quick Run Example
                    </Button>
                    <Button onClick={handleQuickRun} color='primary' disabled={disabled}> 
                        Quick Run ClusterONE
                    </Button>
                    <ClusterOneParams
                        label="Run ClusterONE"
                        onClick={() => handleConfirm()}
                        disabled={disabled}
                        initialView={true}
                    />
                </DialogActions>
                <Typography variant="subtitle1" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
                    This tool is freely accessible to all users, including commercial users.
                    <span style={{ color: "red" }}> We use cookies to improve your experience.</span>
                </Typography>
            </Dialog>
        </div>
    );
};

export { InitialView };