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
        organismName,
        ppiLabel,
        clusterOneParams,
    } = React.useContext(AppContext);

    const handleClickOpen = () => {
        setEnrichmentLoading(true);
        getEnrichmentData(cyGraph.code);
        setOpenEnrichment(true);
    };

    const handleClose = () => {
        setOpenEnrichment(false);
        setEnrichmentLoading(true);
    };

    const handleDownload = async () => {
        const element = document.querySelector('.enrichment-chart');
        if (element) {
            try {
                element.scrollIntoView();
                const canvas = await html2canvas(element, {
                    scrollX: 0,
                    scrollY: -window.scrollY,
                    useCORS: true,
                    windowWidth: element.scrollWidth,
                    windowHeight: element.scrollHeight,
                });
                const imageData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('portrait', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.setFontSize(10);
                pdf.text(`Enrichment Analysis Report - Complex ${cyGraph.file_id}`, 10, 10);
                pdf.text(`Organism: ${organismName}`, 10, 15);
                pdf.text(`PPI: ${ppiLabel}`, 10, 20);
                pdf.text("ClusterONE Params: ", 10, 30);
                pdf.text(`- Min. Density: ${clusterOneParams.minDensity || 0.3}`, 10, 35);
                pdf.text(`- Min. Size: ${clusterOneParams.minSize || 3}`, 10, 40);
                pdf.text(`- Max. Overlap: ${clusterOneParams.maxOverlap}`, 10, 45);
                pdf.text(`- Penalty: ${clusterOneParams.penalty}`, 10, 50);
                pdf.text("GOA File Version: 2024-10-21", 10, 60);
                pdf.addImage(imageData, 'PNG', 10, 65, pdfWidth, pdfHeight);
                pdf.save(`enrichment_chart_complex_${cyGraph.file_id}.pdf`);
            } catch (error) {
                console.error('Failed to download the charts:', error);
            }
        } else {
            console.error('No charts to download.');
        }
    };

    // Helper function to render either a HorizontalBar or a message if empty
    const renderContent = (dataset) => {
        if (dataset.length === 1 && dataset[0].go_id === "No overrepresented terms") {
            return <Typography variant="body1" style={{ color: 'red' }}>No Overrepresented Terms</Typography>;
        }
        return <HorizontalBar dataset={dataset} />;
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
                        margin: 'auto',
                        width: '80%',
                        maxHeight: '95vh',
                    },
                }}
                open={openEnrichment}
                onClose={handleClose}
                TransitionComponent={Transition}
                >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar style={{ backgroundColor: "#323232", color: "white" }}>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Enrichment Complex #{cyGraph.file_id} (Only top-20 GO terms show)
                        </Typography>
                        <IconButton edge="end" color="inherit" onClick={handleDownload} aria-label="download">
                            <DownloadIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {enrichmentLoading && (
                    <Backdrop
                        sx={{ 
                            color: '#fff',
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                            position: 'fixed',  // Ensures it covers the entire screen
                        }}
                        open={enrichmentLoading}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit" style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-20px',
                            marginLeft: '-20px',
                        }}/>
                        <Typography 
                            variant="h6" 
                            component="div" 
                            sx={{ mt: 2, textAlign: 'center' }}
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
                )}
                {/* Enrichment Content */}
                {enrichmentDataBase && (
                        <List style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }} className='enrichment-chart'>
                            <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <ListItemText primary="Biological Process" />
                                {renderContent(biologicalProcessDataset)}
                            </ListItem>
                            <Divider orientation="horizontal" flexItem />
                            <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <ListItemText primary="Molecular Function" />
                                {renderContent(molecularFunctionDataset)}
                            </ListItem>
                            <Divider orientation="horizontal" flexItem />
                            <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <ListItemText primary="Cellular Component" />
                                {renderContent(cellularComponentDataset)}
                            </ListItem>
                        </List>
                )}
                
            </Dialog>
        </div>
    );
}

export { Enrichment };