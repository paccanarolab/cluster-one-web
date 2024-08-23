import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AppContext } from './AppContext';


const ResultsTable = () => {
  const {
    setCyGraph,
    cyGraphList,
    setOpenResults,
    filterModel,
    setFilterModel,
  } = React.useContext(AppContext);
  
  const handleChangeGraph = (params) => {
    console.log("Handle change", params);
    if (params.field === 'id') {
      let _cyGraph = cyGraphList.find((graph) => graph.file_id === params.value);
      setCyGraph(_cyGraph);
      setOpenResults(false);
    }
  };

  let rows = [];
  // I want to get the rows from the cyGraphlist
  if (cyGraphList.length > 1) {
    cyGraphList.forEach((graph) => {
      let proteins = [];
      graph.nodes.forEach((protein) => {
        if (protein.data.type === 'protein'){
          proteins.push(protein.data.label);
        }
      });
      // I need to order by alphabet
      proteins = proteins.sort((a, b) => a.localeCompare(b));
      rows.push({
        id: graph.file_id,
        size: graph.size,
        density: graph.density,
        quality: graph.quality,
        proteins: proteins,
      });
    })
  }
  // Order row by id
  rows = rows.sort((a, b) => a.id - b.id);
  const columns = [
    { 
      field: 'id', 
      headerName: 'Cluster ID', 
      width: 100,
      renderCell: (params) => (
        <span 
          style={
            {
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
            }
          } 
          onClick={() => handleChangeGraph(params)}
        >
          {params.value}
        </span>
      ),
      description: 'Click to see the graph',
      
    },
    { 
      field: 'size', 
      headerName: 'Size', 
      width: 150,
      type: 'number',
    },
    { 
      field: 'density', 
      headerName: 'Density', 
      width: 150,
      type: 'number',
    },
    {
      field: 'quality',
      headerName: 'Cohesiveness',
      type: 'number',
      width: 150,
    },
    {
      field: 'proteins',
      headerName: 'Proteins',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: "100%",
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', height: '100px', padding: '5px' }}>
          {params.value.join(', ')}
        </div>
      ),
    }
  ];

  return (
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination={false}
          sx={{
            '& .MuiDataGrid-cell': {
              fontSize: '1.2rem', // Set the desired font size here
            },
            '& .MuiDataGrid-columnHeaders': {
              fontSize: '1.2rem', // Customize header font size
            },
          }}
          // filterModel={filterModel}
          // onFilterModelChange={(newFilterModel) => {
          //   setFilterModel(newFilterModel);
          // }}
        />
      </div>
  );
}
export { ResultsTable };