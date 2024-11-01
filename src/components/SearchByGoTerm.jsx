import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search'
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { AppContext } from './AppContext';
import { GoTable } from './GoTable.jsx';
import "../styles/AllResultsClusterOne.scss"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const SearchByGoTerm = () => {
    const { 
        openGoSeach,
        setOpenGoSearch,
        executionParams,
        getGoTermComplexesByParams,
        goTermComplexes,
    } = React.useContext(AppContext);

    const handleClickOpen = () => {
        setOpenGoSearch(true);
        console.log("Execution params", executionParams);
        getGoTermComplexesByParams(executionParams);
    };

    const handleClose = () => {
        setOpenGoSearch(false);
    };

    

    return (
        <div>
            <button 
                className="searchButton"
                onClick={handleClickOpen}    
            >
                <SearchIcon style={{ fontSize: '1.2cm', color: 'black' }} />
                Search by GO term
            </button>
            <Dialog
                open={openGoSeach}
                onClose={handleClose}
                // TransitionComponent={Transition}
                fullScreen={false}
                PaperProps={{
                    style: {
                        width: "100%",
                        height: "90%",
                        maxWidth: "1200px",
                        maxHeight: "150vh",
                        padding: "20px",
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
                            Search complex by GO term
                        </Typography>
                    </Toolbar>
                </AppBar>
                {goTermComplexes.length > 0 ? <GoTable/>  : <Typography variant="body1" style={{ color: 'red' }}>No GO terms found found</Typography>}
                
            </Dialog>
        </div>
    );
}

export { SearchByGoTerm };