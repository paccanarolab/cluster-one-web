import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { AppContext } from './AppContext';
import "../styles/AllResultsClusterOne.scss"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AllResultsClusterOne = () => {
    const [open, setOpen] = React.useState(false);
    const { 
        cyGraph,
        setCyGraph,
        cyGraphList,
    } = React.useContext(AppContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeGraph = (event) => {
        setCyGraph(event.target.value);
    };

    return (
        <div>
            <Button 
                variant="outlined"
                onClick={handleClickOpen}
                style={{
                    borderRadius: "20px",
                    backgroundColor: "#323232",
                    color: "white",
                    position: "fixed",
                    left: "30%",
                    bottom: "6%",
                    width: "50%", 
                    height: "5%",
                    fontSize: "15px",
                    fontWeight: "bold",
                }}
                className='resultsContainer'
            >
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >

                {/* Barra superior */}
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar 
                        style={{
                            backgroundColor: "#323232", // un gris que se diferencie del fondo blanco
                            color: "white", // color del texto
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
                            ClusterONE Results
                        </Typography>
                    </Toolbar>
                </AppBar>
                
                {/* here i need a table */}
                
                
            </Dialog>
        </div>
    );
}

export { AllResultsClusterOne };