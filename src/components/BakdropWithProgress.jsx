import React, { useState, useEffect } from 'react';
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';

function CircularProgressWithLabel({ value }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress 
        color="inherit" 
        variant="determinate" 
        value={value} 
        size={80} // Increase the size of the circular progress
        thickness={5} // Optionally, you can also adjust the thickness
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography 
          variant="h6" // Increase the size of the text
          component="div" 
          color="textSecondary"
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}


const BackdropWithProgress = ({ showMenu, loadingMessage, progressInterval }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const totalDuration = progressInterval;  // Total duration for the progress bar
    const intervalTime = 100;  // How often to update the progress (in milliseconds)
    const increment = 100 / (totalDuration / intervalTime); // Calculate increment per update

    const interval = setInterval(() => {
        setProgress((prevProgress) => Math.min(prevProgress + increment, 100));
    }, intervalTime);

    return () => {
        clearInterval(interval);
    };
}, [progressInterval]);


  return (
    <Backdrop
      sx={{ 
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1000 
      }}
      open={true}
    >
      {/* Circular progress with label */}
      <CircularProgressWithLabel value={progress} />

      {/* Loading message */}
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
          left: showMenu ? '51.5%' : '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {loadingMessage}
      </Typography>
    </Backdrop>
  );
}

export {BackdropWithProgress};