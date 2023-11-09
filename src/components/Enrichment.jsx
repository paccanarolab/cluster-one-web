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
    } = React.useContext(AppContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button 
                variant="outlined"
                onClick={handleClickOpen}
                style={{
                    borderRadius: "20px", // bordes redondeados
                    backgroundColor: "#323232", // un gris que se diferencie del fondo blanco
                    color: "white", // color del texto
                    position: "fixed", // para posicionarlo en la esquina inferior izquierda
                    left: "30%", // separado un 30% del margen izquierdo de la pantalla
                    bottom: "6%", // un pequeño margen desde el fondo para que no esté directamente en el borde
                    width: "50%", // ancho del botón
                    height: "5%", // alto del botón
                    fontSize: "15px", // tamaño de la letra
                    fontWeight: "bold", // negrita
                }}
                className='enrichmentContainer'
            >
                Enrichment Analysis COMPLEX - {cyGraph.code}
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
                            COMPLEX - {cyGraph.code}
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
                <List>
                    <ListItem>
                        <ListItemText primary="Biological Process"/>
                        {
                            biologicalProcessDataset && 
                            <HorizontalBar 
                                dataset={biologicalProcessDataset}
                            />
                        }
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText
                        primary="Molecular Function"
                        />
                        {
                            molecularFunctionDataset && 
                            <HorizontalBar 
                                dataset={molecularFunctionDataset}
                            />
                        }
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText
                        primary="Cellular Component"
                        />
                        {
                            cellularComponentDataset &&  
                            <HorizontalBar 
                                dataset={cellularComponentDataset}
                            />
                        }
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}

export { Enrichment };