import { useState } from "react";
import { Button } from "@mui/base";
import axios from "axios";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

var apartmentId = "65e4700d1f2f37bb83d54a29";
async function submit() {
  var boxes = document.querySelectorAll('input[type="checkbox"]');
  var result = [];
  for (var i = 0; i < boxes.length; i++) {
    if(boxes[i].checked){
        result.push(boxes[i].id);
    }
  }
  
  const response = await axios({
    method: "POST",
    url: "http://localhost:3000/markAttendance",
    data: {
      id: result,
      apartmentId: apartmentId
    },
  });
}


const response = await axios({
  method: "POST",
  url: "http://localhost:3000/apartment/guards",
  data: {
    id: apartmentId,
  },
});
const rows = response.data.data;
console.log(rows);
export function MarkAttendancePage() {
  const [marked, setMarked] = useState(false);

  return (
    <>
      <div className="my-5">
        <Button variant="outlined" color="success" onClick={submit}>
          Submit
        </Button>
      </div>
    <div className="my-5">
        <span>Note : Attendance once given can't be removed</span>
    </div>
      <div className="mx-20">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Guard name</StyledTableCell>
                <StyledTableCell align="right">Present</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <input type="checkbox" name={row._id} id={row._id} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
