import { useState } from "react";
import { Button } from "@mui/base";
import axios from "axios";

var apartmentId = "65e4700d1f2f37bb83d54a29";
async function readData() {
  const ndef = new NDEFReader();
  ndef
    .scan()
    .then(() => {
      console.log("Scan started successfully.");
      ndef.onreadingerror = () => {
        console.log("Cannot read data from the NFC tag. Try another one?");
      };
      ndef.onreading = (event) => {
        console.log("NDEF message read.");
        const dataView = new DataView(event.message.records[0].data.buffer);
        const decoder = new TextDecoder("utf-8");
        const decodedString = decoder.decode(dataView);
        console.log(decodedString);
        var resp = getCoordinates()
        console.log(resp);
      };
    })
    .catch((error) => {
      console.log(`Error! Scan failed to start: ${error}.`);
    });
}

async function getCoordinates() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("Current Latitude:", latitude);
        console.log("Current Longitude:", longitude);
        return { latitude: latitude, longitude: longitude };
      },
      (error) => {
        console.error("Error getting geolocation:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

function getDistance(lat1, lon1, lat2, lon2) {
  //Haversine formula
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371; // Radius of the Earth in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceKm = earthRadiusKm * c;
    return distanceKm;
  }

  // Example coordinates (New York City and Los Angeles)
  //HALL
  //Current Latitude: 13.0100474
  //Current Longitude: 77.7041952

  //ROOM
  //Current Latitude: 13.010067
  //Current Longitude: 77.7041328
  //const lat1 = 40.7128; // Latitude of New York City
  //const lon1 = -74.006; // Longitude of New York City
  //const lat2 = 34.0522; // Latitude of Los Angeles
  //const lon2 = -118.2437; // Longitude of Los Angeles

  const distanceKm = calculateDistance(lat1, lon1, lat2, lon2);
  console.log("Direct distance between A and B:", distanceKm * 1000, "meters");
  return distanceKm * 1000;
}

export function StartPatrol() {
  const [status, setStatus] = useState("Start");
  const [count, setCount] = useState(1);

  async function handlePatrol() {
    console.log(status);
    if(status == "Start"){
        var newCount = count + 1;
        setCount(newCount);
        setStatus("Click here to mark checkpoint : " + count);
        return
    }

    const response = await axios({
      method: "POST",
      url: "http://localhost:3000/getApartment",
      data: {
        id: apartmentId,
      },
    });
    console.log(response.data.data[0].patrolPath);
    var patrolPath = response.data.data[0].patrolPath;
    if(count > patrolPath.length+1){
        console.log("end")
        return
    }

    var nfcData = await readData();
    console.log(nfcData);
    var lat = patrolPath[count - 2].latitude;
    var lon = patrolPath[count - 2].longitude;
    var latitude;
    var longitude;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          console.log("Current Latitude:", latitude);
          console.log("Current Longitude:", longitude);
          console.log("Target Latitude:", lat);
          console.log("Target Longitude:", lon);
          var distance = getDistance(lat, lon, latitude, longitude);
          console.log(distance);
          if (distance < 10) {
            var newCount = count + 1;
            setCount(newCount);
            setStatus("Click here to mark checkpoint : " + count);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  if ("NDEFReader" in window) {
    return (
      <>
        <div>
          <h1>NDEF activated</h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <h1>NDEF reader not available.</h1>
          <Button id={status} onClick={handlePatrol}>
            {status}
          </Button>
        </div>
      </>
    );
  }
}
