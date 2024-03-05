import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import axios from "axios";
import AddGuard from './addGuard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

async function addAdvance(event){
  console.log(event);
  var name = event.target.getAttribute("user");
  var id = event.target.getAttribute("user_id");
  if(event.target.nodeName == 'path'){
      name = event.target.parentElement.getAttribute("user");
      id = event.target.parentElement.getAttribute("user_id");
  }
  console.log(name);
  var advance = 100;
  if(name){
      const response = await axios({
          method: 'POST',
          url: "http://localhost:3000/addAdvance",
          data: {
              id,
              advance
          }
        });
      console.log("Marked " + name)
  }
}

async function addAttendance(event){
    console.log(event);
    var name = event.target.getAttribute("user");
    var id = event.target.getAttribute("user_id");
    if(event.target.nodeName == 'path'){
        name = event.target.parentElement.getAttribute("user");
        id = event.target.parentElement.getAttribute("user_id");
    }
    console.log(name);
    if(name){
        const response = await axios({
            method: 'POST',
            url: "http://localhost:3000/markAttendance",
            data: {
                id
            }
          });
        console.log("Marked " + name)
    }
}

async function deleteUser(event){
    console.log(event);
    var name = event.target.getAttribute("user");
    var id = event.target.getAttribute("user_id");
    if(event.target.nodeName == 'path'){
        name = event.target.parentElement.getAttribute("user");
        id = event.target.parentElement.getAttribute("user_id");
    }
    console.log(name);
    if(name){
        const response = await axios({
            method: 'DELETE',
            url: "http://localhost:3000/deleteGuard",
            data: {
                id
            }
          });
        console.log("Deleted " + name);
    }
}

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

const response = await axios({
    method: 'GET',
    url: "http://localhost:3000/guardPage",
  });
const rows = response.data.data;

export default function Guards() {
  return (
    <div>
    <div align="right">
        <AddGuard/>
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Guard name</StyledTableCell>
            <StyledTableCell align="right">Apartment name</StyledTableCell>
            <StyledTableCell align="right">Days present</StyledTableCell>
            <StyledTableCell align="right">Last present</StyledTableCell>
            <StyledTableCell align="right">Give Advance</StyledTableCell>
            <StyledTableCell align="right">Mark Attendance</StyledTableCell>
            <StyledTableCell align="right">Delete Guard</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.apartmentName}</StyledTableCell>
              <StyledTableCell align="right">{row.days}</StyledTableCell>
              <StyledTableCell align="right">{row.lastPresentDay}</StyledTableCell>
              <StyledTableCell align="right"><CurrencyRupeeIcon user_id={row._id} user={row.name} onClick={addAdvance}/></StyledTableCell>
              <StyledTableCell align="right"><PersonAddIcon user_id={row._id} user={row.name} onClick={addAttendance}/></StyledTableCell>
              <StyledTableCell align="right"><PersonRemoveIcon user_id={row._id} user={row.name} onClick={deleteUser}/></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}