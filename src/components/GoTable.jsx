import * as React from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { AppContext } from './AppContext';

const GoTable = () => {
  const {
    setCyGraph,
    cyGraphList,
    setOpenGoSearch,
    goTermComplexes,
    filterModelGo,
    setFilterModelGo,
  } = React.useContext(AppContext);

  const handleChangeGraph = (params) => {
    console.log("Handle change", params);
    if (params.field === 'id') {
      const _cyGraph = cyGraphList.find((graph) => graph.file_id === params.value);
      if (_cyGraph) {
        setCyGraph(_cyGraph);
        setOpenGoSearch(false);
      }
    }
  };

  const handleOpenGoTerm = (params) => {
    console.log("Handle open", params);
    if (params.field === 'id') {
      window.open(`https://www.ebi.ac.uk/QuickGO/GTerm?id=${params.value}`, '_blank');
    }
  };

  // Build rows from goTermComplexes, ensuring only strings or numbers in each row field
  const rows = goTermComplexes.map((graph) => ({
    id: graph.go_term.toString(),  // Make sure `id` is a string
    complexes: graph.complexes.map((complex) => complex.file_id.toString()),  // Ensure complexes are strings
  }));

  const columns = [
    { 
      field: 'id', 
      headerName: 'GO TERM', 
      width: 170,
      renderCell: (params) => (
        <div>
          <span 
            style={{
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
            }} 
            onClick={() => handleOpenGoTerm(params)}
          >
            {params.value} {/* Render id value directly */}
          </span>
        </div>
      ),
      description: 'Click to see more information about the GO term',   
    },
    {
      field: 'complexes',
      headerName: 'Complexes',
      description: 'This column has a value getter and is not sortable.',
      width: 1000,
      sortable: false,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', padding: '5px' }}>
          {params.value.map((complexId, index) => (
            <React.Fragment key={complexId}> {/* Ensure each complexId is used as a key */}
              <span 
                style={{
                  color: 'blue',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() => handleChangeGraph({field: 'id', value: parseInt(complexId)})}
              >
                {complexId} {/* Render complexId directly */}
              </span>
              {index !== params.value.length - 1 && ', '}
            </React.Fragment>
          ))}
        </div>
      ),
    },
  ];

  return (
      <DataGrid
        rows={rows}
        columns={columns}
        filterModel={filterModelGo}
        onFilterModelChange={(newFilterModel) => setFilterModelGo(newFilterModel)}
        getRowHeight={() => 'auto'}
        sx={{
          '& .MuiDataGrid-cell': {
            fontSize: '1.5rem',
          },
          '& .MuiDataGrid-columnHeaders': {
            fontSize: '1.2rem',
          },
          [`& .${gridClasses.cell}`]: {
            py: 1,
          },
        }}
      />
  );
};

export { GoTable };