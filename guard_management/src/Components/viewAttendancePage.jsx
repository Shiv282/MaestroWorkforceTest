
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

  const response = await axios({
    method: "POST",
    url: "http://localhost:3000/apartment/guards",
    data: {
      id: apartmentId,
    },
  });
  const rows = response.data.data;
  console.log(rows);
  var presentDate = new Date().toDateString();

  export function ViewAttendancePage(){
    return (
        <>  
            <div className="mx-20">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Guard name</StyledTableCell>
                <StyledTableCell align="right">Day Present</StyledTableCell>
                <StyledTableCell align="right">Night Present</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {(presentDate==row.lastPresentDay)?(<span>Yes</span>):(<span>No</span>)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {(presentDate==row.lastPresentNight)?(<span>Yes</span>):(<span>No</span>)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
        </>
    )
  }