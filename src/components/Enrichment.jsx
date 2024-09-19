import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { AppContext } from './AppContext';
import { HorizontalBar } from './HorizontalBar';
import "../styles/Enrichment.scss"
import { Backdrop, CircularProgress } from '@mui/material';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const Enrichment = () => {
    const { 
        cyGraph, 
        enrichmentLoading,
        biologicalProcessDataset,
        molecularFunctionDataset,
        cellularComponentDataset,
        enrichmentDataBase,
        openEnrichment,
        setOpenEnrichment,
    } = React.useContext(AppContext);

    const handleClickOpen = () => {
        setOpenEnrichment(true);
    };

    const handleClose = () => {
        setOpenEnrichment(false);
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
                    fontSize: "10px",
                    fontWeight: "bold",
                }}
                className='enrichment-container'
            >
                Enrichment Analysis
            </Button>
            <Dialog
                fullScreen
                maxWidth="lg" // Control the maximum width (set to 'lg', but you can adjust this)
                PaperProps={{
                    style: {
                        margin: 'auto', // Center the dialog
                        width: '80%', // Set dialog width as a percentage of screen (adjust as needed)
                        maxHeight: '95vh', // Limit the dialog's height to 90% of the viewport height
                    },
                }}
                open={openEnrichment}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
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
                            Enrichment Complex #{cyGraph.file_id}
                        </Typography>
                    </Toolbar>
                </AppBar>
                {enrichmentLoading && 
                    <Backdrop
                        sx={
                            { 
                                color: '#fff',
                                zIndex: 1 
                            }
                        }
                        open={enrichmentLoading}
                    >
                        <CircularProgress color="inherit" style={
                            {
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                marginTop: -12,
                                marginLeft: -12,
                            }
                        } />
                        <Typography 
                            variant="h6" 
                            component="div" 
                            sx={
                                { 
                                    paddingTop: 2, 
                                    textAlign: 'center',
                                }
                            }
                            style={
                                {
                                    position: 'absolute',
                                    top: '60%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }
                            }
                        >
                            Waiting for enrichment analysis...
                        </Typography>
                    </Backdrop>
                }
                {enrichmentDataBase && 
                    <List
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                    }}
                >
                    <ListItem
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <ListItemText primary="Biological Process" />
                        {biologicalProcessDataset && (
                            <HorizontalBar dataset={biologicalProcessDataset}/>
                        )}
                    </ListItem>
                    <Divider orientation="horizontal" flexItem />
                    <ListItem
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <ListItemText primary="Molecular Function" />
                        {molecularFunctionDataset && (
                            <HorizontalBar dataset={molecularFunctionDataset}/>
                        )}
                    </ListItem>
                    <Divider orientation="horizontal" flexItem />
                    <ListItem
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <ListItemText primary="Cellular Component" />
                        {cellularComponentDataset && (
                            <HorizontalBar dataset={cellularComponentDataset}/>
                        )}
                    </ListItem>
                </List>}
            </Dialog>
        </div>
    );
}

export { Enrichment };