import * as React from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { AppContext } from './AppContext';


const ResultsTable = () => {
  const {
    setCyGraph,
    cyGraphList,
    setOpenResults,
    setOpenEnrichment,
    goaFileName,
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

  const handleShowEnrichment = (params) => {
    console.log("Handle show enrichment", params);
    if (params.field === 'id') {
      let _cyGraph = cyGraphList.find((graph) => graph.file_id === params.value);
      setCyGraph(_cyGraph);
      setOpenResults(false);
      setTimeout(() => {
        setOpenEnrichment(true);
      }, 1000);
    }
  }


  let rows = [];
  // I want to get the rows from the cyGraphlist
  if (cyGraphList.length > 1) {
    cyGraphList.forEach((graph) => {
      let proteins = [];
      let overlappingComplexes = [];
      graph.nodes.forEach((protein) => {
        if (protein.data.type === 'protein'){
          proteins.push(protein.data.label);
        } else if (protein.data.type === 'proteinComplex') {
          let complexFileId = protein.data.label.split('#')[1];
          // I need to make sure this complex is not in the list
          if (!overlappingComplexes.includes(complexFileId)) {
            overlappingComplexes.push(complexFileId);
          }
        }
      });
      // I need to order by alphabet
      proteins = proteins.sort((a, b) => a.localeCompare(b));
      // I need to order by id
      overlappingComplexes = overlappingComplexes.sort((a, b) => a - b);
      // I need all overlappingComplexes to be string
      overlappingComplexes = overlappingComplexes.map((complex) => complex.toString());
      rows.push({
        id: graph.file_id,
        overlapping_complexes: overlappingComplexes,
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
      headerName: 'Complex ID', 
      width: 170,
      renderCell: (params) => (
        <div>
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
            #{params.value}
          </span>
          {/*
            goaFileName !== "" && <span
              style={{
                color: 'blue',
                cursor: 'pointer',
                marginLeft: '10px',
                textDecoration: 'underline',
                alignContent: 'center',
              }}
              onClick={() => handleShowEnrichment(params)}
            >
              Show Enrichment
            </span>
          */} 
        </div>
      ),
      description: 'Click to see the graph',   
    },
    {
      field: 'overlapping_complexes',
      headerName: 'Overlapping Complexes',
      description: 'This column has a value getter and is not sortable.',
      width: 300,
      sortable: false,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', padding: '5px' }}>
          {params.value.map((complexId, index) => (
            <React.Fragment key={index}>
              <span 
                style={
                  {
                    color: 'blue',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }
                }
                onClick={() => handleChangeGraph({field: 'id', value: parseInt(complexId)})}
              >
                {complexId}
              </span>
              {index !== params.value.length - 1 && ', '}
            </React.Fragment>
          ))}
        </div>
      ),
    },
    { 
      field: 'size', 
      headerName: 'Size', 
      width: 100,
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
        <div style={{ whiteSpace: 'normal', padding: '5px' }}>
          {params.value.map((protein, index) => (
            <React.Fragment key={index}>
              <a 
                href={`https://www.uniprot.org/uniprotkb/${protein}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline', color: 'inherit', cursor: 'pointer' }}
              >
                {protein}
              </a>
              {index !== params.value.length - 1 && ' '}
            </React.Fragment>
          ))}
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
          getRowHeight={() => 'auto'}
          sx={{
            '& .MuiDataGrid-cell': {
              fontSize: '1.5rem', // Set the desired font size here
            },
            '& .MuiDataGrid-columnHeaders': {
              fontSize: '1.2rem', // Customize header font size
            },
            [`& .${gridClasses.cell}`]: {
              py: 1,
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