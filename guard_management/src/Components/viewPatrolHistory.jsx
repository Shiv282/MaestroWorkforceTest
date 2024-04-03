import { useState, useEffect } from "react";
import axios from "axios";

var apartmentId = "65e4700d1f2f37bb83d54a29";
var data = [];

export function ViewPatrolHistory() {

    const [patrolData, setPatrolData] = useState([]);
    const [loading, setLoading] = useState(true)

useEffect(() => {
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
        for(var i=0;i<reports.length;i++){
            if(reports[i].title=="Patrol started"){
                if(temp.length!=0){
                    data.push(temp);
                }
                temp = [];
            }
            temp.push(reports[i]);
        }
        setPatrolData(data);
        setLoading(false);
    }

    getData();
},[])

if (loading) {
    return <div>Loading...</div>;
  }
  

    return (
        <>
            <h1>Patrol History</h1>
            <div key={"data"}>
                {patrolData.map((row)=>(
                    <div key={patrolData.indexOf(row)} className={"my-5"}>
                        {row.map((value)=>(<p key={value._id}>{value.title}---{new Date(value.time).getDate()}/{new Date(value.time).getMonth()} at {new Date(value.time).getHours()}:{new Date(value.time).getMinutes()}:{new Date(value.time).getSeconds()} IST</p>))}
                    </div>
                ))}
            </div>
        </>
      );

  }

