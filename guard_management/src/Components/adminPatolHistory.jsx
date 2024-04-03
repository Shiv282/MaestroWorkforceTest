import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";

const adminId = "65e0d05b34587bb61c4edc8c";

export function AdminPatrolHistory() {
  const [data, setData] = useState([]);
  const [patrolData, setPatrolData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { apartmentId } = useParams();

  async function getData() {
    setLoading(true);
    var todayDateStart = new Date().setHours(0, 0, 0, 0);
    var todayDateEnd = new Date();
    todayDateEnd.setDate(todayDateEnd.getDate() + 1);
    todayDateEnd.setHours(0, 0, 0, 0);
    const response = await axios({
      method: "POST",
      url: "http://localhost:3000/patrol/get",
      data: {
        apartmentId: apartmentId,
        startTime: todayDateStart,
        endTime: todayDateEnd,
      },
    });
    const reports = response.data;
    reports.sort((a, b) => a.time - b.time);
    const data = [];
    var temp = [];
    for (var i = 0; i < reports.length; i++) {
      if (reports[i].title == "Patrol started") {
        if (temp.length != 0) {
          data.push(temp);
        }
        temp = [];
      }
      temp.push(reports[i]);
    }
    setPatrolData(data);
    setLoading(false);
  }

  useEffect(() => {
    if (apartmentId != "main") {
      const dataRead = async () => {
        setLoading(true);
        var todayDateStart = new Date().setHours(0, 0, 0, 0);
        var todayDateEnd = new Date();
        todayDateEnd.setDate(todayDateEnd.getDate() + 1);
        todayDateEnd.setHours(0, 0, 0, 0);
        const response = await axios({
          method: "POST",
          url: "http://localhost:3000/patrol/get",
          data: {
            apartmentId: apartmentId,
            startTime: todayDateStart,
            endTime: todayDateEnd,
          },
        });
        const reports = response.data;
        console.log("Reports : ");
        console.log(reports);
        reports.sort((a, b) => a.time - b.time);
        const data = [];
        var temp = [];
        for (var i = 0; i < reports.length; i++) {
          if (reports[i].title == "Patrol started") {
            if (temp.length != 0) {
              data.push(temp);
            }
            temp = [];
          }
          temp.push(reports[i]);
        }
        setPatrolData(data);
        setLoading(false);
      };
      dataRead();
    } else {
      const dataRead = async () => {
        const response = await axios({
          method: "GET",
          url: "http://localhost:3000/apartments",
        });
        const rows = response.data.data;
        console.log(rows);
        setData(rows);
      };
      dataRead();
    }
  }, []);

  if (apartmentId == "main") {
    return (
      <>
        <div>
          <h1>Patrol history</h1>
          {data.map((apartment) => (
            <Button
              color="success"
              style={{ marginTop: 10 + "px" }}
              variant="contained"
              key={apartment._id}
              href={"/adminPage/patrolHistory/" + apartment._id}
            >
              {apartment.apartmentName}
            </Button>
          ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Patrol history</h1>
        <div>
          {patrolData.map((row) => (
            <div key={patrolData.indexOf(row)} className={"my-5"}>
              {row.map((value) => (
                <p key={value._id}>
                  {value.title}---{new Date(value.time).getDate()}/
                  {new Date(value.time).getMonth()} at{" "}
                  {new Date(value.time).getHours()}:
                  {new Date(value.time).getMinutes()}:
                  {new Date(value.time).getSeconds()} IST
                </p>
              ))}
            </div>
          ))}
        </div>
      </>
    );
  }
}
