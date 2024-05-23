import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AppContext } from './AppContext';

const ClusterOneParams = ({classname, message, icon, label}) => {
  const [open, setOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const {
    setClusterOneParams,
    setLoading,
    setLoadingMessage,
    runClusterOneParams,
    ppiId,
    handleShowMenu,
  } = React.useContext(AppContext);

  // Definir estados para los campos del formulario
  const [minSize, setMinSize] = React.useState('');
  const [minDensity, setMinDensity] = React.useState('');
  const [maxOverlap, setMaxOverlap] = React.useState('');
  const [penalty, setPenalty] = React.useState('');


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetParams = () => {
    const formData = {
      minSize,
      minDensity,
      maxOverlap,
      penalty
    };
    setClusterOneParams(formData); // Asumo que quieres setear estos datos al contexto
    setOpen(false);
    setLoadingMessage("Running ClusterONE and storing results... you can go for a coffee ☕️!");
    setLoading(true);
    handleShowMenu();
    runClusterOneParams(ppiId, formData);
  };

  return (
    <div>
      <button
            style={{ marginBottom: "15px", width: "98%", padding: "10px" }}
            className={classname}
            onClick={() => handleClickOpen()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
      >
            <span className={"buttonLabel"}>{label}</span>
            {icon && <i className={icon}></i>}
            {isHovered && <a className={"buttonMessage"}>{message}</a>}
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Set ClusterONE Params </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="minSize"
            label="Min Size"
            type="number"
            fullWidth
            variant="standard"
            value={minSize}
            onChange={e => setMinSize(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="minDensity"
            label="Min Density"
            type="number"
            fullWidth
            variant="standard"
            value={minDensity}
            onChange={e => setMinDensity(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="maxOverlap"
            label="Max Overlap"
            type="number"
            fullWidth
            variant="standard"
            value={maxOverlap}
            onChange={e => setMaxOverlap(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="penalty"
            label="Penalty"
            type="number"
            fullWidth
            variant="standard"
            value={penalty}
            onChange={e => setPenalty(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSetParams}>Run ClusterONE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export { ClusterOneParams }