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
import "../styles/ExecuteBar.scss";
import { Divider } from '@mui/material';

const InitialView = ({label, icon, onClickFunction, classname, message }) => {
    const [selectedDbOption, setSelectedDbOption] = React.useState(null);
    const [selectedOrOption, setSelectedOrOption] = React.useState(null);
    const [selectedPPOption, setSelectedPPOption] = React.useState(null);
    const [open, setOpen] = React.useState(true);
    const {
        setPpiId,
        setPpiLabel,
        setIsPpiWeighted,
        ppiList,
        dbList,
        organismList,
        setLoadingMessage,
        setLoading,
        handleShowMenu,
        getPpiByOrganismAndDb,
        quickRunClusterOne,
        setLoadingInterval,
        setOrganismName,
        loadingIntervalClusterOne,
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
        quickRunClusterOne(selectedPPOption.id, 800000); 
        handleConfirm();
    }

    return (
        <div>
            <button 
                style={{ marginBottom: "15px", width: "98%", padding: "10px" }}
                className={classname}
                onClick={handleOpen}
            >
                <span className={"buttonLabel"}>{label}</span>
                {icon && <i className={icon}></i>}
            </button>
            
            <Dialog 
                open={open} 
                onClose={handleClose}
                PaperProps={{
                    style: { 
                        width: "90%",
                        height: "auto",
                        padding: "20px",
                        maxWidth: "1200px",
                        maxHeight: "90vh",
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
                        Please select an Organism, and a Protein-Protein Interaction from the lists below to proceed.
                        Once you have made your selections, you can either run a quick analysis (Using the default parameters) or a full analysis (Setup your parameters) using ClusterONE.
                    </p>
                    <Autocomplete
                        options={organismList}
                        getOptionLabel={(option) => option.name}
                        style={{ width: "100%", marginBottom: "20px" }}
                        onChange={handleSelectionOR}
                        renderInput={(params) => <TextField {...params} label="Organism" variant="outlined" />}
                        disablePortal
                        color="primary"
                        disabled={organismList.length === 0}
                    />
                    <Autocomplete
                        options={ppiList}
                        getOptionLabel={(option) => option.name}
                        style={{ width: "100%", marginBottom: "150px" }}
                        onChange={handleSelectionPP}
                        renderInput={(params) => <TextField {...params} label="Protein-Protein Interactions" variant="outlined" />}
                        disablePortal
                        color="primary"
                        disabled={ppiList.length === 0}
                    />
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