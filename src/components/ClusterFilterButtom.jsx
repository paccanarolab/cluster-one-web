import React from 'react';
import { AppContext } from './AppContext';
import { IconButton, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const ClusterFilterButtom = ({ top, left }) => {
    const { handleShowClusterFilter } = React.useContext(AppContext);
    return (
        <IconButton
            onClick={handleShowClusterFilter}
            style={{
                position: 'absolute',
                top: top,
                left: left,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
            }}
            color="inherit"
        >
            <FilterAltIcon style={{ fontSize: 20, color: 'black' }} />
            <Typography
                variant="body1"
                style={{
                    color: 'black',
                    marginLeft: '5px', // Espacio entre el icono y el texto
                }}
            >
                Complex Filter
            </Typography>
        </IconButton>
    );
};

export { ClusterFilterButtom };
