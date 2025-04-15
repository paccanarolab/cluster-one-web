import * as React from 'react';
import { 
  DataGrid,
  gridClasses, 
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridColumnMenuContainer,
  GridColumnMenuSortItem,
  GridColumnMenuColumnsItem
} from '@mui/x-data-grid';
import { AppContext } from './AppContext';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import Tooltip from '@mui/material/Tooltip';

const CustomToolbar = () => {
  const {
      cyGraph,
  } = React.useContext(AppContext);
  const openLinkInNewTab = () => {
      const url = `https://paccanarolab.org/clusteroneweb/api/v1/api/cluster_one/${cyGraph.code}/csv/?cluster_id=${cyGraph.code}`;
      window.open(url, '_blank');
  }
  return (
    <GridToolbarContainer
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '2 10px',
    }}>
      <GridToolbarFilterButton />
      <Tooltip title="Download all of the results in CSV" arrow>
      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={openLinkInNewTab}
      >
        CSV
      </Button>
      </Tooltip>
    </GridToolbarContainer>
  );
};

const CustomColumnMenu = (props) => {
  const {
    hideMenu,
    colDef,
    ...others
  } = props;

  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      colDef={colDef}
      {...others}
    >
      <GridColumnMenuSortItem onClick={hideMenu} colDef={colDef}/>
      <GridColumnMenuColumnsItem onClick={hideMenu} colDef={colDef} />
    </GridColumnMenuContainer>
  );
};

const ResultsTable = () => {
  const {
    setCyGraph,
    cyGraphList,
    setOpenResults,
    setOpenEnrichment,
    filterModel,
    setFilterModel,
  } = React.useContext(AppContext);
  
  const handleChangeGraph = (params) => {
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

  // Creating the rows
  let rows = [];
  if (cyGraphList.length > 1) {
    cyGraphList.forEach((graph) => {
      let proteins = [];
      let proteins_string = '';
      let overlappingComplexes = [];
      graph.nodes.forEach((protein) => {
        if (protein.data.type === 'protein'){
          proteins.push({
            id: protein.data.id,
            label: protein.data.label,
          });
          proteins_string += protein.data.label + ', ';
        } else if (protein.data.type === 'proteinComplex') {
          let complexFileId = protein.data.label.split('#')[1];
          if (!overlappingComplexes.includes(complexFileId)) {
            overlappingComplexes.push(complexFileId);
          }
        }
      });
      proteins = proteins.sort((a, b) => a.label.localeCompare(b.label));
      overlappingComplexes = overlappingComplexes.sort((a, b) => a - b);
      overlappingComplexes = overlappingComplexes.map((complex) => "#"+complex.toString());
      let row = {
        id: graph.file_id,
        overlapping_complexes: overlappingComplexes,
        size: graph.size,
        density: graph.density,
        quality: graph.quality,
        proteins: proteins,
        proteins_string: proteins_string,
      };
      if (!rows.find((r) => r.id === row.id)) {
        rows.push(row);
      }
    })
  }
  // Order row by id
  rows = rows.sort((a, b) => a.id - b.id);
  const columns = [
    { 
      field: 'id', 
      headerName: 'Complex ID', 
      width: 150,
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
        </div>
      ),
      description: 'Click to see the graph',   
    },
    {
      field: 'overlapping_complexes',
      headerName: 'Overlapping Complexes',
      description: 'This column is not sortable.',
      width: 250,
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
                onClick={() => handleChangeGraph({field: 'id', value: parseInt(complexId.replace('#', ''))})}
              >
                {complexId}
              </span>
              {index !== params.value.length - 1 && ' '}
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
      description: 'This column is not sortable.',
      sortable: false,
      filterable: false,
      width: 380,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', padding: '5px' }}>
          {params.value.map((protein, index) => (
            <React.Fragment key={index}>
              <a 
                href={`https://www.uniprot.org/uniprotkb/${protein.id}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline', color: 'inherit', cursor: 'pointer' }}
              >
                {protein.label}
              </a>
              {index !== params.value.length - 1 && ' '}
            </React.Fragment>
          ))}
        </div>
      ),
    },
    {
      field: 'proteins_string',
      headerName: 'Proteins',
      with:0,
      hide: true,
    }
  ];

  
  return (
        <DataGrid
          rows={rows}
          columns={columns}
          filterModel={filterModel}
          onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
          getRowHeight={() => 'auto'}
          initialState={
            {
              columns: {
                columnVisibilityModel: {
                  proteins_string: false,
                },
              },
            }
          }
          localeText={
            {
              toolbarFilters: 'Filter',
            }
          }
          slots={{
            toolbar: CustomToolbar,
            columnMenu: CustomColumnMenu,
          }}
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
}
export { ResultsTable };