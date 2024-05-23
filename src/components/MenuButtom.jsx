import React from 'react';
import { AppContext } from './AppContext';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

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
                top: '10px',
                left: '10px',
                zIndex: 1000,
            }}
            color="inherit"
        >
            <MenuIcon style={{ fontSize: 20, color: showMenu ? 'white' : 'black' }} />
        </IconButton>
    );
};
export { MyMenuButton };
