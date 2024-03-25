import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AppContext } from './AppContext';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HelpIcon from '@mui/icons-material/Help';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableCell3 = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 11,
    },
    width: '100%',
    alignContent: 'center',
  }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, bp, mf, cc, ) {
    return { name, bp, mf, cc };
  }
const ScoreTable = () => {
    const { 
        oraScore, 
        ppiLabel 
    } = React.useContext(AppContext);

    const rows = [
        createData(ppiLabel, oraScore.ora_bp_score, oraScore.ora_mf_score, oraScore.ora_cc_score),
    ];
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell3>
                        ORA Score
                    </StyledTableCell3>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>
                        <Tooltip 
                            // {title="Análisis de Overrepresentation (ORA) de Complejos Proteicos en Redes PPI: Relación de resultados con las Funciones Biológicas, Funciones Moleculares y Componentes Celulares del GO (Gene Ontology)"}
                            title="Proportion of complexes that are overrepresented in any of the three Gene Ontology (GO) domains: Biological Functions (BP), Molecular Functions (MF), and Cellular Components (CC)."
                            arrow placement="top" 
                            enterTouchDelay={50} 
                            leaveTouchDelay={3000}
                        >
                            <IconButton
                                style={
                                    { 
                                        color: '#757575', 
                                        fontSize: '.5rem', 
                                        transition: 'color 0.3s ease-out' 
                                    }
                                }
                            >
                                <HelpIcon />
                            </IconButton>
                        </Tooltip>
                    </StyledTableCell>

                </TableRow>
                <TableRow>
                    <StyledTableCell>PPI</StyledTableCell>
                    <StyledTableCell align="right">BP</StyledTableCell>
                    <StyledTableCell align="right">MF</StyledTableCell>
                    <StyledTableCell align="right">CC</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.bp}</StyledTableCell>
                            <StyledTableCell align="right">{row.mf}</StyledTableCell>
                            <StyledTableCell align="right">{row.cc}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
  );
}

export { ScoreTable };
