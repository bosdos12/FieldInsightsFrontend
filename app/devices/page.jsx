"use client";
import { GroupItem, Header, LineChart, SensorItem } from "@/Components";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {

  const [displayedDevices, setDisplayedDevices] = useState([]);

  useEffect(() => {

    // Check if the group id exists in the localstorage
    fetch("http://localhost:3001/api/getalldevices").then(async res => {
      const json_res = await res.json();
      console.log(json_res);
      if (res.status === 200) {
        setDisplayedDevices(json_res);
      };
    }).catch(err => {
      console.log(err);
      alert("Network connectivity issues.");
    })

  }, []);


  return (
    <main className="main__container">
      <Header />


      <div className="horizontal__split">

        <div className="horizontal__split-single left">
          <div style={{
            width: "100%",
            height: "fit-content",
            marginBottom: "26px"
          }}>
            <p className="medium__text" style={{marginTop: "26px"}}>Devices</p>
          </div>

          {displayedDevices.map(item => (
            <SensorItem key={item._id} />
          ))}

        </div>
        
        {/* Spacer */}
        <div style={{width: "100%", height: "100%"}}></div>
        
        <div className="horizontal__split-single">
          <div style={{
            width: "100%",
            height: "fit-content",
            textAlign: "right"
          }}>
            <p className="medium__text" style={{marginTop: "26px"}}>Map Data</p>
          </div>
        </div>

      </div>
    </main>
  );
}
