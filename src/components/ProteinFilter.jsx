import React from 'react';
import { AppContext } from './AppContext.jsx';
import { TextField, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ProteinFilter = () => {
  const {
    complexProteinList,
    showComplexList,
    setProteinId,
  } = React.useContext(AppContext);

  const [proteinId, setLocalProteinId] = React.useState('');

  const handleProteinChange = (event) => {
    const selectedProteinId = event.target.value;
    if (selectedProteinId === '0') {
      return;
    }
    setLocalProteinId(selectedProteinId);
    setProteinId(selectedProteinId);
  };

  return (
    <TextField
      select
      variant="outlined"
      size="small"
      label="Complex Proteins"
      value={proteinId}
      onChange={handleProteinChange}
      style={{
        width: '200px',
        zIndex: 1100,
        position: 'relative',
        backgroundColor: '#444444', // Darker input background
        borderRadius: '5px',
      }}
      InputProps={{
        startAdornment: (
          <SearchIcon style={{ marginRight: '8px', color: '#FFFFFF' }} />
        ),
        style: {
          color: '#FFFFFF', // White text inside the input
        },
      }}
      InputLabelProps={{
        style: { color: '#FFFFFF' }, // White label text
      }}
    >
      <MenuItem value="" disabled>
        Select Protein
      </MenuItem>
      {showComplexList ? (
        complexProteinList.map((protein) => (
          <MenuItem value={protein.id} key={protein.id}>
            {protein.name}
          </MenuItem>
        ))
      ) : (
        <MenuItem value="0" disabled>
          NO PROTEINS
        </MenuItem>
      )}
    </TextField>
  );
};

export { ProteinFilter };
