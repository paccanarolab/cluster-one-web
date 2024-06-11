import React from 'react';
import { AppContext } from './AppContext';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MyMenuButton = () => {
    const {
        handleShowMenu,
        showMenu,
    } = React.useContext(AppContext);
    return (
        <IconButton
            onClick={handleShowMenu}
            style={{
                position: 'absolute',
                top: "10px",
                left: showMenu ? "300px" : "10px",
                zIndex: 1000,
            }}
            color="inherit"
        >
            {showMenu ? (
                <ArrowBackIosIcon style={{ fontSize: 20, color: 'white' }} />
            ) : (
                <ArrowForwardIosIcon style={{ fontSize: 20, color: 'black' }} />
            )}
        </IconButton>
    );
};
export { MyMenuButton };
