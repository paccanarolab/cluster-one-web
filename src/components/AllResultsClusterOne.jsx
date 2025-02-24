import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { AppContext } from './AppContext';
import { ResultsTable } from './ResultsTable.jsx';
import "../styles/AllResultsClusterOne.scss"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const AllResultsClusterOne = () => {
    const { 
        ppiLabel,
        openResults,
        setOpenResults,
    } = React.useContext(AppContext);

    const handleClickOpen = () => {
        setOpenResults(true);
    };

    const handleClose = () => {
        setOpenResults(false);
    };

    

    return (
        <div>
            <button 
                className="resultButton"
                onClick={handleClickOpen}    
            >
                <ArrowBackIosNewIcon style={{ fontSize: '1.2cm', color: 'black' }} />
                <span>All Results</span>
            </button>
            <Dialog
                open={openResults}
                onClose={handleClose}
                TransitionComponent={Transition}
                fullScreen={true}
                PaperProps={{
                    style: { 
                        overflow: "hidden",
                    }
                }}
            >
                {/* Barra superior */}
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar 
                        style={{
                            backgroundColor: "#323232",
                            color: "white",
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            ClusterONE Results - {ppiLabel}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <ResultsTable/>
            </Dialog>
        </div>
    );
}

export { AllResultsClusterOne };