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
import DownloadIcon from '@mui/icons-material/Download';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});



const Enrichment = () => {
    const { 
        cyGraph, 
        enrichmentLoading,
        setEnrichmentLoading,
        biologicalProcessDataset,
        molecularFunctionDataset,
        cellularComponentDataset,
        enrichmentDataBase,
        openEnrichment,
        setOpenEnrichment,
        getEnrichmentData,
    } = React.useContext(AppContext);

    const handleClickOpen = () => {
        setEnrichmentLoading(true);
        getEnrichmentData(cyGraph.code)
        setOpenEnrichment(true);
    };

    const handleClose = () => {
        setOpenEnrichment(false);
        setEnrichmentLoading(true);
    };

    const handleDownload = async () => {
        // Select the part of the DOM that contains all the charts
        const element = document.querySelector('.enrichment-chart');
    
        if (element) {
            try {
                // Scroll the entire content into view before capturing it
                element.scrollIntoView();
    
                // Use html2canvas to capture the content as an image
                const canvas = await html2canvas(element, {
                    scrollX: 0,
                    scrollY: -window.scrollY, // Ensure scrolling is adjusted
                    useCORS: true, // To handle cross-origin content, if necessary
                    windowWidth: element.scrollWidth, // Capture the full width of the element
                    windowHeight: element.scrollHeight, // Capture the full height of the element
                });
    
                // Get image data from the canvas
                const imageData = canvas.toDataURL('image/png');
    
                // Create a PDF document using jsPDF
                const pdf = new jsPDF('portrait', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
                // Add the captured image to the PDF
                pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`enrichment_chart_complex_${cyGraph.file_id}.pdf`); // Save the PDF with all the plots
            } catch (error) {
                console.error('Failed to download the charts:', error);
            }
        } else {
            console.error('No charts to download.');
        }
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
                maxWidth="lg" 
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
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleDownload}
                            aria-label="download"
                        >
                            <DownloadIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                
                {/* Enrichment Content */}
                {enrichmentLoading && 
                    <Backdrop
                    sx={{ 
                        color: '#fff',
                        zIndex: 1 
                    }}
                    open={enrichmentLoading}
                    >
                    <CircularProgress color="inherit" style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        marginTop: -12,
                        marginLeft: -12,
                    }} />
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ 
                        paddingTop: 2, 
                        textAlign: 'center',
                        }}
                        style={{
                        position: 'absolute',
                        top: '60%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        }}
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
                    className='enrichment-chart'
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
                    </List>
                }
                </Dialog>
        </div>
    );
}

export { Enrichment };