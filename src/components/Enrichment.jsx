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
  return <Slide direction="up" ref={ref} {...props} />;
});

const Enrichment = () => {
    const [open, setOpen] = React.useState(false);
    const { 
        cyGraph, 
        enrichmentLoading,
        biologicalProcessDataset,
        molecularFunctionDataset,
        cellularComponentDataset,
        enrichmentDataBase,
    } = React.useContext(AppContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const listItemStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '3.052rem',
        fontWeight: 'bold',
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
                className='enrichmentContainer'
            >
                Enrichment Analysis COMPLEX - {cyGraph.file_id}
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
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
                            COMPLEX - {cyGraph.file_id}
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
                                    left: '51.5%',
                                    transform: 'translate(-50%, -50%)',
                                }
                            }
                        >
                            Waiting for enrichment analysis...
                        </Typography>
                    </Backdrop>
                }
                {enrichmentDataBase && <List
                    style={
                        {
                            width: '100%',
                        }
                    }
                >
                    <ListItem 
                        style={
                            {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%',
                            }
                        }
                    >
                        <ListItemText 
                            primary="Biological Process"
                        />
                        {
                            biologicalProcessDataset && 
                            <HorizontalBar 
                                dataset={biologicalProcessDataset}
                                height={biologicalProcessDataset.length * 50}
                            />
                        }
                    </ListItem>
                    <Divider />
                    <ListItem 
                        style={
                            {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%',
                            }
                        }
                    >
                        <ListItemText
                            primary="Molecular Function"
                        />
                        {
                            molecularFunctionDataset && 
                            <HorizontalBar 
                                dataset={molecularFunctionDataset}
                                height={molecularFunctionDataset.length * 80}
                            />
                        }
                    </ListItem>
                    <Divider />
                    <ListItem 
                        style={
                            {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%',
                            }
                        }
                    >
                        <ListItemText
                            primary="Cellular Component"
                        />
                        {
                            cellularComponentDataset &&  
                            <HorizontalBar 
                                dataset={cellularComponentDataset}
                                height={cellularComponentDataset.length * 50}
                            />
                        }
                    </ListItem>
                </List>}
            </Dialog>
        </div>
    );
}

export { Enrichment };