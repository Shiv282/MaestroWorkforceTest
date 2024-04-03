import axios from "axios";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {makeStyles} from "@mui/styles"
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    maxHeight: 400, // Adjust the max height as needed
    overflowY: "auto",
  },
}));

function getDate(dateString){
    const date = new Date(dateString);
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;
return formattedDate;
}
var id = "65fee3661c1f80414d2c2fab";
console.log(id);
const response = await axios({
  method: "POST",
  url: "http://localhost:3000/getGuard",
  data: {
    id: "65fee3661c1f80414d2c2fab",
  },
});
console.log(response.data.guard[0]);
const val = response.data.guard;
var advanceData = [];
var dutyData = [];

async function updatePopUp(){
    var advanceHistory = val[0].advanceHistory;
    for(var i=0;i<advanceHistory.length;i++){
        var advanceId = advanceHistory[i];
        console.log(advanceId);
        const response = await axios({
            method: "POST",
            url: "http://localhost:3000/getAdvance",
            data: {
              id: advanceId,
            },
          });
        advanceData.push(response.data.advanceData);
    }
}

async function updatePopUp2(){
    const response = await axios({
        method: "POST",
        url: "http://localhost:3000/dutyHistory",
        data: {
          id,
        },
      });
    dutyData = response.data.AttendanceHistory;
}

export function GuardPage() {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleOpen = async () => {
    advanceData = [];
    await updatePopUp()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen2 = async () => {
    await updatePopUp2();
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };


  return (
    <>
      <h1 className="text-3xl">Guard Page </h1>
      <div>
        <h2> Name : {val[0].name}</h2>
        <h2> Salary : {val[0].salary}</h2>
        <h2> Apartment Name : {val[0].apartmentName}</h2>
        <h2> Advance : {val[0].advance}</h2>
        <h2> Days : {val[0].days}</h2>
        <h2> Nights : {val[0].nights}</h2>
      </div>
      <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
      Advance History
      </Button>
      <Dialog open={open} onClose={handleClose} scroll="paper">
        <DialogTitle>Advance History</DialogTitle>
        <DialogContent dividers className={classes.dialogContent}>
          {/* Add your scrollable content here */console.log(advanceData)}
          {
            advanceData.map((advance)=>(
                <p key={advance[0]._id}>Amount : {advance[0].amount} Date : {getDate(advance[0].date)}</p>
            ))
          }
        </DialogContent>
      </Dialog>
      </div>

      <div className="mt-3">
      <Button variant="contained" color="primary" onClick={handleOpen2}>
      Duty History
      </Button>
      <Dialog open={open2} onClose={handleClose2} scroll="paper">
        <DialogTitle>Duty History</DialogTitle>
        <DialogContent dividers className={classes.dialogContent}>
          {/* Add your scrollable content here */console.log(advanceData)}
          {
            dutyData.map((advance)=>(
                <p key={advance._id}>Date : {getDate(advance.date)}</p>
            ))
          }
        </DialogContent>
      </Dialog>
      </div>
    </>
  );
}
