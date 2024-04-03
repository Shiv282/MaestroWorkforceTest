import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddApartment from "./addApartment"
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const response = await axios({
    method: 'GET',
    url: "http://localhost:3000/apartments",
  });
const rows = response.data.data;

export default function Appartments() {
  return (
    <div>
    <div align="right">
        <AddApartment/>
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Appartment name</StyledTableCell>
            <StyledTableCell align="right">Supervisor name</StyledTableCell>
            <StyledTableCell align="right">Number of Guards</StyledTableCell>
            <StyledTableCell align="right">Number of Supervisors</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.apartmentName}>
              <StyledTableCell component="th" scope="row">
                {row.apartmentName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.supervisorName}</StyledTableCell>
              <StyledTableCell align="right">{row.guardCount}</StyledTableCell>
              <StyledTableCell align="right">{row.supervisorCount}</StyledTableCell>
              <StyledTableCell align="right">{row.location}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}