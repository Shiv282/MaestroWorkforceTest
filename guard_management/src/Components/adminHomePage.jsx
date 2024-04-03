import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    maxHeight: 400, // Adjust the max height as needed
    overflowY: "auto",
  },
}));

export function AdminHomePage() {

    const [dialogData, setDialogData] = useState([]);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    const [guardDialog, setGuardDialog] = useState(false);
    const classes = useStyles();

    const addApartment = async (event) =>{
        var location = document.getElementById('location').value;
        var apartmentName = document.getElementById('apartmentName').value;
        try{
            const response = await axios({
                method: 'POST',
                url: "http://localhost:3000/addApartment",
                data: {
                    location: location,
                    apartmentName: apartmentName,
                    supervisorName: "supervisorName",
                    supervisorId: "66083795e85721253d79b143"
                }
              });
        }catch (error) {
            console.error('Error:', error);
            if(error.response.status == 400){
                setDialogData("Apartment already exists");
            }
            setError(error.message || 'An error occurred');
            document.getElementById('location').value = "";
            document.getElementById('apartmentName').value = "";
          }
          
        handleClose();
      }

      const addGuard = async (event) =>{
        var guardName = document.getElementById('guardName').value;
        try{
            const response = await axios({
                method: 'POST',
                url: "http://localhost:3000/addGuard",
                data: {
                    name: guardName,
                    apartmentName: "apartmentName",
                    apartmentId: "66082468f79020f63b04bf0c"
                }
              });
              console.log(response);
              closeGuard();
        }catch (error) {
            console.error('Error:', error);
            if(error.response.status == 400){
                setDialogData("Guard already exists");
            }
            setError(error.message || 'An error occurred');
            document.getElementById('guardName').value = "";
          }
          
        
      }

      

  const handleOpen = async (event) => {
    var clicked = event.target.getAttribute('data-key');
    setDialogData("Add apartment");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openGuard = async (event) => {
    setDialogData("Add Guard");
    setGuardDialog(true);
  };

  const closeGuard = () => {
    setGuardDialog(false);
  };
  return (
    <>
      <div>
        <h1>Admin Home Page : {error && <p>Error: {error}</p>}</h1>
        <div>
          <Button
            href="/adminPage/grantAdvance/main"
            color="success"
            style={{ marginTop: 10 + "px" }}
            variant="contained"
          >
            Grant advance
          </Button>
        </div>
        <div>
          <Button
            color="success"
            onClick={handleOpen}
            style={{ marginTop: 10 + "px" }}
            variant="contained"
            data-key="Add apartment"
          >
            Add apartment
          </Button>
        </div>
        <div>
          <Button
            color="success"
            onClick={openGuard}
            style={{ marginTop: 10 + "px" }}
            variant="contained"
            data-key="Add Guard"
          >
            Add guard
          </Button>
        </div>
        <div>
          <Button
            color="success"
            style={{ marginTop: 10 + "px" }}
            variant="contained"
            data-key="Add Guard"
          >
            Add existing guard
          </Button>
        </div>
        <div>
          <Button
            href="/adminPage/attendance/main"
            color="success"
            style={{ marginTop: 10 + "px" }}
            variant="contained"
          >
            Attendance
          </Button>
        </div>
        <div>
          <Button
            href="/adminPage/payroll/main"
            color="success"
            style={{ marginTop: 10 + "px" }}
            variant="contained"
          >
            View Payrol
          </Button>
        </div>
        <div>
          <Button
            href="/adminPage/patrolHistory/main"
            color="success"
            style={{ marginTop: 10 + "px" }}
            variant="contained"
          >
            View patrol info
          </Button>
        </div>

        <Dialog open={open} onClose={handleClose} scroll="paper">
          <DialogTitle>
            {dialogData}
          </DialogTitle>
          <DialogContent dividers className={classes.dialogContent}>
            <div>
            <label htmlFor="apartmentName">Enter apartmentName</label>
            <input type="text" name="apartmentName" id="apartmentName" />
            </div>
            <div>
            <label htmlFor="location">Enter location</label>
            <input type="text" name="location" id="location" />
            </div>
            <Button
              color="success"
              onClick={addApartment}
              style={{ marginTop: 10 + "px" }}
              variant="contained"
            >
              Submit
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog open={guardDialog} onClose={closeGuard} scroll="paper">
          <DialogTitle>
            {dialogData}
          </DialogTitle>
          <DialogContent dividers className={classes.dialogContent}>
            <div>
            <label htmlFor="guardName">Enter Name</label>
            <input type="text" name="guardName" id="guardName" />
            </div>
            <Button
              color="success"
              onClick={addGuard}
              style={{ marginTop: 10 + "px" }}
              variant="contained"
            >
              Submit
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
