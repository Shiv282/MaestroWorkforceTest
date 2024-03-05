import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";

import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#B4B4B8",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

async function addGuard(){
    var name = document.querySelector('#name').value;
    var apartmentName = document.querySelector('#apartmentName').value;

    const response = await axios({
        method: 'POST',
        url: "http://localhost:3000/addGuard",
        data: {
            name,
            apartmentName
        }
      });
    const resp = response.data.message;
    console.log(resp);
    handleClose();
}
var handleClose;
export default function AddGuard() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  handleClose= () => setOpen(false);

  return (
    <div style={{ marginTop: 2 + "px" }}>
      <Button color="success" variant="contained" onClick={handleOpen}>
        Add Guard
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" >
            Add Guard
          </Typography>

          <TextField fullWidth id="name" label="Name" variant="standard" />
          <TextField fullWidth id="apartmentName" label="Apartment Name" variant="standard" style={{ marginTop: 10 + "px" }}/>
          <Button color="success" style={{ marginTop: 10 + "px" }} variant="contained" onClick={addGuard}>
            Add Guard
            </Button>
        </Box>
      </Modal>
    </div>
  );
}
