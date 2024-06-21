import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/lab/Autocomplete';
import TextField from '@mui/material/TextField';
import { AppContext } from './AppContext';

const SelectPPiOptions = ({ open, handleClose, label, icon, onClickFunction, classname, message }) => {
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [isHovered, setIsHovered] = React.useState(false);
    const {
        setPpiId,
        setPpiLabel,
        ppiList,
        setIsPpiWeighted,
    } = React.useContext(AppContext);
    

    const handleSelection = (event, newValue) => {
        setSelectedOption(newValue);
    };

    const handleConfirm = () => {
        console.log(selectedOption);
        setPpiId(selectedOption.id);
        setPpiLabel(selectedOption.name);
        setIsPpiWeighted(selectedOption.weighted);

        handleClose();
    };

    return (
        <div>
            <button 
                style={{ marginBottom: "15px", width: "98%", padding: "10px" }}
                className={classname}
                onClick={() => onClickFunction()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <span className={"buttonLabel"}>{label}</span>
                {icon && <i className={icon}></i>}
                {isHovered && <a className={"buttonMessage"}>{message}</a>}
            </button>
            
            <Dialog 
                open={open} 
                onClose={handleClose}
            >
                <DialogTitle>Select a PPI</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        options={ppiList}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 500, height: 500, marginTop: 20}}
                        onChange={handleSelection}
                        renderInput={(params) => <TextField {...params} label="Protein Protein Interactions" variant="outlined" />}
                        disablePortal
                        color="primary"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export { SelectPPiOptions };
