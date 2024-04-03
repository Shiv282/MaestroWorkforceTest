import axios from "axios";
import { Button } from "@mui/material";
import React, { useState } from "react";

export function ApartmentPage() {
  return (
    <>
        <div className="grid gap-4 grid-cols-2 mt-10 mx-10">
        <Button variant="contained" color="primary">
        Mark Attendance 
      </Button>
      <Button variant="contained" color="primary">
        View Attendance 
      </Button>
      <Button variant="contained" color="primary">
        Start patrol
      </Button>
      <Button variant="contained" color="primary">
        View Patrol data
      </Button>
        </div>
    </>
  );
}
